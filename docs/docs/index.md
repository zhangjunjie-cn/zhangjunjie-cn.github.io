---
layout: home
layoutClass: 'm-dcos-layout'

hero:
  name: 冬日可爱，夏日可畏
  text: 张俊杰的
  textsuffix: 'docs'
  tagline: 做最好的viterpress个人文档。
  image:
    src: /logo.png
    alt: 茂茂物语
  actions:
    - text: 网址导航
      link: /nav
    - text: 我的笔记
      link: /笔记/index
      theme: alt
    - text: 我的博客
      link: /博客/index
      theme: alt
features:
  - icon: 📖
    title: 前端物语
    details: 整理前端常用知识点<small>（面试八股文）</small><br />如有异议按你的理解为主，不接受反驳
    link: 
    linkText: 前端常用知识
  - icon: 📘
    title: 源码阅读
    details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
    link: 
    linkText: 源码阅读
  - icon: 💡
    title: Workflow
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: 
    linkText: 常用工具库
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: 
    linkText: 提效工具
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: 
    linkText: 踩坑记录
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link: 
---
<Home />

<style>
/*爱的魔力转圈圈*/
/* .m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
} */

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}

/* docs 博客上半部分 */
.VPHero.has-image.VPHomeHero {
    margin-top:0px !important;
}

/* docs 博客top和logo 部分 */
/* .m-home-layout .VPNavBar{
  margin-left: 250px !important;
  margin-right: 250px !important;
} */

.box{
  padding:20px !important;
}

.VPButton.brand{
  background-color:var(--vp-c-brand)!important;
}
/* .VPButton.alt{
  color:var(--vp-c-brand)!important;
} */


</style>
