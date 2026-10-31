import { reactive } from 'vue'

/**
 * 路由切换时的骨架屏状态机。
 *
 * 只做三件事：
 *   1. 计算目标页面该用哪一套骨架（首页 / 归档 / 标签 / 案例 / 游记 / 普通文档）；
 *   2. 延迟 180ms 才显示 —— VitePress 会按视口预取链接，命中缓存的跳转通常在
 *      一两帧内完成，先等一下就不至于闪一层骨架；
 *   3. 显示后至少停留 460ms，再等两帧让新页面真正提交到 DOM，才淡出。
 *
 * 首次访问不会触发：`router.go()` 在 `app.mount()` 之前就跑了，此时组件尚未挂载，
 * `mounted` 仍是 false；而静态站点首屏的 HTML 里已经是完整内容，本来也没有空白期。
 */
export type RouteSkeletonKind = 'home' | 'posts' | 'tags' | 'case' | 'travel' | 'doc'

export const routeSkeleton = reactive({
  shown: false,
  kind: 'doc' as RouteSkeletonKind,
})

/** 跳转快于这个时长时，用户根本看不到骨架，直接不显示。 */
const SHOW_DELAY = 180
/** 已经显示出来的骨架至少停留这么久，避免「闪一下就没」。 */
const MIN_VISIBLE = 460
/** 预览模式下，进入页面时骨架先亮这么久，让人看清形状。 */
const DEMO_HOLD = 2500

/**
 * 预览开关：网址后加 `?skeleton=1`。
 *
 * VitePress 会预取视口内的链接，正常跳转往往在几十毫秒内完成，走的是上面的
 * 180ms 阈值 —— 效果因此几乎看不到。加上这个参数后，进入页面会先把当前页
 * 的骨架亮 2.5 秒再揭开内容，之后的每次跳转也都立即显示骨架（至少 1.2 秒），
 * 方便逐个页面验收。
 */
const demo =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('skeleton') === '1'

let mounted = false
let pending = false
let showTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
let shownAt = 0

export function markRouteSkeletonMounted() {
  mounted = true
}

/** 预览模式入口：挂载后亮出当前页骨架，停留 `DEMO_HOLD` 后自动揭开。 */
export function startRouteSkeletonDemo(path: string) {
  if (!demo) return

  pending = false
  clearTimeout(showTimer)
  clearTimeout(hideTimer)
  routeSkeleton.kind = kindOf(path)
  shownAt = performance.now()
  routeSkeleton.shown = true
  hideTimer = setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (pending) return
        routeSkeleton.shown = false
      })
    })
  }, DEMO_HOLD)
}

function pathOf(href: string) {
  try {
    return new URL(href, 'http://skeleton.local').pathname
  } catch {
    return href
  }
}

/** 去掉结尾的 `/`、`/index`、`.html`，只留下可比较的路径。 */
function comparable(path: string) {
  return (
    path
      .replace(/\/index(?:\.html)?$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/+$/, '') || '/'
  )
}

function kindOf(path: string): RouteSkeletonKind {
  const target = comparable(path)
  if (target === '/') return 'home'
  // 用后缀而不是全等，站点以后挂到子路径（base）下也不会失效。
  if (target.endsWith('/pages/posts')) return 'posts'
  if (target.endsWith('/pages/tags')) return 'tags'
  if (target.endsWith('/pages/case')) return 'case'
  if (target.endsWith('/travel') || target.includes('/travel/')) return 'travel'
  return 'doc'
}

export function beginRouteSkeleton(href: string, currentPath: string) {
  if (!mounted) return

  const target = pathOf(href)
  // 只改 query / hash（比如点标签跳到 `?q=…`）时不算换页，别闪骨架。
  if (comparable(target) === comparable(currentPath)) return

  pending = true
  routeSkeleton.kind = kindOf(target)
  clearTimeout(showTimer)
  clearTimeout(hideTimer)

  // 预览模式下不再等 180ms，跳一下就能看到骨架。
  if (demo) {
    shownAt = performance.now()
    routeSkeleton.shown = true
    return
  }

  showTimer = setTimeout(() => {
    if (!pending) return
    shownAt = performance.now()
    routeSkeleton.shown = true
  }, SHOW_DELAY)
}

export function endRouteSkeleton() {
  if (!mounted) return

  pending = false
  clearTimeout(showTimer)
  if (!routeSkeleton.shown) return

  // 预览模式下跳一次只亮 1.2 秒就够看清了，正常模式按 MIN_VISIBLE 收敛。
  const minVisible = demo ? 1200 : MIN_VISIBLE
  const remaining = Math.max(0, minVisible - (performance.now() - shownAt))
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    // 等新页面完成一次提交（两帧）再揭开，避免露出上一页的残影。
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 这两帧里如果又开始了新的跳转，就继续留着骨架。
        if (pending) return
        routeSkeleton.shown = false
      })
    })
  }, remaining)
}
