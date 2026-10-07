import type { Theme } from 'vitepress'
import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { bindFancybox, destroyFancybox } from './components/ImgViewer'
import Layout from './Layout.vue'
import './styles/tailwind.css'
import './styles/fonts.css'

/**
 * Extends VitePress's default theme.
 *
 * The original site is a default-theme site: `/ai/…` pages are ordinary
 * markdown docs rendered by `VPDoc` (sidebar + outline + doc footer), while
 * `/`, `/pages/posts` and `/pages/tags` swap in custom bodies through
 * `frontmatter.layout`. Extending the default theme keeps `base.css`,
 * `vars.css` and the whole `VP*` component set available, and `Layout.vue`
 * only takes over the three custom routes.
 *
 * Markdown-facing components (`<PostMeta />`, `<Swiper :items="[…]" />`,
 * `<TravelCases />`, `<MemoryGallery />`, …) are no longer registered here one
 * by one: `unplugin-vue-components` in `config.mts` resolves anything that
 * lives under `theme/components/` on demand, so a new component works the
 * moment it is written into a note.
 */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ router }) {
    // Article images open full-screen in Fancybox. VitePress has no `update`
    // hook, so the gallery is re-bound on every route change instead.
    //
    // Both hooks must return their promise: VitePress awaits them, and
    // `Fancybox.destroy()` clears the openers map *and* detaches the delegated
    // click listener. Left un-awaited, that teardown can resolve after the next
    // page has already bound and leave the gallery click-dead.
    if (inBrowser) {
      router.onBeforeRouteChange = () => destroyFancybox()
      router.onAfterRouteChange = () => bindFancybox()
    }
  },
} satisfies Theme
