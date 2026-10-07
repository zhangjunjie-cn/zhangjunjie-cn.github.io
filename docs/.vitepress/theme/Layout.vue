<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { bindFancybox, destroyFancybox } from './components/ImgViewer'
import HomeContent from './components/HomeContent.vue'
import CaseContent from './components/pages-case/CaseContent.vue'
import PostFooter from './components/PostFooter.vue'
import PostsContent from './components/pages-posts/PostsContent.vue'
import TagsContent from './components/pages-tags/TagsContent.vue'
import TravelContent from './components/pages-travel/TravelContent.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteNav from './components/SiteNav.vue'

/**
 * Theme layout for the cloned note.weizwz.com site.
 *
 * The original drives three routes with custom VitePress layouts
 * (`weiz-home`, …) selected by frontmatter:
 *   layout: home   → `/`                  (HomeContent)
 *   layout: tags   → `/pages/tags`        (pages-tags/TagsContent)
 *   layout: posts  → `/pages/posts`       (pages-posts/PostsContent)
 *   layout: case   → `/pages/case`        (pages-case/CaseContent)
 *
 * Everything else is an ordinary markdown article and is rendered by
 * VitePress's own doc layout (VPNav + VPSidebar + VPDoc + VPDocAside), exactly
 * as on the source site. `PostFooter` fills its `doc-footer-before` slot.
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

const { frontmatter } = useData()
const route = useRoute()

const layout = computed(() => (frontmatter.value.layout as string | undefined) ?? '')

const isCustomPage = computed(() =>
  (CUSTOM_LAYOUTS as readonly string[]).includes(layout.value),
)

// VitePress 1.6.4 also runs the router hooks for the first page, so this only
// covers the case where it does not; `Fancybox.bind` is idempotent per selector,
// so binding twice costs nothing.
onMounted(() => bindFancybox())
onUnmounted(() => void destroyFancybox())
</script>

<template>
  <div v-if="isCustomPage" class="site-shell bg-bg-soft flex min-h-screen flex-col">
    <SiteNav />

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

    <SiteFooter />
  </div>

  <DefaultTheme.Layout v-else>
    <template #doc-footer-before><PostFooter /></template>
  </DefaultTheme.Layout>
</template>
