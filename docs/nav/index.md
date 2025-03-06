---
layoutClass: m-nav-layout
outline: deep
date: 2019/12/28 10:00
title: 个人 SQL 优化技巧
sidebar: true # 是否显示目录导航
aside: true
categories:
 - 1
tags:
 - 1
---

<script setup>
import { NAV_DATA } from './data'
</script>

<style src="./index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
<br />


::: tip
该导航由 [maomao](https://github.com/maomao1996) 开发，如有引用、借鉴的请保留版权声明：<https://github.com/maomao1996/vitepress-nav-template>
:::
