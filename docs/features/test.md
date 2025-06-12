---
pageClass: all-features-page
date: 2025/01/15
title: 文档书写规范
aside: left
tags: 
 - 文档
categories:
description: |
  使用单独的 YAML 代码块作为 frontmatter
---

# 代码块形式的 frontmatter

<ClientOnly>
	<LiteTree>
	// 定义样式变量
	#important=color:red;font-weight:bold;background:#ffe6e6;padding:2px 6px;border-radius:3px;
	#success=color:green;font-weight:bold;background:#e6ffe6;padding:2px 6px;border-radius:3px;
	#warning=color:orange;background:#fff3e0;padding:2px 6px;border-radius:3px;
	---
	项目文件
		{#important}关键文件
		{#success}已完成文件
		{#warning}需要审查
	</LiteTree>
</ClientOnly>

---

<ClientOnly>
<LiteTree>
// 定义样式变量
#important=color:red;font-weight:bold;background:#ffe6e6;padding:2px 6px;border-radius:3px;
#success=color:green;font-weight:bold;background:#e6ffe6;padding:2px 6px;border-radius:3px;
#warning=color:orange;background:#fff3e0;padding:2px 6px;border-radius:3px;
.folder=color:#1976d2;font-weight:500;
.file=color:#666;
// 定义图标变量
folder=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwIDRIOGEyIDIgMCAwIDAtMiAydjEyYTIgMiAwIDAgMCAyIDJoOGEyIDIgMCAwIDAgMi0yVjhhMiAyIDAgMCAwLTItMmgtM2wtMi0yWiIvPjwvc3ZnPg==
file=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4bC02LTZtNCA5VjlsNCA0aC00WiIvPjwvc3ZnPg==
js=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmN2RmMWUiIGQ9Ik0zIDNoMTh2MThIM1ptMTYuNTI1IDE0LjVjLS4zLS4zNTQtLjc5NS0uNjI5LTEuNzE3LS42MjljLS44ODEgMC0xLjQzOS4zMTgtMS40MzkuNzE4YzAgLjM5Ni4zNzMuNjM3IDEuMTU2Ljk2N2MxLjMzMi41ODYgMi4yODEgMS4wOTMgMi4yODEgMi4zOGMwIDEuMzItMS4yMDMgMi4xNDMtMi45NzQgMi4xNDNjLTEuMjEzIDAtMi4yNzEtLjQ2Mi0yLjk1LTEuMDc0bC44NzUtMS4yNzNjLjQzMy4zODkgMS4wNjQuNzI0IDEuNjY0LjcyNGMuNzA2IDAgMS4wNjQtLjMzMSAxLjA2NC0uNzMzYzAtLjQ0OS0uMzc2LS43MjQtMS4yNDUtMS4wMzNjLTEuMzI1LS40ODgtMi4xMzItMS4yNS0yLjEzMi0yLjM2M2MwLTEuMzk0IDEuMDI5LTIuMTQzIDIuODU2LTIuMTQzYzEuMDY0IDAgMS43NDUuMzI4IDIuMzc3Ljg1OWwtLjgzIDEuMjQxWm0tNS44NDUtLjMzNWMuMzY2LjgxNS4zNjYgMS41NzcuMzY2IDIuNDd2My45MDZoLTEuODc2VjE5LjZjMC0xLjUyNy0uMDYtMi4xOC0uNTUtMi40OGMtLjQxLS4yODgtMS4wNzYtLjI3NC0xLjYxOC0uMTA3Yy0uMzc4LjExNy0uNzEzLjMzNS0uNzEzIDEuMDc0djUuMDU2SDYuNDI3VjEyLjgyaDEuODc2djIuMTEzYy43NDctLjM5OSAxLjU3Ny0uNzM4IDIuNjQ1LS43MzhjLjc2NCAwIDEuNTc3LjI1MyAyLjA2OS43ODdjLjQ5OC41NTIuNjI2IDEuMTU3LjcyMyAxLjk5MVoiLz48L3N2Zz4=
---
[folder] {.folder}前端项目
    [folder] {.folder}src
        [folder] {.folder}components
            [file] {.file}Header.vue     // {#success}已完成
            [file] {.file}Footer.vue     // {#success}已完成
            [file] {.file}Sidebar.vue    // {#warning}开发中
        [folder] {.folder}pages
            [file] {.file}Home.vue       // {#success}已完成
            [file] {.file}About.vue      // {#important}需要重构
        [folder] {.folder}utils
            [js] {.file}api.js          // {#success}已完成
            [js] {.file}helpers.js      // {#warning}需要优化
    [file] {.file}package.json
    [file] {.file}README.md            // {#important}需要更新文档
</LiteTree>
</ClientOnly>

---

<ClientOnly>
	<LiteTree>
	// 样式定义
	#new=color:white;background:#4caf50;padding:1px 4px;border-radius:2px;font-size:12px;
	#deprecated=color:white;background:#f44336;padding:1px 4px;border-radius:2px;font-size:12px;
	.important=font-weight:bold;color:#1976d2;
	// 图标定义
	vue=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yIDIwaDIwTDEyIDR6Ii8+PC9zdmc+
	ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMxNzhDNiIgZD0iTTEyLjUgOHYtLjE2N2MwLS43MzYtLjU5Ny0xLjMzMy0xLjMzMy0xLjMzM0gxMGExLjUgMS41IDAgMSAwIDAgM2gxYTEuNSAxLjUgMCAwIDEgMCAzaC0xQTEuNSAxLjUgMCAwIDEgOC41IDExTTggNi41SDNtMi41IDBWMTNNMS41LjVoMTN2MTRIOS41eiIvPjwvc3ZnPg==
	---
	CrychicDoc
		.vitepress
			config           // {.important}配置目录
				index.ts     // {#new}新版配置
			plugins          // {.important}插件目录
				[ts] custom-alert.ts    // {#new}自定义警告插件
				[ts] dialog.ts          // {#new}对话框插件
			theme
				[vue] components        // {.important}组件库
					[vue] CustomAlert.vue    // {#new}警告组件
					[vue] Dialog.vue         // {#new}对话框组件
		docs
			zh               // 中文文档
				styleList.md // {#deprecated}需要更新
			en               // 英文文档
				samples.md   // {#new}示例文档
		[file] package.json
		[file] README.md     // {.important}项目说明
	</LiteTree>
</ClientOnly>

```markmap
## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on `maxWidth` option
- Ordered list
  1. item 1
  2. item 2

```

<script setup>
import {  ref } from "vue";
const data = ref({
	data: {
		text: "ECMAScript 语法约定",
	},
	children: [
		{ 
			data: { text: "数据类型 & 变量", note: "数据类型 & 变量声明 & 解构赋值 & var 变量提升 & 变量作用域 & 闭包 & 字符串运算符" },
		},
		{ 
			data: { text: "流程控制", note: "分支语句 & 循环语句 & 跳转语句" },
		},
		{ 
			data: { text: "函数", note: "声明函数 & 调用函数 & 参数 & 返回值 & 箭头函数 & 默认参数 & 函数表达式 & 函数递归 & 作用域 & 作用域链 & 立即执行函数" },
		},
		{ 
			data: { text: "面向对象", note: "声明类 & 构造器 & 实例化 & 继承 & 访问器 & 静态方法" },
		},
		{ 
			data: { text: "模块", note: "模块导入(导出) & Promise 对象 & async/await & Reflect 对象 & Set 对象 & Map 对象 & Weakset 对象 & Weakmap 对象 & Symbol 对象" },
		},
	],
})
</script>


定义每个 slide 的 frontmatter 的默认方法很简洁，但是可能缺乏高亮显示与格式化的支持。要解决这个问题，你可以在 slide（单页幻灯片） 内容的开头用一个 YAML 代码块作为它的 frontmatter：

````md
---
theme: default
---

# Slide 1

---

```yaml
layout: quote
```

# Slide 2

---

# Slide 3
````

::: warning 关于 headmatter 是什么

在 Slidev 中，headmatter 正是 Markdown 文件中通常所说的 “frontmatter”，大多数 markdown 编辑器和格式化工具都直接支持它。需要注意的是，不能用本页描述的 YAML 块来表示 headmatter。

:::
