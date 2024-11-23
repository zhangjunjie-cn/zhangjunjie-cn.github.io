---
createtime: 2024/5/19
tag: '打印机,运维'
outline: [2,3]
---

<br/>
<br/>

# Windows 11/10共享打印机连接问题的终极解决方案

## 1. 描述 

你是不是在共享打印机的时候经常有以下：

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405191910097.png"/>

<br/>

#### 在解决共享打印机连接问题之前，请确保满足以下几个条件：

1. 确保Windows 11设备和共享打印机的电脑连接到同一个网络。检查网络连接是否稳定。
2. 确保共享打印机所连接的计算机处于开机状态。
3. 检查共享设置，确保共享打印机在Windows 7计算机上正确设置并可供其他设备访问。

如果win7与win10以上共享，win10需要开启SMB1.0服务

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405192338434.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405192338679.png"/>



## 2. 方案一：在打印机的服务器电脑，添加Guest账户及配置windows凭证

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405202346090.png"/>

<br/>
<NCard
title="点击下方下载"
:segmented="{
    content: true,
    footer: 'soft'
}"
>
<template #header-extra>

</template>
<a href="https://gitee.com/zhangjunjiee/my-packages/raw/master/zip/%E5%85%B1%E4%BA%AB%E6%89%93%E5%8D%B0%E6%9C%BA%E9%94%99%E8%AF%AF%E4%BF%AE%E5%A4%8DPrintFix(709&11b%E7%AD%89%E9%94%99%E8%AF%AF%E4%BB%A3%E7%A0%81).zip" target="_blank">一键共享打印机.exe</a>


</NCard>


<br/>
<br/>

---

#### 第二步，在需要共享的电脑上设置Windows凭据

<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200000703.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200003116.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200003238.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200004108.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200004451.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200004112.png"/>
<img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405200005137.png"/>

<script setup>
import { NButton,NCarousel,NCard,NCarouselItem,NBackTop } from 'naive-ui'
</script>


<br/>
<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202405051433983.jpg" />
    </div>
  </a>
</div>

