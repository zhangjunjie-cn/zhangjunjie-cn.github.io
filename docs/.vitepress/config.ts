import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { defineConfig, PageData } from "vitepress";

import { head, nav, sidebar} from "./configs";
import markdown from "./theme/markdown";
// 自动导入TDesign 
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];

export default defineConfig({
  outDir: "../dist",

  //base 为 '/zhangjunjiee/' 库的名称
  base: process.env.APP_BASE_PATH || "/",

  lang: "zh-CN",
  title: " ",
  description: " ",
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown,
  
  // markdown: {
  //   lineNumbers: true
  // },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: "/未标题-12.png",

    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: "deep",
      label: "本页目录",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/zhangjunjie-cn" },
    ],

    footer: {
      message: "如有转载或 CV 的请标注本站原文地址",
      copyright: "Copyright © 2024-present maomao 、justin3go and 冴羽 ...",
    },

    darkModeSwitchLabel: "外观",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新",

    /* Algolia DocSearch 配置 */
    //algolia,
    search: {
      provider: "local",
    },

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    
  },

  /*** 自定义配置 ***/ 
  vite: {
    
		plugins: [
			// ...
			AutoImport({
				resolvers: [TDesignResolver({
					library: 'vue-next'
				})],
			}),
			Components({
				resolvers: [TDesignResolver({
					library: 'vue-next'
				})],
			}),
      
		],
	},

  /* 生成站点地图 */
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: "https://zhangjunjie-cn/" });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },
});
