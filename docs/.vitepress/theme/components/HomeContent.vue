<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeroCard from './HeroCard.vue'
import HomeVideoIntro from './HomeVideoIntro.vue'
import LatestArticles from './LatestArticles.vue'
import RecommendedCard from './RecommendedCard.vue'
import SwarmRebuild from './swarm/SwarmRebuild.vue'

/**
 * Body of the cloned note.weizwz.com home page (`/`).
 *
 * Extracted verbatim from `Layout.vue` when the tags page was added, so the
 * home route keeps rendering exactly the same markup. The two root nodes are
 * intentional — they are the two children `#main` had in the original.
 *
 * `HomeVideoIntro` is the one addition: a full-screen intro video with the
 * "开始" button, ported from zhangjunjie-cn.github.io. It takes the whole first
 * screen, and the original home body follows one screen below it.
 *
 * `SwarmRebuild`（群蜂重建）：视频开场之后接的重建动画 —— 页面被擦成黑曜石
 * 画布，一群设计光标用边界框、实时测量和打字机把整页重建出来
 * （复刻 github.com/JoelBastoneLopez/swarm-rebuild 的效果）。两个触发口：
 *   1. 点视频首屏的「开始」按钮 —— **每次点击都重新播一遍**（同时给 Web Audio
 *      提供了用户手势，自动播放策略才不会把声音拦掉）；
 *   2. 直接把视频首屏滚出视口 —— 每次加载自动接一次，之后不再打扰。
 * `prefers-reduced-motion` 的用户两个口都不触发，退回原来的下滑一屏。
 */

const rebuildActive = ref(false)
let autoFired = false
let heroObserver: IntersectionObserver | null = null

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function triggerRebuild() {
  if (rebuildActive.value || reducedMotion()) return
  rebuildActive.value = true
}

/** 「开始」按钮：每次点击都重播；不支持动效时退回原来的下滑一屏。 */
function onIntroStart(fallback: () => void) {
  if (reducedMotion()) {
    fallback()
    return
  }
  triggerRebuild()
}

onMounted(() => {
  // 没点按钮、直接把视频首屏滚走时自动接一次（同一页面只自动一次，
  // 免得以后每次往下翻都重播 —— 重播留给「开始」按钮）。
  const hero = document.querySelector('.home-intro')
  if (!hero) return
  heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (autoFired || entry.isIntersecting) return
      if (window.scrollY < window.innerHeight * 0.5) return
      autoFired = true
      triggerRebuild()
    },
    { threshold: 0 },
  )
  heroObserver.observe(hero)
})

onBeforeUnmount(() => {
  heroObserver?.disconnect()
  heroObserver = null
})
</script>

<template>
  <HomeVideoIntro @start="onIntroStart" />

  <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
    <div class="col-span-12 flex flex-col lg:col-span-7">
      <HeroCard />
    </div>
    <div class="col-span-12 flex flex-col lg:col-span-5">
      <RecommendedCard />
    </div>
  </div>

  <LatestArticles />

  <SwarmRebuild :active="rebuildActive" @finish="rebuildActive = false" />
</template>
