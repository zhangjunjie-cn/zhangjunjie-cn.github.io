<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

/** 拖动超过这个像素才当成「滑动」，否则按点击交给卡片自己的链接。 */
const CLICK_SLOP = 6

import { data as articles } from './articles.data'
import { articleIcon } from './icons/articleIcons'

/**
 * 「推荐文章」 card.
 *
 * The list is **the site's own articles** (`articles.data.ts`) and is shuffled on
 * every load — the source recommends randomly too — then shown two at a time in a
 * horizontal slider whose dashes double as the slide indicator (the active one
 * grows to `w-6` in the main colour, the rest stay `w-4` and border-grey).
 *
 * Slider mechanics: the track is a flex row of `min-w-full` slides translated by
 * `-100% * active`, so the slides scroll sideways; a 5s timer advances it and
 * clicking a dash jumps to that slide and restarts the timer. The first render is
 * deterministic (newest first) so SSR and hydration agree — the shuffle only
 * happens in `onMounted`.
 */
/** Articles per slide (the source card fits two). */
const PER_SLIDE = 2
/** Upper bound on slides — the source's indicator group shows three dashes. */
const MAX_SLIDES = 3
const ROTATE_MS = 5000

const pool = computed(() =>
  articles.map((article) => ({
    title: article.title,
    description: article.description,
    date: article.date,
    tag: article.tags[0] ? `# ${article.tags[0]}` : '',
    href: article.href,
    icon: articleIcon(article.tags),
  })),
)

type RecommendedArticle = (typeof pool.value)[number]

/** Deterministic first paint; `onMounted` re-picks a random set. */
const picked = ref<RecommendedArticle[]>(pool.value.slice(0, PER_SLIDE * MAX_SLIDES))

const slides = computed<RecommendedArticle[][]>(() => {
  const out: RecommendedArticle[][] = []
  for (let i = 0; i < picked.value.length; i += PER_SLIDE) {
    out.push(picked.value.slice(i, i + PER_SLIDE))
  }
  return out
})

const slideCount = computed(() => Math.max(1, slides.value.length))

const active = ref(0)
/** 指针停在卡片上时暂停轮播，也给底部 dash 一个可读的进度。 */
const paused = ref(false)

let timer: ReturnType<typeof setInterval> | undefined

/* --- 拖动：按住可左右拨，过坎换一组，没过坎当点击 --------------------------- */
const viewport = ref<HTMLElement | null>(null)
const dragging = ref(false)
/** 当前拖动位移（px），正值 = 往右拖（看上一组）。 */
const dragX = ref(0)
let startX = 0
let movedX = 0
/** 拖动结束置位，吃掉紧随其后那次 click，避免被当成点链接跳转。 */
let suppressClick = false

const trackStyle = computed(() => {
  const base = -active.value * 100
  if (dragging.value) {
    return { transform: `translateX(calc(${base}% + ${dragX.value}px))` }
  }
  return { transform: `translateX(${base}%)` }
})

function detachDragListeners() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 || slideCount.value < 2) return
  dragging.value = true
  startX = event.clientX
  movedX = 0
  dragX.value = 0
  suppressClick = false
  pause()
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  movedX = event.clientX - startX
  dragX.value = movedX
}

function onPointerUp() {
  if (!dragging.value) return
  dragging.value = false
  dragX.value = 0
  detachDragListeners()
  const width = viewport.value?.clientWidth ?? 0
  const threshold = Math.max(50, width * 0.2)
  if (Math.abs(movedX) >= threshold) {
    step(movedX < 0 ? 1 : -1)
  } else {
    resume()
  }
  suppressClick = Math.abs(movedX) > CLICK_SLOP
  movedX = 0
}

/** 点击捕获：拖动后那一下 click 不应该触发卡片链接跳转。 */
function onViewportClick(event: MouseEvent) {
  if (!suppressClick) return
  suppressClick = false
  event.preventDefault()
  event.stopPropagation()
}

function step(delta: number) {
  go((active.value + delta + slideCount.value) % slideCount.value)
}

function restart() {
  if (timer) clearInterval(timer)
  timer = undefined
  if (paused.value || slideCount.value < 2) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % slideCount.value
  }, ROTATE_MS)
}

function pause() {
  paused.value = true
  if (timer) clearInterval(timer)
  timer = undefined
}

function resume() {
  paused.value = false
  restart()
}

/** Jump to a slide (the dashes are the indicator *and* the control). */
function go(index: number) {
  active.value = index % slideCount.value
  restart()
}

function shuffle<T>(list: readonly T[]): T[] {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

onMounted(() => {
  picked.value = shuffle(pool.value).slice(0, PER_SLIDE * MAX_SLIDES)
  restart()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  detachDragListeners()
})
</script>

<template>
  <div
    class="bg-bg shadow-shadow relative flex h-full flex-col overflow-hidden rounded-2xl p-6 shadow-xs"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-text1 text-2xl! font-bold!">推荐文章</h2>
      <div class="flex gap-1.5">
        <div
          v-for="index in slideCount"
          :key="index"
          :class="[
            'h-1 cursor-pointer overflow-hidden rounded-full transition-all duration-300',
            index - 1 === active ? 'bg-main/25 w-6' : 'bg-border w-4',
          ]"
          :aria-label="`第 ${index} 组推荐`"
          @click="go(index - 1)"
        >
          <div
            v-if="index - 1 === active"
            :key="active"
            class="dash-fill bg-main h-full rounded-full"
            :style="{
              animationDuration: `${ROTATE_MS}ms`,
              animationPlayState: paused ? 'paused' : 'running',
            }"
          />
        </div>
      </div>
    </div>
    <div class="relative flex-1">
      <div
        ref="viewport"
        class="h-full overflow-hidden"
        :class="{ 'select-none': dragging }"
        @pointerdown="onPointerDown"
        @dragstart.prevent
        @click.capture="onViewportClick"
      >
        <div
          class="flex h-full transition-transform duration-500 ease-in-out"
          :class="{ '!transition-none': dragging }"
          :style="trackStyle"
        >
          <div
            v-for="(slide, slideIndex) in slides"
            :key="slideIndex"
            class="flex h-full min-w-full flex-col justify-center gap-4"
          >
            <a
              v-for="article in slide"
              :key="article.href"
              :href="article.href"
              class="group/item relative flex items-center gap-4 overflow-hidden rounded-2xl"
            >
              <div
                class="article-glyph article-glyph--lg border-border bg-bg flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
                v-html="article.icon"
              />
              <div class="min-w-0 flex-1">
                <h3 class="mb-1! line-clamp-1 bg-[linear-gradient(to_right,var(--color-main)_50%,var(--color-text1)_50%)] bg-size-[200%_100%] bg-clip-text bg-position-[100%_0] text-base! font-bold! text-transparent transition-[background-position] duration-1000 group-hover/item:bg-position-[0_0]">
                  {{ article.title }}
                </h3>
                <p class="mb-2 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ article.description }}
                </p>
                <div class="text-text3 flex items-center gap-3 text-xs">
                  <span class="text-text3 text-xs font-bold tracking-wider uppercase">
                    {{ article.date }}
                  </span>
                  <span class="bg-text3/50 h-1 w-1 rounded-full" />
                  <span class="text-main font-medium">{{ article.tag }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 当前这一组的 dash 同时是一条时间进度：5s 内从左长满，与轮播计时同步。 */
@keyframes dash-fill {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.dash-fill {
  animation-name: dash-fill;
  animation-timing-function: linear;
  animation-fill-mode: both;
}

@media (prefers-reduced-motion: reduce) {
  .dash-fill {
    width: 100%;
    animation: none;
  }
}
</style>
