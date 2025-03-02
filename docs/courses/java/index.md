---
title: Java基础快速入门
author: 查尔斯
date: 2020/10/01 10:24
categories:
 - Java基础快速入门
tags:
 - Java
 - Java基础
---

# Java基础快速入门

**C：** Hi，大家好！从本篇起，笔者将开辟一个新的专栏《Java基础快速入门》，这个专栏初期将涵盖 Java 语法、Java OOP、Java 高级特性三大部分。

当然了，此类教程在网络上不胜枚举，笔者在以前也是比较推荐大家去看谁谁谁的什么什么文章，但后来发现，这些知识是散布在网络间的，所以分散是第一个大问题；而且由于时间和作者等因素，有些内容至今还没有得到更新，这就导致一个知识的滞后性。<LinkInline link="guide/theme-addon" />

<NCarousel autoplay
effect="card"
prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
next-slide-style="transform: translateX(50%) translateZ(-800px);"
style="height: 240px"
:show-dots="false"
>
    <NCarouselItem :style="{ width: '60%' }">
        <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        >
    </NCarouselItem>
    <NCarouselItem :style="{ width: '60%' }">
        <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        >
    </NCarouselItem>
    <NCarouselItem :style="{ width: '60%' }">
        <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        >
    </NCarouselItem>
    <NCarouselItem :style="{ width: '60%' }">
        <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        >
    </NCarouselItem>
</NCarousel>


<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405121605448.jpg" >

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405261607705.png"/>



## 参考文献

[1]周志明. 深入理解Java虚拟机[M]. 第3版. 北京:机械工业出版社,2019

<script setup>
import { NCarousel,NCarouselItem } from 'naive-ui'
</script>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>