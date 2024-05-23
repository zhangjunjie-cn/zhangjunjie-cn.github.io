---
description: 前端导航是...提供最简单便捷的网址导航服务
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './nav/data'
import { NButton,NBackTop } from 'naive-ui'
</script>
<style src="./nav/index.scss"></style>

<br/>
<br/>
<br/>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>


<NBackTop :right="100" />
<NBackTop :bottom="100" :visibility-height="3600">
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      可视高度：3600px
    </div>
  </NBackTop>

<NBackTop :right="40" :bottom="160">
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      改变位置
    </div>
  </NBackTop>


<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>