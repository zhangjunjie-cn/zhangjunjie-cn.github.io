---
title: 06 目录与部署
description: 项目目录结构、侧栏生成规则、推送部署与常见坑。
---

# 目录与部署

## 目录结构

```text
docs/
├── index.md              # 首页（layout: home）
├── ai/                   # 普通文章，侧栏自动生成
├── notes/                # 这份手册
├── test/                 # 测试稿
├── pages/                # 归档 / 标签 / 文章列表 / 案例页
├── travel/               # 游记页
├── public/               # 静态资源，映射到站点根路径
└── .vitepress/           # 配置、主题、组件
```

## 侧栏规则

- 侧栏由 `vitepress-sidebar` 按目录自动生成，新增 `.md` 就会出现在对应分组，分组名就是目录名。
- 每个目录里的 `index.md` 会成为该分组的入口页；同级文件按标题排序，所以教程类页面用 `01`、`02` 这样的前缀就能定死顺序。
- `pages/` 和 `travel/` 使用自定义布局，整目录已从自动侧栏排除。
- 普通文章不要写 `layout`；可用值只有 `home`、`tags`、`posts`、`case`、`travel`。

:::tip 代码块行号
代码块默认不显示行号。个别块想要行号，在围栏语言后面加 `:line-numbers`：

````md
```powershell:line-numbers
pnpm dev
```
````
:::

## 部署

推送到 `master` 后由 GitHub Actions 构建并部署到 GitHub Pages：

```powershell
git add .
git commit -m "更新文章"
git push
```

GitHub Pages 的缓存策略是 `Cache-Control: max-age=600`，HTML 和静态资源 10 分钟后重新校验；视频由 `sw.js` 缓存，规则见 [图片与视频](./05-media.md)。

:::caution 部署后先看线上
本地构建通过不代表线上正常，视频、图片这类大文件尤其要打开线上页面实际点一遍。改了样式或字体时，先硬刷新（Ctrl+F5）再判断，否则看到的可能还是十分钟前的旧产物。
:::

## 容易踩的坑

- 容器开头的 `:::` 后不要紧跟中文内容；标题用空格或 `{title="…"}`。
- 嵌套容器外层必须比内层多冒号，否则内层会被提前闭合。
- `:::prompt` 正文是逐字复制的，里面不要再套容器；需要 markdown 渲染就用 `{custom}`。
- 视频没压缩、`moov` 在文件尾时，浏览器要两次请求才能起播，表现为「点了半天没反应」。
- 图片和视频路径不要写 `public`：`/public/video/a.mp4` 会 404，正确写法是 `/video/a.mp4`。
- 文章没有 `date` 就不会进归档列表；有 `date` 但没有 `description`，卡片上会空一块。
