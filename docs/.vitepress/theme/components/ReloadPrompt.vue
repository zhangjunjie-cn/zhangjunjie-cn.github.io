<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const offlineReady = ref(false)
const needRefresh = ref(false)

let updateServiceWorker: (() => Promise<void>) | undefined

function onOfflineReady() {
  offlineReady.value = true
}
function onNeedRefresh() {
  needRefresh.value = true
}
async function close() {
  if (needRefresh.value) {
    window.location.reload() // 有更新时强制刷新
  }
  offlineReady.value = false
  needRefresh.value = false
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  const { updateServiceWorker: updateSW } = registerSW({
    immediate: true,
    onOfflineReady,
    onNeedRefresh,
    onRegistered(r) {
      console.log('SW registered:', r)
    },
    onRegisterError(e) {
      console.error('SW注册失败:', e)
    },
  })
  updateServiceWorker = updateSW // 确保赋值
})
</script>

<template>
  <template v-if="offlineReady || needRefresh">
    <div
      class="pwa-toast"
      role="alertdialog"
      aria-labelledby="pwa-message"
    >
      <div id="pwa-message" class="mb-3">
        {{ offlineReady ? '应用程序已准备就绪，可离线工作。' : '有新内容可用，点击刷新按钮更新。' }}
      </div>
      <button 
        v-if="needRefresh"
        type="button" 
        class="pwa-refresh" 
        @click="async () => {
          console.log('点击刷新')
          try {
            await updateServiceWorker?.()
            console.log('更新成功')
            window.location.reload() // 强制刷新
          } catch (e) {
            console.error('更新失败:', e)
          }
        }"
      >
        刷新
      </button>
      <button
        type="button"
        class="pwa-cancel"
        @click="close"
      >
        关闭
      </button>
    </div>
  </template>
</template>

<style>
    .pwa-toast {
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 16px;
        padding: 12px;
        border: 1px solid #8885;
        border-radius: 4px;
        z-index: 100;
        text-align: left;
        box-shadow: 3px 4px 5px 0 #8885;
        background-color: white;
    }
    .pwa-toast #pwa-message {
        margin-bottom: 8px;
    }
    .pwa-toast button {
        border: 1px solid #8885;
        outline: none;
        margin-right: 5px;
        border-radius: 2px;
        padding: 3px 10px;
    }
</style>