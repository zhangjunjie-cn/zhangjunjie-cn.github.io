---
title: 04 容器语法
description: 8 种 Rspress 风格容器的写法、嵌套规则，以及 prompt 卡片和分步说明。
---

# 容器语法

项目注册了 8 种 Rspress 风格容器。下面每一个都是真实效果，不是截图；写法收在各自的可折叠块里。

:::note
备注用 note：补一句背景，不打断正文。
:::

:::tip
提示用 tip：技巧、捷径、个人经验。
:::

:::important
重要用 important：不能跳过的前提条件。
:::

:::info
补充信息用 info：参数、版本、链接。
:::

:::warning
警告用 warning：容易踩坑，但后果可控。
:::

:::danger
危险用 danger：会导致数据丢失或部署失败的操作。
:::

:::caution
注意用 caution：配色同 danger，语气稍轻。
:::

:::details 点开看 details
可折叠内容，适合长代码、补充材料。
:::

:::details 查看这 8 种容器的写法

```md

:::note
备注用 note。
:::

:::tip 自定义标题
类型名后面空一格，直接写标题。
:::

:::tip{title="**标题也能写 markdown**"}
也可以用 {title="…"}。
:::

:::important
重要内容。
:::

:::info
补充信息。
:::

:::warning
警告内容。
:::

:::danger
危险操作。
:::

:::caution
注意事项。
:::

:::details 折叠标题
默认收起的内容。
:::

``` 

:::

## 标题的两种写法

- `:::tip 自定义标题`：空格后直接写，标题按纯文本渲染。
- `:::tip{title="**标题也能写 markdown**"}`：可以塞 markdown，加粗、链接都行。

:::warning `:::` 后面不要紧跟中文
`:::提示` 这种写法不会生效，会被当成普通段落。类型名和标题之间必须有空格，或者改用 `{title="…"}`。
:::

## 嵌套

外层比内层多用一个冒号，否则内层会被提前闭合。下面是真实嵌套效果：

::::warning
外层 warning，里面套一个 note：

:::note
内层 note。外层用四个冒号，内层用三个。
:::

::::

:::details 查看嵌套写法
```md
::::warning
外层 warning

:::note
内层 note
:::

::::
```
:::

## Prompt 卡片

逐字保留换行、反引号和缩进，右上角带复制按钮，适合放给 AI 的提示词：

:::prompt{title="一键创建项目" description="复制后发给 Agent"}
按照官方指南创建项目。

1. 用 `create rspress@latest` 初始化。
2. 安装依赖。
3. 启动开发服务器。
:::

:::details 查看 prompt 写法
```md
:::prompt{title="一键创建项目" description="复制后发给 Agent"}
按照官方指南创建项目。

1. 用 `create rspress@latest` 初始化。
2. 安装依赖。
:::
```

需要按 markdown 渲染、且不要复制按钮时，用 `{custom}`：

```md
:::prompt{custom}
**hello** world
:::
```
:::

## 分步说明

容器里的 `##`–`######` 直属标题会各自变成一步：

:::steps

### 第一步：准备素材
把视频和封面图放进 `docs/public/video/`。

### 第二步：压缩
先 `pnpm video --dry-run` 看计划，再正式执行。

### 第三步：验证
`pnpm dev` 里点开视频，确认能起播、能拖动。

:::

:::details 查看 steps 写法
```md
:::steps

### 第一步：准备素材
把视频和封面图放进 `docs/public/video/`。

### 第二步：压缩
先 `pnpm video --dry-run` 看计划，再正式执行。

:::
```
:::

:::tip 什么时候用哪种
一句话的补充用 `note`/`info`；会被忽略的前提用 `tip`/`important`；会踩坑用 `warning`；不可逆操作用 `danger`；长代码和补充材料一律塞进 `details`，别让正文变成长篇代码墙。
:::
