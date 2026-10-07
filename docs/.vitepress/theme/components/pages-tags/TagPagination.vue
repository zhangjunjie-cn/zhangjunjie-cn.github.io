<script setup lang="ts">
import { computed, ref, watch } from 'vue'

/**
 * Vue port of the original's `Pagination` SFC (`nav[aria-label="Pagination"]`).
 *
 * Markup, class lists and the two inline theme values are copied verbatim from
 * the live DOM (see docs/research/…/tags-page.json → `pagination`). It renders
 * only when the tag spans more than one page; the grid holds 12 posts per page.
 */
const props = defineProps<{
  /** Current page, 1-based. */
  page: number
  /** Total number of pages. */
  pages: number
  /** Total number of posts across all pages ("共 N 篇"). */
  total: number
}>()

const emit = defineEmits<{ navigate: [page: number] }>()

// Measured on the original: the jump input is bound to the current page (its
// DOM value is `1` on page 1 — a property, not an attribute), not free text.
const jump = ref(String(props.page))

// The original lays the two columns out in a single <nav>; on narrow screens
// `flex-col` stacks them, hence `sm:flex-row`.
const NAV_CLASS =
  'flex flex-col sm:flex-row items-center justify-center gap-6 text-xs select-none'
const ARROW_CLASS =
  'p-1.5 rounded-lg transition-colors cursor-pointer text-text3 hover:text-text1 hover:bg-bg-soft/60'
const ARROW_DISABLED_CLASS =
  'p-1.5 rounded-lg transition-colors cursor-pointer opacity-30 cursor-not-allowed text-text3'
const PAGE_CLASS =
  'w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer font-semibold text-main'
const PAGE_IDLE_CLASS =
  'w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer text-text2 hover:text-text1 hover:bg-bg-soft/60 font-medium'
const ACTIVE_STYLE = 'background-color: var(--vp-c-indigo-soft); color: var(--main-color);'

/**
 * Which page numbers to render, with `null` standing in for an ellipsis.
 *
 * Derived from the original by walking all eight pages of `/pages/posts`:
 * it always shows the first and last page plus a three-wide window around the
 * current one, clamped to stay whole at either end —
 *
 *   p1 `1 2 3 … 8`   p3 `1 2 3 4 … 8`   p4 `1 … 3 4 5 … 8`
 *   p6 `1 … 5 6 7 8` p8 `1 … 6 7 8`
 *
 * Below ~5 pages the gaps close on their own, so /pages/tags (at most 2 pages)
 * renders a plain run of numbers exactly as before.
 */
const pageItems = computed<(number | null)[]>(() => {
  const last = props.pages
  const start = Math.max(1, Math.min(props.page - 1, last - 2))
  const end = Math.min(last, start + 2)

  const shown = new Set<number>([1, last])
  for (let n = start; n <= end; n++) shown.add(n)

  const sorted = [...shown].sort((a, b) => a - b)
  const items: (number | null)[] = []
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) items.push(null)
    items.push(n)
  })
  return items
})

const chevron = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="h-3.5 w-3.5 iconify iconify--lucide" width="1em" height="1em" viewBox="0 0 24 24" style="color: currentcolor;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${d}"></path></svg>`

const prevIcon = chevron('m15 18l-6-6l6-6')
const nextIcon = chevron('m9 18l6-6l-6-6')

function go(target: number) {
  const clamped = Math.min(Math.max(target, 1), props.pages)
  if (clamped !== props.page) emit('navigate', clamped)
}

function jumpTo() {
  const n = Number(jump.value.trim())
  if (Number.isFinite(n) && n >= 1) go(Math.trunc(n))
  // Whatever happens, the field snaps back to the page actually shown.
  jump.value = String(props.page)
}

watch(
  () => props.page,
  (next) => {
    jump.value = String(next)
  },
)
</script>

<template>
  <div class="mt-6 flex justify-center">
    <nav aria-label="Pagination" :class="NAV_CLASS">
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          :disabled="page === 1"
          :class="page === 1 ? ARROW_DISABLED_CLASS : ARROW_CLASS"
          aria-label="Previous page"
          @click="go(page - 1)"
        >
          <span class="contents" v-html="prevIcon" />
        </button>

        <template v-for="(item, i) in pageItems" :key="i">
          <span
            v-if="item === null"
            class="w-6 h-8 flex items-center justify-center text-text3 text-xs font-normal"
          >
            ...
          </span>
          <button
            v-else
            type="button"
            :aria-current="item === page ? 'page' : null"
            :class="item === page ? PAGE_CLASS : PAGE_IDLE_CLASS"
            :style="item === page ? ACTIVE_STYLE : ''"
            @click="go(item)"
          >
            {{ item }}
          </button>
        </template>

        <button
          type="button"
          :disabled="page === pages"
          :class="page === pages ? ARROW_DISABLED_CLASS : ARROW_CLASS"
          aria-label="Next page"
          @click="go(page + 1)"
        >
          <span class="contents" v-html="nextIcon" />
        </button>
      </div>

      <div class="flex items-center gap-1.5 text-xs text-text3 font-normal">
        <span>共 {{ total }} 篇</span>
        <span class="mx-1 text-slate-300 dark:text-slate-600">·</span>
        <span>前往</span>
        <input
          v-model="jump"
          type="text"
          inputmode="numeric"
          class="w-9 h-7 text-center text-xs py-0.5 px-1 bg-bg text-text1! rounded-md transition-colors outline-none jump-input"
          @keyup.enter="jumpTo"
          @blur="jumpTo"
        />
        <span>页</span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Measured on the original: the reset that ships *above* the utility layer wins
   for form controls, so the pager buttons' `p-1.5` and the jump input's
   `py-0.5 px-1` compute to 0 (the arrows are 14×14, not 26×26) and `bg-bg`
   computes to transparent. Scoped so nothing else in the theme is affected. */
button,
input {
  padding: 0;
}
input {
  background-color: transparent;
  /* The original styles this through its own `.jump-input` rule. */
  border: 1px solid var(--color-border);
}
</style>
