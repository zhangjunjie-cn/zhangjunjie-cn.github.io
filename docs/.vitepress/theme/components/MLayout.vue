<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
// import Giscus from '@giscus/vue'
import MAsideSponsors from "./MAsideSponsors.vue";
import { usePageId } from '../composables'
import imageViewer from "./imageViewer.vue"
import MNavVisitor from './MNavVisitor.vue'
import ValineComment from './ValineComment.vue'

import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

const { Layout } = DefaultTheme
const { isDark, theme, frontmatter } = useData()
const pageId = usePageId()

const { comment } = theme.value


const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  // @ts-ignore
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})


</script>

<template>
  <Layout v-bind="$attrs">
    <!--
      相关插槽
      https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
      https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
    -->
    <template #nav-bar-title-after>
      <ClientOnly>
        <MNavVisitor />
      </ClientOnly>
    </template>

    <!-- <template v-if="comment && frontmatter.comment !== false" #doc-footer-before>
      <div class="doc-comments">
        <ClientOnly>
          <Giscus
          id="comments"
          mapping="specific"
          :term="pageId"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          :theme="isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
          v-bind="{ ...comment }"
        />
        </ClientOnly>
        
      </div>
    </template> -->

    <!-- 插槽表 -->
    <template #doc-after>
      <ClientOnly>
        <ValineComment />
      </ClientOnly>
      
    </template>

    <!-- 右下加广告 -->
    <template #aside-ads-before>
      <ClientOnly>
        <MAsideSponsors />
      </ClientOnly>
      
    </template>

    <!-- 更好的图片窗格 -->
    <template #doc-bottom>
      <ClientOnly>
        <imageViewer />
      </ClientOnly>
      
    </template>

    <!-- 为较宽的屏幕的导航栏添加阅读增强菜单 -->
    <template #nav-bar-content-after>
      <ClientOnly>
        <NolebaseEnhancedReadabilitiesMenu />
      </ClientOnly>
      
    </template>

    <!-- 更好的为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单图片窗格 -->
    <template #nav-screen-content-after>
      <ClientOnly>
        <NolebaseEnhancedReadabilitiesScreenMenu />
      </ClientOnly>
      
    </template>

    <!-- 樱花 -->
    <!-- <canvas id="moefy-canvas"></canvas> -->



    
    




  </Layout>
</template>

<style>
.prev-next.prev-next {
  border-top: none;
}

.doc-comments {
  margin-top: 24px;
  margin-bottom: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}
</style>
