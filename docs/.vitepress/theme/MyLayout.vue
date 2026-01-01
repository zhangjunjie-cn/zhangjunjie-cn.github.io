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

    <!-- 底部音乐播放器 -->
    <template #layout-bottom>
      <!-- 添加v-if条件控制显示 -->
      <MusicPlayer v-if="showMusicPlayer" />
    </template>

    <!-- 左侧目录标签栏 -->
    <template #sidebar-nav-before>
      <br/>
      <div flex="~ col gap-2">
        <div v-if="route.data?.frontmatter?.tags" class="bg-$vp-tag p4 rounded-lg"  flex="~ col gap-2">
          <div font-bold text-sm op75>
            ✨ 标签
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
import { computed, defineAsyncComponent, ref, onMounted } from 'vue';  // 添加了defineAsyncComponent, ref, onMounted
import { useData, useRoute } from 'vitepress';

import { toggleDark } from './components/WDark'
import WDocPublic from './components/WDocPublic.vue';
import Rainbow from './components/Rainbow.vue';   //彩虹背景

// 替换原来的导入方式，使用异步组件
const MusicPlayer = defineAsyncComponent(() => 
  import('./components/MusicPlayer.vue')
);

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

// 添加的代码：控制音乐播放器显示的状态变量
const showMusicPlayer = ref(false);

// 添加的代码：在组件挂载后显示音乐播放器
onMounted(() => {
  showMusicPlayer.value = true;
});
</script>