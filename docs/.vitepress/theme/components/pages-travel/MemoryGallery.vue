<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

import { type Memory, type Weather } from './memories'
import MemoryCamera from './MemoryCamera.vue'
import MemoryCards from './MemoryCards.vue'
import MemoryHeader from './MemoryHeader.vue'
import MemoryList from './MemoryList.vue'

/**
 * `https://leelaa.cn/nostalgia.html` — the source's `LinePage` / `MemoryContent`.
 *
 * Two modes, exactly as on the source:
 *   list    — the hero band (particle canvas + cover lens + title) over the
 *             photo strip; picking one opens the camera on that photo.
 *             `variant` picks the strip: the source's own 3-column grid, or the
 *             card deck `<Swiper effect="cards">` uses.
 *   preview — the hero is unmounted and the camera fills the page.
 *
 * `memories` is required in practice: every caller is a `<Swiper>` (or a note
 * writing the component directly) that hands its own list down.
 */
const props = withDefaults(
  defineProps<{
    memories?: Memory[]
    variant?: 'grid' | 'cards'
    /** Swiper's `loop` / `rewind` — forwarded to the deck. */
    wrap?: boolean
    /** How the camera reaches Fancybox — forwarded as-is. */
    fullscreen?: 'image' | 'button'
    /** Hero band copy / particle effect — forwarded to `MemoryHeader`, which
     *  falls back to the source's own text. */
    title?: string
    subtitle?: string
    status?: string
    weather?: Weather
  }>(),
  { memories: undefined, variant: 'grid', wrap: false, fullscreen: 'image' },
)

const list = computed(() => props.memories ?? [])
const coverPic = computed(() => list.value[0]?.image ?? '')

const viewMode = ref<'list' | 'preview'>('list')
const currentIndex = ref(0)
const root = ref<HTMLElement | null>(null)

/** 顶部固定导航栏（`SiteNav` 是 `fixed h-16`），取景窗对齐时得给它让位。 */
const NAV_HEIGHT = 64

function viewMemory(index: number) {
  currentIndex.value = index
  viewMode.value = 'preview'
}

function backToList() {
  viewMode.value = 'list'
}

watch(viewMode, async (mode) => {
  const el = root.value
  await nextTick()
  if (mode === 'preview') {
    // 源站这里是 `window.scrollTo({ top: 10, behavior: 'smooth' })` —— 它整页只有
    // 一个记忆区，页面顶端就是取景窗，滚到 10 就等于「让取景窗占满屏幕」。一页
    // 挂两个 `<Swiper>` 之后这个绝对位置就错了：点开下面那个的相机，页面会被拉
    // 回顶端，看到的是上面那个记忆区，刚打开的相机反而在屏幕外。改成把**这一段**
    // 的取景窗顶到导航栏下沿，滚动始终落在相机窗格上。
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    return
  }
  // 同上，`.memory-card` 得在本实例里找 —— 一页两个记忆区时，全文档查询会拿到
  // 另一个记忆区的卡片。
  el?.querySelectorAll<HTMLElement>('.memory-card')
    [currentIndex.value]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
})
</script>

<template>
  <div ref="root" class="memory-gallery min-h-screen transition-colors duration-300">
    <MemoryHeader
      v-if="viewMode !== 'preview'"
      :memory-count="list.length"
      :cover-pic="coverPic"
      :title="title"
      :subtitle="subtitle"
      :status="status"
      :weather="weather"
    />
    <MemoryCards
      v-if="viewMode === 'list' && variant === 'cards'"
      :memories="list"
      :active-index="currentIndex"
      :wrap="wrap"
      @update="currentIndex = $event"
      @view-memory="viewMemory"
    />
    <MemoryList v-else-if="viewMode === 'list'" :memories="list" @view-memory="viewMemory" />
    <MemoryCamera
      v-else
      :memories="list"
      :current-index="currentIndex"
      :fullscreen="fullscreen"
      @change-index="currentIndex = $event"
      @close="backToList"
    />
  </div>
</template>
