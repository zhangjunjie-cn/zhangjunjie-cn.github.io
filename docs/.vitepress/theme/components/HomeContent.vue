<script setup lang="ts">
import { ref } from 'vue'
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
 * （复刻 github.com/JoelBastoneLopez/swarm-rebuild 的效果）。唯一触发口：
 * 点视频首屏的「开始」按钮 —— **每次点击都重新播一遍**（同时给 Web Audio
 * 提供了用户手势，自动播放策略才不会把声音拦掉）。
 * `prefers-reduced-motion` 的用户不触发，退回原来的下滑一屏。
 */

const rebuildActive = ref(false)

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
