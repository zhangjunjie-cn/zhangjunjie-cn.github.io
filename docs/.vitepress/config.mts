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

import { withPwa } from "@vite-pwa/vitepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];
const fileAndStyles: Record<string, string> = {}


export default withPwa(
  defineConfig({

    
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

    //naive ui 不作为外部依赖处理，在客户端渲染，不在服务端渲染，进入页面会更快。
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc','vue-echarts', 'echarts', 'zrender', 'resize-detector']
    }
	},

  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  // transformHtml(code, id) {
  //   const html = id.split('/').pop()
  //   if (!html) return
  //   const style = fileAndStyles[`/${html}`]
  //   if (style) {
  //     return code.replace(/<\/head>/, style + '</head>')
  //   }
  // },
  

  /* 生成站点地图 */
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: "https://zhangjunjiee.netlify.app/" });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },

  pwa: {
    outDir: ".vitepress/../../dist", // 输出目录
    mode: 'development',
    registerType: 'autoUpdate',
    injectRegister: 'script-defer',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: '张俊杰的博客 [PWA离线版]',
      short_name: 'zhangjunjie;s PWA',
      theme_color: '#ffffff', // 主题颜色
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    experimental: {
      includeAllowlist: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
    },
  },


  

 
  


  
  
})
);

