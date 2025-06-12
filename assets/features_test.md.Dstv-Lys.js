import{_ as I}from"./chunks/theme.C9rgMrzF.js";import{_ as D}from"./chunks/ArticleMetadata.tdmZqfSI.js";import{f as A,P as i,z as b,A as M,B as l,b as e,G as n,am as h,Q as a,O as f,S as k}from"./chunks/framework.DkQBKkdx.js";import"./chunks/index.Ctc8mMkX.js";import"./chunks/dayjs.min.JKWTo7MK.js";const C=JSON.parse('{"title":"文档书写规范","description":"使用单独的 YAML 代码块作为 frontmatter\\n","frontmatter":{"pageClass":"all-features-page","date":"2025/01/15","title":"文档书写规范","aside":"left","tags":["文档"],"categories":null,"description":"使用单独的 YAML 代码块作为 frontmatter\\n"},"headers":[],"relativePath":"features/test.md","filePath":"features/test.md","lastUpdated":1749722653000}'),j={name:"features/test.md"},v=Object.assign(j,{setup(N){return A({data:{text:"ECMAScript 语法约定"},children:[{data:{text:"数据类型 & 变量",note:"数据类型 & 变量声明 & 解构赋值 & var 变量提升 & 变量作用域 & 闭包 & 字符串运算符"}},{data:{text:"流程控制",note:"分支语句 & 循环语句 & 跳转语句"}},{data:{text:"函数",note:"声明函数 & 调用函数 & 参数 & 返回值 & 箭头函数 & 默认参数 & 函数表达式 & 函数递归 & 作用域 & 作用域链 & 立即执行函数"}},{data:{text:"面向对象",note:"声明类 & 构造器 & 实例化 & 继承 & 访问器 & 静态方法"}},{data:{text:"模块",note:"模块导入(导出) & Promise 对象 & async/await & Reflect 对象 & Set 对象 & Map 对象 & Weakset 对象 & Weakmap 对象 & Symbol 对象"}}]}),(r,t)=>{const m=D,s=i("ClientOnly"),o=i("LiteTree"),g=I,u=i("NolebaseGitContributors"),c=i("NolebaseGitChangelog");return M(),b("div",null,[t[3]||(t[3]=l("h1",{id:"代码块形式的-frontmatter",tabindex:"-1"},[e("代码块形式的 frontmatter "),l("a",{class:"header-anchor",href:"#代码块形式的-frontmatter","aria-label":'Permalink to "代码块形式的 frontmatter"'},"​")],-1)),t[4]||(t[4]=e()),n(s,null,{default:a(()=>{var p,d;return[(((p=r.$frontmatter)==null?void 0:p.aside)??!0)&&(((d=r.$frontmatter)==null?void 0:d.showArticleMetadata)??!0)?(M(),f(m,{key:0,article:r.$frontmatter},null,8,["article"])):k("",!0)]}),_:1}),n(s,null,{default:a(()=>[n(o,null,{default:a(()=>t[0]||(t[0]=[e(`
	// 定义样式变量
	#important=color:red;font-weight:bold;background:#ffe6e6;padding:2px 6px;border-radius:3px;
	#success=color:green;font-weight:bold;background:#e6ffe6;padding:2px 6px;border-radius:3px;
	#warning=color:orange;background:#fff3e0;padding:2px 6px;border-radius:3px;
	---
	项目文件
		{#important}关键文件
		{#success}已完成文件
		{#warning}需要审查
	`)])),_:1,__:[0]})]),_:1}),t[5]||(t[5]=e()),t[6]||(t[6]=l("hr",null,null,-1)),t[7]||(t[7]=e()),n(s,null,{default:a(()=>[n(o,null,{default:a(()=>t[1]||(t[1]=[e(`
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
`)])),_:1,__:[1]})]),_:1}),t[8]||(t[8]=e()),t[9]||(t[9]=l("hr",null,null,-1)),t[10]||(t[10]=e()),n(s,null,{default:a(()=>[n(o,null,{default:a(()=>t[2]||(t[2]=[e(`
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
	`)])),_:1,__:[2]})]),_:1}),t[11]||(t[11]=e()),n(g,{content:decodeURIComponent("%23%23%20Links%0A%0A-%20%5BWebsite%5D(https%3A%2F%2Fmarkmap.js.org%2F)%0A-%20%5BGitHub%5D(https%3A%2F%2Fgithub.com%2Fgera2ld%2Fmarkmap)%0A%0A%23%23%20Related%20Projects%0A%0A-%20%5Bcoc-markmap%5D(https%3A%2F%2Fgithub.com%2Fgera2ld%2Fcoc-markmap)%20for%20Neovim%0A-%20%5Bmarkmap-vscode%5D(https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dgera2ld.markmap-vscode)%20for%20VSCode%0A-%20%5Beaf-markmap%5D(https%3A%2F%2Fgithub.com%2Femacs-eaf%2Feaf-markmap)%20for%20Emacs%0A%0A%23%23%20Features%0A%0ANote%20that%20if%20blocks%20and%20lists%20appear%20at%20the%20same%20level%2C%20the%20lists%20will%20be%20ignored.%0A%0A%23%23%23%20Lists%0A%0A-%20**strong**%20~~del~~%20*italic*%20%3D%3Dhighlight%3D%3D%0A-%20%60inline%20code%60%0A-%20%5Bx%5D%20checkbox%0A-%20Katex%3A%20%24x%20%3D%20%7B-b%20%5Cpm%20%5Csqrt%7Bb%5E2-4ac%7D%20%5Cover%202a%7D%24%20%3C!--%20markmap%3A%20fold%20--%3E%0A%20%20-%20%5BMore%20Katex%20Examples%5D(%23%3Fd%3Dgist%3Aaf76a4c245b302206b16aec503dbe07b%3Akatex.md)%0A-%20Now%20we%20can%20wrap%20very%20very%20very%20very%20long%20text%20based%20on%20%60maxWidth%60%20option%0A-%20Ordered%20list%0A%20%201.%20item%201%0A%20%202.%20item%202%0A%0A")},null,8,["content"]),t[12]||(t[12]=h(`<p>定义每个 slide 的 frontmatter 的默认方法很简洁，但是可能缺乏高亮显示与格式化的支持。要解决这个问题，你可以在 slide（单页幻灯片） 内容的开头用一个 YAML 代码块作为它的 frontmatter：</p> <div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes one-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ADBAC7;">---</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#8DDB8C;">theme</span><span style="--shiki-light:#383A42;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;">default</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ADBAC7;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-light-font-weight:inherit;--shiki-dark:#6CB6FF;--shiki-dark-font-weight:bold;"># Slide 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-weight:inherit;--shiki-dark:#6CB6FF;--shiki-dark-font-weight:bold;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ADBAC7;">\`\`\`yaml</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#8DDB8C;">layout</span><span style="--shiki-light:#383A42;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#96D0FF;">quote</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ADBAC7;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-light-font-weight:inherit;--shiki-dark:#6CB6FF;--shiki-dark-font-weight:bold;"># Slide 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-light-font-weight:inherit;--shiki-dark:#6CB6FF;--shiki-dark-font-weight:bold;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-light-font-weight:inherit;--shiki-dark:#6CB6FF;--shiki-dark-font-weight:bold;"># Slide 3</span></span></code></pre> <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">关于 headmatter 是什么</p> <p>在 Slidev 中，headmatter 正是 Markdown 文件中通常所说的 “frontmatter”，大多数 markdown 编辑器和格式化工具都直接支持它。需要注意的是，不能用本页描述的 YAML 块来表示 headmatter。</p></div> `,5)),n(u),n(c)])}}});export{C as __pageData,v as default};
