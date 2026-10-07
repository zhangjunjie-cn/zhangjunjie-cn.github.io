<script setup lang="ts">
import { computed } from 'vue'
import { Content, useData } from 'vitepress'

import CaseBanner from './CaseBanner.vue'

/**
 * `/pages/case` —— Teek 主题的「案例」页，接入本项目（VitePress 1.6.4）。
 *
 * 结构照源站：横幅是**主题外壳**（读 frontmatter），正文是**一篇 markdown 文档**
 * ——`docs/pages/case.md` 里就是源站那篇 `20.资源/05.案例.md` 的内容（两级标题、
 * 17 个 `img-card` 原始 HTML、申请段落），由 VitePress 自带的 markdown 渲染，
 * 这里只是把它放进 `<div class="vp-doc"><div>`（与文章页 `.vp-doc > div > *` 的
 * 结构一致，因此标题渐变、正文链接、代码块等既有覆盖全部生效）。
 *
 * 横幅通栏：`-mt-[88px] / lg:-mt-24` 抵消 `Layout.vue` 的 `pt-16` 与 `main` 的
 * `p-6 lg:p-8`（64 + 24 / 64 + 32），让 500px 横幅顶到视口最上沿、被透明导航栏
 * 压住；左右则用 `.case-banner-bleed`（见 styles/tailwind.css）一直拉到视口两沿
 * —— 只靠 `-mx-6 lg:-mx-8` 只能抵消内边距，`#main` 的 `max-w-384` 居中留白消不掉。
 */
const { frontmatter } = useData()

const banner = computed(() => (frontmatter.value.banner ?? {}) as Record<string, string>)
const article = computed(() => (frontmatter.value.article ?? {}) as Record<string, string>)
</script>

<template>
  <div class="case-banner-bleed -mt-[88px] lg:-mt-24">
    <CaseBanner
      :title="String(frontmatter.title ?? '')"
      :cover="banner.cover"
      :breadcrumb="banner.breadcrumb"
      :category="banner.category"
      :tag="banner.tag"
      :article="article"
    />
  </div>

  <div class="vp-doc mb-6 pt-10">
    <div>
      <Content />
    </div>
  </div>
</template>
