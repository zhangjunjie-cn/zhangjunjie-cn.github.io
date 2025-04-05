---
editLink: false
footer: false
aside: false
outline: false
sidebar: false
showRainbow: true
pageClass: all-features-page
---

<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { computed, toRef, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as features } from './../.vitepress/theme/composables/index.data'

const query = useUrlSearchParams('hash-params', { removeFalsyValues: true })
const search = toRef(query, 'search') as Ref<string | null>
const tags = toRef(query, 'tags') as Ref<string | null>
const tagsArr = computed({
  get: () => tags.value?.toLowerCase().split(',').map(t => t.trim()).filter(Boolean) ?? [],
  set: (val: string[]) => query.tags = val.join(','),
})

const filteredFeatures = computed(() => {
  const s = search.value?.toLowerCase().trim()
  const t = tagsArr.value
  return Object.values(features).filter(feature => {
    return (!s || feature.title.toLowerCase().includes(s) || feature.description.toLowerCase().includes(s))
      && (!t?.length || t.every(tag => feature.tags?.includes(tag)))
  })
})

function resetFilters() {
  query.search = null
  query.tags = null
}

function removeTag(tag: string) {
  tagsArr.value = tagsArr.value.filter(t => t !== tag)
}
</script>
 
<br/>
<br/>

# 旅行日记

本页是 作者 隐藏的相对独立的文章列表。手账里的潦草灵感、备忘录上的零散思考、朋友圈里即兴分享的摄影，都是生活最鲜活的切片 —— 相信「记录」本身就是一种创造。在快门声与键盘敲击声中，把成长的点滴酿成时光的标本。如果你想，也可以阅读 <LinkInline link="guide/index" />。

<div flex items-center mt-6 gap-6>
  <div
    flex items-center rounded-md
    px3 py2 gap-2 border-2 border-solid border-transparent
    class="bg-$vp-c-bg-alt focus-within:border-color-$vp-c-brand"
  >
    <carbon:search text-sm op-80 />
    <input
      v-model="search"
      type="search" text-base
      placeholder="查找文章..."
    />
  </div>
  <div
    v-if="tagsArr.length"
    flex items-center gap-1
  >
    <carbon:tag text-sm mr-1 op-80 />
    <FeatureTag v-for="tag in tagsArr" :key="tag" :tag removable @remove="removeTag(tag)"/>
  </div>
</div>

<ClientOnly>
<FeaturesOverview :features="filteredFeatures" />
</ClientOnly>

<div v-if="filteredFeatures.length === 0" class="w-full mt-6 op-80 flex flex-col items-center">
  找不到匹配的功能
  <button class="block select-button flex-inline gap-1 items-center px-2 py-1 hover:bg-gray-400/10 rounded" @click="resetFilters()">
    <carbon:filter-remove />
    清空搜索条件
  </button>
</div>

<style>
.all-features-page .VPDoc > .container > .content {
  max-width: 72vw !important;
}
</style>

<style>
:root {
  overflow-y: scroll;
}
</style>
