<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

import {
  metaIconDate,
  metaIconUpdated,
  metaIconViews,
  metaIconWords,
} from './icons/postIcons'

/**
 * The 发表于 / 更新于 / 总字数 / 阅读量 row that sits directly under the `<h1>`.
 *
 * Nothing here is per-post: the dates come from the page's own frontmatter, so
 * dropping a new markdown file in is enough.
 *   - `date` / `updated` — js-yaml turns an unquoted `2026-07-01` into a Date
 *     and VitePress re-serialises it as an ISO string for the client, so both
 *     shapes are normalised.
 *   - 总字数 — counted from the rendered body on mount. The original's SSR
 *     markup ships an empty `总字数 ` and fills it from the client too.
 *   - 阅读量 — the original's counter placeholder (♾️); no backend here.
 */
const { frontmatter } = useData()

function toDay(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string') return value.slice(0, 10)
  return ''
}

const publishedAt = computed(() => toDay(frontmatter.value.date))
const updatedAt = computed(() =>
  toDay(frontmatter.value.updated ?? frontmatter.value.date),
)

const words = ref('')

/** 正文的汉字数 + 英文词数，四舍五入到 0.1K —— 与原站「2.4K」同一口径
 *  （原站的统计包含代码块，实测 2151 汉字 + 238 英文词 = 2389 → 2.4K）。 */
function countWords(): string {
  const text = document.querySelector('.vp-doc')?.innerText ?? ''
  const cjk = text.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g)?.length ?? 0
  const latin =
    text
      .replace(/[\u3400-\u4dbf\u4e00-\u9fff]/g, ' ')
      .match(/[A-Za-z0-9][\w'’.-]*/g)?.length ?? 0
  const total = cjk + latin
  return total >= 1000 ? `${(total / 1000).toFixed(1)}K` : String(total)
}

onMounted(() => {
  words.value = countWords()
})
</script>

<template>
  <div class="text-text2 flex flex-wrap items-center gap-2 pt-4 pb-6 text-sm leading-relaxed font-medium break-keep md:gap-4">
    <div class="flex items-center" title="发表于"><span class="contents" v-html="metaIconDate" /><span>发表于 {{ publishedAt }}</span></div>
    <div class="flex items-center" title="更新于"><span class="contents" v-html="metaIconUpdated" /><span>更新于 {{ updatedAt }}</span></div>
    <div class="flex items-center" title="字数"><span class="contents" v-html="metaIconWords" /><span>总字数 {{ words }}</span></div>
    <div class="flex items-center" title="阅读量"><span class="contents" v-html="metaIconViews" /><span>阅读量 ♾️<span id="vercount_value_page_pv" class="hidden"></span></span></div>
  </div>
</template>
