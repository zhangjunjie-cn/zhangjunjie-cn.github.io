<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

import { footerIconCreativeCommons } from './icons/postIcons'

/**
 * Ported from the original's `WDocPublic`. It fills the default theme's
 * `doc-footer-before` slot, so it renders *above* 在GitHub编辑本页 /
 * 最后更新于 / 上一篇·下一篇 — the same order as the source page.
 *
 * The tag pills come from the article's own frontmatter, so a new post only
 * needs `tags: [...]`.
 */
const { frontmatter, page } = useData()

const SITE_ORIGIN = 'https://zhangjunjiee.netlify.app'
const SITE_NAME = '俊杰笔记'
const AUTHOR = '张俊杰'

const tags = computed<string[]>(() => {
  const value = frontmatter.value.tags
  return Array.isArray(value) ? value.map(String) : []
})

const title = computed(() => page.value.title || String(frontmatter.value.title ?? ''))

/** `cleanUrls: true`：去掉 `.md` 与目录的 `index`，再拼上对外域名。 */
const canonicalUrl = computed(() => {
  const path = page.value.relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
  return `${SITE_ORIGIN}/${path}`
})

/** 未加引号的 YAML 日期是 `Date`，加了引号是字符串；统一成 YYYY-MM-DD。 */
const published = computed(() => {
  const value = frontmatter.value.date
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string') return value.slice(0, 10)
  return ''
})
</script>

<template>
  <div>
    <div class="bg-bg-block relative overflow-hidden rounded-lg p-6 transition-all duration-200">
      <div class="relative z-1">
        <div class="text-text1 text-base font-bold">{{ title }}</div>
        <a :href="canonicalUrl" class="font-semibold break-all hover:underline">{{ canonicalUrl }}</a>
        <div class="mt-3 flex flex-wrap gap-x-8 gap-y-2">
          <div class="flex flex-col">
            <span class="text-text3 leading-5">作者</span>
            <a :href="SITE_ORIGIN + '/'" target="_blank" class="font-semibold">{{ AUTHOR }}</a>
          </div>
          <div v-if="published" class="flex flex-col">
            <span class="text-text3 leading-5">发布于</span>
            <span>{{ published }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-text3 leading-5">许可协议</span>
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank" class="font-semibold">CC BY-NC-SA 4.0</a>
          </div>
          <div class="flex flex-col">
            <span class="text-text3 leading-5">声明</span>
            <span>转载请注明来自 <a :href="SITE_ORIGIN + '/'" target="_blank" class="font-semibold">{{ SITE_NAME }}</a></span>
          </div>
        </div>
      </div>
      <span class="contents" v-html="footerIconCreativeCommons" />
    </div>
  </div>
  <div class="mt-4 mb-12">
    <div class="flex flex-wrap gap-2">
      <a
        v-for="tag in tags"
        :key="tag"
        :href="`/pages/tags?q=${encodeURIComponent(tag)}`"
        class="border-main text-main hover:bg-main inline-block rounded-full border px-3 py-1 text-xs transition-all duration-200 hover:text-white!"
      >{{ tag }}</a>
    </div>
  </div>
</template>
