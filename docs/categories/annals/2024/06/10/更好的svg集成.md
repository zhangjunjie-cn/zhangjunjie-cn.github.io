---
date: 2024/06/10 21:00
title: 更好的svg集成
author: 张军杰
categories:
 - 博客
tags:
 - 建站
---

# 更好的svg集成
## 向 web 中添加矢量图形
SVG 是用于描述矢量图像的语言，它基于 XML。它基本上是像 HTML 一样的标记，只是它提供了许多不同的元素来定义要显示在图像中的形状，以及要应用于这些形状的效果。SVG 用于标记图形，而不是内容。SVG 定义了一些用于创建基本图形的元素，如 \<circle> 和 \<rect>，此外 SVG 还提供了一些复杂一些的元素如 \<path> 和 \<polygon>。更高级的 SVG 特性包括 \<feColorMatrix>（使用变换矩阵转换颜色）、\<animate>（矢量图形的动画部分）和 \<mask>（在图像上层应用蒙版）。


<div style="width:320px;float:left;" >
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406102017398.png"/>
<NCard>
<a href="https://plus.excalidraw.com/" target="_blank">&emsp;&emsp;&emsp;&emsp;plus.excalidraw.com →</a>
</NCard>
</div>

<div style="width:320px;float:left;margin-left:20px;margin-bottom:30px" >
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406102016884.png"/>
<NCard>
<a href="https://excalidraw.com/" target="_blank">&emsp;&emsp;&emsp;&emsp;https://excalidraw.com/ →</a>
</NCard>
</div>

<NCard/>

## 优化SSR兼容性
关于构建打包的时候提示`build: ReferenceError: document is not defined`

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406102034251.png"/>

通过使用 Vue 的服务器端渲染 (SSR) 功能，VitePress 能够在生产构建期间在 Node.js 中预渲染应用程序。这意味着主题组件中的所有自定义代码都需要考虑 SSR 兼容性。

Vue 官方文档的 SSR 部分提供了更多有关 SSR 是什么，SSR / SSG 之间的关系以及编写 SSR 友好的代码的常见注意事项等信息。原则上只在 Vue 组件的 beforeMount 或 mounted 钩子中访问浏览器或 DOM API。

<script setup>
import { NBackTop,NCard } from 'naive-ui'
</script>