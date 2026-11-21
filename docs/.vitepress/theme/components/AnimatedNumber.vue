<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { MOTION, prefersReducedMotion } from './motion'

/**
 * 会滚动的数字。
 *
 * SSR 与首次渲染始终输出最终值（不会因为没 JS 就显示 0）。挂载后分两种情况：
 *   · 元素在首屏内 —— 保持终值，不为了动而动；
 *   · 元素在首屏之下 —— 先归零，等进入视口再滚到目标值。
 * 值发生变化（切换标签、翻页）时，从上一个值滚到新值，只动变化的这一处。
 */
const props = withDefaults(defineProps<{ value: number; duration?: number }>(), {
  duration: MOTION.arrival,
})

const root = ref<HTMLElement | null>(null)
const shown = ref(props.value)

let frame = 0
let observer: IntersectionObserver | null = null

function formatted(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

function stop() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
}

function roll(from: number, to: number, duration: number) {
  stop()
  if (prefersReducedMotion() || duration <= 0) {
    shown.value = to
    return
  }
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    shown.value = from + (to - from) * eased
    if (t < 1) {
      frame = requestAnimationFrame(tick)
    } else {
      frame = 0
      shown.value = to
    }
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (prefersReducedMotion()) return
  const el = root.value
  if (!el) return
  // 首屏内不动，只让首屏之下的数字从 0 滚上来。
  if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

  shown.value = 0
  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer?.disconnect()
      observer = null
      roll(0, props.value, props.duration)
    },
    { threshold: 0.2 },
  )
  observer.observe(el)
})

watch(
  () => props.value,
  (next, previous) => {
    if (next === previous) return
    roll(previous, next, MOTION.travel)
  },
)

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <span ref="root" class="tabular-nums">{{ formatted(shown) }}</span>
</template>
