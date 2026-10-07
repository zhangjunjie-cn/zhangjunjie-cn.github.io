<script setup lang="ts">
import MemoryCanvas from './MemoryCanvas.vue'
import type { Weather } from './memories'

/**
 * The hero band — the source's `MemoryHeader`.
 *
 * A `min-h-[38vh]` region holding the particle canvas, the circular cover lens
 * (`PageHeroIcon` with `src`, i.e. the `.page-hero-icon` / `.page-hero-image`
 * variant) and the centred title block. It is unmounted while the camera is
 * open, which is what makes the preview fill the page.
 *
 * 文案与天气都能从 md 传进来（`<Swiper title subtitle status weather>`），默认
 * 值就是源站那一套 —— 同一篇里放两个图库时，各自写各自的，就不会撞成一样的
 * 「时光与记忆」。`{{ memoryCount }} 个记忆` 里的数字来自条目数，不用手写。
 */
withDefaults(
  defineProps<{
    memoryCount: number
    coverPic: string
    /** 大标题。 */
    title?: string
    /** 标题下面那行小字。 */
    subtitle?: string
    /** 圆点后面那行状态文字。 */
    status?: string
    /** 背后的粒子效果，见 `Weather`。 */
    weather?: Weather
  }>(),
  {
    title: '时光与记忆',
    subtitle: '奇怪，我的世界为什么一直在下雪，却没有你的足迹',
    status: '持续更新中...',
    weather: 'snow',
  },
)
</script>

<template>
  <div class="memory-hero relative min-h-[38vh] overflow-hidden">
    <MemoryCanvas :weather="weather" />
    <div class="relative z-10 flex h-full flex-col items-center justify-center pt-16 pb-14 md:pt-20 md:pb-16">
      <div class="relative mb-9">
        <div class="page-hero-icon" aria-hidden="true">
          <!-- 装饰性的圆形封面（`not` 让 Fancybox 不去接管它）。 -->
          <img class="not page-hero-image" :src="coverPic" alt="记忆封面" />
        </div>
      </div>
      <div class="space-y-3 text-center select-none">
        <h1 class="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">{{ title }}</h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">{{ subtitle }}</p>
        <div class="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-center space-x-2">
            <div class="memory-live-dot h-2 w-2 rounded-full" />
            <span>{{ status }}</span>
          </div>
          <span>•</span>
          <span>{{ memoryCount }} 个记忆</span>
        </div>
      </div>
    </div>
  </div>
</template>
