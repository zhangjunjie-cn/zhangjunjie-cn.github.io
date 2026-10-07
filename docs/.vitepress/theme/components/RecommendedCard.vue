<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

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

let timer: ReturnType<typeof setInterval> | undefined

function restart() {
  if (timer) clearInterval(timer)
  if (slideCount.value < 2) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % slideCount.value
  }, ROTATE_MS)
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
})
</script>

<template>
  <div class="bg-bg shadow-shadow relative flex h-full flex-col overflow-hidden rounded-2xl p-6 shadow-xs">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-text1 text-2xl! font-bold!">推荐文章</h2>
      <div class="flex gap-1.5">
        <div
          v-for="index in slideCount"
          :key="index"
          :class="[
            'h-1 cursor-pointer rounded-full transition-all duration-300',
            index - 1 === active ? 'bg-main w-6' : 'bg-border w-4',
          ]"
          :aria-label="`第 ${index} 组推荐`"
          @click="go(index - 1)"
        />
      </div>
    </div>
    <div class="relative flex-1">
      <div class="h-full overflow-hidden">
        <div
          class="flex h-full transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${active * 100}%)` }"
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
