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

<!-- <ClientOnly>
<ElMindmap :data="data" height="480" :router="router" :offsetLeft="50" />
</ClientOnly> -->

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
