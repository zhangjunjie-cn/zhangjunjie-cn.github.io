<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

import type { Weather } from './memories'

/**
 * 首屏横幅背后飘动的粒子层 —— 源站的 `MemoryCanvas`。
 *
 * 源站只有「下雪」一种：一张六臂雪花贴图，`drawImage` 按每颗粒子自己的角度
 * 旋转着盖章。这里把它抽成下面 `SPECS` 那张表，又补了阳光、树叶、花瓣、风，
 * `<Swiper weather="…">` 里选一种（`none` 就是不要）。
 *
 * 每种天气 = 一张离屏贴图（浅色/深色各画一次、缓存住）+ 一组运动参数：
 *   density / min                 每多少 px² 一颗、至少几颗
 *   size / speed / drift / spin   大小、速度、横漂、自转的随机区间
 *   swing / sway                  左右（或上下）摆动的幅度与频率
 *   rise / gust                   往上飘 / 横着疾驰；默认是下落
 *   alpha                         每帧不透明度（可以做明暗呼吸）
 * 雪花那一行的数值与源站逐项一致。
 */
const props = withDefaults(
  defineProps<{
    /** 粒子效果；`none` 则只有画布、不画东西。 */
    weather?: Weather
  }>(),
  { weather: 'snow' },
)

const { isDark } = useData()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const width = ref(800)
const height = ref(600)

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  opacity: number
  rotation: number
  rotationSpeed: number
  /** 摆动相位，每帧加 `sway`。 */
  phase: number
  sway: number
  swing: number
}

interface WeatherSpec {
  density: number
  min: number
  /** 盖章倍数：贴图短边 × 这个数就是粒子半径。 */
  scale: number
  size: [number, number]
  speed: [number, number]
  drift: [number, number]
  spin: [number, number]
  swing: [number, number]
  sway: [number, number]
  rise?: boolean
  gust?: boolean
  alpha: (particle: Particle, dark: boolean) => number
  sprite: (dark: boolean) => HTMLCanvasElement
}

let ctx: CanvasRenderingContext2D | null = null
let raf: number | null = null
let visible = true
let observer: IntersectionObserver | null = null
const particles: Particle[] = []

/* --- 贴图 ---------------------------------------------------------------- */

const ARM = 10
const PAD = 4

function offscreen(w: number, h: number): HTMLCanvasElement {
  const sprite = document.createElement('canvas')
  sprite.width = w
  sprite.height = h
  return sprite
}

/** 六臂雪花：源站那张贴图（臂长 10、四周留白 4、圆头圆角）。 */
function snowflake(dark: boolean): HTMLCanvasElement {
  const size = (ARM + PAD) * 2
  const sprite = offscreen(size, size)
  const c = sprite.getContext('2d')!
  c.translate(ARM + PAD, ARM + PAD)
  c.strokeStyle = dark ? 'rgba(235, 241, 255, 0.9)' : 'rgba(100, 116, 139, 0.85)'
  c.lineWidth = dark ? 2.5 : 3.6
  c.lineCap = 'round'
  c.lineJoin = 'round'
  c.beginPath()
  for (let arm = 0; arm < 6; arm++) {
    c.rotate(Math.PI / 3)
    c.moveTo(0, 0)
    c.lineTo(0, -ARM)
    c.moveTo(0, -ARM * 0.6)
    c.lineTo(-ARM * 0.3, -ARM * 0.8)
    c.moveTo(0, -ARM * 0.6)
    c.lineTo(ARM * 0.3, -ARM * 0.8)
  }
  c.stroke()
  return sprite
}

/** 阳光光斑：暖色径向渐变，边缘化开，像一颗失焦的光点。 */
function sunMote(dark: boolean): HTMLCanvasElement {
  const size = 36
  const sprite = offscreen(size, size)
  const c = sprite.getContext('2d')!
  const r = size / 2
  const glow = c.createRadialGradient(r, r, 0, r, r, r - 1)
  glow.addColorStop(0, dark ? 'rgba(255, 247, 214, 0.95)' : 'rgba(255, 241, 190, 0.98)')
  glow.addColorStop(0.35, dark ? 'rgba(253, 224, 71, 0.5)' : 'rgba(251, 191, 36, 0.42)')
  glow.addColorStop(1, 'rgba(251, 191, 36, 0)')
  c.fillStyle = glow
  c.beginPath()
  c.arc(r, r, r - 1, 0, Math.PI * 2)
  c.fill()
  return sprite
}

/** 树叶：尖头椭圆 + 中脉 + 一截叶柄。 */
function leaf(dark: boolean): HTMLCanvasElement {
  const size = 28
  const sprite = offscreen(size, size)
  const c = sprite.getContext('2d')!
  c.translate(size / 2, size / 2)
  c.fillStyle = dark ? 'rgba(134, 239, 172, 0.9)' : 'rgba(101, 163, 13, 0.88)'
  c.beginPath()
  c.moveTo(0, -11)
  c.bezierCurveTo(8.5, -6, 8.5, 5, 0, 9)
  c.bezierCurveTo(-8.5, 5, -8.5, -6, 0, -11)
  c.fill()
  c.strokeStyle = dark ? 'rgba(240, 253, 244, 0.6)' : 'rgba(247, 254, 231, 0.7)'
  c.lineWidth = 1.1
  c.beginPath()
  c.moveTo(0, -9)
  c.lineTo(0, 12)
  c.stroke()
  return sprite
}

/** 花瓣：一头尖一头圆的粉色瓣。 */
function petal(dark: boolean): HTMLCanvasElement {
  const size = 26
  const sprite = offscreen(size, size)
  const c = sprite.getContext('2d')!
  c.translate(size / 2, size / 2)
  c.fillStyle = dark ? 'rgba(251, 207, 232, 0.9)' : 'rgba(244, 114, 182, 0.8)'
  c.beginPath()
  c.moveTo(0, 10)
  c.bezierCurveTo(-9, 3, -7, -9, 0, -10)
  c.bezierCurveTo(7, -9, 9, 3, 0, 10)
  c.fill()
  return sprite
}

/**
 * 风：一道两头淡出的横风。贴图比高宽得多，盖章时按贴图比例压扁（见 `draw`），
 * 所以画出来始终是细长的一条。
 */
function gust(dark: boolean): HTMLCanvasElement {
  const w = 48
  const h = 10
  const sprite = offscreen(w, h)
  const c = sprite.getContext('2d')!
  const rgb = dark ? '203, 213, 225' : '148, 163, 184'
  const gradient = c.createLinearGradient(0, 0, w, 0)
  gradient.addColorStop(0, `rgba(${rgb}, 0)`)
  gradient.addColorStop(0.4, `rgba(${rgb}, 0.85)`)
  gradient.addColorStop(1, `rgba(${rgb}, 0)`)
  c.strokeStyle = gradient
  c.lineWidth = 1.8
  c.lineCap = 'round'
  c.beginPath()
  c.moveTo(2, h / 2)
  c.bezierCurveTo(w * 0.35, h / 2 - 2.6, w * 0.65, h / 2 + 2.6, w - 2, h / 2)
  c.stroke()
  return sprite
}

/* --- 运动参数 ------------------------------------------------------------ */

const SPECS: Partial<Record<Weather, WeatherSpec>> = {
  /** 下雪：源站原样 —— 下落、轻微横漂、极慢自转。 */
  snow: {
    density: 12000,
    min: 60,
    scale: 1.4,
    size: [1.4, 4.6],
    speed: [0.45, 1.35],
    drift: [-0.23, 0.23],
    spin: [-0.009, 0.009],
    swing: [0, 0],
    sway: [0.004, 0.01],
    alpha: (p, dark) => (dark ? p.opacity * 0.6 : p.opacity),
    sprite: snowflake,
  },
  /** 阳光：暖色光斑缓慢上浮，轻轻左右摆，明暗像在呼吸。 */
  sun: {
    density: 30000,
    min: 22,
    scale: 1.7,
    size: [2.4, 7.5],
    speed: [0.1, 0.35],
    drift: [-0.08, 0.08],
    spin: [0, 0],
    swing: [0.15, 0.6],
    sway: [0.004, 0.012],
    rise: true,
    alpha: (p, dark) => p.opacity * (0.5 + 0.5 * Math.sin(p.phase * 1.7)) * (dark ? 1 : 0.85),
    sprite: sunMote,
  },
  /** 树叶：打着旋儿往下落，摆幅大、自转稳。 */
  leaf: {
    density: 26000,
    min: 18,
    scale: 1.2,
    size: [3, 6.5],
    speed: [0.5, 1.1],
    drift: [-0.15, 0.15],
    spin: [-0.02, 0.02],
    swing: [0.5, 1.8],
    sway: [0.008, 0.02],
    alpha: (p, dark) => (dark ? p.opacity * 0.85 : p.opacity),
    sprite: leaf,
  },
  /** 花瓣：比树叶更轻，飘得慢、摆得更宽。 */
  petal: {
    density: 30000,
    min: 16,
    scale: 1.2,
    size: [2.4, 5.6],
    speed: [0.3, 0.75],
    drift: [-0.12, 0.12],
    spin: [-0.03, 0.03],
    swing: [0.8, 2.4],
    sway: [0.01, 0.024],
    alpha: (p, dark) => (dark ? p.opacity * 0.8 : p.opacity * 0.85),
    sprite: petal,
  },
  /** 风：一道一道的横风从左往右掠过去，边走边上下起伏。 */
  wind: {
    density: 42000,
    min: 10,
    scale: 1.1,
    size: [7, 20],
    speed: [2.2, 5.5],
    drift: [0, 0],
    spin: [0, 0],
    swing: [0.4, 1.6],
    sway: [0.01, 0.03],
    gust: true,
    alpha: (p, dark) => p.opacity * (dark ? 0.75 : 0.7),
    sprite: gust,
  },
}

const lightSprites = new Map<WeatherSpec, HTMLCanvasElement>()
const darkSprites = new Map<WeatherSpec, HTMLCanvasElement>()

function spriteFor(spec: WeatherSpec, dark: boolean): HTMLCanvasElement {
  const cache = dark ? darkSprites : lightSprites
  let sprite = cache.get(spec)
  if (!sprite) {
    sprite = spec.sprite(dark)
    cache.set(spec, sprite)
  }
  return sprite
}

function between([min, max]: [number, number]): number {
  return min + Math.random() * (max - min)
}

function seed() {
  particles.length = 0
  const spec = SPECS[props.weather]
  if (!spec) return

  const count = Math.max(spec.min, Math.floor((width.value * height.value) / spec.density))
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width.value,
      y: Math.random() * height.value,
      size: between(spec.size),
      speed: between(spec.speed),
      drift: between(spec.drift),
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: between(spec.spin),
      phase: Math.random() * Math.PI * 2,
      sway: between(spec.sway),
      swing: between(spec.swing),
    })
  }
}

/* --- 每帧 ---------------------------------------------------------------- */

/** 走出画面就从对面回来；`gust` 是横着走、`rise` 是往上走，其余都往下落。 */
function advance(p: Particle, spec: WeatherSpec) {
  p.phase += p.sway
  p.rotation += p.rotationSpeed

  if (spec.gust) {
    p.x += p.speed
    p.y += Math.sin(p.phase) * p.swing
    if (p.x > width.value + 40) {
      p.x = -40
      p.y = Math.random() * height.value
    }
    return
  }

  if (spec.rise) {
    p.y -= p.speed
    if (p.y < -40) {
      p.y = height.value + 40
      p.x = Math.random() * width.value
    }
  } else {
    p.y += p.speed
    if (p.y > height.value + 40) {
      p.y = -40
      p.x = Math.random() * width.value
    }
  }
  p.x += p.drift + Math.sin(p.phase) * p.swing
  if (p.x < -40) p.x = width.value + 40
  if (p.x > width.value + 40) p.x = -40
}

function draw() {
  if (!ctx) return
  const spec = SPECS[props.weather]
  if (!spec) return

  const dark = isDark.value
  const sprite = spriteFor(spec, dark)
  // 贴图不是正方形时（风），高度按贴图比例走，细长的风才不会涨成一块。
  const aspect = sprite.height / sprite.width

  for (const p of particles) {
    advance(p, spec)

    const halfWidth = p.size * spec.scale
    const halfHeight = halfWidth * aspect
    const cos = Math.cos(p.rotation)
    const sin = Math.sin(p.rotation)
    ctx.globalAlpha = Math.max(0, Math.min(1, spec.alpha(p, dark)))
    ctx.setTransform(cos, sin, -sin, cos, p.x, p.y)
    ctx.drawImage(sprite, -halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2)
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

function frame() {
  if (!visible) {
    raf = null
    return
  }
  if (!ctx) return
  ctx.clearRect(0, 0, width.value, height.value)
  draw()
  raf = requestAnimationFrame(frame)
}

function start() {
  if (!raf && visible) frame()
}

function measure() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.parentElement!.getBoundingClientRect()
  width.value = rect.width
  height.value = rect.height
  seed()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  measure()

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
        if (visible) start()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)
  } else {
    start()
  }
  window.addEventListener('resize', measure, { passive: true })
})

// 换天气就换一批粒子重来。
watch(() => props.weather, measure)

onUnmounted(() => {
  visible = false
  if (raf) cancelAnimationFrame(raf)
  observer?.disconnect()
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" :width="width" :height="height" />
</template>
