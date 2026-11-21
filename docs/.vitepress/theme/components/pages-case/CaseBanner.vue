<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { prefersReducedMotion } from '../motion'
import {
  analyzeIconAuthor,
  analyzeIconCreated,
  analyzeIconReadTime,
  analyzeIconUpdated,
  analyzeIconViews,
  analyzeIconWords,
} from '../icons/caseIcons'

/**
 * Vue port of Teek's `tk-article-banner` as it appears on /resources/case.html:
 * a 500px hero (blurred cover + brand-coloured overlay), a breadcrumb, the
 * category / tag pills, the `<h1>`, the `tk-article-analyze` row (作者 / 创建时间 /
 * 更新时间 / 文章字数 / 预计阅读时长 / 浏览量) and the animated wave along the
 * bottom edge (`.tk-banner-waves` → the "水波纹": four layered paths translating
 * forever).
 *
 * Everything comes from the page's frontmatter, the way Teek drives it from the
 * markdown's own frontmatter. Geometry, colours and the animation were read off the
 * source with CDP `CSS.getMatchedStylesForNode`; the declarations live in
 * `theme/styles/tailwind.css` under the `tk-article-banner` / `tk-banner-waves` /
 * `tk-article-analyze` blocks, with Teek's `--tk-*` tokens resolved to literals.
 *
 * The 500px hero runs right up to the top of the viewport, under the fixed
 * navbar — which on this page starts transparent with white text (the
 * `site-shell--over-banner` block in `styles/tailwind.css`), matching the
 * source, and only turns opaque as the page scrolls. `-mt-[88px] / lg:-mt-24` in
 * CaseContent cancels the shell's `pt-16` plus `#main`'s padding so the hero
 * really does start at y = 0.
 */
type BannerArticle = {
  author: string
  authorUrl: string
  created: string
  updated: string
  words: string
  readTime: string
  views: string
}

defineProps<{
  title: string
  cover: string
  breadcrumb: string
  category: string
  tag: string
  article: BannerArticle
}>()

/* 封面视差：页面滚动时封面在 0 → -40px 之间缓慢上移，横幅滚出视口时到位。
   用 rAF 按帧写入 transform，避免滚动回调里反复改样式。减少动效时不动。 */
const root = ref<HTMLElement | null>(null)
const coverEl = ref<HTMLElement | null>(null)
let ticking = false

function applyParallax() {
  ticking = false
  const el = root.value
  const img = coverEl.value
  if (!el || !img) return
  const rect = el.getBoundingClientRect()
  const progress = Math.min(1, Math.max(0, -rect.top / rect.height))
  // 关掉 img 自身 `transition: all 0.2s`，让位移跟手，不被逐帧缓动拖出残影。
  img.style.transition = 'transform 0s'
  img.style.transform = `translate3d(0, ${-40 * progress}px, 0)`
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(applyParallax)
}

onMounted(() => {
  if (prefersReducedMotion()) return
  applyParallax()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div ref="root" class="tk-article-banner">
    <div class="tk-article-banner__wrapper">
      <div class="tk-article-banner__cover">
        <img ref="coverEl" :src="cover" alt="cover" />
      </div>

      <div class="tk-article-banner__info">
        <div class="tk-breadcrumb tk-banner-enter" style="animation-delay: 0ms">
          <span class="tk-breadcrumb__item">
            <span class="tk-breadcrumb__inner">
              <a href="/" title="首页" aria-label="首页" class="tk-breadcrumb__home">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576"
                  />
                </svg>
              </a>
            </span>
            <span class="tk-breadcrumb__separator" role="presentation">/</span>
          </span>
          <span class="tk-breadcrumb__item" aria-current="page">
            <span class="tk-breadcrumb__inner">{{ breadcrumb }}</span>
            <span class="tk-breadcrumb__separator" role="presentation">/</span>
          </span>
        </div>

        <div class="tk-article-banner__meta tk-banner-enter" style="animation-delay: 60ms">
          <div class="categories">
            <span class="meta-info category" :title="category">{{ category }}</span>
          </div>
          <div class="tags">
            <span class="meta-info tag" :title="tag"><span>#</span><span>{{ tag }}</span></span>
          </div>
        </div>

        <h1 class="tk-banner-enter" style="animation-delay: 120ms">{{ title }}</h1>

        <!-- 元信息行：源站的 `tk-article-analyze`，位置、图标、字号都照搬。 -->
        <div class="tk-article-analyze tk-banner-enter" style="animation-delay: 180ms" aria-label="文章分析">
          <div class="tk-article-analyze__wrapper">
            <div class="tk-article-info" role="group" aria-label="文章信息">
              <span class="tk-article-info__item" role="group" aria-label="作者">
                <i class="tk-icon tk-article-info__icon" aria-hidden="true" v-html="analyzeIconAuthor" />
                <a :href="article.authorUrl" :title="article.author" target="_blank" rel="noreferrer">{{ article.author }}</a>
              </span>
              <span class="tk-article-info__item" role="group" aria-label="创建时间">
                <i class="tk-icon tk-article-info__icon" aria-hidden="true" v-html="analyzeIconCreated" />
                <a title="创建时间">{{ article.created }}</a>
              </span>
              <span class="tk-article-info__item" role="group" aria-label="更新时间">
                <i class="tk-icon tk-article-info__icon" aria-hidden="true" v-html="analyzeIconUpdated" />
                <a title="更新时间">{{ article.updated }}</a>
              </span>
            </div>

            <div class="tk-analyze-cell">
              <i class="tk-icon" aria-hidden="true" v-html="analyzeIconWords" />
              <a title="文章字数">{{ article.words }}</a>
            </div>
            <div class="tk-analyze-cell">
              <i class="tk-icon" aria-hidden="true" v-html="analyzeIconReadTime" />
              <a title="预计阅读时长">{{ article.readTime }}</a>
            </div>
            <div class="tk-analyze-cell">
              <i class="tk-icon" aria-hidden="true" v-html="analyzeIconViews" />
              <a title="浏览量">{{ article.views }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The wave: `#gentle-wave` tiled four times, each at its own y-offset,
         opacity and duration, drifting side to side forever. -->
    <svg
      class="tk-banner-waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
      aria-hidden="true"
    >
      <defs>
        <path
          id="tk-gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use class="use" xlink:href="#tk-gentle-wave" x="48" y="0" />
        <use class="use" xlink:href="#tk-gentle-wave" x="48" y="3" />
        <use class="use" xlink:href="#tk-gentle-wave" x="48" y="5" />
        <use class="use" xlink:href="#tk-gentle-wave" x="48" y="7" />
      </g>
    </svg>
  </div>
</template>
