<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { captureModel, type SwarmBox, type SwarmDup, type SwarmItem } from './capture'
import { SwarmSound } from './sound'

/**
 * 「群蜂重建」—— 对着 swarm-rebuild 扩展的真实源码 / 录屏复刻：
 *
 *   1. 画布瞬间切成页面底色，视口套一圈深色细边框；中央浮一个小立方体，
 *      HUD 显示「扫描中…」，一群彩色光标从屏外飞入围着立方体聚集。
 *   2. 建造语法是 Figma 的：十字光标拉框、选中框 + 白方块手柄 + 下方
 *      「W × H」徽章；容器先画灰色占位再交叉淡入真身；文字用 I 形光标
 *      逐字打出（新字带蓝色高亮）；同构块留白，等母块完成后由 dup 光标
 *      1:1 跟手拖拽复制过去（两红框 + 间距读数）。
 *   3. 镜头跟着施工前沿自动往下游览（HUD「游览中」）。
 *   4. 全部完成后交还真实页面，HUD 变成「N 个光标 · X.Xs 完成 · 重播 ·
 *      关闭」，光标聚成蜂群在页面上方盘旋。
 *
 * 光标是这套动画的灵魂，所以形状/热点/旋转/按压缩放全部照搬原版：
 *   div.cursor > svg 28×28，热点在 SVG 局部坐标，每帧
 *   transform = translate(-hx,-hy) rotate(angle) scale(1 - press*0.12)；
 *   方向随速度旋转（atan2(vy,vx)*180/PI + 128），速度 <30px/s 不更新。
 */

const props = defineProps<{ active: boolean }>()
const emit = defineEmits<{ (e: 'finish'): void }>()

const route = useRoute()

/* --- 模板引用与响应式 HUD 状态 --------------------------------------------- */
const visible = ref(false)
const fading = ref(false)
const doneState = ref(false)
const scanning = ref(false)
const status = ref('')
const doneCount = ref(0)
const total = ref(0)
const muted = ref(false)
const agentsCount = ref(0)
const agentDots = ref<string[]>([])
const finishSecs = ref('')
const canvasColor = ref('#f5f5f5')

const worldEl = ref<HTMLElement | null>(null)
const screenEl = ref<HTMLElement | null>(null)
const guideLayerEl = ref<HTMLElement | null>(null)
const cursorLayerEl = ref<HTMLElement | null>(null)

const progress = computed(() => (total.value ? (doneCount.value / total.value) * 100 : 0))

/* --- 光标形状（原版 swarm.js） --------------------------------------------- */

type CursorShape = 'arrow' | 'dup' | 'cross' | 'ibeam'

/** 原版那支箭头（viewBox 28×28，热点左上）。 */
const ARROW_D =
  'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 ' +
  'L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z'
const CURSOR_ST = 'stroke="#fff" stroke-width="1.5" stroke-linejoin="round"'
// I 形光标是「衬线 I」：上下两端的短横带圆弧收口（原版就是这个形状）。
const IBEAM_D =
  'M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 ' +
  'M12 6 V18 ' +
  'M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5'

/** 热点（SVG 局部坐标）：箭头的尖、十字/ I 形的中心。 */
const HOT: Record<CursorShape, [number, number]> = {
  arrow: [5, 3.5],
  dup: [5, 3.5],
  cross: [12, 12],
  ibeam: [12, 12],
}

/** 原版 12 色。 */
const COLORS = [
  '#F24E1E', '#A259FF', '#1ABCFE', '#0ACF83', '#FF7262', '#FFC700',
  '#9747FF', '#E8467C', '#14AE5C', '#0D99FF', '#FF8A00', '#00B5CE',
]

function cursorSVG(shape: CursorShape, color: string): string {
  const open = `<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">`
  const close = `</svg>`
  if (shape === 'cross') {
    // 视频里满屏的「＋」：白粗描边打底，彩色细线压在上面。
    return (
      open +
      `<path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>` +
      `<path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>` +
      close
    )
  }
  if (shape === 'ibeam') {
    return (
      open +
      `<path d="${IBEAM_D}" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>` +
      `<path d="${IBEAM_D}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>` +
      close
    )
  }
  if (shape === 'dup') {
    // 复制态：白色阴影箭头 + 彩色箭头，看起来像「抓起来的一份」。
    return (
      open +
      `<path d="${ARROW_D}" transform="translate(4 3.5)" fill="#fff" stroke="${color}" stroke-width="1.3" stroke-linejoin="round"/>` +
      `<path d="${ARROW_D}" fill="${color}" ${CURSOR_ST}/>` +
      close
    )
  }
  return open + `<path d="${ARROW_D}" fill="${color}" ${CURSOR_ST}/>` + close
}

/* --- 引擎内部状态（不进响应式系统，直接操作 DOM） -------------------------- */
interface Agent {
  el: HTMLDivElement
  svg: SVGSVGElement
  color: string
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  press: number
  shape: CursorShape
  tween: MoveTween | null
  /** 上一帧位置（用来算实际速度 → 决定要不要转向）。 */
  px: number
  py: number
  /** 只有聚拢/蜂群阶段才随速度转向；施工时角度会衰减回 0（和原版一致）。 */
  rot: boolean
  /** 蜂群体质（原版 makeCursor 的随机参数）：决定它飞多快、绕多开。 */
  speed: number
  force: number
  spin: number
  curl: number
  orbit: number
}

interface MoveOpts {
  speed?: number
  drag?: boolean
  bend?: number
  onStep?: (x: number, y: number) => void
}

interface MoveTween {
  fx: number
  fy: number
  tx: number
  ty: number
  start: number
  dur: number
  bend: number
  drag: boolean
  onStep?: (x: number, y: number) => void
  res: () => void
}

interface Tween {
  start: number
  dur: number
  ease: (t: number) => number
  on: (p: number) => void
  res: () => void
}

interface EditJob {
  /** 要重打的那条文字（副本文本条目，几何用它的）。 */
  edit: SwarmItem
  /** 拖拽体里对应的克隆节点。 */
  node: HTMLElement
  taken: boolean
  done: boolean
}

interface Task {
  item: SwarmItem
  taken: boolean
  done: boolean
  /** 副本任务的前置：母块子树的工单必须全部做完才能复制。 */
  dupDeps?: Task[]
  /** 正在帮忙的空闲光标数（同一块最多两只，免得一窝蜂）。 */
  helpers?: number
  /** 复制落位后要重打的差异文字：拆成小工单，空闲光标可以分头去干。 */
  edits?: EditJob[]
}

const sound = new SwarmSound()
let agents: Agent[] = []
let tasks: Task[] = []
let tweens: Tween[] = []
let raf = 0
let aborted = false
let building = false
let running = false
let startedAt = 0
let lastFrame = 0
const timeouts = new Set<number>()

/** 完成后的蜂群盘旋状态。 */
const flock = { active: false, hadPointer: false }
/** 鼠标位置与速度（视口坐标）：蜂群围绕它飞，靠得太近会把光标顶开。 */
const pointer = { x: 0, y: 0, on: false, px: 0, py: 0, vx: 0, vy: 0 }
/** 施工期覆盖层自己的滚动量（独立于真实页面，短页面也能一路向下游览）。 */
let viewY = 0
let viewMax = 0
/** 开演前用户所在的位置；完成后滚回这里。 */
let restoreY = 0

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const rand = (a: number, b: number) => a + Math.random() * (b - a)

function sleep(ms: number): Promise<void> {
  return new Promise((res) => {
    const id = window.setTimeout(() => {
      timeouts.delete(id)
      res()
    }, ms)
    timeouts.add(id)
  })
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/* --- 光标 ------------------------------------------------------------------- */

function createAgent(i: number): Agent {
  const color = COLORS[i % COLORS.length]
  const el = document.createElement('div')
  el.className = 'swarm-agent'
  el.innerHTML = cursorSVG('arrow', color)
  cursorLayerEl.value!.appendChild(el)
  const svg = el.querySelector('svg') as SVGSVGElement
  svg.style.transformOrigin = `${HOT.arrow[0]}px ${HOT.arrow[1]}px`
  // 原版 makeCursor：四分之一的「快光标」，其余慢一些 —— 蜂群里才有快慢层次。
  const fast = Math.random() < 0.25
  return {
    el,
    svg,
    color,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    press: 0,
    shape: 'arrow',
    tween: null,
    px: 0,
    py: 0,
    rot: true,
    speed: fast ? rand(1000, 1500) : rand(300, 750),
    force: fast ? rand(3500, 6000) : rand(700, 1800),
    spin: fast ? rand(2.2, 3.4) : rand(0.8, 1.8),
    curl: rand(-1, 1),
    orbit: rand(70, 170),
  }
}

function setShape(agent: Agent, shape: CursorShape) {
  if (agent.shape === shape) return
  agent.shape = shape
  agent.el.innerHTML = cursorSVG(shape, agent.color)
  agent.svg = agent.el.querySelector('svg') as SVGSVGElement
  agent.svg.style.transformOrigin = `${HOT[shape][0]}px ${HOT[shape][1]}px`
  applyAgent(agent)
}

function spawnAgents(count: number) {
  agents = []
  const layer = cursorLayerEl.value!
  layer.innerHTML = ''
  for (let i = 0; i < count; i++) {
    const agent = createAgent(i)
    const fromLeft = i % 2 === 0
    const x = fromLeft ? -60 - Math.random() * 120 : window.innerWidth + 60 + Math.random() * 120
    const y = Math.random() * window.innerHeight
    place(agent, x, y)
    agent.px = x
    agent.py = y
    agents.push(agent)
  }
  agentsCount.value = count
  // HUD 左侧叠放的「在场光标」色点（最多露 6 个，和扩展一致）。
  agentDots.value = COLORS.slice(0, Math.min(6, count))
}

/** 位置 + 光标姿态（热点位移、方向、按压缩放）。角度由 frame 每帧统一更新。 */
function applyAgent(agent: Agent) {
  agent.el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0)`
  const [hx, hy] = HOT[agent.shape]
  agent.svg.style.transform =
    `translate(${-hx}px, ${-hy}px) rotate(${agent.angle}deg) scale(${1 - agent.press * 0.12})`
}

function place(agent: Agent, x: number, y: number) {
  agent.x = x
  agent.y = y
  applyAgent(agent)
}

/** 原版的「按一下」：press 瞬间拉满，靠每帧衰减回弹。 */
async function click(agent: Agent) {
  agent.press = 1
  await sleep(70)
}

function moveTo(agent: Agent, x: number, y: number, o: MoveOpts = {}): Promise<void> {
  const dx = x - agent.x
  const dy = y - agent.y
  const dist = Math.hypot(dx, dy)
  if (dist < 2) {
    place(agent, x, y)
    o.onStep?.(x, y)
    return Promise.resolve()
  }
  const dur = (clamp(0.12 + Math.sqrt(dist) * 0.021, 0.14, 0.9) / (o.speed || 1)) * 1000
  const bend =
    o.bend !== undefined
      ? o.bend
      : (Math.random() < 0.5 ? -1 : 1) * rand(0.04, 0.14) * Math.min(dist, 600)
  return new Promise((res) => {
    agent.tween = {
      fx: agent.x,
      fy: agent.y,
      tx: x,
      ty: y,
      start: performance.now(),
      dur,
      bend,
      drag: Boolean(o.drag),
      onStep: o.onStep,
      res,
    }
  })
}

/* --- 坐标换算 ----------------------------------------------------------------- */

/**
 * 施工期的「镜头」偏移是独立于真实页面滚动的（见 viewY）。
 * 首页内容比原站的博客列表短，靠 `window.scrollTo` 只能滚到页面底部就停下；
 * 这里用覆盖层自己的滚动量，页面再短也能一路顺畅地往下推镜头。
 */
function viewportOf(item: { x: number; y: number; fixed: boolean }): { x: number; y: number } {
  return item.fixed
    ? { x: item.x, y: item.y }
    : { x: item.x - window.scrollX, y: item.y - viewY }
}

function toViewport(x: number, y: number, fixed: boolean): { x: number; y: number } {
  return fixed ? { x, y } : { x: x - window.scrollX, y: y - viewY }
}

function toDoc(x: number, y: number, fixed: boolean): { x: number; y: number } {
  return fixed ? { x, y } : { x: x + window.scrollX, y: y + viewY }
}

function layerOf(item: { fixed: boolean }): HTMLElement {
  return item.fixed ? screenEl.value! : worldEl.value!
}

/* --- 克隆构建 ----------------------------------------------------------------- */

function buildBoxNode(item: SwarmItem): { root: HTMLDivElement; fill: HTMLDivElement } {
  const cs = getComputedStyle(item.el)
  const root = document.createElement('div')
  root.className = 'swarm-node swarm-r'
  root.style.left = `${item.x}px`
  root.style.top = `${item.y}px`
  root.style.width = `${item.w}px`
  root.style.height = `${item.h}px`
  root.style.borderRadius = cs.borderRadius
  root.style.zIndex = String(item.depth * 10)

  const fill = document.createElement('div')
  fill.className = 'swarm-r__f'
  fill.style.backgroundColor = cs.backgroundColor
  fill.style.backgroundImage = cs.backgroundImage
  fill.style.backgroundSize = cs.backgroundSize
  fill.style.backgroundPosition = cs.backgroundPosition
  fill.style.backgroundRepeat = cs.backgroundRepeat
  fill.style.borderRadius = cs.borderRadius
  fill.style.borderTop = cs.borderTop
  fill.style.borderRight = cs.borderRight
  fill.style.borderBottom = cs.borderBottom
  fill.style.borderLeft = cs.borderLeft
  fill.style.boxShadow = cs.boxShadow
  fill.style.opacity = cs.opacity
  root.appendChild(fill)
  return { root, fill }
}

function buildTextNode(item: SwarmItem) {
  const cs = getComputedStyle(item.el)
  const root = document.createElement('div')
  root.className = 'swarm-node swarm-t'
  root.style.left = `${item.x}px`
  root.style.top = `${item.y}px`
  root.style.width = `${item.w}px`
  root.style.fontFamily = cs.fontFamily
  root.style.fontSize = cs.fontSize
  root.style.fontWeight = cs.fontWeight
  root.style.fontStyle = cs.fontStyle
  root.style.lineHeight = cs.lineHeight
  root.style.color = cs.color
  root.style.letterSpacing = cs.letterSpacing
  root.style.textAlign = cs.textAlign as typeof root.style.textAlign
  root.style.textTransform = cs.textTransform as typeof root.style.textTransform
  root.style.textDecoration = cs.textDecoration
  root.style.opacity = cs.opacity
  // 单行富文本行里单独定位的那截字：实测宽度差半像素就会折行，直接不折。
  if (item.nowrap) root.style.whiteSpace = 'pre'

  // 渐变字（`bg-clip-text text-transparent`）：渐变得涂在文字上，否则打出来
  // 的字是透明的、看起来像黑矩形。
  const clipsToText =
    cs.backgroundClip === 'text' ||
    (cs as unknown as { webkitBackgroundClip?: string }).webkitBackgroundClip === 'text'
  if (clipsToText) {
    root.style.backgroundImage = cs.backgroundImage
    root.style.backgroundSize = cs.backgroundSize
    root.style.backgroundPosition = cs.backgroundPosition
    root.style.backgroundRepeat = cs.backgroundRepeat
    root.style.backgroundClip = 'text'
    root.style.webkitBackgroundClip = 'text'
    root.style.color = 'transparent'
  }

  // 源元素自己截断文本（`line-clamp-*` / overflow hidden / 省略号），或被祖先
  // 裁剪过（跑马灯副本、轮播里没露出的那几组）：克隆必须限高，不然打出来的
  // 字会一直往下溢。
  if (item.clipped || item.clamped) {
    root.style.height = `${item.h}px`
    root.style.overflow = 'hidden'
  }

  const plain = document.createElement('span')
  plain.className = 'swarm-t__plain'
  const hot = document.createElement('span')
  hot.className = 'swarm-sa'
  const caret = document.createElement('span')
  caret.className = 'swarm-caret'
  root.append(plain, hot, caret)
  return { root, plain, hot, caret }
}

function buildMediaNode(item: SwarmItem): { root: HTMLDivElement; media: HTMLElement } {
  const el = item.el
  const cs = getComputedStyle(el)
  let media: HTMLElement | null = null

  if (el instanceof HTMLImageElement) {
    const c = document.createElement('img')
    c.src = el.currentSrc || el.src
    c.alt = ''
    media = c
  } else if (el instanceof HTMLVideoElement) {
    const c = document.createElement('video')
    c.muted = true
    c.autoplay = true
    c.loop = true
    c.playsInline = true
    const src = el.currentSrc || el.querySelector('source')?.src
    if (src) c.src = src
    media = c
  } else if (el instanceof HTMLCanvasElement) {
    const c = document.createElement('canvas')
    c.width = el.width
    c.height = el.height
    try {
      c.getContext('2d')?.drawImage(el, 0, 0)
    } catch {
      /* 跨域画布绘不出去就留空 */
    }
    media = c
  } else if (el instanceof SVGSVGElement) {
    const c = el.cloneNode(true) as SVGSVGElement
    c.setAttribute('width', '100%')
    c.setAttribute('height', '100%')
    // 站内小图标都是 `fill="currentColor"`，克隆体脱离原父级后要把算好的
    // 颜色带上，否则会退回画布默认色。
    c.style.color = cs.color
    media = c as unknown as HTMLElement
  }
  if (!media) return { root: document.createElement('div'), media: document.createElement('div') }

  const root = document.createElement('div')
  root.className = 'swarm-node swarm-r swarm-md'
  root.style.left = `${item.x}px`
  root.style.top = `${item.y}px`
  root.style.width = `${item.w}px`
  root.style.height = `${item.h}px`
  root.style.borderRadius = cs.borderRadius
  root.style.zIndex = String(item.depth * 10 + 3)

  media.classList.add('swarm-md__media')
  media.style.width = '100%'
  media.style.height = '100%'
  media.style.objectFit = cs.objectFit
  media.style.borderRadius = cs.borderRadius
  media.style.boxShadow = cs.boxShadow
  media.style.mixBlendMode = cs.mixBlendMode
  // 滤镜要跟着走：首屏视频靠 `filter: invert(1)` 在浅色主题下翻成白天画面，
  // 克隆漏掉这一步的话，重建出来的那一帧又会是夜景原片。
  if (cs.filter && cs.filter !== 'none') media.style.filter = cs.filter
  media.style.display = 'block'
  root.appendChild(media)
  return { root, media }
}

/* --- 选中框（蓝色描边 + 4 角白手柄 + 下方 W×H 徽章） ---------------------------- */

function makeOutline(box: SwarmBox, z: number, handles = true, withBadge = true) {
  const root = document.createElement('div')
  root.className = 'swarm-outline'
  root.style.left = `${box.x}px`
  root.style.top = `${box.y}px`
  root.style.width = `${box.w}px`
  root.style.height = `${box.h}px`
  root.style.zIndex = String(z)
  if (handles) {
    // 原版只有四角手柄。
    for (let i = 0; i < 4; i++) root.appendChild(document.createElement('i'))
  }
  const badge = document.createElement('span')
  badge.className = 'swarm-badge'
  // 原版只在宽度 > 0 时才画徽章；纯框（文字编辑态）根本不带徽章。
  if (!withBadge || box.w <= 0) badge.style.display = 'none'
  else badge.textContent = `${Math.round(box.w)} × ${Math.round(box.h)}`
  root.appendChild(badge)
  return { root, badge }
}

function setOutlineSize(o: { root: HTMLElement; badge: HTMLElement }, w: number, h: number) {
  o.root.style.width = `${w}px`
  o.root.style.height = `${h}px`
  if (w > 0) {
    o.badge.style.display = ''
    o.badge.textContent = `${Math.round(w)} × ${Math.round(h)}`
  } else {
    o.badge.style.display = 'none'
  }
}

/** 瞬态参考线：大容器给横向蓝色测量线，其余概率闪红色对齐线。 */
function flashGuides(item: SwarmItem) {
  const g = guideLayerEl.value
  if (!g || item.fixed) return
  const v = viewportOf(item)
  if (item.w > window.innerWidth * 0.45 || item.h > 260) {
    const line = document.createElement('div')
    line.className = 'swarm-gline-h'
    line.style.top = `${v.y}px`
    const badge = document.createElement('span')
    badge.className = 'swarm-badge swarm-badge--big'
    badge.textContent = `${Math.round(item.w)} × ${Math.round(item.h)}`
    badge.style.top = `${Math.max(6, v.y - 26)}px`
    g.append(line, badge)
    const id = window.setTimeout(() => {
      timeouts.delete(id)
      line.remove()
      badge.remove()
    }, 620)
    timeouts.add(id)
  } else if (Math.random() < 0.3) {
    const line = document.createElement('div')
    line.className = 'swarm-gline-v'
    line.style.left = `${v.x}px`
    g.appendChild(line)
    const id = window.setTimeout(() => {
      timeouts.delete(id)
      line.remove()
    }, 400)
    timeouts.add(id)
  }
}

/* --- 复制（alt-drag） -------------------------------------------------------- */

function makeStaticNode(item: SwarmItem, text?: string): HTMLElement | null {
  if (item.kind === 'text') {
    const t = buildTextNode(item)
    t.plain.textContent = text ?? item.text
    // 保留高亮层：落位后差异文字要在这里重打（caret 不需要，去掉）。
    t.hot.textContent = ''
    t.caret.remove()
    t.root.style.zIndex = String(item.depth * 10 + 5)
    return t.root
  }
  if (item.kind === 'image') {
    const b = buildMediaNode(item)
    b.root.classList.add('is-on')
    return b.root
  }
  const b = buildBoxNode(item)
  b.root.classList.add('is-on')
  return b.root
}

/**
 * 拖拽体：**副本的几何 + 母块的内容**（原版 dst item 是 mode="master"）。
 * 起始时整体压在源块上，跟手拖到落位后偏移归零。
 */
function buildGhost(d: SwarmDup) {
  const ghost = document.createElement('div')
  ghost.className = 'swarm-ghost'
  const nodes = new Map<SwarmItem, HTMLElement>()
  let ti = 0
  for (const it of d.srcItems) {
    if (it.anchor) continue
    const override = it.kind === 'text' ? d.masterTexts[ti++] : undefined
    const node = makeStaticNode(it, override)
    if (!node) continue
    nodes.set(it, node)
    ghost.appendChild(node)
  }
  return { ghost, nodes }
}

/** 复制时的红框：1px 纯描边，没有手柄也没有尺寸徽章（原版就是这样）。 */
function makeGuideBox(box: SwarmBox) {
  const root = document.createElement('div')
  root.className = 'swarm-outline swarm-outline--red'
  root.style.left = `${box.x}px`
  root.style.top = `${box.y}px`
  root.style.width = `${box.w}px`
  root.style.height = `${box.h}px`
  return root
}

/**
 * 两个框之间的间距读数 —— 完全照原版 `spacing()`：
 * 先看两块在 y 上有没有重叠（有 → 横向间距），否则看 x 上有没有重叠（纵向间距）；
 * 读数沿测量线摆放（横向在线下 8px，纵向在线右侧 18px）。
 */
function gapBetween(
  a: SwarmBox,
  b: SwarmBox,
): { text: string; x: number; y: number; horiz: boolean } | null {
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  if (oy > 0) {
    const y = Math.max(a.y, b.y) + oy / 2
    const [l, r] = a.x < b.x ? [a, b] : [b, a]
    const gap = r.x - (l.x + l.w)
    if (gap > 0) return { text: `${Math.round(gap)}`, x: (l.x + l.w + r.x) / 2, y: y + 8, horiz: true }
  } else if (ox > 0) {
    const x = Math.max(a.x, b.x) + ox / 2
    const [t, btm] = a.y < b.y ? [a, b] : [b, a]
    const gap = btm.y - (t.y + t.h)
    if (gap > 0) return { text: `${Math.round(gap)}`, x: x + 18, y: (t.y + t.h + btm.y) / 2 - 9, horiz: false }
  }
  return null
}

function makeGapLabel() {
  const el = document.createElement('div')
  el.className = 'swarm-gap'
  return el
}

function updateGap(el: HTMLElement, a: SwarmBox, b: SwarmBox) {
  const g = gapBetween(a, b)
  if (!g) {
    el.style.opacity = '0'
    return
  }
  el.style.opacity = '1'
  el.textContent = g.text
  el.style.left = `${g.x}px`
  el.style.top = `${g.y}px`
}

/** 逐字打字：新字带蓝色高亮（最近 3 个字），caret 用 currentColor。 */
async function typeText(
  agent: Agent,
  item: SwarmItem,
  parts: { plain: HTMLElement; hot: HTMLElement; caret: HTMLElement },
) {
  const totalChars = Math.max(1, item.text.length)
  const k = clamp(70 / totalChars, 0.06, 1)
  for (const ch of item.text) {
    if (aborted) return
    parts.hot.textContent += ch
    while (parts.hot.textContent.length > 3) {
      parts.plain.textContent += parts.hot.textContent[0]
      parts.hot.textContent = parts.hot.textContent.slice(1)
    }
    if (ch === ' ') sound.space()
    else if (Math.random() < 0.55) sound.clack()
    let d = rand(12, 40)
    if (ch === ' ') d += rand(0, 30)
    if (ch === '\n') d += 100
    if (Math.random() < 0.025) d += rand(80, 200)
    await sleep(d * k)
    // 打字期间页面可能还在缓滚，光标贴着插入点走。
    const p = viewportOf(item)
    place(agent, p.x + 1, p.y + Math.min(item.h * 0.5, 18))
  }
  parts.plain.textContent += parts.hot.textContent
  parts.hot.textContent = ''
  parts.caret.remove()
}

/**
 * 复制任务（核心）：
 *   选最近已完成源 → 块内抓取点 → dup 光标 → 选中框 → 两红框 + 间距读数
 *   → 1:1 跟手拖动 → 弹性落位 → 新块选中框停留 → 差异文字重打。
 */
async function dupTask(agent: Agent, task: Task) {
  const { item } = task
  const d = item.dup!
  const fixed = item.fixed
  const layer = layerOf(item)

  // 1. 最近一个已完成的同组位置（母块或相邻副本），形成链式复制。
  let src = d.group[0]
  let best = Infinity
  for (const s of d.group) {
    if (!s.done) continue
    const dd = Math.hypot(s.box.x - d.dstBox.x, s.box.y - d.dstBox.y)
    if (dd < best) {
      best = dd
      src = s
    }
  }
  const sb = src.box

  // 2. 块内偏左上的抓取点（不是角），带一点抖动 —— 箭头光标飞过去。
  const gx = sb.x + Math.min(sb.w * 0.45, 70) + rand(-8, 8)
  const gy = sb.y + Math.min(sb.h * 0.45, 30) + rand(-4, 4)
  setShape(agent, 'arrow')
  const gv = toViewport(gx, gy, fixed)
  await moveTo(agent, gv.x, gv.y, { bend: 0 })
  if (aborted) return

  // 3. 按一下 → 源块蓝框（手柄 + 尺寸徽章）。
  await click(agent)
  if (aborted) return
  const sel = makeOutline(sb, item.depth * 10 + 8)
  sel.badge.textContent = `${Math.round(sb.w)} × ${Math.round(sb.h)}`
  layer.appendChild(sel.root)
  await sleep(rand(80, 160))
  if (aborted) {
    sel.root.remove()
    return
  }

  // 4. 切到「抓起一份」的光标，停一下，再按住开始拖。
  setShape(agent, 'dup')
  await sleep(70)
  if (aborted) {
    sel.root.remove()
    return
  }
  agent.press = 1

  // 5. 拖拽体压在源块上；蓝框让位给两红框 + 间距读数。
  const { ghost, nodes } = buildGhost(d)
  const ox = sb.x - d.dstBox.x
  const oy = sb.y - d.dstBox.y
  ghost.style.transform = `translate3d(${ox}px, ${oy}px, 0)`
  ghost.style.zIndex = String(item.depth * 10 + 2)
  layer.appendChild(ghost)

  const srcBoxEl = makeGuideBox(sb)
  const dstBoxEl = makeGuideBox(d.dstBox)
  // 起步时拖拽体正压在原块上，两个红框重合 → 先不显示间距读数。
  dstBoxEl.style.left = `${sb.x}px`
  dstBoxEl.style.top = `${sb.y}px`
  const gapEl = makeGapLabel()
  layer.append(srcBoxEl, dstBoxEl, gapEl)
  updateGap(gapEl, sb, sb)
  sel.root.remove()

  // 6. 1:1 跟手拖动（位移直接等于光标位移），红框跟着拖拽体走。
  const endV = toViewport(gx + (d.dstBox.x - sb.x), gy + (d.dstBox.y - sb.y), fixed)
  await moveTo(agent, endV.x, endV.y, {
    // 原版是 speed 0.6 × 全局 tempo（2.1~4.5）≈ 1.3~2.7；这里取 1.15，
    // 拖拽约 0.15~0.2s，和录屏里那一下跟手的「复制」手感一致。
    speed: 1.15,
    drag: true,
    bend: 0,
    onStep: (cx, cy) => {
      const cp = toDoc(cx, cy, fixed)
      const dx = ox + (cp.x - gx)
      const dy = oy + (cp.y - gy)
      ghost.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      dstBoxEl.style.left = `${d.dstBox.x + dx}px`
      dstBoxEl.style.top = `${d.dstBox.y + dy}px`
      updateGap(gapEl, sb, {
        x: d.dstBox.x + dx,
        y: d.dstBox.y + dy,
        w: d.dstBox.w,
        h: d.dstBox.h,
      })
    },
  })
  if (aborted) {
    ghost.remove()
    srcBoxEl.remove()
    dstBoxEl.remove()
    gapEl.remove()
    return
  }

  // 7. 落位：`.3s cubic-bezier(.2,.8,.2,1)` 平移归零（原版 settle），复制音效。
  ghost.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
  ghost.style.transform = 'translate3d(0px, 0px, 0)'
  sound.dup(clamp((item.x - window.scrollX) / window.innerWidth - 0.5, -0.8, 0.8))
  gapEl.remove()
  srcBoxEl.classList.add('swarm-outline--fade')
  dstBoxEl.classList.add('swarm-outline--fade')
  const gid = window.setTimeout(() => {
    timeouts.delete(gid)
    srcBoxEl.remove()
    dstBoxEl.remove()
  }, 260)
  timeouts.add(gid)

  await sleep(100)
  if (aborted) return
  setShape(agent, 'arrow')
  const sel2 = makeOutline(d.dstBox, item.depth * 10 + 8)
  sel2.badge.textContent = `${Math.round(d.dstBox.w)} × ${Math.round(d.dstBox.h)}`
  layer.appendChild(sel2.root)
  await sleep(350)
  if (aborted) {
    sel2.root.remove()
    return
  }
  sel2.root.classList.add('swarm-outline--fade')
  const sid = window.setTimeout(() => {
    timeouts.delete(sid)
    sel2.root.remove()
  }, 280)
  timeouts.add(sid)

  // 8. 与母块内容不同的文字：双击选中 → 清空 → 重新逐字打出（原版 editText）。
  //    每条文字拆成一张「小工单」：主光标干完一条，空闲光标可以抢下一条，
  //    最后一张卡片的几行字就不会全压在同一个光标身上、拖住整段进度。
  const jobs: EditJob[] = []
  for (const edit of d.edits) {
    const node = nodes.get(edit)
    if (node) jobs.push({ edit, node, taken: false, done: false })
  }
  task.edits = jobs
  await finishEdits(agent, task, layer)

  d.slot.done = true
}

/** 抢一条还没人做的「重打文字」小工单（主光标和帮手共用一个队列）。 */
function takeEdit(task: Task): EditJob | undefined {
  const job = task.edits?.find((j) => !j.taken && !j.done)
  if (!job) return undefined
  job.taken = true
  return job
}

/** 重打一条文字：双击定位 → 全选 → 清空 → 逐字打出 → 带手柄的选中框 + 下划线。 */
async function typeEdit(agent: Agent, job: EditJob, layer: HTMLElement) {
  const { edit, node } = job
  const v = viewportOf(edit)
  setShape(agent, 'arrow')
  await moveTo(
    agent,
    v.x + Math.min(edit.w * 0.5, 50) + rand(-5, 5),
    v.y + Math.min(edit.h, 30) * 0.55,
    { bend: 0 },
  )
  if (aborted) return
  // 双击：第一下定位，第二下全选。
  await click(agent)
  await sleep(80)
  await click(agent)
  node.classList.add('swarm-t--sel')
  const ob = { x: edit.x, y: edit.y, w: edit.w, h: edit.h }
  // 编辑中的框：没有手柄、没有徽章（原版 `{t:"box", b}`）。
  const o = makeOutline(ob, edit.depth * 10 + 8, false, false)
  layer.appendChild(o.root)
  await sleep(rand(120, 220))
  if (aborted) {
    o.root.remove()
    return
  }
  node.classList.remove('swarm-t--sel')
  const plain = node.querySelector<HTMLElement>('.swarm-t__plain')
  const hot = node.querySelector<HTMLElement>('.swarm-sa')
  if (!plain || !hot) {
    o.root.remove()
    job.done = true
    return
  }
  plain.textContent = ''
  hot.textContent = ''
  let caret = node.querySelector<HTMLElement>('.swarm-caret')
  if (!caret) {
    caret = document.createElement('span')
    caret.className = 'swarm-caret'
    node.appendChild(caret)
  }
  setShape(agent, 'ibeam')
  await typeText(agent, edit, { plain, hot, caret })
  setShape(agent, 'arrow')
  await sleep(70)
  if (aborted) {
    o.root.remove()
    return
  }
  // 打字结束换成带手柄的选中框（含文字下划线），停 0.3s 再收。
  o.root.classList.add('swarm-outline--fade')
  const o2 = makeOutline(ob, edit.depth * 10 + 8)
  const ul = document.createElement('span')
  ul.className = 'swarm-underline'
  const cs = getComputedStyle(edit.el)
  const fs = parseFloat(cs.fontSize) || 14
  const lh = parseFloat(cs.lineHeight) || fs * 1.4
  ul.style.top = `${lh * 0.5 + fs * 0.42}px`
  ul.style.width = `${Math.min(ob.w, edit.w)}px`
  o2.root.appendChild(ul)
  layer.appendChild(o2.root)
  const tid = window.setTimeout(() => {
    timeouts.delete(tid)
    o.root.remove()
  }, 280)
  timeouts.add(tid)
  await sleep(300)
  if (aborted) {
    o2.root.remove()
    return
  }
  o2.root.classList.add('swarm-outline--fade')
  const tid2 = window.setTimeout(() => {
    timeouts.delete(tid2)
    o2.root.remove()
  }, 280)
  timeouts.add(tid2)
  job.done = true
}

/** 主光标把剩下的编辑工单做完；等待期间，抢不到工单的空闲光标会来分担。 */
async function finishEdits(agent: Agent, task: Task, layer: HTMLElement) {
  while (!aborted) {
    const job = takeEdit(task)
    if (job) {
      await typeEdit(agent, job, layer)
      continue
    }
    if (!task.edits || task.edits.every((j) => j.done)) return
    await sleep(80)
  }
}

/* --- 任务执行 ----------------------------------------------------------------- */

/** box / image：十字光标飞到左上角 → 按住拉出框 → 灰色占位 → 交叉淡入真身。 */
async function boxTask(agent: Agent, task: Task) {
  const { item } = task
  const isImg = item.kind === 'image'
  setShape(agent, 'cross')
  const p0 = viewportOf(item)
  await Promise.all([
    moveTo(agent, p0.x, p0.y, { bend: 0 }),
    isImg ? ensureImage(item) : Promise.resolve(),
  ])
  if (aborted) return
  agent.press = 1
  sound.press()

  const layer = layerOf(item)
  const built = isImg ? buildMediaNode(item) : buildBoxNode(item)
  built.root.style.width = '0px'
  built.root.style.height = '0px'
  const o = makeOutline({ x: item.x, y: item.y, w: 0, h: 0 }, item.depth * 10 + 8)
  layer.append(built.root, o.root)
  flashGuides(item)

  // 右下角终点：贴近视口右边时钳制（原版会收窄到右侧 30px 内）。
  let ex = p0.x + item.w
  let ey = p0.y + item.h
  const right = window.innerWidth - 16
  if (ex > right) ex = Math.max(p0.x + Math.min(item.w, 40), window.innerWidth - 30)
  const end = { x: Math.min(ex, window.innerWidth - 10), y: Math.min(ey, window.innerHeight - 10) }

  let w = 0
  let h = 0
  const grow = (cx: number, cy: number) => {
    const v = viewportOf(item)
    w = clamp(cx - v.x, 0, item.w)
    h = clamp(cy - v.y, 0, item.h)
    built.root.style.width = `${w}px`
    built.root.style.height = `${h}px`
    setOutlineSize(o, w, h)
  }
  await moveTo(agent, end.x, end.y, { speed: 0.75, drag: true, bend: 0, onStep: grow })
  if (aborted) {
    built.root.remove()
    o.root.remove()
    return
  }

  // 没拖满的余量用 easeOut 补满。
  if (w < item.w || h < item.h) {
    const fw = w
    const fh = h
    await tween(
      500,
      (t) => {
        w = fw + (item.w - fw) * t
        h = fh + (item.h - fh) * t
        built.root.style.width = `${w}px`
        built.root.style.height = `${h}px`
        setOutlineSize(o, w, h)
      },
      easeOut,
    )
  }
  if (aborted) {
    built.root.remove()
    o.root.remove()
    return
  }
  built.root.style.width = `${item.w}px`
  built.root.style.height = `${item.h}px`
  setOutlineSize(o, item.w, item.h)

  setShape(agent, 'arrow')
  await sleep(rand(180, 300))
  if (aborted) {
    built.root.remove()
    o.root.remove()
    return
  }

  // 灰色占位 → 真身：填充层交叉淡入 / 媒体自上而下擦出。
  built.root.classList.add('is-on')
  if ('media' in built && built.media instanceof HTMLVideoElement) {
    void built.media.play().catch(() => {})
  }
  const area01 = clamp((item.w * item.h) / (window.innerWidth * window.innerHeight), 0, 1)
  const x01 = clamp((item.x + item.w / 2) / window.innerWidth, 0, 1)
  sound.place(area01, x01)

  await sleep(isImg ? 500 : 350)
  if (aborted) return
  o.root.classList.add('swarm-outline--fade')
  const id = window.setTimeout(() => {
    timeouts.delete(id)
    o.root.remove()
  }, 280)
  timeouts.add(id)
}

/** text：十字光标拉出文本框 → I 形光标逐字打出。 */
async function textTask(agent: Agent, task: Task) {
  const { item } = task
  const cs = getComputedStyle(item.el)
  const fs = parseFloat(cs.fontSize) || 14
  const lh = parseFloat(cs.lineHeight) || fs * 1.4
  const p0 = viewportOf(item)
  const single = item.w < 140 && item.h <= lh * 1.5

  setShape(agent, 'cross')
  await moveTo(agent, p0.x, p0.y + Math.min(lh, item.h) * 0.55, { bend: 0 })
  if (aborted) return
  agent.press = 1
  sound.press()

  const layer = layerOf(item)
  const node = buildTextNode(item)
  node.root.style.zIndex = String(item.depth * 10 + 5)
  layer.appendChild(node.root)

  let o: { root: HTMLElement; badge: HTMLElement } | null = null
  if (!single) {
    // 大段文字：先拉出量好的文本框（带手柄 + 尺寸徽章）。
    o = makeOutline({ x: item.x, y: item.y, w: 0, h: 0 }, item.depth * 10 + 8)
    layer.appendChild(o.root)
    await moveTo(agent, p0.x + item.w, p0.y + item.h, {
      speed: 0.75,
      drag: true,
      bend: 0,
      onStep: (cx, cy) => {
        const v = viewportOf(item)
        setOutlineSize(o!, clamp(cx - v.x, 0, item.w), clamp(cy - v.y, 0, item.h))
      },
    })
    if (aborted) {
      node.root.remove()
      o.root.remove()
      return
    }
    setOutlineSize(o, item.w, item.h)
    await sleep(rand(120, 200))
    if (aborted) {
      node.root.remove()
      o.root.remove()
      return
    }
  } else {
    await click(agent)
  }

  setShape(agent, 'ibeam')
  await typeText(agent, item, node)
  if (aborted) {
    node.root.remove()
    o?.root.remove()
    return
  }
  setShape(agent, 'arrow')
  await sleep(rand(60, 120))
  if (o) {
    o.root.classList.add('swarm-outline--fade')
    const id = window.setTimeout(() => {
      timeouts.delete(id)
      o!.root.remove()
    }, 280)
    timeouts.add(id)
  }
}

/* --- 调度 --------------------------------------------------------------------- */

function frontier(): number {
  return viewY + window.innerHeight * 1.15
}

/** 取最靠上的可做工单（依赖：y 进入滚动前沿）。taken 同步置位，多光标不会撞单。 */
function pickTask(): Task | undefined {
  let best: Task | undefined
  for (const t of tasks) {
    if (t.done || t.taken) continue
    // 副本必须等母块整棵子树建完，才允许被复制。
    if (t.dupDeps && !t.dupDeps.every((d) => d.done)) continue
    if (!t.item.fixed && t.item.y > frontier()) continue
    if (
      !best ||
      t.item.y < best.item.y ||
      (t.item.y === best.item.y && t.item.depth < best.item.depth)
    ) {
      best = t
    }
  }
  return best
}

/* --- 空闲光标：帮同伴 / 围着成品游走 ------------------------------------------- */

/**
 * 施工期不让光标「站桩」：
 *   · 同伴手上还有大块没做完 → 飞过去帮一把：用**自己的颜色**拉一个虚线选中框，
 *     亮一下尺寸徽章再收掉（等于替同伴校一遍尺寸）。同一块最多两只来帮。
 *   · 没有可帮的 → 在已经建好的块附近游走：随机挑一块、随机挑个边，慢悠悠飘
 *     过去，偶尔按一下鼠标，像一群设计师在页面上来回打量。
 */
function pickAssist(): Task | undefined {
  const pool: Task[] = []
  for (const t of tasks) {
    if (!t.taken || t.done || (t.helpers ?? 0) >= 2) continue
    if (t.item.fixed || t.item.w < 40 || t.item.h < 24) continue
    const v = viewportOf(t.item)
    if (v.y + t.item.h < 20 || v.y > window.innerHeight - 20) continue
    pool.push(t)
  }
  if (!pool.length) return undefined
  return pool[Math.floor(Math.random() * pool.length)]
}

async function assistTask(agent: Agent, task: Task) {
  task.helpers = (task.helpers ?? 0) + 1
  const it = task.item
  const v = viewportOf(it)
  // 站在框外侧更宽敞的一边，再把虚线框「拉」出来。
  const onRight = v.x + it.w + 40 < window.innerWidth
  const tx = clamp(onRight ? v.x + it.w + 22 : v.x - 22, 18, window.innerWidth - 18)
  const ty = clamp(v.y + rand(0.15, 0.85) * it.h, 18, window.innerHeight - 18)
  setShape(agent, 'cross')
  await moveTo(agent, tx, ty, { speed: 0.95, bend: 0 })
  if (aborted) return
  agent.press = 1
  sound.press()

  const o = makeOutline({ x: it.x, y: it.y, w: it.w, h: it.h }, it.depth * 10 + 6, true, it.w > 48)
  o.root.classList.add('swarm-outline--help')
  o.root.style.borderColor = agent.color
  for (const handle of Array.from(o.root.querySelectorAll('i'))) {
    ;(handle as HTMLElement).style.borderColor = agent.color
  }
  o.badge.style.background = agent.color
  layerOf(it).appendChild(o.root)

  await sleep(rand(240, 420))
  if (aborted) {
    o.root.remove()
    return
  }
  o.root.classList.add('swarm-outline--fade')
  const id = window.setTimeout(() => {
    timeouts.delete(id)
    o.root.remove()
  }, 280)
  timeouts.add(id)
  setShape(agent, 'arrow')
  task.helpers = Math.max(0, (task.helpers ?? 1) - 1)
}

/** 挑一个「已完成、还在视口里」的块，在它周围随机一个点。 */
function roamPoint(): { x: number; y: number } {
  const pool: { x: number; y: number; w: number; h: number }[] = []
  for (const t of tasks) {
    if (!t.done || t.item.fixed) continue
    const v = viewportOf(t.item)
    if (v.y + t.item.h < 40 || v.y > window.innerHeight - 40) continue
    pool.push({ x: v.x, y: v.y, w: t.item.w, h: t.item.h })
  }
  let cx = window.innerWidth / 2
  let cy = window.innerHeight * 0.55
  if (pool.length) {
    const s = pool[Math.floor(Math.random() * pool.length)]
    cx = s.x + s.w / 2
    cy = s.y + s.h / 2
  }
  return {
    x: clamp(cx + rand(-170, 170), 24, window.innerWidth - 24),
    y: clamp(cy + rand(-120, 120), 24, window.innerHeight - 24),
  }
}

async function roam(agent: Agent) {
  const p = roamPoint()
  setShape(agent, Math.random() < 0.25 ? 'cross' : 'arrow')
  await moveTo(agent, p.x, p.y, {
    speed: rand(0.4, 0.85),
    bend: (Math.random() < 0.5 ? -1 : 1) * rand(24, 80),
  })
  if (aborted) return
  if (Math.random() < 0.3) {
    agent.press = 1
    await sleep(rand(50, 90))
  }
  setShape(agent, 'arrow')
  await sleep(rand(40, 180))
}

async function agentLoop(agent: Agent) {
  while (!aborted) {
    const task = pickTask()
    if (!task) {
      if (tasks.every((t) => t.done)) break
      const help = pickAssist()
      if (help) {
        // 有同伴正在收尾复制块：先接一条「重打文字」的活（真正的帮忙），
        // 没有再飞过去拉个虚线框表示协同。
        const job = takeEdit(help)
        if (job) await typeEdit(agent, job, layerOf(help.item))
        else await assistTask(agent, help)
      } else await roam(agent)
      continue
    }
    task.taken = true
    if (task.item.dup) await dupTask(agent, task)
    else if (task.item.kind === 'text') await textTask(agent, task)
    else await boxTask(agent, task)
    setShape(agent, 'arrow')
    task.done = true
    doneCount.value++
  }
}

/**
 * tour 滚动：不再「等某一层做完才挪一格」，而是按**整体进度**平滑地往下走 ——
 * 建到多少，镜头就滚到多少（`viewMax × 完成比例`）。帧循环再用一个长时间常数
 * 的追值把进度台阶抹平，所以镜头是一路匀速下移，不会停一下、窜一下。
 */
function scrollTarget(): number {
  const p = total.value ? doneCount.value / total.value : 0
  return clamp(viewMax * p, 0, viewMax)
}

/* --- 帧循环：推进补间、光标、滚动、世界层、蜂群 ---------------------------------- */

function tween(
  dur: number,
  on: (p: number) => void,
  ease: (t: number) => number = easeInOut,
): Promise<void> {
  return new Promise((res) => {
    tweens.push({ start: performance.now(), dur, ease, on, res })
  })
}

/** 没有鼠标时的航点：屏幕中线附近一条很慢的利萨如轨迹（原版 flockTarget）。 */
function driftTarget(t: number): { x: number; y: number } {
  return {
    x: window.innerWidth * (0.5 + 0.28 * Math.sin(t * 0.37)),
    y: window.innerHeight * (0.5 + 0.25 * Math.sin(t * 0.53 + 1)),
  }
}

/**
 * 蜂群：照搬原版 `follow()` 的 boids 轨道，不是「抱成一坨」的刚体环。
 *   · 目标 = 鼠标；没有鼠标时围绕上面那条漂移轨迹；
 *   · 半径 R ≈ 135px（还会正弦呼吸 ±18%），每只光标按自己的 `orbit` 偏移，
 *     再叠三个花瓣形的起伏（`sin(3θ + t)`），所以它们是一圈松散、流动的云；
 *   · 彼此 90px 内做速度对齐（邻居越近权重越大），再按距离限制速度与加速度；
 *   · 鼠标 48px 内的光标会被直接顶到圈外，并按**相对速度**反弹一下 ——
 *     鼠标快速扫过时蜂群会被推开、再慢慢绕回来（视频里那下互动）。
 */
function flockStep(now: number, dt: number) {
  const t = now / 1000
  const target = pointer.on ? { x: pointer.x, y: pointer.y } : driftTarget(t)

  // 鼠标速度（用于碰撞时的相对速度反弹）。
  if (pointer.on) {
    if (flock.hadPointer && dt > 0) {
      const k = Math.min(1, dt * 18)
      pointer.vx += ((pointer.x - pointer.px) / dt - pointer.vx) * k
      pointer.vy += ((pointer.y - pointer.py) / dt - pointer.vy) * k
    }
    pointer.px = pointer.x
    pointer.py = pointer.y
    flock.hadPointer = true
  } else {
    flock.hadPointer = false
    pointer.vx = 0
    pointer.vy = 0
  }

  const n = agents.length
  const R = 135 * (1 + 0.18 * Math.sin(t * 0.55))
  const swirl = Math.tanh(Math.cos(t * 0.11) * 3)
  const wantX: number[] = []
  const wantY: number[] = []
  for (let i = 0; i < n; i++) {
    const c = agents[i]
    const vx = c.x - target.x
    const vy = c.y - target.y
    const d = Math.hypot(vx, vy) || 0.01
    const nx = vx / d
    const ny = vy / d
    const ang = Math.atan2(vy, vx)
    const rr = R * (1 + 0.3 * Math.sin(3 * ang + t * 0.7)) + (c.orbit - 120) * 0.55
    const tang = 300 * (0.7 + c.spin * 0.2) * swirl
    const rad = clamp((rr - d) * 4, -2600, 1400)
    const far = Math.min(1, Math.max(0, (d - rr) / 600))
    wantX.push(-ny * tang + nx * rad - ny * c.curl * 400 * far)
    wantY.push(nx * tang + ny * rad + nx * c.curl * 400 * far)
  }

  for (let i = 0; i < n; i++) {
    const c = agents[i]
    let ax = 0
    let ay = 0
    let wsum = 0
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const q = agents[j]
      const d = Math.hypot(q.x - c.x, q.y - c.y)
      if (d > 90) continue
      const w = 1 - d / 90
      ax += q.vx * w
      ay += q.vy * w
      wsum += w
    }
    let fx = wantX[i]
    let fy = wantY[i]
    if (wsum > 0) {
      fx = fx * 0.7 + (ax / wsum) * 0.3
      fy = fy * 0.7 + (ay / wsum) * 0.3
    }
    const dist = Math.max(0, Math.hypot(c.x - target.x, c.y - target.y) - 180)
    const maxV = c.speed * (1.3 + Math.min(3.2, dist / 90))
    const L = Math.hypot(fx, fy)
    if (L > maxV) {
      fx *= maxV / L
      fy *= maxV / L
    }
    let gx = (fx - c.vx) * 6
    let gy = (fy - c.vy) * 6
    const maxF = c.force * (1.4 + Math.min(5, dist / 50))
    const G = Math.hypot(gx, gy)
    if (G > maxF) {
      gx *= maxF / G
      gy *= maxF / G
    }
    c.vx += gx * dt
    c.vy += gy * dt
  }

  for (const c of agents) {
    c.x += c.vx * dt
    c.y += c.vy * dt
    // 鼠标碰撞：顶到 48px 外 + 法向推力（原版 R0 那段）。
    if (pointer.on) {
      const vx = c.x - pointer.x
      const vy = c.y - pointer.y
      const d = Math.hypot(vx, vy) || 0.01
      if (d < 48) {
        const nx = vx / d
        const ny = vy / d
        c.x = pointer.x + nx * 48
        c.y = pointer.y + ny * 48
        const rel = (c.vx - pointer.vx) * nx + (c.vy - pointer.vy) * ny
        if (rel < 0) {
          c.vx -= nx * rel * 1.6
          c.vy -= ny * rel * 1.6
        }
        c.vx += nx * 260
        c.vy += ny * 260
      }
    }
    place(c, c.x, c.y)
  }
}

function frame(now: number) {
  if (aborted) return
  const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 0.016
  lastFrame = now

  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i]
    const p = Math.min(1, (now - tw.start) / tw.dur)
    tw.on(tw.ease(p))
    if (p >= 1) {
      tweens.splice(i, 1)
      tw.res()
    }
  }

  for (const a of agents) {
    const t = a.tween
    if (!t) continue
    const p = Math.min(1, (now - t.start) / t.dur)
    const e = (t.drag ? easeInOut : easeOut)(p)
    const dx = t.tx - t.fx
    const dy = t.ty - t.fy
    const len = Math.hypot(dx, dy) || 1
    const off = Math.sin(e * Math.PI) * t.bend
    place(a, t.fx + dx * e + (-dy / len) * off, t.fy + dy * e + (dx / len) * off)
    t.onStep?.(a.x, a.y)
    if (p >= 1) {
      a.tween = null
      t.res()
    }
  }

  if (building) {
    // 长时间常数（约 0.3 秒）地追进度目标：台阶被抹平，镜头一路平滑下移。
    const d = scrollTarget() - viewY
    if (Math.abs(d) > 0.5) viewY = clamp(viewY + d * 0.05, 0, viewMax)
  }
  if (worldEl.value) {
    worldEl.value.style.transform = `translate3d(0, ${-viewY}px, 0)`
  }
  if (flock.active) flockStep(now, dt)

  // 光标姿态：按「本帧实际位移」定方向；不跟随时（施工阶段）角度按 10/s 衰减回 0。
  for (const a of agents) {
    const dx = a.x - a.px
    const dy = a.y - a.py
    const sp = dt > 0 ? Math.hypot(dx, dy) / dt : 0
    if (a.rot && sp > 30) {
      const target = (Math.atan2(dy, dx) * 180) / Math.PI + 128
      let delta = target - a.angle
      while (delta > 180) delta -= 360
      while (delta < -180) delta += 360
      a.angle += delta * Math.min(1, dt * 8)
    } else if (a.angle !== 0) {
      a.angle = Math.abs(a.angle) < 0.5 ? 0 : a.angle * (1 - Math.min(1, dt * 10))
    }
    a.press = Math.max(0, a.press - dt * 6)
    a.px = a.x
    a.py = a.y
    applyAgent(a)
  }

  raf = requestAnimationFrame(frame)
}

/* --- 输入锁与生命周期 ----------------------------------------------------------- */

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    skip()
    return
  }
  // 完成态下页面已经交还，只拦 Esc，其余按键放行。
  if (doneState.value) return
  if (
    [' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(
      e.key,
    )
  ) {
    e.preventDefault()
  }
}
function onWheel(e: WheelEvent) {
  e.preventDefault()
}
function onTouchMove(e: TouchEvent) {
  e.preventDefault()
}

function lockInput() {
  window.addEventListener('keydown', onKeydown, true)
  window.addEventListener('wheel', onWheel, { passive: false, capture: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true })
}

/* 蜂群要跟真实的鼠标互动：一直跟踪指针位置（覆盖层本身 pointer-events: none，
   所以列表器挂在 window 上，HUD 按钮也照样能用）。 */
function onPointerMove(e: PointerEvent | MouseEvent) {
  pointer.x = e.clientX
  pointer.y = e.clientY
  pointer.on = true
}
function onPointerLeave() {
  pointer.on = false
}
function trackPointer() {
  // pointermove 覆盖鼠标/触控/手写笔；再挂一份 mousemove，避免某些环境里
  // 只有合成鼠标事件（不产生 pointer 事件）时蜂群收不到位置。
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('mousemove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  document.documentElement.addEventListener('mouseleave', onPointerLeave)
}
function untrackPointer() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('mousemove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  document.documentElement.removeEventListener('mouseleave', onPointerLeave)
  pointer.on = false
}
function unlockScroll() {
  window.removeEventListener('wheel', onWheel, { capture: true })
  window.removeEventListener('touchmove', onTouchMove, { capture: true })
}
function unlockInput() {
  window.removeEventListener('keydown', onKeydown, true)
  unlockScroll()
}

async function prepareAssets() {
  // 只等字体。图片「轮到它时才取」，见 ensureImage。
  if ('fonts' in document) {
    await Promise.race([document.fonts.ready, sleep(1200)])
  }
}

/** 图片按需加载：任务排到它才取，最多等一小会儿。 */
async function ensureImage(item: SwarmItem) {
  if (item.kind !== 'image' || !(item.el instanceof HTMLImageElement)) return
  const src = item.el.currentSrc || item.el.src
  if (!src) return
  const probe = new Image()
  probe.src = src
  await Promise.race([probe.decode().catch(() => {}), sleep(700)])
}

/** 画布色 = 页面自己的底色（扩展的效果就是「把页擦成一张空白画布」）。 */
function sampleCanvasColor(): string {
  const c = getComputedStyle(document.body).backgroundColor
  return c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)' ? c : '#ffffff'
}

async function run() {
  if (running) return
  running = true
  aborted = false
  building = false
  flock.active = false
  doneState.value = false
  doneCount.value = 0
  total.value = 0
  finishSecs.value = ''
  lastFrame = 0
  viewY = 0
  viewMax = 0
  // 记下开演前的滚动位置：整段动画会一路推到页脚，做完要滚回这里。
  restoreY = window.scrollY
  canvasColor.value = sampleCanvasColor()
  visible.value = true
  fading.value = false
  await nextTick()

  // 顺序要紧：captureModel 的 walk 会跳过 visibility:hidden 的子树，
  // 所以 swarm-lock（隐藏真实页面）必须在扫描完成之后才加上。
  lockInput()
  trackPointer()
  window.scrollTo(0, 0)
  sound.ensure()
  sound.resume()

  scanning.value = true
  status.value = '扫描中…'
  sound.swell()

  // 光标先入场 —— 扫描期间它们就围着中心立方体聚集了（原版 18 个）。
  const count = 18
  spawnAgents(count)
  raf = requestAnimationFrame(frame)
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const radius = Math.min(120, window.innerWidth * 0.12)
  const gather = Promise.all(
    agents.map((a, i) => {
      const ang = (i / agents.length) * Math.PI * 2
      return moveTo(a, cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius)
    }),
  )

  await prepareAssets()
  window.scrollTo(0, 0)
  const siteRoot = document.querySelector<HTMLElement>('.site-shell')
  const items = siteRoot ? captureModel(siteRoot) : []
  tasks = items.map((item) => ({ item, taken: false, done: false }))

  // 副本任务的前置：母块子树里的每一条工单。
  for (const t of tasks) {
    if (!t.item.dup) continue
    const masterItems = t.item.dup.masterItems
    t.dupDeps = tasks.filter((x) => masterItems.includes(x.item))
  }

  total.value = tasks.length
  if (!tasks.length) {
    teardown(false)
    return
  }

  // 镜头能走多远：覆盖层有自己的滚动量（`viewY`），不受真实页面「滚到底就停」
  // 的限制 —— 取「真实可滚距离」与「内容底部停在视口 85% 处」中较大的那个。
  // 所以页面不够长也能一路匀速往下推；建到页脚时它会停得低一些，下面只留
  // 15% 的空白画布。收工后再滚回开演前的位置（见下方收尾）。
  let contentBottom = 0
  for (const t of tasks) {
    if (t.item.fixed) continue
    contentBottom = Math.max(contentBottom, t.item.y + t.item.h)
  }
  const realMax = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  viewMax = Math.max(realMax, contentBottom - window.innerHeight * 0.85)

  document.documentElement.classList.add('swarm-lock')
  sound.arp()
  await gather
  if (aborted) return
  status.value = `${count} 个光标 · ${tasks.length} 层`
  await sleep(500)
  if (aborted) return
  scanning.value = false
  await sleep(160)
  if (aborted) return

  startedAt = performance.now()
  building = true
  // 施工阶段光标不再随移动转向（原版只在聚拢/蜂群时转）。
  for (const a of agents) a.rot = false
  status.value = '游览中'
  await Promise.all(agents.map((a) => agentLoop(a)))
  if (aborted) return
  building = false

  finishSecs.value = ((performance.now() - startedAt) / 1000).toFixed(1)
  sound.chord()
  // 覆盖层的镜头可能比真实页面滚得更远：`viewY` 允许把内容底部抬到视口 85%
  // 处，而真实页面最多只能滚到 `scrollHeight - innerHeight`。交还页面前先把
  // 镜头平滑地对回真实页面能达到的位置 —— 否则覆盖层里的页脚和底下真实页面
  // 的页脚会错开一段，交接的那一下会同时看到两份页脚、像卡了一下。
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  if (viewY > maxScroll + 0.5) {
    const from = viewY
    await tween(280, (p) => {
      viewY = from + (maxScroll - from) * p
    }, easeOut)
    if (aborted) return
  }
  doneState.value = true
  // 把真实滚动位置对齐到镜头（页面太短就贴到底部）——这一步在覆盖层还盖着
  // 页面时做，用户看不到跳动。
  window.scrollTo(0, clamp(viewY, 0, maxScroll))
  document.documentElement.classList.remove('swarm-lock')
  unlockScroll()
  const clearId = window.setTimeout(() => {
    timeouts.delete(clearId)
    if (worldEl.value) worldEl.value.innerHTML = ''
    if (screenEl.value) screenEl.value.innerHTML = ''
    if (guideLayerEl.value) guideLayerEl.value.innerHTML = ''
    // 覆盖层收掉后，滚回开演前的位置（用户点「开始」时所在的那一屏）。
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: restoreY, behavior: reduced ? 'auto' : 'smooth' })
  }, 350)
  timeouts.add(clearId)
  flock.active = true
  for (const a of agents) a.rot = true
}

function teardown(instant: boolean) {
  if (aborted) return
  aborted = true
  building = false
  flock.active = false
  unlockInput()
  untrackPointer()
  cancelAnimationFrame(raf)
  for (const id of timeouts) window.clearTimeout(id)
  timeouts.clear()
  sound.duck()
  document.documentElement.classList.remove('swarm-lock')
  if (instant) {
    visible.value = false
    running = false
    emit('finish')
    return
  }
  fading.value = true
  window.setTimeout(() => {
    visible.value = false
    running = false
    emit('finish')
  }, 500)
}

function skip() {
  if (!visible.value) return
  teardown(false)
}

/** 完成态的「重播」：清掉蜂群与旧状态，原地把整个流程再跑一遍。 */
function replay() {
  if (!doneState.value) return
  flock.active = false
  agents = []
  tweens = []
  if (cursorLayerEl.value) cursorLayerEl.value.innerHTML = ''
  running = false
  void run()
}

function toggleMute() {
  muted.value = !muted.value
  sound.setEnabled(!muted.value)
}

watch(
  () => props.active,
  (v) => {
    if (v) void run()
  },
)
watch(
  () => route.path,
  () => teardown(true),
)
onBeforeUnmount(() => teardown(true))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="swarm-root"
      :class="{ 'swarm-root--out': fading, 'swarm-root--done': doneState }"
    >
      <div class="swarm-bg" :style="{ background: canvasColor }" />
      <div ref="worldEl" class="swarm-world" />
      <div ref="screenEl" class="swarm-screen" />
      <div ref="guideLayerEl" class="swarm-guides" />
      <div class="swarm-frame" />
      <div ref="cursorLayerEl" class="swarm-cursors" />

      <!-- 扫描期的中心立方体（扩展的 loading 标志），光标围着它聚集 -->
      <div v-if="scanning" class="swarm-cube" aria-hidden="true">
        <svg width="30" height="34" viewBox="0 0 30 34">
          <path d="M15 1 29 9 15 17 1 9Z" fill="#d4d4d4" />
          <path d="M1 9v16l14 8V17Z" fill="#a8a8a8" />
          <path d="M29 9v16l-14 8V17Z" fill="#8c8c8c" />
        </svg>
      </div>

      <div class="swarm-hud">
        <span class="swarm-hud__dots">
          <i v-for="(c, i) in agentDots" :key="i" :style="{ background: c }" />
        </span>
        <template v-if="!doneState">
          <span class="swarm-hud__num">{{ agentsCount }} 个光标</span>
          <span class="swarm-hud__sep" />
          <span class="swarm-hud__num">{{ doneCount }} / {{ total }} 层</span>
          <span class="swarm-hud__bar"><i :style="{ width: progress + '%' }" /></span>
          <span class="swarm-hud__pill">{{ status }}</span>
          <button
            type="button"
            class="swarm-hud__icon"
            :title="muted ? '取消静音' : '静音'"
            @click="toggleMute"
          >
            <svg v-if="!muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.4 5.6a9 9 0 0 1 0 12.8"/></svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none"/><line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>
          </button>
          <button type="button" class="swarm-hud__icon" title="关闭 (Esc)" @click="skip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
          </button>
        </template>
        <template v-else>
          <span class="swarm-hud__num">
            <b>{{ agentsCount }}</b> 个光标 · <b>{{ finishSecs }}</b>s 完成
          </span>
          <span class="swarm-hud__bar"><i style="width: 100%" /></span>
          <button type="button" class="swarm-hud__btn swarm-hud__btn--blue" @click="replay">重播</button>
          <button type="button" class="swarm-hud__btn" @click="skip">关闭</button>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style>
/* 全部全局样式：覆盖层 teleport 到 body，且要压住整个站点。 */

.swarm-root {
  position: fixed;
  inset: 0;
  z-index: 99999;
  /* root 永不拦指针：建造期页面已被 visibility 隐藏（收不到事件），
     完成期页面是活的；只有 HUD 自己 pointer-events:auto。 */
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.45s ease;
}
.swarm-root--out {
  opacity: 0;
}

.swarm-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  transition: opacity 0.3s ease;
}
.swarm-root--done .swarm-bg,
.swarm-root--done .swarm-frame {
  opacity: 0;
}

/* 深色画布边框 —— Figma 画布边缘那一圈。 */
.swarm-frame {
  position: absolute;
  inset: 0;
  z-index: 4;
  border: 8px solid #262c36;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.swarm-world,
.swarm-screen {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.swarm-screen {
  z-index: 2;
}

/* 瞬态参考线层（屏幕坐标）。 */
.swarm-guides {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}
.swarm-gline-v {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #f24822;
  animation: swarm-guide-flash 0.4s ease forwards;
}
.swarm-gline-h {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: #0d99ff;
  animation: swarm-guide-flash 0.62s ease forwards;
}
@keyframes swarm-guide-flash {
  0% { opacity: 0; }
  18% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}

.swarm-cursors {
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
}

/* 中心立方体：扫描期的 loading 标志，轻微上下浮动。 */
.swarm-cube {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  animation: swarm-cube-bob 1.6s ease-in-out infinite;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.18));
}
@keyframes swarm-cube-bob {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 8px)); }
}

/* --- 光标（28×28，热点位移 + 随速度旋转 + 按压缩放都在 JS 里写） --------------- */

.swarm-agent {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  will-change: transform;
}
.swarm-agent svg {
  position: absolute;
  display: block;
  /* 白描边会画到 viewBox 外面，必须放开裁剪，否则光标边缘会被切掉。 */
  overflow: visible;
  filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.28));
}

/* --- 选中框：1px 蓝边 + 4 角白手柄 + 下方 W×H 徽章 ------------------------------ */

.swarm-outline {
  position: absolute;
  border: 1px solid #0d99ff;
  pointer-events: none;
  transition: opacity 0.25s ease;
  box-sizing: border-box;
}
.swarm-outline i {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #fff;
  border: 1px solid #0d99ff;
  border-radius: 1.5px;
}
/* 四角 */
.swarm-outline i:nth-child(1) { left: -4px; top: -4px; }
.swarm-outline i:nth-child(2) { right: -4px; top: -4px; }
.swarm-outline i:nth-child(3) { right: -4px; bottom: -4px; }
.swarm-outline i:nth-child(4) { left: -4px; bottom: -4px; }

.swarm-badge {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #0d99ff;
  color: #fff;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  padding: 1px 4px;
  border-radius: 2px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.swarm-badge--big {
  font-size: 11px;
  padding: 2px 6px;
  animation: swarm-guide-flash 0.62s ease forwards;
}

.swarm-outline--red {
  border-color: #f24822;
}
/* 空闲光标帮同伴校尺寸时的虚线框（描边色由光标自己上色）。 */
.swarm-outline--help {
  border-style: dashed;
}
/* 文字选中时那条压在基线上的蓝线（原版 selection.underline）。 */
.swarm-underline {
  position: absolute;
  left: 0;
  height: 1.5px;
  background: #0d99ff;
}

.swarm-outline--fade {
  opacity: 0;
}

/* 拖拽时的间距读数。 */
.swarm-gap {
  position: absolute;
  transform: translate(-50%, 0);
  transition: opacity 0.1s ease;
  background: #f24822;
  color: #fff;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  padding: 1px 4px;
  border-radius: 2px;
  white-space: nowrap;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}

/* --- 克隆节点：灰色占位 → 真身交叉淡入 -------------------------------------------- */

.swarm-node {
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
}

/* 占位层（`.r`）：先一块浅灰，填充层淡入后灰底消失。 */
.swarm-r {
  background: #d9d9d9;
  transition: background-color 0.22s ease;
}
.swarm-r.is-on {
  background: transparent;
}
.swarm-r__f {
  position: absolute;
  inset: 0;
  opacity: 0;
  box-sizing: border-box;
  transition:
    opacity 0.22s ease,
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}
.swarm-r.is-on .swarm-r__f {
  opacity: 1;
}

/* 媒体：自上而下擦出。 */
.swarm-md {
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.6s cubic-bezier(0.2, 0.75, 0.2, 1);
  overflow: hidden;
}
.swarm-md.is-on {
  clip-path: inset(0 0 0 0);
}
.swarm-md__media {
  display: block;
}

/* 文本。 */
.swarm-t {
  white-space: pre-wrap;
  word-break: break-word;
}
/* 最近打出的几个字带蓝色高亮（像被选中的输入）。 */
.swarm-sa {
  background: rgba(13, 153, 255, 0.28);
  border-radius: 2px;
}
.swarm-t--sel {
  background: rgba(13, 153, 255, 0.28);
}

/* 打字光标条：跟文字同色，闪烁。 */
.swarm-caret {
  display: inline-block;
  width: 1.5px;
  height: 1.1em;
  margin-left: 1px;
  vertical-align: -0.15em;
  background: currentColor;
  animation: swarm-caret-blink 1s steps(1) infinite;
}
@keyframes swarm-caret-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* 复制拖拽时的移动容器。 */
.swarm-ghost {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* --- HUD ------------------------------------------------------------------------ */

.swarm-hud {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  z-index: 7;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(30, 30, 30, 0.94);
  color: #e5e5e5;
  border-radius: 12px;
  padding: 8px 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);
  pointer-events: auto;
}
.swarm-hud__dots {
  display: flex;
  align-items: center;
}
.swarm-hud__dots i {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(30, 30, 30, 0.94);
  margin-left: -5px;
}
.swarm-hud__dots i:first-child {
  margin-left: 0;
}
.swarm-hud__num b {
  font-weight: 700;
}
.swarm-hud__sep {
  width: 1px;
  height: 12px;
  background: #3a3a3a;
}
.swarm-hud__bar {
  width: 88px;
  height: 3px;
  border-radius: 2px;
  background: #3a3a3a;
  overflow: hidden;
}
.swarm-hud__bar i {
  display: block;
  height: 100%;
  background: #0d99ff;
  border-radius: 2px;
  transition: width 0.25s ease;
}
.swarm-hud__pill {
  background: #0d99ff;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.swarm-hud__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: #bdbdbd;
  cursor: pointer;
  padding: 0;
}
.swarm-hud__icon:hover {
  background: #2c2c2c;
  color: #fff;
}
.swarm-hud__btn {
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  background: #2c2c2c;
  color: #e5e5e5;
  font-size: 11px;
  font-family: inherit;
  cursor: pointer;
}
.swarm-hud__btn:hover {
  background: #3a3a3a;
}
.swarm-hud__btn--blue {
  background: #0d99ff;
  color: #fff;
  font-weight: 600;
}
.swarm-hud__btn--blue:hover {
  background: #2ea6ff;
}

/* --- 建造期隐藏真实页面 ---------------------------------------------------------- */

.swarm-lock .site-shell {
  visibility: hidden !important;
}
.swarm-lock {
  scroll-behavior: auto;
  scrollbar-width: none;
}
.swarm-lock::-webkit-scrollbar {
  display: none;
}
</style>
