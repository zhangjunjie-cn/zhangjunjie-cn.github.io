<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 复刻 rspress.rs/zh/blog/ 页面顶部那层背景：光晕 + 网格 + 流星。
 *
 * 三层分别对应原站的 `.glowBackground` / `.blogFrame` / `l` 组件里的 `<canvas>`，
 * 前两层是纯背景图（见 `styles/tailwind.css` 的「文档页背景」段），第三层是 canvas：
 *
 *   - 细密的 120px 网格并不用每帧重画，原站把它画在离屏 canvas 上，每帧只 `drawImage`
 *     贴一次；
 *   - 流星（原站叫 meteor）从四条边里随机挑一条，沿网格线匀速划过，头亮尾淡：
 *     头部青色 `rgb(18,229,229)`、往后 2%~5% 迅速转成红色 `rgb(255,53,26)`，
 *     再线性淡出到透明，所以看起来是一道青红渐变的光线。
 *
 * 算法逐行照搬原站的 `sq.befd0454d3.js`（Meteor 类 + 渲染循环），只把 React 换成 Vue。
 */

/** 原站调用 `l` 时传的是 `{gridSize: 120, meteorCount: 3}`。 */
const GRID_SIZE = 120
const METEOR_COUNT = 3

interface Bounds {
  width: number
  height: number
}

/** 一颗沿网格线滑过的流星。 */
class Meteor {
  gridSize: number
  bounds: Bounds
  x = 0
  y = 0
  direction = 0
  speed = 0
  length = 0
  opacity = 0

  constructor(gridSize: number, bounds: Bounds) {
    this.gridSize = gridSize
    this.bounds = bounds
    this.reset()
  }

  /** 重新随机一条边、速度、长度、亮度，并把起点吸到网格线上。 */
  reset(): void {
    this.direction = Math.floor(Math.random() * 4)
    this.speed = 2 + 3 * Math.random()
    this.length = this.gridSize * (1 + 2 * Math.random())
    this.opacity = 0.6 + 0.4 * Math.random()
    // 起点落在边长的 20%~80% 区间内，再吸附到网格线上。
    const along = (value: number) => 0.2 * value + 0.6 * value * Math.random()

    switch (this.direction) {
      case 0: // 从下往上
        this.x = Math.floor(along(this.bounds.width) / this.gridSize) * this.gridSize
        this.y = this.bounds.height
        break
      case 1: // 从左往右
        this.x = 0
        this.y = Math.floor(along(this.bounds.height) / this.gridSize) * this.gridSize
        break
      case 2: // 从上往下
        this.x = Math.floor(along(this.bounds.width) / this.gridSize) * this.gridSize
        this.y = 0
        break
      default: // 从右往左
        this.x = this.bounds.width
        this.y = Math.floor(along(this.bounds.height) / this.gridSize) * this.gridSize
    }
  }

  update(): void {
    switch (this.direction) {
      case 0:
        this.y -= this.speed
        if (this.y + this.length < 0) this.reset()
        break
      case 1:
        this.x += this.speed
        if (this.x > this.bounds.width) this.reset()
        break
      case 2:
        this.y += this.speed
        if (this.y > this.bounds.height) this.reset()
        break
      default:
        this.x -= this.speed
        if (this.x + this.length < 0) this.reset()
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let tailX = this.x
    let tailY = this.y
    switch (this.direction) {
      case 0:
        tailY = this.y + this.length
        break
      case 1:
        tailX = this.x - this.length
        break
      case 2:
        tailY = this.y - this.length
        break
      default:
        tailX = this.x + this.length
    }

    const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY)
    gradient.addColorStop(0, `rgba(18, 229, 229, ${this.opacity})`)
    gradient.addColorStop(0.02, `rgba(18, 229, 229, ${0.8 * this.opacity})`)
    gradient.addColorStop(0.05, `rgba(255, 53, 26, ${0.6 * this.opacity})`)
    gradient.addColorStop(1, 'rgba(255, 53, 26, 0)')

    ctx.beginPath()
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(tailX, tailY)
    ctx.stroke()
  }
}

const canvasEl = ref<HTMLCanvasElement | null>(null)
let stop: (() => void) | null = null

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 网格离屏画布：只在尺寸变化时重画一次。
  const gridCanvas = document.createElement('canvas')
  const gridCtx = gridCanvas.getContext('2d')
  if (!gridCtx) return

  const bounds: Bounds = { width: 0, height: 0 }
  const meteors = Array.from(
    { length: METEOR_COUNT },
    () => new Meteor(GRID_SIZE, bounds),
  )

  const drawGrid = (scale: number) => {
    if (bounds.width === 0 || bounds.height === 0) {
      gridCanvas.width = 0
      gridCanvas.height = 0
      return
    }
    gridCanvas.width = Math.max(1, Math.round(bounds.width * scale))
    gridCanvas.height = Math.max(1, Math.round(bounds.height * scale))
    gridCtx.setTransform(scale, 0, 0, scale, 0, 0)
    gridCtx.clearRect(0, 0, bounds.width, bounds.height)
    gridCtx.strokeStyle = 'rgba(128, 128, 128, 0.1)'
    gridCtx.lineWidth = 1
    for (let x = 0; x < bounds.width; x += GRID_SIZE) {
      gridCtx.beginPath()
      gridCtx.moveTo(x, 0)
      gridCtx.lineTo(x, bounds.height)
      gridCtx.stroke()
    }
    for (let y = 0; y < bounds.height; y += GRID_SIZE) {
      gridCtx.beginPath()
      gridCtx.moveTo(0, y)
      gridCtx.lineTo(bounds.width, y)
      gridCtx.stroke()
    }
  }

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect()
    if (width === 0 || height === 0) {
      bounds.width = 0
      bounds.height = 0
      canvas.width = 0
      canvas.height = 0
      return
    }
    bounds.width = Math.round(width)
    bounds.height = Math.round(height)
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.max(1, Math.round(bounds.width * dpr))
    canvas.height = Math.max(1, Math.round(bounds.height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    drawGrid(dpr)
    for (const meteor of meteors) meteor.reset()
  }

  const observer =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(resize)
      : {
          observe: () => window.addEventListener('resize', resize),
          disconnect: () => window.removeEventListener('resize', resize),
        }
  observer.observe(canvas)
  resize()

  let frame = 0
  const tick = () => {
    ctx.clearRect(0, 0, bounds.width, bounds.height)
    if (gridCanvas.width > 0 && gridCanvas.height > 0) {
      ctx.drawImage(gridCanvas, 0, 0, bounds.width, bounds.height)
    }
    for (const meteor of meteors) {
      meteor.update()
      meteor.draw(ctx)
    }
    frame = window.requestAnimationFrame(tick)
  }
  tick()

  stop = () => {
    window.cancelAnimationFrame(frame)
    observer.disconnect()
  }
})

onBeforeUnmount(() => stop?.())
</script>

<template>
  <div class="rp-doc-bg" aria-hidden="true">
    <div class="rp-doc-bg__glow"></div>
    <div class="rp-doc-bg__frame"></div>
    <canvas ref="canvasEl" class="rp-doc-bg__canvas"></canvas>
  </div>
</template>
