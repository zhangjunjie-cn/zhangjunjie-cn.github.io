<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import ArticleCard from '../ArticleCard.vue'
import { data as articles } from '../articles.data'
import { articleIcon } from '../icons/articleIcons'
import { TagDefaultIcon, tagIcons } from '../icons/tagIcons'
import TagPagination from './TagPagination.vue'
import { useTagRing } from './useTagRing'

/**
 * Vue port of https://note.weizwz.com/pages/tags.
 *
 * The original renders the tag cloud and a post list for the *currently selected*
 * tag; selecting a tag is pure client-side filtering (the pills are `<div>`s with
 * click handlers, not links).
 *
 * The tag list is **derived from the site's own articles**: `articles.data.ts`
 * reads every markdown file's frontmatter at build time, so the cloud (labels,
 * counts and order) follows the content. A tag's glyph comes from `tagIcons`,
 * the map extracted from the original site, and falls back to a generic tag
 * shape for labels it does not know.
 *
 * The grid holds 12 posts per page; tags with more posts get the Pagination
 * block underneath (measured on the original: it is absent below 13 posts).
 */
const PAGE_SIZE = 12

/** One pill per distinct tag, most-used first (ties broken alphabetically). */
const tags = computed(() => {
  const counts = new Map<string, number>()
  for (const article of articles) {
    for (const tag of article.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count, icon: tagIcons[label] ?? TagDefaultIcon }))
    .sort((a, b) => b.count - a.count || (a.label < b.label ? -1 : 1))
})

// Deterministic on the server / at build time; randomised in onMounted, which is
// what the original does on every load when no ?q= is present.
const currentTag = ref(tags.value[0]?.label ?? '')
const page = ref(1)

// The floating box follows the pointer across the cloud (see `useTagRing`).
const { ringStyle, hovered, popped, enter: enterPill, leave: leaveCloud } = useTagRing()

const currentCount = computed(
  () => tags.value.find((t) => t.label === currentTag.value)?.count ?? 0,
)

const allPosts = computed(() =>
  articles
    .filter((article) => article.tags.includes(currentTag.value))
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
  if (label === currentTag.value) return
  currentTag.value = label
  // Switching tags restarts the list at page 1.
  page.value = 1
}

onMounted(() => {
  const requested = new URLSearchParams(window.location.search).get('q')
  if (requested && tags.value.some((t) => t.label === requested)) {
    currentTag.value = requested
  } else {
    // Verified: the original picks a random tag on every load without ?q=.
    const pick = tags.value[Math.floor(Math.random() * tags.value.length)]
    if (pick) currentTag.value = pick.label
  }
})
</script>

<template>
  <div class="mb-6">
    <h1 class="text-text1 mb-8 text-2xl! font-bold!">标签列表</h1>

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
        v-for="tag in tags"
        :key="tag.label"
        class="relative z-10 flex cursor-pointer items-center justify-center rounded-2xl border border-transparent px-3 py-1 transition-all duration-300 hover:contrast-100"
        :class="[
          tag.label === currentTag && hovered !== tag.label ? 'border-main! font-semibold contrast-100' : '',
          tag.label === currentTag ? 'font-semibold contrast-100' : '',
        ]"
        @click="select(tag.label)"
        @mouseenter="enterPill($event, tag.label)"
      >
        <!-- `contents` keeps the wrapper out of the layout box so the inner <svg>
             stays the flex item, exactly as in the original markup. -->
        <span class="contents" v-html="tag.icon" />
        <span class="text-sm font-medium">{{ tag.label }}</span>
        <!-- The original pads the count with a non-breaking space. -->
        <span class="text-text3 mt-1 text-xs font-bold">&nbsp;{{ tag.count }}</span>
      </div>
    </div>
  </div>

  <div>
    <div class="post-list">
      <div class="bg-border relative my-12 h-px w-full">
        <h3 class="bg-bg-soft text-text1 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-baseline gap-1 px-6 text-xl! font-bold!">
          {{ currentTag }}
          <span class="text-text3 text-sm"> - {{ currentCount }}篇</span>
        </h3>
      </div>

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
