<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { driver } from 'driver.js'
import { nextTick, onMounted } from 'vue'
import 'driver.js/dist/driver.css'

const isDriver = useLocalStorage('isDriver', false)

const driverObj = driver({
  steps: [
    // {
    //   element: '.DocSearch-Button',
    //   popover: {
    //     title: '快速搜索',
    //     description: '输入标题或关键字可快速搜索。',
    //     prevBtnText: '上一个',
    //     nextBtnText: '下一个',
    //   },
    // },
    {
      element: '.VPSwitchAppearance',
      popover: {
        title: '暗黑模式切换',
        description: '点击这里切换网页主题模式。',
        prevBtnText: '上一个',
        nextBtnText: '下一个',
      },
    },
    // {
    //   element: '.VPSocialLink',
    //   popover: {
    //     title: '作者的GitHub',
    //     description: '点击访问作者GitHub，欢迎关注。',
    //     prevBtnText: '上一个',
    //     nextBtnText: '下一个',
    //   },
    // },
    {
      element: '.VPNolebaseEnhancedReadabilitiesMenuFlyout',
      popover: {
        title: '更好的阅读布局',
        description: '点击切换布局，开启聚光灯样式',
        prevBtnText: '上一个',
        nextBtnText: '结束',
      },
    },
  ],
})

onMounted(async () => {
  await nextTick()

  if (!isDriver.value)
    driverObj.drive()
  isDriver.value = true
})
</script>

<template>
  <div></div>
</template>

<style lang='scss' scoped></style>
