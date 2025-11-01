<template>
      <DefaultTheme.Layout>
        
    <!-- 彩虹背景 -->
    <template #layout-top>
        <Rainbow v-if="!hasRainbow && (theme.footerConfig?.showRainbow ?? false) && (frontmatter?.showRainbow ?? false)"/>     
    </template>


    <!-- 底部作者栏目及标签 -->
    <template #doc-footer-before>
      <WDocPublic />
    </template>


    <!-- 左侧目录标签栏 -->
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
          <!-- <VPMenuLink
            :item="{
              text: route.data.frontmatter.since,
              link: `https://github.com/slidevjs/slidev/releases/tag/${route.data.frontmatter.since}`,
            }"
          /> -->
        </div>
      </div>
    </template>
    </DefaultTheme.Layout>
</template>


<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { computed } from 'vue';
import { useData,useRoute } from 'vitepress';

import { toggleDark } from './components/WDark'     //导入视图过渡配置
import  WDocPublic  from './components/WDocPublic.vue';

import Rainbow from './components/Rainbow.vue';   //彩虹背景
const { isDark } = useData()
// 实现切换主题过渡动画
toggleDark(isDark);

const route = useRoute()
const { theme, frontmatter } = useData();

 const hasRainbow = computed(() => {
   return (
     frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
     //aside 未关闭（≠ false）且当前是不是首页布局（layout: 'home'） 时，hasRainbow 才会返回 true，否则返回 false。
   )
 });

</script>

