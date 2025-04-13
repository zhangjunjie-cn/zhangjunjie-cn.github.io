<template>
  <div class="image-viewer">
    <t-image-viewer v-model:visible="show" :images="previewImageInfo.list" :default-index="previewImageInfo.idx"
      :key="previewImageInfo.idx" @close="show = false">
    </t-image-viewer>
    <tdesign-dark></tdesign-dark>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import tdesignDark from './tdesignDark.vue';

const show = ref(false)
const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>(
  {
    url: '',
    list: [],
    idx: 0
  }
)
function previewImage(e: Event) {
  const target = e.target as HTMLElement;
  if (target.tagName.toLowerCase() !== 'img') return;

  // 获取图片 src
  const imgSrc = target.getAttribute('src') || '';
  
  // 定义不需要预览的文件名或路径（支持字符串或正则表达式）
  const excludePatterns = [
    'go_top.png',       // 精确匹配文件名
    '/avatar/',       // 匹配路径包含 `/assets/icons/`
    // /\/hidden-images\//i,  // 正则匹配路径（忽略大小写）
  ];

  // 检查是否命中排除规则
  const shouldExclude = excludePatterns.some(pattern => {
    return typeof pattern === 'string' 
      ? imgSrc.includes(pattern)
      : pattern.test(imgSrc);
  });

  if (shouldExclude) return; // 如果命中排除规则，则不预览



  const currentTarget = e.currentTarget as HTMLElement
  if (target.tagName.toLowerCase() === 'img') {
    const imgs = currentTarget.querySelectorAll<HTMLImageElement>(
      '.content-container .main img'
    )
    const idx = Array.from(imgs).findIndex(el => el === target)
    const urls = Array.from(imgs).map(el => el.src)

    const url = target.getAttribute('src')
    previewImageInfo.url = url!
    previewImageInfo.list = urls
    previewImageInfo.idx = idx

    // 兼容点击main之外的图片
    if (idx === -1 && url) {
      previewImageInfo.list.push(url)
      previewImageInfo.idx = previewImageInfo.list.length - 1
    }
    show.value = true
  }
}
onMounted(() => {
  const docDomContainer = document.querySelector('#VPContent')
  docDomContainer?.addEventListener('click', previewImage)
})

onUnmounted(() => {
  const docDomContainer = document.querySelector('#VPContent')
  docDomContainer?.removeEventListener('click', previewImage)
})
</script>
<style>
/* 不提供下载功能，隐藏下载按钮，tdesign下载有问题 */
.t-image-viewer__modal-icon:nth-child(7) {
  display: none !important;
}
</style>
