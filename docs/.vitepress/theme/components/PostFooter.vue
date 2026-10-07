<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

import {
  footerIconAuthor,
  footerIconCcBadge,
  footerIconCopyright,
  footerIconLink,
} from './icons/postIcons'

/**
 * Ported verbatim from the original's `VPDocFooter`. It fills the default
 * theme's `doc-footer-before` slot, so it renders *above* 在GitHub编辑本页 /
 * 最后更新于 / 上一篇·下一篇 — the same order as the source page.
 *
 * The tag pills come from the article's own frontmatter, so a new post only
 * needs `tags: [...]`.
 */
const { frontmatter, page } = useData()

const tags = computed<string[]>(() => {
  const value = frontmatter.value.tags
  return Array.isArray(value) ? value.map(String) : []
})

/** 原站展示的是文章在源站的规范地址，由当前页面路径推导，不写死。 */
const canonicalUrl = computed(
  () =>
    `https://note.weizwz.com/${page.value.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`,
)
</script>

<template>
  <div>
    <div class="border-border hover:border-main relative rounded-lg border p-4 transition-all duration-200">
      <div class="flex flex-col sm:flex-row sm:items-start">
        <span class="text-main mb-1 flex shrink-0 items-center font-bold sm:mb-0"><span class="contents" v-html="footerIconAuthor" />文章作者: </span><span class="break-all sm:pl-2"><a href="https://weizwz.com" target="_blank" class="font-medium underline underline-offset-2">weizwz</a></span>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-start">
        <span class="text-main mb-1 flex shrink-0 items-center font-bold sm:mb-0"><span class="contents" v-html="footerIconLink" />文章链接: </span><span class="break-all sm:pl-2"><a :href="canonicalUrl" class="font-medium underline underline-offset-2">{{ canonicalUrl }}</a></span>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-start">
        <span class="text-main mb-1 flex shrink-0 items-center font-bold sm:mb-0"><span class="contents" v-html="footerIconCopyright" />版权声明: </span><span class="leading-6 sm:pl-2"> 本站文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank" class="font-medium underline underline-offset-2">BY-NC-SA 4.0</a> 许可协议， 转载请注明来自 <a href="" class="font-medium underline underline-offset-2">唯知笔记</a>！ </span>
      </div>
      <span class="contents" v-html="footerIconCcBadge" />
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
