<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 首页首屏的整屏视频 + 中间「开始」按钮，仿 `https://zhangjunjiee.netlify.app/`
 * （源码 `docs/.vitepress/theme/components/Whome.vue`）。
 *
 * 结构、文案、几何与动画都照源站：`100vh` 的视频铺满首屏，按钮贴底 8% 居中，
 * 点一下 `scrollBy(innerHeight - 导航栏高度)` 平滑滑到下一屏（下方就是本项目
 * 原有的首页内容）。
 *
 * 按钮的悬浮效果是源站那套「六个热区」：`.home-intro__box` 是一个 3×2 的
 * grid，六个 `.hover` 各自占一个格子，鼠标落在哪一格就把 `<button>` 往哪个
 * 角翻（`rotateX/rotateY ±15deg`）并给同向投影，同时 `::after` 的「开始」飞
 * 起来变成 `Click!`；指针在按钮正中（bt-2 / bt-5，源站没给这两个写规则）则
 * 只把 `::before` 的橙色底收掉。源站写的是 `perspective: 800`（无单位、非法，
 * 实测计算值 `none`），所以那点倾斜其实是正交投影 —— 这里同样不加透视，
 * 效果保持一模一样。
 *
 * 通栏与顶到视口最上沿沿用 `.case-banner-bleed` 那套做法：`50% - 50vw` 抵消
 * `#main` 的居中留白，`-mt-16` 抵消 `Layout.vue` 的 `pt-16`，多出来的横向
 * 溢出由 `.site-shell` 的 `overflow-x: clip` 收掉。
 *
 * 首屏自带 `bg-bg-soft`（与外壳同色）不是多余的：`mix-blend-mode` 只跟**同一个
 * 层叠上下文里**画在它下面的东西混合。路由切换时 `#main` 有入场动画
 * （`transform` + `opacity`），期间它会新建层叠上下文，视频的混合背景就成了
 * 透明 —— 画面会闪回原色。给它铺上实心底色后，无论动画在不在跑，混合背景都
 * 是这个底色，颜色不再跳。
 */
/** `SiteNav` 的 `h-16`；滚动量减掉它，下一屏内容正好落在导航栏下面。 */
const NAV_HEIGHT = 64

function start() {
  window.scrollBy({ top: window.innerHeight - NAV_HEIGHT, behavior: 'smooth' })
}

/* --- 底部波浪 ------------------------------------------------------------ */
/**
 * 仿 `https://docs.mihono.cn/zh/` 首屏的 `vp-wave`（其主题里的 `WaveAnimation`）：
 * 一块 canvas 画三条正弦波，每条从波峰往下填满，颜色就是页面底色 —— 于是首屏
 * 的底边本身成了一条会动的波浪线，和下方便是无缝衔接，而不是贴一条白带子。
 *
 * 三条波的振幅/频率/速度/透明度不同，后者画在前者上面（源站 `_` 的默认值）：
 * 幅度大的那条最高最实，小的两条只在波峰处从下面透出来。算法照搬源站，含
 * 二次谐波（半频、1.3 倍相位、0.3 倍幅度）与沿波峰的那道极淡描边。
 *
 * 与源站的两处差别：
 *   · 高度。源站是 `min-height: max(44px, 22vw)`（1440 宽下 316px），这里按
 *     要求收成 80px —— 画面不高，但振幅仍是源站的 12 / 16 / 20，起伏一样。
 *   · 颜色取自 `--site-bg-soft`（页面底色），源站用 `--vp-c-bg`：两者都等于
 *     「波浪下面那一屏的颜色」，深浅色各自成立。
 */
const WAVE_HEIGHT = 80

/** 源站 `_`：三条默认层，顺序即层序。 */
const LAYERS = [
  { opacity: 0.25, amplitude: 12, frequency: 0.01, speed: 0.6 },
  { opacity: 0.5, amplitude: 16, frequency: 0.007, speed: 0.8 },
  { opacity: 1, amplitude: 20, frequency: 0.005, speed: 1 },
]

/** 源站每帧给时间加 0.02（约 1.2 rad/s），三条波按 `speed` 各自快慢。 */
const CLOCK_STEP = 0.02

const waves = ref<HTMLCanvasElement | null>(null)

/**
 * 当前这套填充色，以及上一帧解析它的底色 —— 底色一变就重算（见 `waveColors`）。
 */
let themeBase = ''
let themeColors: string[] = []
let themeDark = false

let clock = 0
let frameId = 0
let observer: IntersectionObserver | null = null
let classObserver: MutationObserver | null = null
let reducedMotion = false

/**
 * 任意 CSS 颜色 → sRGB 字节。`bg-bg-soft` 是 `oklch(…)`，`getComputedStyle`
 * 原样返回 oklch 语法，交给 canvas 解析（它按 sRGB 落笔）再读回像素即可。
 */
function toRgb(color: string): [number, number, number] {
  const probe = document.createElement('canvas')
  probe.width = 1
  probe.height = 1
  const ctx = probe.getContext('2d')
  if (!ctx) return [255, 255, 255]
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const { data } = ctx.getImageData(0, 0, 1, 1)
  return [data[0], data[1], data[2]]
}

/**
 * 三条波的填充色：最上面那条就是页面底色，下面两条按源站 `b()` 往白（浅色）
 * 或黑（深色）上靠一点，叠出层次 —— 浅色下因为底色近乎纯白，几乎看不出差别，
 * 深色下才是它起作用的地方。
 *
 * 底色每帧现读 `bg-bg-soft` 的计算值（字符串没变就跳过重算），浅色/深色也由
 * 底色自己的明度判断，而不是看 `useData().isDark`：主题开关是先改那个 ref、
 * 后由 VitePress 把 `dark` 写到 `<html>` 上，在 watcher 里读会拿到**上一套**
 * 颜色，波浪就永远慢一拍。这样写则无论谁先谁后，画出来的都是当屏底色的波。
 */
function waveColors(): { colors: string[]; dark: boolean } {
  const hero = waves.value?.parentElement
  const base = (hero && getComputedStyle(hero).backgroundColor) || '#fff'
  if (base === themeBase && themeColors.length) {
    return { colors: themeColors, dark: themeDark }
  }

  const [r, g, b] = toRgb(base)
  const dark = r * 0.299 + g * 0.587 + b * 0.114 < 128
  const last = LAYERS.length - 1
  themeBase = base
  themeDark = dark
  themeColors = LAYERS.map((_, index) => {
    const weight = index === last ? 1 : 0.6 + (index / LAYERS.length) * 0.3
    const mix = (c: number) =>
      Math.round(dark ? c * weight : c + (255 - c) * (1 - weight))
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
  })
  return { colors: themeColors, dark }
}

/**
 * 一条正弦波；`close` 时从波形两端补到画布底部再闭合，得到可填充的区域，
 * 否则只留波峰那一段线给描边用。中线在高度的一半，起伏是主频加一个半频的
 * 二次谐波（与源站同式）。
 */
function traceWave(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  speed: number,
  phase: number,
  close: boolean,
) {
  const t = clock * speed + phase
  for (let x = 0; x <= width; x += 2) {
    const y =
      height / 2 +
      Math.sin(x * frequency + t) * amplitude +
      Math.sin(x * frequency * 0.5 + t * 1.3) * amplitude * 0.3
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  if (close) {
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
  }
}

function draw() {
  const canvas = waves.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return
  const { colors, dark } = waveColors()

  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  const bufferWidth = Math.round(width * dpr)
  const bufferHeight = Math.round(height * dpr)
  if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
    canvas.width = bufferWidth
    canvas.height = bufferHeight
  }
  // 改 canvas.width 会重置 2d 上下文，所以变换放在后面设。
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  // 源站按宽度做的两处缩放：窄屏振幅收一点、波长放长一点，一屏里的波峰数
  // 才和宽屏接近（1440 宽时两个系数都是 1，即原参数）。
  const density = Math.max(0.4, width / 1200)
  const frequencyScale = Math.min(3.2, Math.max(1, 1 / density))
  const amplitudeScale = Math.max(0.72, Math.min(1, density * 1.1))

  LAYERS.forEach((layer, index) => {
    const amplitude = layer.amplitude * amplitudeScale
    const frequency = layer.frequency * frequencyScale
    const phase = index * 0.8

    ctx.beginPath()
    traceWave(ctx, width, height, amplitude, frequency, layer.speed, phase, true)
    ctx.globalAlpha = layer.opacity
    ctx.fillStyle = colors[index]
    ctx.fill()

    const depth = (index + 1) / LAYERS.length
    ctx.beginPath()
    traceWave(ctx, width, height, amplitude, frequency, layer.speed, phase, false)
    ctx.globalAlpha = 1
    ctx.strokeStyle = dark
      ? `rgba(255, 255, 255, ${(0.03 + 0.11 * depth).toFixed(3)})`
      : `rgba(0, 0, 0, ${(0.02 + 0.08 * depth).toFixed(3)})`
    ctx.lineWidth = 0.8 + depth * 1.2
    ctx.stroke()
  })

  ctx.globalAlpha = 1
}

function tick() {
  clock += CLOCK_STEP
  draw()
  frameId = window.requestAnimationFrame(tick)
}

function play() {
  if (frameId || reducedMotion) return
  frameId = window.requestAnimationFrame(tick)
}

function pause() {
  if (!frameId) return
  window.cancelAnimationFrame(frameId)
  frameId = 0
}

function onResize() {
  draw()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  draw()
  play()

  window.addEventListener('resize', onResize)

  // 首屏滑过去之后（点「开始」就会）没有画面了，停掉这帧循环。
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) play()
    else pause()
  })
  if (waves.value) observer.observe(waves.value)

  // 深浅色切换只改 `<html>` 的 class：帧循环在跑时下一帧自然跟上，而关掉动效
  // 或已滑出视口时没有帧在跑，得靠这个补一帧，波浪颜色才不会被落在旧主题上。
  classObserver = new MutationObserver(() => draw())
  classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', onResize)
  observer?.disconnect()
  observer = null
  classObserver?.disconnect()
  classObserver = null
})
</script>

<template>
  <!-- `bg-bg-soft` 与外壳同色：给视频一个稳定的混合背景，否则入场动画期间会闪回原色。 -->
  <div class="home-intro bg-bg-soft">
    <video
      class="home-intro__video"
      autoplay
      loop
      muted
      playsinline
      aria-hidden="true"
      tabindex="-1"
    >
      <source src="/video/home-intro.mp4" type="video/mp4" />
    </video>

    <!-- 底部波浪：canvas 画三条正弦波，填色就是页面底色。 -->
    <canvas
      ref="waves"
      class="home-intro__waves"
      :style="{ height: `${WAVE_HEIGHT}px` }"
      aria-hidden="true"
    />

    <div class="home-intro__start">
      <div class="home-intro__box" @click="start">
        <div class="hover bt-1" />
        <div class="hover bt-2" />
        <div class="hover bt-3" />
        <div class="hover bt-4" />
        <div class="hover bt-5" />
        <div class="hover bt-6" />
        <button type="button" aria-label="开始" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-intro {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  /* 顶到视口最上沿（抵消 Layout.vue 的 pt-16）并通栏（抵消 #main 的居中留白）。 */
  margin-top: -4rem;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
}

.home-intro__video {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  mix-blend-mode: difference;
}

/* --- 底部波浪 ------------------------------------------------------------ */

/* 高度由 `WAVE_HEIGHT` 以内联样式给出，这里只管定位与铺满。 */
.home-intro__waves {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: block;
  width: 100%;
  pointer-events: none;
  transform: translateZ(0);
}

/* --- 按钮 ---------------------------------------------------------------- */

.home-intro__start {
  position: absolute;
  bottom: 8%;
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 100%;
}

.home-intro__box {
  position: relative;
  display: grid;
  grid-template-areas:
    'bt-1 bt-2 bt-3'
    'bt-4 bt-5 bt-6';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  width: 135px;
  height: 47px;
  padding: 0;
  transition: all 0.3s ease-in-out;
}

.home-intro__box:active {
  transform: scale(0.95);
}

/* 绝对定位的 grid 子项以自己那一格为包含块，于是六个热区正好铺满 3×2。 */
.home-intro__box .hover {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
}

.home-intro__box .bt-1 {
  grid-area: bt-1;
}

.home-intro__box .bt-2 {
  grid-area: bt-2;
}

.home-intro__box .bt-3 {
  grid-area: bt-3;
}

.home-intro__box .bt-4 {
  grid-area: bt-4;
}

.home-intro__box .bt-5 {
  grid-area: bt-5;
}

.home-intro__box .bt-6 {
  grid-area: bt-6;
}

.home-intro__box .bt-1:hover ~ button {
  transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
  box-shadow: -2px -2px #18181888;
}

.home-intro__box .bt-1:hover ~ button::after {
  text-shadow: -2px -2px #18181888;
  animation: intro-shake 0.5s ease-in-out 0.3s;
}

.home-intro__box .bt-3:hover ~ button {
  transform: rotateX(15deg) rotateY(15deg) rotateZ(0deg);
  box-shadow: 2px -2px #18181888;
}

.home-intro__box .bt-3:hover ~ button::after {
  text-shadow: 2px -2px #18181888;
  animation: intro-shake 0.5s ease-in-out 0.3s;
}

.home-intro__box .bt-4:hover ~ button {
  transform: rotateX(-15deg) rotateY(-15deg) rotateZ(0deg);
  box-shadow: -2px 2px #18181888;
}

.home-intro__box .bt-4:hover ~ button::after {
  text-shadow: -2px 2px #18181888;
  animation: intro-shake 0.5s ease-in-out 0.3s;
}

.home-intro__box .bt-6:hover ~ button {
  transform: rotateX(-15deg) rotateY(15deg) rotateZ(0deg);
  box-shadow: 2px 2px #18181888;
}

.home-intro__box .bt-6:hover ~ button::after {
  text-shadow: 2px 2px #18181888;
  animation: intro-shake 0.5s ease-in-out 0.3s;
}

.home-intro__box .hover:hover ~ button::before {
  background: transparent;
}

.home-intro__box .hover:hover ~ button::after {
  content: 'Click!';
  top: -150%;
  transform: translate(-50%, 0);
  font-size: 34px;
  color: #f19c2b;
}

.home-intro__box button {
  position: absolute;
  width: 135px;
  height: 47px;
  padding: 0;
  font-size: 17px;
  font-weight: 900;
  background: transparent;
  border: 3px solid #f39923;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
}

.home-intro__box button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  width: 135px;
  height: 47px;
  background-color: #f39923;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
}

.home-intro__box button::after {
  content: '开始';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 135px;
  height: 47px;
  font-size: 17px;
  font-weight: 900;
  line-height: 47px;
  color: #fff;
  text-align: center;
  background-color: transparent;
  border: none;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
}

@keyframes intro-shake {
  0% {
    left: 45%;
  }

  25% {
    left: 54%;
  }

  50% {
    left: 48%;
  }

  75% {
    left: 52%;
  }

  100% {
    left: 50%;
  }
}
</style>
