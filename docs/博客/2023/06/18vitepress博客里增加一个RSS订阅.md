# 给vitepress博客里增加一个RSS订阅

## 前言

最近花了点时间优化了自己的之前做的vitepress，主要就是增加了一个RSS订阅的功能，以及针对移动端不能显示视频的降级处理。感觉可能是最近的阅读需求增加，光逛社区似乎已经不能满足我的阅读需求了，所以就去找了一些优质的个人博客并加入了RSS订阅，然后就顺便给自己的博客也加了个RSS订阅链接。

> 我使用的RSS阅读软件是[fluent-reader](https://hyliu.me/fluent-reader/)，看网上挺推荐的，并且也是开源的，所以先拿来用用。当然，我也才开始使用RSS这种阅读方式，如果大家有更推荐的RSS软件，希望不要保留！

## 如何使用

本小章节主要针对没有使用过RSS的读者，RSS的使用非常简单，优点也很明显，信息是主动获取，而非算法推荐。我也没去找什么RSS订阅源推荐，而是遇到自己喜欢的个人博客就将其加入订阅，讲究一个细水长流...

比如在[我的博客](https://justin3go.com/)中右上角有一个RSS的图标，点击进去就是对应的RSS订阅URL：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230618105116.png)

然后复制这个链接，进入任意一个RSS阅读器导入即可，这里以Fluent Reader为例：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230618105231.png)

导入之后就可以在该阅读器的阅读列表中找到对应的文章，比如我的博客设置的是最近三篇的文章：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230618105340.png)

## Vitepress中增加RSS

接下来就进入正题，如何在vitepress中增加RSS。首先认识一下RSS，RSS通常是一个XML文档，其中包含一系列项目或条目，每个条目都有标题、摘要、发布日期和链接等元数据：

![](https://oss.justin3go.com/blogs/Pasted%20image%2020230618105847.png)

所以我们要做的就是在vitepress中读取所有文章列表，然后根据对应的文章数据生成该结构的XML文件就可以了，得益于vitepress的buildEnd钩子以及feed的npm包，我们可以非常方便的实现这个功能。

```shell
pnpm add -D feed
```

值得注意的是，笔者并没有对每篇文章设置单独的[Frontmatter](https://vitepress.dev/guide/frontmatter#accessing-frontmatter-data)，但笔者的URL中包含了日期，标题等数据，所以你可能需要根据自己的实际情况进行调整，应该也非常简单，改改变量就可以了。

在合适的位置创建一个`rss.ts`文件，比如`.vitepress/utils/rss.ts`，然后这是笔者的一个RSS文件创建逻辑：

```ts
import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = "https://justin3go.com";

export async function createRssFile(config: SiteConfig) {
	const feed = new Feed({
		title: "Justin3go's Blog-🖊",
		description: "坚持深耕技术领域的T型前端程序员, 喜欢Vuejs、Nestjs, 还会点python、nlp、web3、后端",
		id: hostname,
		link: hostname,
		language: "zh-CH",
		image: "https://oss.justin3go.com/justin3goAvatar.png",
		favicon: `https://oss.justin3go.com/justin3goAvatar.ico`,
		copyright: "Copyright© 2021-present 渝ICP备2021006879号",
	});

	const posts = await createContentLoader("博客/**/*.md", {
		excerpt: true,
		render: true,
	}).load();

	posts.sort((a, b) => Number(+getDate(b.url) - +getDate(a.url)));

	for (const { url, excerpt, html } of posts) {
    // 排除index.md与2022|2021|2020发布的文章
    if(url.search(/index|202[0-2]/) >= 0) {
      continue;
    }
    // 仅保留最近3篇文章
    if(feed.items.length >= 3) {
      break;
    }
		const lastStr = url.split('/').pop();
		const title = lastStr?.substring(2, lastStr.length - 5) || ''
		feed.addItem({
			title,
			id: `${hostname}${url}`,
			link: `${hostname}${url}`,
			description: excerpt,
			content: html,
			author: [
				{
					name: "Justin3go",
					email: "justin3go@qq.com",
					link: "https://justin3go.com",
				},
			],
			date: getDate(url),
		});
	}

	writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

export function getDate(url: string) {
	return new Date(url.substring(4, 14));
}

```

其中`getDate`是根据url获取日期，因为我的url中包含了我写文章的日期，你可以自行修改，比如上述代码中的`posts item`还包含`frontmatter`属性，如果你在文章内部设置了日期，就可以通过这个属性获取。

最后，我们再在biuldEnd钩子里面调用这个函数就可以了：

`config.ts`里:

```ts
import { defineConfig } from "vitepress";
import { createRssFile } from "./utils/rss";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	// ...
	buildEnd: createRssFile,
```

## 最后

本博客源码已开源，可以在[这个仓库](https://github.com/Justin3go/justin3go.github.io)中找到，欢迎⭐star⭐，后续我也会持续维护该仓库，增加一些可能有意思的功能...

也欢迎大家订阅我的[RSS源](https://justin3go.com/feed.xml)



