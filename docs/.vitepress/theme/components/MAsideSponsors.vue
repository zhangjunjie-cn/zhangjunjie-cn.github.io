
<!-- 右下角二维码 -->
<script setup lang="ts">
import { VPDocAsideSponsors } from 'vitepress/theme'

const data = [
  {
    items: [{ img: 'https://gitee.com/zhangjunjiee/article-images/raw/master/images/httpszhangjunjiee.gitee.iodocs%20(1).png' }]
  },
  {
    items: [{ img: 'https://gitee.com/zhangjunjiee/article-images/raw/master/images/httpszhangjunjiee.gitee.iodocs.png' }]
  }
]
</script>

<template>
  <VPDocAsideSponsors :data="data" />
</template>

<style>
.vp-sponsor-grid.medium .vp-sponsor-grid-image {
  max-height: 90px;
}
</style>
