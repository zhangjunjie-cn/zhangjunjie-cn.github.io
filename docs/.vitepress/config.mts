import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { defineConfig, PageData } from "vitepress";

import { head, nav, sidebar } from "./configs";
import markdown from "./theme/markdown";
// 自动导入TDesign 
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

import { withPwa } from "@vite-pwa/vitepress";

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];
const fileAndStyles: Record<string, string> = {}


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
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "退出",
            },
          },
        },
      },
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
      noExternal: ['naive-ui', 'date-fns', 'vueuc', 'vue-echarts', 'echarts', 'zrender', 'resize-detector']
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

  // pwa: {
  //   outDir: ".vitepress/../../dist", // 输出目录
  //   mode: 'development',
  //   registerType: 'autoUpdate',
  //   injectRegister: 'script-defer',
  //   includeAssets: ['favicon.svg'],
  //   manifest: {
  //     name: '张俊杰的博客 [PWA离线版]',
  //     short_name: 'zhangjunjie;s PWA',
  //     theme_color: '#ffffff', // 主题颜色
  //     icons: [
  //       {
  //         src: 'pwa-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //         purpose: 'any maskable',
  //       },
  //     ],
  //   },
  //   workbox: {
  //     globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
  //   },
  //   experimental: {
  //     includeAllowlist: true,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallback: '/',
  //   },
  // },
  pwa: {
    outDir: "../dist", // 输出目录
    registerType: "autoUpdate", // 注册类型为自动更新
    includeManifestIcons: false, // 不包含清单图标
    manifest: {
      id: "/", // 清单 ID
      name: "张俊杰的博客", // 应用名称
      short_name: "zhang blog PWA", // 应用的短名称
      description: "张俊杰的博客", // 应用的描述
      theme_color: "#ffffff", // 主题颜色
      icons: [
        {
          src: "/images/pwa-120x120.png", // 图标路径
          sizes: "120x120", // 图标尺寸
          type: "image/png", // 图标类型
        },
        {
          src: "/images/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/images/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
          handler: "CacheFirst", // 缓存优先策略
          options: {
            cacheName: "google-fonts-cache", // 缓存名称
            expiration: {
              maxEntries: 10, // 最大缓存条目数
              maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存的响应状态码
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
          handler: "CacheFirst", // 缓存优先策略
          options: {
            cacheName: "gstatic-fonts-cache", // 缓存名称
            expiration: {
              maxEntries: 10, // 最大缓存条目数
              maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存的响应状态码
            },
          },
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
          handler: "NetworkFirst", // 网络优先策略
          options: {
            cacheName: "jsdelivr-images-cache", // 缓存名称
            expiration: {
              maxEntries: 10, // 最大缓存条目数
              maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存的响应状态码
            },
          },
        },
      ],
    },
  },










}
);

