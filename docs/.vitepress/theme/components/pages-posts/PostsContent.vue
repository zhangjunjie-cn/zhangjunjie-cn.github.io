<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import ArticleCard from '../ArticleCard.vue'
import { data as articles } from '../articles.data'
import { articleIcon } from '../icons/articleIcons'
import TagPagination from '../pages-tags/TagPagination.vue'
import { useTagRing } from '../pages-tags/useTagRing'

/**
 * Vue port of https://note.weizwz.com/pages/posts.
 *
 * Same shell as /pages/tags (the original reuses one cloud component on both
 * routes) with three differences, all verified against the live page:
 *
 *   1. The cloud filters by **year** — 全部 + one pill per year that actually
 *      has articles — and a pill is just a label: no icon and no count (the tags
 *      page's pills carry both).
 *   2. The `h1` owns the count instead: "文章列表" + `- N篇`, which follows the
 *      selected year.
 *   3. `div.post-list` holds only the grid — there is no divider/heading on this
 *      route (the tags page has one), so the cards start immediately.
 *
 * The cloud's floating box behaves exactly as it does on /pages/tags: it jumps
 * onto whichever pill the pointer is over and fades away when the pointer leaves
 * the cloud (see `useTagRing`). The selected pill draws its own steady blue
 * border and yields it while it is the hovered one, so the box is never doubled.
 *
 * The list itself is **the site's own articles**: `articles.data.ts` reads every
 * markdown file's frontmatter at build time, so the years, the counts and the
 * cards below all follow the content instead of a captured JSON snapshot.
 */
const PAGE_SIZE = 12

/** The original's first filter is "全部" and is the default on every load. */
const ALL = '全部'
const YEAR_PARAM = 'year'

/** 全部 + every year present in the articles, newest first. */
const filters = computed(() => {
  const byYear = new Map<string, number>()
  for (const article of articles) {
    const year = article.date.slice(0, 4)
    if (year) byYear.set(year, (byYear.get(year) ?? 0) + 1)
  }
  return [
    { label: ALL, count: articles.length },
    ...[...byYear.entries()]
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([label, count]) => ({ label, count })),
  ]
})

// Deterministic at build time; `?year=` is read in onMounted, mirroring how the
// original carries the selection in the URL.
const currentFilter = ref(ALL)
const page = ref(1)

// The floating box follows the pointer across the cloud (see `useTagRing`).
const { ringStyle, hovered, popped, enter: enterPill, leave: leaveCloud } = useTagRing()

const currentCount = computed(
  () => filters.value.find((f) => f.label === currentFilter.value)?.count ?? 0,
)

const allPosts = computed(() =>
  articles
    .filter((article) => currentFilter.value === ALL || article.date.startsWith(currentFilter.value))
    .map((article) => ({
      title: article.title,
      description: article.description,
      date: article.date,
      tags: article.tags,
      href: article.href,
      icon: articleIcon(article.tags),
    })),
)

const pageCount = computed(() => Math.max(1, Math.ceil(allPosts.value.length / PAGE_SIZE)))

const posts = computed(() =>
  allPosts.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE),
)

function select(label: string) {
  if (label === currentFilter.value) return
  currentFilter.value = label
  // Switching filters restarts the list at page 1.
  page.value = 1
}

onMounted(() => {
  // The original deep-links a year as `?year=<YYYY>` and always defaults to 全部.
  const year = new URLSearchParams(window.location.search).get(YEAR_PARAM)
  if (year && filters.value.some((f) => f.label === year)) currentFilter.value = year
})
</script>

<template>
  <div class="mb-6">
    <h1 class="text-text1 mb-8 text-2xl! font-bold!">文章列表<span class="text-text3 ml-2 text-base">- {{ currentCount }}篇</span></h1>

    <div
      class="bg-bg shadow-shadow relative mt-6 flex flex-wrap items-center gap-1 rounded-2xl p-4 shadow-xs"
      @mouseleave="leaveCloud"
    >
      <div
        class="border-main pointer-events-none absolute rounded-2xl border transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        :class="popped ? 'scale-120' : 'scale-100'"
        :style="ringStyle"
      />

      <div
        v-for="filter in filters"
        :key="filter.label"
        class="relative z-10 flex cursor-pointer items-center justify-center rounded-2xl border border-transparent px-3 py-1 transition-all duration-300 hover:contrast-100"
        :class="[
          filter.label === currentFilter && hovered !== filter.label ? 'border-main! font-semibold contrast-100' : '',
          filter.label === currentFilter ? 'font-semibold contrast-100' : '',
        ]"
        @click="select(filter.label)"
        @mouseenter="enterPill($event, filter.label)"
      >
        <span class="text-sm font-medium">{{ filter.label }}</span>
      </div>
    </div>
  </div>

  <div>
    <div class="post-list">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="post in posts" :key="post.href">
          <ArticleCard v-bind="post" />
        </div>
      </div>
    </div>

    <TagPagination
      v-if="pageCount > 1"
      :page="page"
      :pages="pageCount"
      :total="currentCount"
      @navigate="page = $event"
    />
  </div>
</template>
