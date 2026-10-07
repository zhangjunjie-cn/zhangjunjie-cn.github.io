<script setup lang="ts">
import { Content } from 'vitepress'

/**
 * `/travel/**` —— 游记正文（`travel/test.md` 等），由 frontmatter 的
 * `layout: travel` 选中。
 *
 * 与案例页一样，正文就是**一篇 markdown**；区别是这里没有横幅，所以直接把
 * `<Content />` 放进 `.vp-doc`。走 `Layout.vue` 的自定义外壳是为了拿到全宽的
 * `#main`：记忆网格在 1440 视口下因此有 1376px（源站 leelaa.cn/nostalgia 是
 * 1380px），而文章页那条 688px 的正文列会把它挤成 229px 宽的小卡片。
 */
</script>

<template>
  <div class="vp-doc mb-6">
    <div><Content /></div>
  </div>
</template>
