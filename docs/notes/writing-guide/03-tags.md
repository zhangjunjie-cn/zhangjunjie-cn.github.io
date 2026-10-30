---
title: 03 标签与图标
description: 标签从哪来、首页标签云的 56 个词、图标来源与新增标签的完整步骤。
---

# 标签与图标

标签只来自文章的 frontmatter。标签页在构建时读取所有文章自动聚合，不需要另外维护列表。

## 正在使用的标签

点标签名可以直接打开对应的聚合页：

| 标签 | 聚合页 |
|---|---|
| `Markdown` | [查看 Markdown 标签页](/pages/tags?q=Markdown) |
| `AI` | [查看 AI 标签页](/pages/tags?q=AI) |
| `Tencent` | [查看 Tencent 标签页](/pages/tags?q=Tencent) |
| `Skill` | [查看 Skill 标签页](/pages/tags?q=Skill) |
| `图片` | [查看 图片 标签页](/pages/tags?q=%E5%9B%BE%E7%89%87) |

标签页按文章数量排序，数量相同按字母序。新增标签不需要注册，在 frontmatter 的 `tags` 里写上就会自动出现；没有专属图标的标签会退回默认图标。

## 首页标签云

首页那排滚动的标签是展示用的完整词表，目前共 56 个，比实际文章用到的多。其中一部分还没有文章，点进去是空列表。

- **语言、框架与开发**：JavaScript、TypeScript、Vue.js、React、Next.js、Python、CSS、Sass、TailwindCSS、SVG、SSR、状态管理、Router、Element、webpack、npm、Node.js、前端、后端、数据库、Vite
- **平台、网络与工具**：Vercel、CloudFlare、nginx、Docker、Linux、Git、Github、Hexo、Windows、MacOS、VSCode、终端、浏览器、HTTP、OPPO、APP
- **AI、内容与设计**：AI、Tencent、Markdown、Skill、Obsidian、Design、PS、图标、图片、字体、图表、术语、网站
- **生活与记录**：摄影、旅行、视频、效率、工具、博客

:::warning 别为了凑标签而写标签
标签页只展示有文章的分类。想启用一个新标签，先写一篇带该标签的文章，它才会出现在标签页里。
:::

## 图标从哪里来

所有标签图标都来自 [Iconify](https://icon-sets.iconify.design/)，最初是从 note.weizwz.com 把内联 SVG 提取下来，存放在 `docs/.vitepress/theme/components/icons/tagIcons.ts`。

常用入口：

- 图标库搜索：[icon-sets.iconify.design](https://icon-sets.iconify.design/)
- MDI（Material Design Icons）：[icon-sets.iconify.design/mdi](https://icon-sets.iconify.design/mdi/)
- Simple Icons（品牌图标）：[icon-sets.iconify.design/simple-icons](https://icon-sets.iconify.design/simple-icons/)
- Material Symbols：[icon-sets.iconify.design/material-symbols](https://icon-sets.iconify.design/material-symbols/)
- Lucide：[icon-sets.iconify.design/lucide](https://icon-sets.iconify.design/lucide/)
- Tabler：[icon-sets.iconify.design/tabler](https://icon-sets.iconify.design/tabler/)

直接取 SVG：单个图标打开 `https://api.iconify.design/mdi/camera.svg`，批量取可以看 `https://api.iconify.design/mdi.json?icons=camera,server,database`。

## 新增一个标签的步骤

1. 在 Iconify 搜到图标，记下 `前缀:名称`，例如 `mdi:camera`。
2. 打开 `https://api.iconify.design/mdi/camera.svg`，复制里面的 `<path>`。
3. 在 `tagIcons.ts` 新增 `export const TagXxxIcon = ...`，class 保持 `mr-1 h-4 w-4 text-[rgb(...)]`，颜色按品牌色调整。
4. 在同文件的 `tagIcons` 映射末尾加一行 `"标签名": TagXxxIcon`。
5. 在 `HeroCard.vue` 的 `tags` 数组里加 `{ label: "标签名", href: "pages/tags?q=..." }`；中文标签的 `href` 要用 `encodeURIComponent` 编码。
6. 没配图标的标签不会报错，标签页会退回 `TagDefaultIcon`。

:::tip 只想让文章有图标，不动首页
第 1–4 步就够了：文章卡片和标签页都走 `tagIcons` 查表。第 5 步只影响首页那排标签云。
:::
