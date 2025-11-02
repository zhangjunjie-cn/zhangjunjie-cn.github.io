---
pageClass: all-features-page
title: 文档书写规范
aside: false
showWDocTitleMeta: false
editLink: false
footer: false
outline: false
tags: 
 - 文档
categories:
description: |
  使用单独的 YAML 代码块作为 frontmatter
sidebar: false
firstCommit: 2023-04-28 21:07:26+8:00
lastUpdated: 2023-12-14 20:13:56+8:00
---

# 代码块形式的 frontmatter


### 123

<ArticleCarousel :list="list" />

<KanbanExample />

```markmap
# 前端面试
### HTML
- 语义化标签
- SEO 优化
### CSS
- Flex 布局
- Grid 布局
### JavaScript
- 闭包
- 事件循环
```

<script lang="ts" setup>
import { ref } from 'vue'
import type { Track } from '/.vitepress/theme/utils/MusicIndex'
const list = ref([
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdr08pnj22c01bqb29.jpg',
    title:'文章列表九宫格样式'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdr03guj22c01bqb29.jpg',
    title:'播放音乐+存档按年和年/月的形式'
},
    {
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdq92lmj22c01bq1a2.jpg',
    title:'内页'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqk4umj22c01bqk52.jpg',
    title:'工具导航'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqppztj22c01bqqqb.jpg',
    title:'文章列表简约样式'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqrdlzj22c01bq4hn.jpg',
    title:'Feed订阅'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqyuaij22c01bqkee.jpg',
    title:'文章页内置资源汇总组件，方便点击查看出处'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdqzlnrj22c01bq4qp.jpg',
    title:'分页'
},
{
    image:'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0fdr2dlbj22c01bqb29.jpg',
    title:'暗黑模式+标签点击切换'
}]);


const myPlaylist = ref<Track[]>([
  {
    id: '1',
    title: '夜曲',
    artist: '周杰伦',
    album: '十一月的萧邦',
    url: '/music/nocturne.mp3',
    cover: '/music/covers/nocturne.jpg'
  },
  {
    id: '2', 
    title: '千里之外',
    artist: '周杰伦 ft. 费玉清',
    album: '依然范特西',
    url: '/music/thousands-miles-away.mp3',
    cover: '/music/covers/thousands-miles-away.jpg'
  }
])

</script>



 <style>
.all-features-page .VPDoc > .container > .content {
  max-width: 72vw !important;
}
</style>

<style>
:root {
  overflow-y: scroll;
}
</style>
