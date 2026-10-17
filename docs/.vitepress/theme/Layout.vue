<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, provide } from 'vue'
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
 * `clip-path: circle()` 从点击处往外铺/往回收。
 * `::view-transition-*` 的层级、以及关掉默认淡入淡出，都在 `styles/tailwind.css` 里，
 * 那里的 `.dark::view-transition-old(root)` 决定了两张快照谁在上 —— 因此变深色时被
 * 擦的是「旧」快照、变浅色时被擦的是「新」快照，方向不对称但和 versiw 一致。
 */
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => { ready: Promise<void> }
}

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
  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]

  const transition = doc.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  await transition.ready
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      // `fill: 'forwards'` 不能省。WAAPI 的 fill 默认是 'none'，动画一结束 clip-path
      // 就不再生效，而变深色时被擦的「旧」快照正压在 z-index 9999 上，clip 失效的那一帧
      // 会把整屏变回浅色 → 就是切换时那道白屏闪烁。forwards 让终值（circle(0px)）保持到
      // 过渡被拆掉为止（Teek 的实现同样带了这个参数）。
      fill: 'forwards',
      // 变深色时 `.dark` 已经把旧快照抬到最上，所以擦「旧」快照（圆往点击点收）；
      // 变浅色时反过来擦「新」快照（圆从点击点铺开）。层级的解释见 tailwind.css。
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
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
    <template #doc-footer-before><PostFooter /></template>
  </DefaultTheme.Layout>
</template>
