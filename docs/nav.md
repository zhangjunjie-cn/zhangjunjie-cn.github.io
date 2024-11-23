---
createtime: 2024/2/10
title: 前端导航是...提供最简单便捷的网址导航服务
categories:
 - 博客
tags:
 - 建站
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './nav/data'
// import { NButton,NBackTop } from 'naive-ui'
</script>

<style src="./nav/index.scss"></style>

<br/>
<br/>
<br/>

# 前端导航
      
      
<ClientOnly>
  <MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
</ClientOnly>

