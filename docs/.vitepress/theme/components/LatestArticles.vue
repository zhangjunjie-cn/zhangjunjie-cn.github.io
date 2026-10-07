<script setup lang="ts">
import { computed } from 'vue'

import ArticleCard from './ArticleCard.vue'
import StatsCard from './StatsCard.vue'
import { data as articles } from './articles.data'
import {
  articleIcon,
  viewAllArrowIcon,
} from './icons/articleIcons'

/**
 * 「最新文章」 grid.
 *
 * The list comes from `articles.data.ts`, which reads every markdown file's
 * frontmatter at build time and sorts it by `date:` (newest first) — so
 * publishing a new article is enough, nothing here is hard-coded.
 */
const latest = computed(() =>
  articles.map((article) => ({
    title: article.title,
    description: article.description,
    date: article.date,
    tags: article.tags,
    href: article.href,
    icon: articleIcon(article.tags),
  })),
)
</script>

<template>
  <section class="flex flex-col">
    <div class="mb-8 flex items-center justify-between px-6">
      <h2 class="text-text1 text-2xl! font-bold!">最新文章</h2>
      <a
        href="/pages/posts"
        class="text-main! group flex items-center font-medium"
      >
        查看全部
        <span v-html="viewAllArrowIcon" />
      </a>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ArticleCard
        v-for="article in latest.slice(0, 3)"
        :key="article.href"
        v-bind="article"
      />
      <!-- The stats card is the 4th grid cell in the original, not the last —
           i.e. it ends the first row of four. -->
      <StatsCard />
      <ArticleCard
        v-for="article in latest.slice(3)"
        :key="article.href"
        v-bind="article"
      />
    </div>
  </section>
</template>
