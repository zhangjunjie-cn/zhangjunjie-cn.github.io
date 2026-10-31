<script setup lang="ts">
import { computed, onMounted } from 'vue'

import {
  markRouteSkeletonMounted,
  routeSkeleton,
  startRouteSkeletonDemo,
} from './useRouteSkeleton'

/**
 * 路由切换骨架屏。
 *
 * 盖在页面内容上、压在导航栏下面（`z-index` 低于 `.VPNav` 的 30，也低于文档页
 * 固定侧栏的 25），所以切换文档时左侧栏仍然可用，只是正文换成骨架。
 *
 * 每类页面一套形状：首页是首屏视频的替身；归档 / 标签是「标题 + 筛选云 + 卡片
 * 网格」；案例页是「500px 横幅 + 图片网格」；游记是宽幅图集；其余 markdown 页面
 * 是「正文列 + 右侧目录」。
 */
const kind = computed(() => routeSkeleton.kind)

onMounted(() => {
  markRouteSkeletonMounted()
  // `?skeleton=1` 时先把当前页骨架亮 2.5 秒，方便验收每一套形状。
  startRouteSkeletonDemo(window.location.pathname)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="route-skeleton">
      <div
        v-if="routeSkeleton.shown"
        class="route-skeleton"
        :class="`route-skeleton--${kind}`"
        aria-hidden="true"
      >
        <div class="route-skeleton__inner">
          <!-- 首页：整屏视频 + 底部「开始」按钮的替身 -->
          <div v-if="kind === 'home'" class="sk-home">
            <div class="sk sk-home__stage" />
            <div class="sk sk-home__start" />
          </div>

          <!-- 归档 / 标签：标题 + 筛选云 + 文章卡片 -->
          <div v-else-if="kind === 'posts' || kind === 'tags'" class="sk-list">
            <div class="sk sk-heading" />
            <div class="sk-cloud">
              <div v-for="n in 9" :key="n" class="sk sk-pill" />
            </div>
            <div class="sk-grid">
              <div v-for="n in 8" :key="n" class="sk-card">
                <div class="sk sk-line sk-line--date" />
                <div class="sk sk-line sk-line--title" />
                <div class="sk sk-line sk-line--desc" />
                <div class="sk sk-line sk-line--desc-short" />
                <div class="sk-card__tags">
                  <div class="sk sk-line sk-line--tag" />
                  <div class="sk sk-line sk-line--tag-short" />
                </div>
              </div>
            </div>
          </div>

          <!-- 案例页：横幅 + 图片网格 -->
          <div v-else-if="kind === 'case'" class="sk-case">
            <div class="sk sk-case__banner" />
            <div class="sk-case__body">
              <div class="sk sk-heading" />
              <div class="sk-case__grid">
                <div v-for="n in 6" :key="n" class="sk sk-case__image" />
              </div>
              <div class="sk-lines sk-case__lines">
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
              </div>
            </div>
          </div>

          <!-- 游记：宽幅图集 + 正文 -->
          <div v-else-if="kind === 'travel'" class="sk-travel">
            <div class="sk sk-heading" />
            <div class="sk-travel__grid">
              <div v-for="n in 6" :key="n" class="sk sk-travel__image" />
            </div>
            <div class="sk-lines">
              <div class="sk sk-line" />
              <div class="sk sk-line" />
              <div class="sk sk-line" />
              <div class="sk sk-line" />
            </div>
          </div>

          <!-- 文档：正文列 + 右侧目录（左侧栏是真实的，保持可见） -->
          <div v-else class="sk-doc">
            <div class="sk-doc__main">
              <div class="sk sk-doc__title" />
              <div class="sk-doc__meta">
                <div class="sk sk-doc__meta-item" />
                <div class="sk sk-doc__meta-item" />
              </div>
              <div class="sk-lines">
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
              </div>
              <div class="sk sk-doc__code" />
              <div class="sk-lines">
                <div class="sk sk-line" />
                <div class="sk sk-line" />
                <div class="sk sk-line" />
              </div>
              <div class="sk sk-doc__image" />
            </div>

            <aside class="sk-doc__aside">
              <div class="sk sk-doc__aside-title" />
              <div v-for="n in 9" :key="n" class="sk sk-doc__aside-line" />
            </aside>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ---------------------------------------------------------------------------
   外壳：盖住页面内容，压住导航栏之下、文档侧栏之上。
   --------------------------------------------------------------------------- */
.route-skeleton {
  position: fixed;
  inset: 0;
  z-index: 20;
  overflow: hidden;
  background: var(--site-bg);
  cursor: progress;
}

.route-skeleton--home,
.route-skeleton--posts,
.route-skeleton--tags,
.route-skeleton--case,
.route-skeleton--travel {
  background: var(--site-bg-soft);
}

.route-skeleton__inner {
  width: 100%;
  max-width: 1536px;
  height: 100%;
  margin: 0 auto;
  padding: calc(var(--vp-nav-height, 64px) + 24px) 24px 24px;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .route-skeleton__inner {
    padding-right: 32px;
    padding-bottom: 32px;
    padding-left: 32px;
  }
}

.route-skeleton--home .route-skeleton__inner,
.route-skeleton--case .route-skeleton__inner {
  max-width: none;
  padding: 0;
}

/* 文档页：正文从「导航栏 + VPDoc 的 48px」之下开始，左侧给固定侧栏让位。 */
.route-skeleton--doc .route-skeleton__inner {
  max-width: none;
  padding: calc(var(--vp-nav-height, 64px) + 48px) 24px 0;
}

@media (min-width: 768px) {
  .route-skeleton--doc .route-skeleton__inner {
    padding-right: 32px;
    padding-left: 32px;
  }
}

@media (min-width: 960px) {
  .route-skeleton--doc .route-skeleton__inner {
    padding-left: calc(var(--vp-sidebar-width, 272px) + 32px);
  }
}

/* 超宽屏沿用 VitePress 自己的公式：侧栏变宽、内容区在 1536px 的最大布局内居中。 */
@media (min-width: 1440px) {
  .route-skeleton--doc .route-skeleton__inner {
    padding-right: calc((100vw - var(--vp-layout-max-width, 1536px)) / 2 + 32px);
    padding-left: calc(
      (100vw - var(--vp-layout-max-width, 1536px)) / 2 + var(--vp-sidebar-width, 272px) + 32px
    );
  }
}

/* ---------------------------------------------------------------------------
   骨架块与流光
   --------------------------------------------------------------------------- */
.sk {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: color-mix(in srgb, var(--site-text3) 20%, transparent);
}

.sk::after {
  position: absolute;
  inset: 0;
  content: '';
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--site-bg) 62%, transparent),
    transparent
  );
  animation: route-skeleton-shimmer 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.dark .sk {
  background: color-mix(in srgb, var(--site-text3) 34%, transparent);
}

.dark .sk::after {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.09), transparent);
}

@keyframes route-skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* 同一屏里的骨架错开一点，流光不会齐刷刷同步。 */
.sk-grid > :nth-child(2n) .sk::after,
.sk-card__tags .sk::after {
  animation-delay: 0.18s;
}

.sk-grid > :nth-child(3n) .sk::after {
  animation-delay: 0.36s;
}

/* ---------------------------------------------------------------------------
   通用元素
   --------------------------------------------------------------------------- */
.sk-line {
  height: 14px;
  border-radius: 6px;
}

.sk-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sk-lines > .sk-line:nth-child(2) {
  width: 94%;
}

.sk-lines > .sk-line:nth-child(3) {
  width: 88%;
}

.sk-lines > .sk-line:nth-child(4) {
  width: 97%;
}

.sk-lines > .sk-line:nth-child(5) {
  width: 82%;
}

.sk-lines > .sk-line:nth-child(6) {
  width: 74%;
}

.sk-heading {
  width: 168px;
  height: 32px;
  margin: 32px 0;
  border-radius: 10px;
}

/* ---------------------------------------------------------------------------
   首页
   --------------------------------------------------------------------------- */
.sk-home {
  position: absolute;
  inset: 0;
}

.sk-home__stage {
  position: absolute;
  inset: 0;
  border-radius: 0;
}

.sk-home__start {
  position: absolute;
  bottom: 8%;
  left: 50%;
  width: 132px;
  height: 48px;
  transform: translateX(-50%);
  border-radius: 999px;
}

/* ---------------------------------------------------------------------------
   归档 / 标签
   --------------------------------------------------------------------------- */
.sk-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 16px;
  background: var(--site-bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}

.sk-pill {
  width: 56px;
  height: 28px;
  border-radius: 16px;
}

.sk-cloud > .sk-pill:nth-child(3n) {
  width: 74px;
}

.sk-cloud > .sk-pill:nth-child(4n) {
  width: 64px;
}

.sk-cloud > .sk-pill:nth-child(5n) {
  width: 90px;
}

.sk-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}

@media (min-width: 640px) {
  .sk-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .sk-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .sk-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.sk-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 190px;
  padding: 24px;
  border-radius: 16px;
  background: var(--site-bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}

.sk-line--date {
  width: 44%;
  height: 11px;
}

.sk-line--title {
  width: 84%;
  height: 20px;
}

.sk-line--desc {
  width: 100%;
}

.sk-line--desc-short {
  width: 88%;
}

.sk-card__tags {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.sk-line--tag {
  width: 40px;
  height: 10px;
}

.sk-line--tag-short {
  width: 32px;
  height: 10px;
}

/* ---------------------------------------------------------------------------
   案例页
   --------------------------------------------------------------------------- */
.sk-case__banner {
  width: 100%;
  height: 500px;
  border-radius: 0;
}

.sk-case__body {
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 24px 24px;
}

@media (min-width: 1024px) {
  .sk-case__body {
    padding: 0 32px 32px;
  }
}

.sk-case__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}

@media (min-width: 768px) {
  .sk-case__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .sk-case__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.sk-case__image {
  aspect-ratio: 16 / 9;
  border-radius: 12px;
}

.sk-case__lines {
  margin-top: 32px;
}

/* ---------------------------------------------------------------------------
   游记
   --------------------------------------------------------------------------- */
.sk-travel__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .sk-travel__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .sk-travel__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.sk-travel__image {
  aspect-ratio: 16 / 9;
  border-radius: 12px;
}

/* ---------------------------------------------------------------------------
   文档
   --------------------------------------------------------------------------- */
.sk-doc {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 944px;
  margin: 0 auto;
}

.sk-doc__main {
  width: 100%;
  max-width: 688px;
}

.sk-doc__title {
  width: 58%;
  height: 34px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.sk-doc__meta {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}

.sk-doc__meta-item {
  width: 108px;
  height: 12px;
  border-radius: 6px;
}

.sk-doc__meta-item + .sk-doc__meta-item {
  width: 72px;
}

.sk-doc .sk-lines {
  margin-bottom: 28px;
}

.sk-doc__code {
  height: 168px;
  margin-bottom: 28px;
  border-radius: 10px;
}

.sk-doc__image {
  height: 220px;
  margin-top: 28px;
  border-radius: 10px;
}

.sk-doc__aside {
  display: none;
  flex-shrink: 0;
  width: 256px;
  padding-left: 32px;
}

@media (min-width: 1280px) {
  .sk-doc__aside {
    display: block;
  }
}

.sk-doc__aside-title {
  width: 64px;
  height: 14px;
  margin-bottom: 20px;
  border-radius: 6px;
}

.sk-doc__aside-line {
  height: 10px;
  margin-bottom: 12px;
  border-radius: 5px;
}

.sk-doc__aside-line:nth-child(3n) {
  width: 78%;
}

.sk-doc__aside-line:nth-child(3n + 2) {
  width: 62%;
}

/* ---------------------------------------------------------------------------
   进出场与降级
   --------------------------------------------------------------------------- */
.route-skeleton-enter-active {
  transition: opacity 200ms ease-out;
}

.route-skeleton-leave-active {
  transition: opacity 220ms ease-in;
}

.route-skeleton-enter-from,
.route-skeleton-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .sk::after {
    animation: none;
  }

  .route-skeleton-enter-active,
  .route-skeleton-leave-active {
    transition: none;
  }
}
</style>
