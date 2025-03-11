<template>
  <div :class="class">

   <Layout>
    
     <template #doc-footer-before>
       <ClientOnly>
         <Copyright
           v-if="(frontmatter?.aside ?? true) && (frontmatter?.showArticleMetadata ?? true) && !(frontmatter.authorLink)"
           :key="md5(page.relativePath)" />
       </ClientOnly>
     </template>

     <template #doc-bottom>
       <ClientOnly>
         <imageViewer />
       </ClientOnly>
     </template>

     <template #nav-bar-title-after>
       <ClientOnly>
         <NavVisitor />
       </ClientOnly>
     </template>


     <!-- <template #doc-after>
       <ClientOnly>
         <Comment v-if="(theme.commentConfig?.showComment ?? true) && (frontmatter?.showComment ?? true)"
           :commentConfig="theme.commentConfig" :key="md5(page.relativePath)" />
       </ClientOnly>
     </template> -->


     <template #layout-bottom>
       <ClientOnly>
         <Footer v-if="!hasSidebar && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" />
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


     


   </Layout>

   <template>
       <Sakula />
       <BodyClick />
   </template>

   
 
</div>
</template>

<script lang="ts" setup>
 import { computed } from 'vue';
 import DefaultTheme from 'vitepress/theme';
 import { useData } from 'vitepress';
 import md5 from 'blueimp-md5';
 import Copyright from './components/layout/Copyright.vue';
//  import Comment from './components/layout/Comment.vue';
 import Footer from './components/layout/Footer.vue';
 import imageViewer from './components/imageViewer.vue';
 import NavVisitor from './components/NavVisitor.vue';
 import { isDesktop } from "./utils"; 
 import BodyClick from "./components/BodyClick.vue";
 import Sakula from "./components/Sakula.vue";

 import { 
 NolebaseEnhancedReadabilitiesMenu, 
 NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

 const { Layout } = DefaultTheme;
 const { page, theme, frontmatter } = useData();

 const hasSidebar = computed(() => {
   return (
     frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
   )
 });


 //视图过渡
import { nextTick, provide } from 'vue'

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