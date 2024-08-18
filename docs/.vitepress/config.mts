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
import pwa from "./theme/composables/pwa";

import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'

//压缩插件
import viteCompression from "vite-plugin-compression";

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];
const fileAndStyles: Record<string, string> = {}

export default withPwa(


  defineConfig({

    outDir: resolve(__dirname, "../../dist"),
    //base: process.env.APP_BASE_PATH || '/',
    base: '/',

    lang: "zh-CN",
    // titleTemplate: ':title - 张俊杰的博客',
    title: "张俊杰的博客",
    description: "张俊杰的博客",
    head,
    pwa,

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
      siteTitle: false,

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

    /*** 看图浏览组件库 ***/
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

        GitChangelog({ 
          // 填写在此处填写您的仓库链接
          repoURL: () => 'https://github.com/nolebase/integrations', 
        }), 
        GitChangelogMarkdownSection(), 

        // gzip 和 brotli 压缩
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "brotliCompress",
          ext: ".br",
        }),

      ],

      optimizeDeps: {
        exclude: [ 
          '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        ], 
      },

      //naive ui 不作为外部依赖处理，在客户端渲染，不在服务端渲染，进入页面会更快。
      ssr: {
        noExternal: ['naive-ui', 'date-fns', 'vueuc', 'vue-echarts', 'echarts', 'zrender',
        'resize-detector', 
        "@nolebase/vitepress-plugin-inline-link-preview",
        '@nolebase/vitepress-plugin-enhanced-readabilities']
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
      const sitemap = new SitemapStream({ hostname: "https://zhangjunjie.pages.dev/" });
      const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
      sitemap.pipe(writeStream);
      links.forEach((link) => sitemap.write(link));
      sitemap.end();
      await new Promise((r) => writeStream.on("finish", r));
    },

  
  
})
);

