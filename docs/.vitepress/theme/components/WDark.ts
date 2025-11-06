import { nextTick, provide } from 'vue'
// 判断是否能使用 startViewTransition
const enableTransitions = () =>
	'startViewTransition' in document &&
	window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// 切换动画
export const toggleDark = (isDark) => {
  provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
    //如果不支持动效直接切换
    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }
    document.documentElement.style.setProperty('--darkX', x + 'px')
    document.documentElement.style.setProperty('--darkY', y + 'px')
    // 原生的视图转换动画 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/startViewTransition
    // pnpm add -D @types/dom-view-transitions 解决 document.startViewTransition 类型错误的问题
    
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
    ]
    
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready

  document.documentElement.animate(
		{clipPath: isDark.value ? clipPath.reverse() : clipPath},
		{
			duration: 300,
			easing: 'ease-in',
			pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
		}
	)
  })
}
