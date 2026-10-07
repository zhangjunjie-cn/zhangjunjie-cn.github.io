<script setup lang="ts">
import HeroCard from './HeroCard.vue'
import HomeVideoIntro from './HomeVideoIntro.vue'
import LatestArticles from './LatestArticles.vue'
import RecommendedCard from './RecommendedCard.vue'

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
 */
</script>

<template>
  <HomeVideoIntro />

  <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
    <div class="col-span-12 flex flex-col lg:col-span-7">
      <HeroCard />
    </div>
    <div class="col-span-12 flex flex-col lg:col-span-5">
      <RecommendedCard />
    </div>
  </div>

  <LatestArticles />
</template>
