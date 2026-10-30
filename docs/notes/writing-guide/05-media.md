---
title: 05 图片与视频
description: 图片路径规则、Fancybox、防盗链，以及 Swiper 放视频的写法与更新流程。
---

# 图片与视频

## 图片

图片放 `docs/public/` 下，引用时省略 `public`，路径直接从站点根开始：

```md
![替代文字](/images/example.webp)
```

站点接入了 Fancybox，点击图片会打开大图查看器，不需要额外写任何东西。

:::details 防盗链图床的 frontmatter
如果图片来自 Gitee 这类会检查 referrer 的图床，在页面 frontmatter 里加：

```yaml
head:
  - - meta
    - name: referrer
      content: no-referrer
```
:::

## 视频

视频统一放 `docs/public/video/`，用 `<Swiper>` 的 `items` 引用。每个视频条目配一张同名封面图：

```vue
<Swiper
  title="记录泉州，连接你我"
  subtitle="一句话小字"
  status="持续更新中..."
  weather="leaf"
  :items="[
    {
      type: 'video',
      src: '/video/20261017_175225_106.mp4',
      poster: '/video/20261017_175225_106.jpg',
      title: '登机',
      createTime: '2026:09:23 10:00:00'
    },
    '/images/plain-photo.webp'
  ]"
/>
```

| 属性 | 说明 |
|---|---|
| `items` | 字符串是纯图片；对象用于视频，或需要单独标题、时间的图片 |
| `variant="grid"` | 渲染照片墙；默认 `cards` 是卡片滑动 |
| `weather` | `snow`（默认）、`sun`、`leaf`、`petal`、`wind`、`none` |
| `loop` / `rewind` | 首尾循环 |
| `fullscreen="button"` | 点击画面不放大，改由底栏按钮触发 |

## 更新视频的流程

:::steps

### 第一步：放文件
新 mp4 放进 `docs/public/video/`，封面图同名（`.jpg`）。

### 第二步：压缩
先 `pnpm video --dry-run` 看计划，再 `pnpm video`。

### 第三步：改引用
文件名没变时，路径加个版本号最稳妥，例如 `?v=2`。

### 第四步：本地验证
`pnpm dev` 里点开视频，确认能起播、能拖动进度条。

:::

:::tip 浏览器缓存
视频由 Service Worker 缓存。文件名不变时，更新要等下一次播放才会通过 `Last-Modified` 换成新版本；想立即生效就换文件名或加 `?v=`。
:::

:::danger 路径不要带 public
`/public/video/a.mp4` 会 404。`public/` 是构建时的根目录，对外只暴露里面的内容，所以正确写法是 `/video/a.mp4`。
:::
