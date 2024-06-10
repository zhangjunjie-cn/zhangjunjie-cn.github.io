<script setup>
import DefaultTheme from 'vitepress/theme'
//import Copyright from "./layout/Copyright.vue"

const { Layout } = DefaultTheme
const detectDeviceType = () => {
  if (typeof window === 'undefined') return
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
}

</script>

<template>
  <Layout>
    <!-- <template #doc-footer-before>
      <ClientOnly>
        <Copyright :key="md5(page.relativePath)" />
      </ClientOnly>
    </template> -->
    <template #doc-after>
      <ClientOnly>
        <!-- <ValineComment /> -->
        
        <AlanBackTop v-if="detectDeviceType() === 'Desktop'"></AlanBackTop>
      </ClientOnly>
    </template>
    
  </Layout>
</template>