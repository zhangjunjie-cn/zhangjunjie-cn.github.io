<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

/**
 * 右侧目录的「电路导轨」，复刻 ui.nuxt.com 的 ContentToc（`highlight-variant="circuit"`）。
 *
 * 原站的实现（nuxt/ui v4 `src/runtime/components/content/ContentToc.vue`，`circuitMaskStyle`）：
 *
 *   <div data-slot="indicator" style="width: .75rem; height: 21rem; mask-image: url('…svg…')">
 *     <div data-slot="indicatorLine"  class="absolute inset-0 bg-(--ui-border)" />
 *     <div data-slot="indicatorActive" class="bg-primary absolute w-full h-(--indicator-size)
 *          translate-y-(--indicator-position) …" />
 *   </div>
 *
 * 折线规则（原站逐字实现，见下面 `draw()`）：
 *   · 根级条目画在 x=0.5，子级条目画在 x=10.5；
 *   · 行高固定（原站 `linkHeight: 1.75rem`，每个条目在 viewBox 里占 28 个单位）；
 *   · 只有当**相邻两行**的层级不同时才折一次 —— 本行竖线在离底 6 处收尾、
 *     下一行从顶部 6 处再接一段斜线，两点之间正好 12 个单位，就是那节「台阶」；
 *   · 整个折线的高度 = 条目数 × 行高，所以目录越长台阶越多、导轨越长；
 *   · 原站每个「同层级的连续段」是一条直线，本站目录基本只有两级，照原算法整页
 *     只会出现一个大台阶；所以横向位置改由**目录条数**查表决定（见 `PATTERNS`），
 *     相邻两行取值不同就在交界处折一次，凹口恒为一行高。
 *
 * 线上实测（`/docs/getting-started/theme/components`）：`viewBox 0 0 12 280`（10 条），
 * 路径 `M0.5 0 L0.5 22 L10.5 34 L10.5 56 L10.5 84 L10.5 112 L10.5 134 L0.5 146
 * L0.5 162 L10.5 174 L10.5 196 L10.5 224 L10.5 252 L10.5 280` —— 1 个 h2、4 个 h3、
 * 1 个 h2、4 个 h3，三处换级就是三个台阶，和这套规则逐点吻合。
 *
 * 这里不去拼 `mask-image` 字符串，而是直接画两条同一 `d` 的 SVG 折线：灰线铺满，
 * 蓝线用 `stroke-dasharray` 只留下当前小节那一段（`0 Δ 长度 余量` 四段式写法，
 * 配合 200ms 过渡，就是原站 `translate-y` 滑动的那段）。
 *
 * 几何按 DOM 实测（每行取 `a.outline-link` 的实际上下边界），所以主题字号、
 * 行距一变也不会错位；换页时新目录节点落地后再重画。
 */

/** 导轨离条目文字的距离（原站 `ps-4`）；导轨自身宽 `STEP`，所以文字左边还留 4px。 */
const TEXT_GAP = 16
/** 导轨宽度（原站 `w-3` = 12px）。 */
const STEP = 12
/** 折线两端的 x（原站 viewBox 里的 `0.5` / `10.5`）。 */
const X0 = 0.5
const X1 = 10.5
/** 换级时竖线两端各让出的长度；两段合计 12，即原站那节斜线。 */
const SLANT = 6

/**
 * 每一行画在 x=0.5（「0」，原位）还是 x=10.5（「1」，右移一格）—— 字符串长度
 * 必须等于该页目录的条数。原站按 h2/h3 层级折线，本站目录基本只有两级，所以
 * 形态改由**条目条数**决定：3~9 条是逐页确认过的表，更多条数按 11 条那套
 * （开头两行原位、中间一行凹一次、末行原位）扩展。
 */
const PATTERNS: Record<number, string> = {
  3: '011',
  4: '0111',
  5: '01001',
  6: '011010',
  7: '0101110',
  8: '01110111',
  9: '011110111',
}

function patternFor(count: number): string {
  if (count <= 2) return '0'.repeat(count)
  const fixed = PATTERNS[count]
  if (fixed) return fixed
  const dip = Math.floor(count / 2)
  let out = ''
  for (let index = 0; index < count; index++) {
    out += index < 2 || index === dip || index === count - 1 ? '0' : '1'
  }
  return out
}

const route = useRoute()

const svg = ref<SVGSVGElement | null>(null)

const rail = reactive({
  left: 0,
  top: 0,
  width: STEP,
  height: 0,
  path: '',
  dash: '',
})

let observer: MutationObserver | undefined
let timer = 0
let tries = 0
let list: HTMLElement | null = null

function reset() {
  rail.height = 0
  rail.path = ''
  rail.dash = ''
}

/**
 * 排一次绘制。用 `setTimeout` 而不是 `requestAnimationFrame`：标签页不活跃时
 * rAF 整体停摆，导轨于是一直空着；量尺寸本身也不需要等下一帧。
 */
function paint() {
  clearTimeout(timer)
  timer = window.setTimeout(draw, 0)
}

/**
 * 重画导轨。位置一律相对 `.aside-container`（`position: fixed`，是这块区域里
 * 唯一的定位祖先），因此拿 `getBoundingClientRect` 做差即可；`scrollTop` 要加
 * 回去，因为绝对定位的子元素跟着滚动内容走。
 */
function draw() {
  const container = (svg.value?.closest('.aside-container') ??
    document.querySelector('.aside-container')) as HTMLElement | null
  const outline = document.querySelector<HTMLElement>('.VPDocAsideOutline .VPDocOutlineItem.root')
  const links = Array.from(outline?.querySelectorAll<HTMLElement>('a.outline-link') ?? [])
  if (!container || !outline || !links.length) {
    reset()
    // aside 先挂载、目录后渲染（换页同理），这一刻量不到就过一会儿再来，
    // 否则组件会一直空着。
    if (tries < 40) {
      tries++
      timer = window.setTimeout(draw, 60)
    }
    return
  }
  tries = 0

  // 目录内容会随页面更换，换了一份就重挂一次观察者。
  if (outline !== list) {
    list = outline
    observer?.disconnect()
    observer = new MutationObserver(() => paint())
    observer.observe(outline, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    })
  }

  const box = container.getBoundingClientRect()
  const scrollTop = container.scrollTop
  const rootList = outline

  /** 条目在第几级：往上数几层 `.VPDocOutlineItem.nested`（h2 为 0，h3 为 1）。 */
  const levelOf = (link: HTMLElement) => {
    let level = 0
    let node = link.parentElement?.closest<HTMLElement>('ul.VPDocOutlineItem')
    while (node && node !== rootList) {
      level++
      node = node.parentElement?.closest<HTMLElement>('ul.VPDocOutlineItem') ?? null
    }
    return level
  }

  const rows = links.map((link) => {
    const rect = link.getBoundingClientRect()
    return {
      top: rect.top - box.top + scrollTop,
      bottom: rect.bottom - box.top + scrollTop,
      level: levelOf(link),
      // 子级条目靠 `padding-left` 缩进，锚点盒子本身不移动，所以要加上 padding。
      left: rect.left - box.left + (parseFloat(getComputedStyle(link).paddingLeft) || 0),
      active: link.classList.contains('active'),
    }
  })

  // 每行的横向位置由条目条数查表决定（见 `patternFor()`）：0 = 原位，1 = 右移一格。
  // 相邻两行取值不同，就在它们交界处折一次 —— 凹口高度恒为一行。
  const pattern = patternFor(rows.length)
  const xOf = (index: number) => (pattern[index] === '1' ? X1 : X0)

  const originTop = rows[0].top

  // 逐行拼折线：每个条目最多三个点（可能的换级斜线起点 + 本行竖线终点）。
  const points: Array<{ x: number; y: number }> = []
  const rowPoints: Array<{ from: number; to: number }> = []
  let currentX = X0

  rows.forEach((row, index) => {
    const targetX = xOf(index)
    const last = index === rows.length - 1
    const nextDiffers = !last && xOf(index + 1) !== targetX
    const top = row.top - originTop
    const bottom = row.bottom - originTop
    const from = points.length

    if (index === 0) {
      points.push({ x: targetX, y: top })
      currentX = targetX
    } else if (targetX !== currentX) {
      // 换级：从上一行收尾处斜着走到新的一级，纵向再走 SLANT 就是台阶。
      points.push({ x: targetX, y: top + SLANT })
      currentX = targetX
    }

    points.push({ x: currentX, y: bottom - (nextDiffers ? SLANT : 0) })
    rowPoints.push({ from, to: points.length - 1 })
  })

  // 拼 `d`，同时记下每个点的累计长度 —— 蓝段（dash）要按长度切。
  let path = ''
  const at: number[] = []
  points.forEach((point, index) => {
    if (index === 0) {
      path = `M${point.x} ${point.y}`
      at.push(0)
      return
    }
    const previous = points[index - 1]
    path += ` L${point.x} ${point.y}`
    at.push(at[index - 1] + Math.hypot(point.x - previous.x, point.y - previous.y))
  })

  // 一行的可见线段从「上一个点」开始（换级时那段斜线也归这一行），到它自己的终点。
  const span = (index: number) => {
    const from = rowPoints[index].from
    return {
      start: from === 0 ? 0 : at[from - 1],
      end: at[rowPoints[index].to],
    }
  }

  // 蓝段只覆盖当前这一行（含它开头那节斜线），不再整组一起亮 —— 整组亮起来
  // 会拉出一百多像素，定位感就没了。
  const activeIndex = rows.findIndex((row) => row.active)
  let dash = ''
  if (activeIndex >= 0) {
    const { start, end } = span(activeIndex)
    dash = `0 ${start} ${end - start} ${at[at.length - 1] + 20}`
  }

  rail.left = rows[0].left - TEXT_GAP
  rail.top = originTop
  rail.height = rows[rows.length - 1].bottom - originTop
  rail.path = path
  rail.dash = dash
}

function onResize() {
  paint()
}

function onVisibility() {
  paint()
}

onMounted(() => {
  paint()
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  observer?.disconnect()
  window.removeEventListener('resize', onResize)
  document.removeEventListener('visibilitychange', onVisibility)
})

// 换页后目录整个重建，等新节点落到 DOM 上再量。
watch(
  () => route.path,
  () => {
    nextTick(() => paint())
  },
)
</script>

<template>
  <svg
    v-if="rail.path"
    ref="svg"
    class="aside-rail"
    aria-hidden="true"
    :width="rail.width"
    :height="rail.height"
    :style="{ left: `${rail.left}px`, top: `${rail.top}px` }"
  >
    <path class="aside-rail__line" :d="rail.path" />
    <path
      v-if="rail.dash"
      class="aside-rail__active"
      :d="rail.path"
      :style="{ strokeDasharray: rail.dash }"
    />
  </svg>
</template>

<style scoped>
.aside-rail {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}

.aside-rail__line,
.aside-rail__active {
  fill: none;
  stroke-width: 1;
}

.aside-rail__line {
  stroke: var(--vp-c-divider);
}

.aside-rail__active {
  stroke: var(--site-main);
  transition: stroke-dasharray 0.2s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .aside-rail__active {
    transition: none;
  }
}
</style>
