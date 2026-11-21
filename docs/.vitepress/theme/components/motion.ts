/**
 * 全站动效令牌。
 *
 * 三类动作各有一套时长与曲线，避免现在这种 300 / 500 / 600 / 1000ms 混用：
 *   · feedback —— 悬停、按下、聚焦这类输入反馈，必须快；
 *   · travel   —— 元素从 A 到 B 的位移；
 *   · arrival  —— 从无到有的入场（首屏之下、列表换内容）。
 * `stagger` 是同类元素依次入场的间隔，取 100ms（落在「每行 80–120ms 错开」的中段）。
 * CSS 侧的反馈过渡直接写 `duration-[160ms]`，与这里的 feedback 对齐。
 */
export const MOTION = {
  feedback: 160,
  travel: 480,
  arrival: 800,
  stagger: 100,
  easing: {
    feedback: 'cubic-bezier(0.2, 0, 0, 1)',
    travel: 'cubic-bezier(0.45, 0, 0.1, 1)',
    arrival: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
  },
} as const

/** 用户要求减少动效时不播放任何装饰性动画（反馈仍由 CSS 的短过渡承担）。 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
