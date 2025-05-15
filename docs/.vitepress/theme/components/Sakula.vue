<template>
    <div v-if="!isMobile()" ref="sakuraContainer" class="sakura-container"></div>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
import { isMobile } from "../../utils/mobile";

  const sakuraContainer = ref<HTMLElement | null>(null);
  
  onMounted(() => {
    if (!sakuraContainer.value || !isMobile) return;
  
    // 创建 script 元素
    const sakuraScript = document.createElement("script");
    sakuraScript.type = "text/javascript";
    sakuraScript.src =
      "https://cdn.jsdelivr.net/gh/fz6m/Private-web@1.2/js/sakura/sakura-small.js";
  
    // 将脚本添加到容器中
    sakuraContainer.value.appendChild(sakuraScript);
  
    // 监听脚本加载完成
    sakuraScript.onload = () => {
      console.log("Sakura script loaded");
      // 如果脚本需要初始化，可以在这里调用
    };
  
    // 监听脚本加载错误
    sakuraScript.onerror = () => {
      console.error("Failed to load sakura script");
    };
  });
  
  // 在组件卸载时清理
  onUnmounted(() => {
    if (sakuraContainer.value) {
      sakuraContainer.value.innerHTML = ""; // 清空容器内容
    }
  });
  </script>
  
  <style scoped>
  .sakura-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* 防止容器拦截点击事件 */
    z-index: 9999; /* 确保樱花在最上层 */
    overflow: hidden; /* 隐藏超出容器的内容 */
  }
  </style>