import { nextTick } from 'vue'

import { MOTION, prefersReducedMotion } from './motion'

/**
 * 标签 / 归档列表换内容。
 *
 * 现在切换标签、年份或翻页时，整块网格是一帧换掉的 —— 用户看不出「点了有没有生效」。
 * 这里按「先退、再换、再进」处理：
 *   1. 容器 140ms 淡出并轻微上移（旧内容退场）；
 *   2. 更新筛选状态；
 *   3. 新卡片按 48ms 间隔从下方 12px 淡入。
 *
 * 连续点击时不会互相覆盖：退场期间的点击先排队，等这一轮换完再生效。
 */
export function useListSwap(getRoot: () => HTMLElement | null | undefined) {
  let running = false
  let pending: (() => void) | null = null

  async function swap(mutate: () => void) {
    const root = getRoot()
    if (!root || prefersReducedMotion()) {
      mutate()
      return
    }
    if (running) {
      pending = mutate
      return
    }

    running = true
    const out = root.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-6px)' },
      ],
      { duration: 140, easing: 'cubic-bezier(0.4, 0, 1, 1)' },
    )
    await out.finished.catch(() => {})

    const run = pending ?? mutate
    pending = null
    run()
    await nextTick()

    const items = [...root.querySelectorAll<HTMLElement>('[data-list-item]')]
    items.forEach((el, index) => {
      // 清掉滚动揭示可能留下的内联透明度，否则动画结束后卡片仍是透明的。
      el.style.opacity = ''
      el.style.transform = ''
      el.animate(
        [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: MOTION.travel,
          delay: Math.min(index * 48, 240),
          easing: MOTION.easing.arrival,
          fill: 'backwards',
        },
      )
    })

    running = false
    if (pending) {
      const next = pending
      pending = null
      void swap(next)
    }
  }

  return { swap }
}
