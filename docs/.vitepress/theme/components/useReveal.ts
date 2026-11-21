import { onBeforeUnmount } from 'vue'

import { MOTION, prefersReducedMotion } from './motion'

/**
 * 首屏之下的 `[data-reveal]` 元素进入视口时上浮淡入。
 *
 * 三条克制规则：
 *   · 首屏内（`top < 0.92 * innerHeight`）的元素不动 —— 它们已经由路由入场负责，
 *     再叠一层会显得页面在「抖」；
 *   · 只在客户端运行，SSR 输出的永远是可见内容，JS 失效也不会白屏；
 *   · 同一帧进入视口的元素按 DOM 顺序错开最多 280ms，读起来是一批，不是一串。
 */
export function useReveal(getRoot: () => HTMLElement | null | undefined) {
  let observer: IntersectionObserver | null = null
  let queued: HTMLElement[] = []
  let frame = 0

  function disconnect() {
    observer?.disconnect()
    observer = null
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    queued = []
  }

  function flush() {
    frame = 0
    const group = queued
    queued = []
    group.forEach((el, index) => {
      const animation = el.animate(
        [
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: MOTION.arrival,
          delay: Math.min(index * MOTION.stagger, 280),
          easing: MOTION.easing.arrival,
          fill: 'backwards',
        },
      )
      animation
        .finished.catch(() => {})
        .finally(() => {
          el.style.opacity = ''
          el.style.transform = ''
        })
    })
  }

  function refresh() {
    disconnect()
    if (prefersReducedMotion()) return

    const root = getRoot()
    if (!root) return

    const all = [...root.querySelectorAll<HTMLElement>('[data-reveal]')]
    // 先把上一轮留下的内联状态清掉，避免复用的节点保持透明。
    for (const el of all) {
      el.style.opacity = ''
      el.style.transform = ''
    }

    const pending = all.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92,
    )
    if (!pending.length) return

    for (const el of pending) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer?.unobserve(entry.target)
          queued.push(entry.target as HTMLElement)
        }
        if (queued.length && !frame) frame = requestAnimationFrame(flush)
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    pending.forEach((el) => observer?.observe(el))
  }

  onBeforeUnmount(disconnect)

  return { refresh, stop: disconnect }
}
