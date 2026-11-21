<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import AnimatedNumber from './AnimatedNumber.vue'
import { MOTION, prefersReducedMotion } from './motion'

type Stat = {
  label: string
  value: number
  /** 进度条目标宽度，写成百分比字符串，同时作为 `data-width` 交给动画读取。 */
  fill: string
}

const stats: readonly Stat[] = [
  { label: '总访问量', value: 221001, fill: '73.7475%' },
  { label: '独立访客', value: 101994, fill: '49.165%' },
]

const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

/**
 * 数字由 `AnimatedNumber` 负责；这里只让两条进度条在卡片进入视口时从 0 长到目标宽度。
 * 首屏内的卡片保持终值，避免「一切都在动」。
 */
onMounted(() => {
  if (prefersReducedMotion()) return
  const el = root.value
  if (!el) return
  if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

  const bars = [...el.querySelectorAll<HTMLElement>('[data-bar]')]
  for (const bar of bars) bar.style.width = '0%'

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer?.disconnect()
      observer = null
      bars.forEach((bar, index) => {
        const width = bar.dataset.width ?? '0%'
        const animation = bar.animate([{ width: '0%' }, { width }], {
          duration: MOTION.arrival,
          delay: index * 120,
          easing: MOTION.easing.arrival,
          fill: 'both',
        })
        animation
          .finished.catch(() => {})
          .finally(() => {
            bar.style.width = width
          })
      })
    },
    { threshold: 0.3 },
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div
    ref="root"
    class="stats-card group bg-bg shadow-shadow relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 shadow-xs transition-all duration-600 hover:shadow-xl"
  >
    <div class="mb-6 flex items-center justify-between">
      <div class="text-text1 text-lg font-bold">访问统计</div>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        class="h-4 w-4"
      >
        <path
          fill="currentColor"
          d="M3 12h2v9H3zm16-4h2v13h-2zm-8-6h2v19h-2z"
        />
      </svg>
    </div>
    <div class="flex flex-col gap-6">
      <div v-for="stat in stats" :key="stat.label">
        <div class="mb-1 flex items-end justify-between">
          <span class="text-text2 text-sm font-bold">{{ stat.label }}</span>
          <span class="text-text1 text-base font-bold">
            <AnimatedNumber :value="stat.value" />
          </span>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            data-bar
            :data-width="stat.fill"
            :style="{ width: stat.fill }"
            class="bg-main h-full rounded-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
