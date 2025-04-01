<template>
  <div :class="class">
    
    <ClientOnly>
      <Fireworks />
   <Layout>
     <template #doc-footer-before>
         <Copyright
           v-if="(frontmatter?.aside ?? true) && (frontmatter?.showArticleMetadata ?? true) && !(frontmatter.authorLink)"
           :key="md5(page.relativePath)" />
     </template>

     <template #doc-bottom>
         <imageViewer />
     </template>

     <template #nav-bar-title-after>
         <NavVisitor />
     </template>


     <!-- <template #doc-after>
       <ClientOnly>
         <Comment v-if="(theme.commentConfig?.showComment ?? true) && (frontmatter?.showComment ?? true)"
           :commentConfig="theme.commentConfig" :key="md5(page.relativePath)" />
       </ClientOnly>
     </template> -->


     <template #layout-bottom>
         <!-- <Footer v-if="!hasRainbow && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" /> -->
         <ReloadPrompt />
     </template>

     <!-- 为较宽的屏幕的导航栏添加阅读增强菜单 -->
    <template #nav-bar-content-after>
        <NolebaseEnhancedReadabilitiesMenu />
    </template>

    <!-- 更好的为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单图片窗格 -->
    <template #nav-screen-content-after>
        <NolebaseEnhancedReadabilitiesScreenMenu />     
    </template>

    <template #aside-outline-before>
        <ShareButton />     
    </template>

    <template #layout-top>
        <Rainbow v-if="!hasRainbow && (theme.footerConfig?.showRainbow ?? false) && (frontmatter?.showRainbow ?? false)"/>     
    </template>


    <template #sidebar-nav-before>
      <br/>
      <div flex="~ col gap-2">
        <div v-if="route.data?.frontmatter?.tags" class="bg-$vp-tag p4 rounded-lg"  flex="~ col gap-2">
          <div font-bold text-sm op75>
            📌 标签
          </div>
          <div flex="~ wrap gap-2">
            <FeatureTag v-for="tag in route.data.frontmatter.tags" :key="tag" :tag="tag" />
          </div>
        </div>
        <div v-if="route.data?.frontmatter?.since" class="bg-$vp-c-bg-soft px2 pb2 rounded-lg" flex="~ col gap-1">
          <div font-bold text-sm op75 px2 pt4>
            要求版本
          </div>
          <VPMenuLink
            :item="{
              text: route.data.frontmatter.since,
              link: `https://github.com/slidevjs/slidev/releases/tag/${route.data.frontmatter.since}`,
            }"
          />
        </div>
      </div>
    </template>

    </Layout>
    </ClientOnly>
    <template>
        <Sakula />
        <!-- <BodyClick /> -->
        <!-- 鼠标点击烟花效果 -->
        
    </template>

  </div>
</template>

<script lang="ts" setup>
 import { computed } from 'vue';
 import DefaultTheme from 'vitepress/theme';
 import { useData,useRoute } from 'vitepress';
 import md5 from 'blueimp-md5';
 import Copyright from './components/layout/Copyright.vue';
//  import Comment from './components/layout/Comment.vue';
 import Footer from './components/layout/Footer.vue';
 import imageViewer from './components/imageViewer.vue';
 import NavVisitor from './components/NavVisitor.vue';
 import { isDesktop } from "./utils"; 
 import BodyClick from "./components/BodyClick.vue";
 import Sakula from "./components/Sakula.vue";
 import Fireworks from './components/Fireworks.vue';
 import ReloadPrompt from './components/ReloadPrompt.vue';
 import { ShareButton } from '@theojs/lumen'

 import { 
 NolebaseEnhancedReadabilitiesMenu, 
 NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

const route = useRoute()
 const { Layout } = DefaultTheme;
 const { page, theme, frontmatter } = useData();

 const hasRainbow = computed(() => {
   return (
     frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
     //aside 未关闭（≠ false）且当前是不是首页布局（layout: 'home'） 时，hasRainbow 才会返回 true，否则返回 false。
   )
 });


 //视图过渡
import { nextTick, provide } from 'vue'
import Rainbow from './components/Rainbow.vue';

const { isDark } = useData()

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
     Math.max(y, innerHeight - y)
   )}px at ${x}px ${y}px)`
 ]

 await document.startViewTransition(async () => {
   isDark.value = !isDark.value
   await nextTick()
 }).ready

 document.documentElement.animate(
   { clipPath: isDark.value ? clipPath.reverse() : clipPath },
   {
     duration: 330,
     easing: 'ease-out',
     pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
   }
 )
})
</script>

<!-- <style scoped>
::view-transition-old(root),
::view-transition-new(root) {
 animation: none;
 mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
 z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
 z-index: 9999;
}

.VPSwitchAppearance {
 width: 22px !important;
}

.VPSwitchAppearance .check {
 transform: none !important;
}

</style> -->