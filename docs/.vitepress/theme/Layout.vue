<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, provide, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// 原生导航栏组件。深路径是 VitePress 内部结构，`exports` 里放开了 `./dist/*` 才能这样引；
// 这样自定义布局页也能用上默认主题那套导航栏，阅读增强菜单因此有了统一挂载点。
import VPNav from 'vitepress/dist/client/theme-default/components/VPNav.vue'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import { bindFancybox, destroyFancybox } from './components/ImgViewer'
import { bindPrompts, destroyPrompts } from './components/Prompt'
import BlogBackground from './components/BlogBackground.vue'
import RstackMenu from './components/RstackMenu.vue'
import HomeContent from './components/HomeContent.vue'
import CaseContent from './components/pages-case/CaseContent.vue'
import PostFooter from './components/PostFooter.vue'
import RouteSkeleton from './components/RouteSkeleton.vue'
import AsideRail from './components/AsideRail.vue'
import ThemePreference from './components/ThemePreference.vue'
import PostsContent from './components/pages-posts/PostsContent.vue'
import TagsContent from './components/pages-tags/TagsContent.vue'
import TravelContent from './components/pages-travel/TravelContent.vue'
import SiteFooter from './components/SiteFooter.vue'

/**
 * Theme layout for the cloned note.weizwz.com site.
 *
 * The original drives five routes with custom layouts selected by frontmatter:
 *   layout: home   → `/`                  (HomeContent)
 *   layout: tags   → `/pages/tags`        (pages-tags/TagsContent)
 *   layout: posts  → `/pages/posts`       (pages-posts/PostsContent)
 *   layout: case   → `/pages/case`        (pages-case/CaseContent)
 *   layout: travel → `/travel/**`         (pages-travel/TravelContent)
 *
 * Everything else is an ordinary markdown article and is rendered by
 * VitePress's own doc layout (VPNav + VPSidebar + VPDoc + VPDocAside), exactly
 * as on the source site. `PostFooter` fills its `doc-footer-before` slot.
 *
 * The custom shell renders VitePress's own `VPNav` too, replacing the hand-made
 * navbar this file used to ship, so every route shares a single navbar and a
 * single mounting point for `#nav-bar-content-after` — which is where the
 * Nolebase readabilities menu lives.
 *
 * Custom shell geometry measured on the original:
 *   .Layout.weiz-home   background: oklch(98.5% .002 247.839)  (bg-bg-soft)
 *   .VPContent          padding-top: 64px  (clears the fixed navbar)
 *   #main               mx-auto w-full max-w-384 p-6 lg:p-8
 *   .VPFooter           100px tall
 *
 * `#main` carries `:key="route.path"` so a route change builds a new element —
 * see the `rises`/`looming` block in `styles/tailwind.css`. The original gets
 * that for free because each of its layouts is its own component (its `#main`
 * is replaced on every navigation); here one `<main>` hosts all four layouts, so
 * without the key Vue would patch it in place and the entry animation would only
 * ever run once.
 */
const CUSTOM_LAYOUTS = ['home', 'tags', 'posts', 'case', 'travel'] as const

const { frontmatter, isDark } = useData()
const route = useRoute()

const layout = computed(() => (frontmatter.value.layout as string | undefined) ?? '')

const isCustomPage = computed(() =>
  (CUSTOM_LAYOUTS as readonly string[]).includes(layout.value),
)

// Banner pages (currently just `/pages/case`) put a 500px hero right under the
// fixed navbar. There the navbar should start fully transparent — white text
// sitting on the banner — and turn into the ordinary opaque bar as soon as the
// page scrolls, the way Teek's own navbar does on its case page. The `banner`
// frontmatter is the signal; the styling lives in the `site-shell--over-banner`
// block of `styles/tailwind.css`.
const overBanner = computed(() => Boolean(frontmatter.value.banner))

// 从普通页面点进横幅页时，导航栏上一帧还是不透明的白底，而 `.VPNavBar` 自带
// 0.25s 的 background-color 过渡 —— 于是会先白一下、再淡成透明。挂一个只活两帧的
// 标记把这次过渡掐掉，进入就是全透明；页内滚动时的透明↔不透明渐变不受影响。
watch(overBanner, (value) => {
  if (!value) return
  const root = document.documentElement
  root.classList.add('nav-over-banner-instant')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.classList.remove('nav-over-banner-instant'))
  })
})

/**
 * 明暗切换的「圆形擦除」过渡 —— 仿 docs.versiw.com（教程见
 * note.weizwz.com/vitepress/basic/dark-animation）。
 *
 * VitePress 的开关（导航栏与窄屏抽屉共用的 `VPSwitchAppearance`）只做一件事：
 * `inject('toggle-appearance')`，拿不到才退回家默认的 `isDark.value = !isDark.value`；
 * 而它是用 `@click="toggleAppearance"` 绑的，点击事件会一起传进来
 * （见 `VPSwitchAppearance.vue` L8-10 / L26）。所以在本布局层 `provide` 同名函数
 * 就能接管全站的两个开关 —— 既不用监听 DOM，也不用替换组件。
 *
 * 动画走 View Transitions API：在 `startViewTransition` 的回调里改 `isDark`，
 * 「旧快照」在回调前抓、「新快照」在回调后抓，明暗两帧因此都在正确的时间点定格。
 * 回调里的 `await nextTick()` 是必须的：`isDark` 是 @vueuse 的 `useDark`，真正
 * 把 `dark` 类toggle 到 `<html>` 上要走一次 Vue 调度。等 `ready` 之后再用
 * `clip-path: circle()` 走方向相反的两条动画：变浅色是白圆从按钮往外铺，变深色
 * 是暗色从四周往按钮收。
 * `::view-transition-*` 的整体层级和「关掉默认淡入淡出」在 `styles/tailwind.css` 里；
 * 两个方向的动画都只裁「新快照」，层级是静态的（新在上），不依赖 CSS 变量的解析时机。
 */
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

// `animate()` 的返回值必须留个引用，否则可能被 GC 回收、动画当场取消，clip 一失效
// 会闪一下。但引用不能无脑留着：过渡结束后伪元素会重建，上一次残留的
// `fill: 'forwards'` 动画会在下一次过渡里继续生效 —— 新快照一上来就是「全屏可见」，
// 于是第二次切深色没有动画、切浅色先整屏发白。所以过渡 `finished` 时手动 cancel。
let clipAnimation: Animation | null = null

provide('toggle-appearance', async (event: MouseEvent) => {
  const doc = document as ViewTransitionDocument

  // 不支持 View Transitions（Firefox、旧 Safari）或用户要减少动效时，直接切。
  if (
    !doc.startViewTransition ||
    !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    isDark.value = !isDark.value
    return
  }

  const { clientX: x, clientY: y } = event
  // 半径取到离点击点最远的那两个视口边，圆形一定能铺满整屏。
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  // 两个方向刻意不对称：
  //   深 → 浅：白色圆从按钮往外铺，把深色盖掉；
  //   浅 → 深：反过来，暗色从四周往按钮收。
  // 两条动画都只裁「新快照」，而新快照在 CSS 里恒压在最上层（见 tailwind.css）。
  // 哪张快照在上不再取决于 CSS 变量 / `z-index` 动画 —— 这两个在真实 Chrome/Edge
  // 里会在第二次过渡沿用旧值、或者干脆不生效，于是出现「没有动画」「先白屏一下」。
  //   深 → 浅：用可插值的 `circle()`，圆从 0 涨到满；
  //   浅 → 深：圆是「挖洞」，`circle()` 只能裁内部，所以用 `path(evenodd)` 生成一串
  //             具体路径（矩形减去圆），洞从满缩到 0。路径字符串不可插值，所以按
  //             帧拆成多段，让离散跳变细到看不出来。
  const toDark = !isDark.value
  const root = document.documentElement
  const transition = doc.startViewTransition(async () => {
    isDark.value = toDark
    await nextTick()
  })
  await transition.ready

  let keyframes: Keyframe[]
  let easing: string
  if (toDark) {
    const steps = 60
    const w = window.innerWidth
    const h = window.innerHeight
    keyframes = Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps
      // 手写 ease-in，因为下面必须用 linear（离散关键帧没法逐段缓动）。
      const r = radius * (1 - t * t)
      const hole =
        r > 0
          ? ` M${x - r} ${y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 Z`
          : ''
      return { offset: t, clipPath: `path(evenodd, "M0 0 H${w} V${h} H0 Z${hole}")` }
    })
    easing = 'linear'
  } else {
    keyframes = [
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
    ]
    easing = 'ease-in'
  }

  clipAnimation = root.animate(keyframes, {
    duration: 300,
    easing,
    // `fill: 'forwards'` 不能省：动画一结束 clip-path 就不再生效，压在 9999 上的新
    // 快照会整屏露出来 → 就是切换时那道闪烁。
    fill: 'forwards',
    pseudoElement: '::view-transition-new(root)',
  })
  // 过渡一结束就把动画撤掉（cancel 在伪元素销毁之后，不会闪）；留着的话下一次
  // 过渡会沿用它的终值，新快照直接整屏可见。
  const animation = clipAnimation
  transition.finished
    .catch(() => {})
    .finally(() => {
      animation.cancel()
      if (clipAnimation === animation) clipAnimation = null
    })
})

// VitePress 1.6.4 also runs the router hooks for the first page, so this only
// covers the case where it does not; `Fancybox.bind` is idempotent per selector,
// so binding twice costs nothing. Same for the Prompt cards — that one is *not*
// idempotent (it owns a timer), so `bindPrompts` clears the previous run first.
onMounted(() => {
  bindFancybox()
  bindPrompts()
})
onUnmounted(() => {
  void destroyFancybox()
  destroyPrompts()
})
</script>

<template>
  <div
    v-if="isCustomPage"
    class="site-shell bg-bg-soft flex min-h-screen flex-col"
    :class="{ 'site-shell--over-banner': overBanner }"
  >
    <VPNav>
      <template #nav-bar-title-before><RstackMenu /></template>
      <template #nav-bar-content-after><NolebaseEnhancedReadabilitiesMenu /></template>
      <template #nav-screen-content-after><NolebaseEnhancedReadabilitiesScreenMenu /></template>
    </VPNav>

    <div class="flex-1 pt-16">
      <main id="main" :key="route.path" class="mx-auto w-full max-w-384 p-6 lg:p-8" style="padding-top: 0px;
">
        <TagsContent v-if="layout === 'tags'" />
        <PostsContent v-else-if="layout === 'posts'" />
        <CaseContent v-else-if="layout === 'case'" />
        <TravelContent v-else-if="layout === 'travel'" />
        <HomeContent v-else />
      </main>
    </div>

    <!-- 首页底部插画：和 vp.teek.top 页脚那张一样的那排动物。图片底部压进页脚 20px，
         爪子落在更白的页脚（bg-bg）上。放在 #main 之外，免得 #main 路由入场动画的
         `transform` 把自己变成层叠上下文、把这层 z-index 困在里面被页脚盖住。 -->
    <p v-if="layout === 'home'" class="home-animals">
      <img
        src="/sites/vp.teek.top-a50b27f5/root-8a5edab2/images/animals.webp"
        alt=""
        width="750"
        height="80"
        loading="lazy"
      />
    </p>

    <SiteFooter />
  </div>

  <DefaultTheme.Layout v-else>
    <template #nav-bar-title-before><RstackMenu /></template>
    <template #nav-bar-content-after><NolebaseEnhancedReadabilitiesMenu /></template>
    <template #nav-screen-content-after><NolebaseEnhancedReadabilitiesScreenMenu /></template>
    <!-- `doc-top` 落在 `.VPDoc` 的最上面（内容之前），背景层因此只铺在文档页。 -->
    <template #doc-top><BlogBackground /></template>
    <!-- 右侧目录的电路导轨（复刻 ui.nuxt.com）：挂在目录组件之前的槽位，
         绝对定位到 `.aside-container`，几何按实际目录项实时测量。 -->
    <template #aside-outline-before><AsideRail /></template>
    <!-- 左侧栏顶部的品牌色开关（复刻 cn.vuejs.org 的 preference-switch /
         preference-tooltip）：气泡里是 Rspress 的品牌色板，选色即改 `--site-main`。 -->
    <template #sidebar-nav-before><ThemePreference /></template>
    <template #doc-footer-before><PostFooter /></template>
  </DefaultTheme.Layout>

  <!-- 路由切换骨架屏：Teleport 到 body，固定在导航栏之下、内容之上。 -->
  <RouteSkeleton />
</template>
