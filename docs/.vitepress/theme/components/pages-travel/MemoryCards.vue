<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import type { Memory } from './memories'

/**
 * The card-deck carousel behind `<Swiper effect="cards">`.
 *
 * Swiper's cards effect stacks every slide on the same spot and fans them out
 * from the active one: step `d` away it translates by `8 % * d` horizontally,
 * `2 deg * d` around Z and `-100 px * d` back in Z, with the stack's shadows
 * fading in past half a step (`(|d| - .5) / .5`). Distance is clamped to four
 * steps, and the z-index is `count - |d|` so the active card is always on top.
 *
 * Clicking a card behind brings it forward; clicking the active one opens the
 * viewfinder. A video entry shows its poster with a play badge — it never
 * autoplays here, and its duration is deliberately not shown, because reading it
 * would make the browser fetch the clip's metadata.
 *
 * The active index is owned by the parent so closing the camera comes back to the
 * card it was opened from.
 *
 * 参考站那台是 Swiper 12 的 cards 效果（`swiper@12.2.0`），这里对齐它的四件事：
 * 牌组框是 16:9、每 3 秒自己往前走一张、鼠标按住能左右拨（拨动时**每张卡片各按自己的
 * progress 翻**，源见 `cardTransform`）、图片下沿压着一排可点的小圆点（一张一个）。
 *
 * 拨动时 `is-dragging` 掐掉卡片自身的 0.52s 过渡好跟手，松手位移过坎就换一张，没过坎
 * 当点击交给卡片自己。自动播放只在客户端挂载后启动（`prefers-reduced-motion: reduce`
 * 不起），按住期间暂停，手动拨一次、点一次箭头或圆点后重新计时。
 */
const props = withDefaults(
  defineProps<{
    memories: Memory[]
    activeIndex: number
    /** Swiper's `loop` / `rewind` — both mean "keep going past the ends". */
    wrap?: boolean
  }>(),
  { wrap: false },
)

const emit = defineEmits<{ update: [index: number]; viewMemory: [index: number] }>()

/** 参考站的 `autoplay.delay`：3 秒一张。 */
const AUTOPLAY_DELAY = 3000
/** 没超过这个位移就当是点击（原生 click 的容差也就几像素）。 */
const CLICK_SLOP = 6
/** 拨动时跟在后面那张的翻动幅度（相对当前这张的比例）。 */
const PARTNER_FLIP = 0.5

const deckEl = ref<HTMLElement | null>(null)
const dragging = ref(false)
/** 拖动进度，单位是「张」：负值 = 正往下一张拨。每张卡片各按自己这档算 transform。 */
const dragStep = ref(0)
let startX = 0
let movedX = 0
/** 拖动结束置位，用来吃掉紧随其后那一次 click。 */
let suppressClick = false
let timer: number | null = null

function stopAutoplay() {
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}

/** 重新开始倒计时：手动拨动 / 点箭头之后，下一次自动切换从当下算起。 */
function play() {
  stopAutoplay()
  if (props.memories.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(() => go(1), AUTOPLAY_DELAY)
}

/**
 * 拖动用挂在 `window` 上的 pointermove / pointerup，而不是 `setPointerCapture`：
 * 指针一旦被牌组捕获，浏览器会把随后的 `click` 也重定向到牌组上，卡片自己的点击
 * 就再也收不到了。
 */
function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 || props.memories.length < 2) return
  dragging.value = true
  startX = event.clientX
  movedX = 0
  dragStep.value = 0
  suppressClick = false
  stopAutoplay()
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  movedX = event.clientX - startX
  const width = deckEl.value?.clientWidth ?? 0
  dragStep.value = width > 0 ? movedX / width : 0
}

function onPointerUp() {
  if (!dragging.value) return
  dragging.value = false
  dragStep.value = 0
  detachDragListeners()
  // 竖直像素数不够切换的坎就不切，只把这次当点击（见 `suppressClick`）。
  const width = deckEl.value?.clientWidth ?? 0
  if (Math.abs(movedX) >= Math.max(48, width * 0.15)) go(movedX < 0 ? 1 : -1)
  suppressClick = Math.abs(movedX) > CLICK_SLOP
  movedX = 0
  play()
}

function detachDragListeners() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
}

function onCardClick(card: { index: number; isActive: boolean }) {
  // 吃掉拖动之后紧跟的那一次 click（用完即清，免得键盘回车这类没有 pointerdown
  // 的激活方式被一直挡着）。
  if (suppressClick) {
    suppressClick = false
    return
  }
  if (card.isActive) emit('viewMemory', card.index)
  else emit('update', card.index)
}

/** 箭头和自动播放共用一步的推进，手动点过之后重新计时。 */
function onNav(step: number) {
  go(step)
  play()
}

/** 参考组那排可点的小圆点：一张一个，点哪个直接翻到哪张。 */
function onDotClick(index: number) {
  if (index !== props.activeIndex) emit('update', index)
  play()
}

onMounted(play)

onBeforeUnmount(() => {
  stopAutoplay()
  detachDragListeners()
})

/** Signed distance from the active card, taken the short way round when wrapping. */
function distance(index: number): number {
  const count = props.memories.length
  let d = index - props.activeIndex
  if (props.wrap && count > 2) {
    if (d > count / 2) d -= count
    else if (d < -count / 2) d += count
  }
  return d
}

/**
 * 参考站那台是 Swiper 12 的 `EffectCards`，这里照它的公式折出每张卡片自己的
 * transform（源：`swiper/modules/effect-cards.mjs`）。
 *
 * 静止和拖动共用一套公式，只有 `progress`（离「当前张」的距离，单位是张）在变：
 * 横向每往外一张摊 `perSlideOffset(8)% - 0.75% × 张数`、绕底边转 `2°/张`、后退
 * `100px/张`，影子过半张才画。
 *
 * 拖动时 `|progress| < 1` 的两张各抬升 / 多转 / 缩小（Swiper 的 `isSwipeToNext` /
 * `isSwipeToPrev` 分支）——所以按住拨是一次翻一张，而不是整摞一起平移。Swiper 原版只让
 * 「正朝着拖动方向翻出去」的那张翻满（`currentTranslate < / > startTranslate`），跟在后面
 * 那张一点不翻；这里按需求让后面那张也跟着翻，但幅度乘 `PARTNER_FLIP` 减半，免得两张一起大翻。
 */
function cardTransform(progress: number, isDragging: boolean) {
  const p = Math.min(Math.max(progress, -4), 4)
  const steps = Math.abs(p)
  // 拖动中 `|progress| < 1` 的两张：`p * dragStep < 0` 是正朝着拖动方向翻出去的那张
  // （跟 Swiper 的 `isSwipeToNext` / `isSwipeToPrev` 判的是同一张），另一张是跟在后面那张。
  const base = isDragging && steps < 1 ? Math.sqrt(1 - Math.abs((steps - 0.5) / 0.5)) : 0
  const sub = p * dragStep.value < 0 ? base : base * PARTNER_FLIP
  const spread = (8 - steps * 0.75 + 96 * sub) * steps
  return [
    `translate(-50%, ${-25 * sub * steps}%)`,
    `translate3d(${-Math.sign(p) * spread}%, 0, ${-100 * steps}px)`,
    `rotateZ(${-2 * p - 28 * p * sub}deg)`,
    `scale(${1 - 0.5 * sub * steps})`,
  ].join(' ')
}

const cards = computed(() =>
  props.memories.map((memory, index) => {
    const d = Math.min(Math.max(distance(index), -4), 4)
    const steps = Math.abs(d)
    // 拖动中所有卡片一起按「张」往外挪一格：`dragStep` 为负即整体往下一张滑。
    const progress = -(d + dragStep.value)
    return {
      memory,
      index,
      isActive: d === 0,
      isVideo: !!memory.video,
      label: memory.title || (memory.video ? '视频' : ''),
      style: {
        transform: cardTransform(progress, dragging.value),
        zIndex: String(props.memories.length - Math.round(Math.abs(progress))),
        opacity: steps >= 4 ? '0' : '1',
        pointerEvents: steps >= 4 ? 'none' : undefined,
      },
      /** `slideShadows` — Swiper only starts drawing the shadow past half a step. */
      shadow: Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1),
    }
  }),
)

function go(step: number) {
  const count = props.memories.length
  if (count === 0) return
  const next = props.activeIndex + step
  if (props.wrap) emit('update', ((next % count) + count) % count)
  else emit('update', Math.min(Math.max(next, 0), count - 1))
}
</script>

<template>
  <div class="memory-deck-wrap">
    <div ref="deckEl" class="memory-deck" :class="{ 'is-dragging': dragging }" @pointerdown="onPointerDown">
      <button
        v-for="card in cards"
        :key="card.index"
        type="button"
        class="memory-deck-card"
        :class="{ 'is-active': card.isActive }"
        :style="card.style"
        :aria-label="card.isActive ? `打开取景器：${card.label}` : `切到：${card.label}`"
        @click="onCardClick(card)"
      >
        <!-- `not` keeps Fancybox off it — the click opens the viewfinder instead. -->
        <!-- 同 `MemoryList`：外链图床按 Referer 防盗链，取图不带 Referer。 -->
        <img
          class="not"
          :src="card.memory.image"
          :alt="card.label"
          loading="lazy"
          referrerpolicy="no-referrer"
          draggable="false"
        />
        <span class="memory-deck-shadow" :style="{ opacity: card.shadow }" />
        <span v-if="card.isVideo" class="memory-deck-play" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5l11 7-11 7z" />
          </svg>
        </span>
      </button>

      <!-- 参考组那排压在图片下沿的分页圆点：一张一个，点哪个翻哪张。
           `pointerdown.stop` 免得牌组把这次按下当成开始拖动。 -->
      <div class="memory-deck-dots">
        <button
          v-for="(memory, index) in memories"
          :key="index"
          type="button"
          class="memory-deck-dot"
          :class="{ 'is-active': index === activeIndex }"
          :aria-label="`翻到第 ${index + 1} 张${memory.title ? `：${memory.title}` : ''}`"
          @pointerdown.stop
          @click.stop="onDotClick(index)"
        />
      </div>

      <!-- 压在图片左右两侧的箭头：swiper 的 Navigation 原版（几何、字色、字形都照
           `swiper/modules/navigation.css`，见 tailwind.css 里 `.memory-deck-side-arrow`）。
           `pointerdown.stop` 免得按箭头被牌组当成开始拖动。 -->
      <button
        type="button"
        class="memory-deck-side-arrow is-prev"
        aria-label="上一张"
        @pointerdown.stop
        @click.stop="onNav(-1)"
      >
        <svg class="memory-deck-side-chevron" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor" />
        </svg>
      </button>
      <button
        type="button"
        class="memory-deck-side-arrow is-next"
        aria-label="下一张"
        @pointerdown.stop
        @click.stop="onNav(1)"
      >
        <svg class="memory-deck-side-chevron" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor" />
        </svg>
      </button>
    </div>

    <div class="memory-deck-nav">
      <button type="button" class="memory-deck-nav-arrow" aria-label="上一张" @click="onNav(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="memory-deck-nav-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="memory-deck-counter">{{ activeIndex + 1 }} / {{ memories.length }}</span>
      <button type="button" class="memory-deck-nav-arrow" aria-label="下一张" @click="onNav(1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="memory-deck-nav-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
