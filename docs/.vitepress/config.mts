import { defineConfig } from 'vitepress';
import { resolve } from "node:path";
import { metaData } from './config/constants';
import { head } from './config/head';
import { markdown } from './config/markdown';
import { themeConfig } from './config/theme';
import { ArcoResolver,TDesignResolver } from 'unplugin-vue-components/resolvers';
import { withPwa } from "@vite-pwa/vitepress";
// 自动导入TDesign 
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from "vite-plugin-compression";
import UnoCSS from 'unocss/vite'
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite';

import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

import dynamicImport from 'vite-plugin-dynamic-import';

const fileAndStyles: Record<string, string> = {}

export default withPwa(
  defineConfig({
    outDir: resolve(__dirname, "../../dist"),
    lang: metaData.lang,
    title: metaData.title,
    description: metaData.description,

    cleanUrls: true,
    lastUpdated: true, // 显示最后更新时间

    head, // <head>内标签配置
    markdown: markdown, // Markdown配置
    themeConfig, // 主题配置
    // Bug 修复：将 mode 的类型改为 "development" | "production" | undefined
    pwa: {
      // 根目录
      outDir: resolve(__dirname, "../../dist"),
      registerType: "prompt", //提示更新
      injectRegister: 'auto',
      // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      includeManifestIcons: false,
      manifest: {
        id: "/",
        name: "张俊杰的博客",
        short_name: "张俊杰的博客",
        description: "张俊杰的博客人生",
        theme_color: '#ffffff',
        icons: [
          {
            src: "/images/pwa-120x120.png",
            sizes: "120x120",
            type: "image/png",
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
      injectManifest: {
				injectionPoint: undefined,
			},
      workbox: {
        // 定制缓存策略
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
					{
						// 匹配文章相关的js文件
						urlPattern: /posts.+\.js$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'article-content',
							expiration: {
								maxEntries: 100, // 最多缓存100篇文章
								maxAgeSeconds: 7 * 24 * 60 * 60, // 缓存一周
							},
						},
					},
				],// 预缓存重要资源
        globPatterns: ["**/*.{css,js,html,svg,png,ico,mp4,txt,woff2}"],
				skipWaiting: true,
				clientsClaim: true,
        
      },
      devOptions:{
				enabled:true,// 开发环境是否启用
				type:'module'
			}
    },

    /*** 看图浏览组件库 ***/
    vite: {
      optimizeDeps: {
        exclude: [ 
          '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
          'vitepress', 
          '@nolebase/ui', 
          '@vueuse/core',
        ], 
      },
      plugins: [
        // VitePWA({ 
        //   registerType: 'autoUpdate',
        // }),
        // ...
        AutoImport({
          resolvers: [TDesignResolver({
            library: 'vue-next'
          })],
        }),
        Components({
          //自动加载 components 下的vue文件为组件，省去import 导入。
          dirs: ['.vitepress/theme/components'],
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          resolvers: [
            //导入图标组件
            IconsResolver({
              prefix: '',
              enabledCollections: ['ion', 'carbon'], // 启用的图标集
            }),
            TDesignResolver({
              library: 'vue-next'
            }),
            // 自动导入图标组件
            ArcoResolver({
              sideEffect: true,
              resolveIcons: true
            })
          ],
        }),
        GitChangelog({ 
          // 填写在此处填写您的仓库链接
          repoURL: () => 'https://github.com/zhangjunjie-cn/zhangjunjie-cn.github.io', 
        }), 
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
        GitChangelogMarkdownSection(), 
        dynamicImport(),
        Icons({
          autoInstall: true, // 自动安装图标集
          // defaultStyle: 'display: inline-block;',
        }),
        UnoCSS()
      ],
      ssr: {
        noExternal: process.env.NODE_ENV === 'production'
          ? ['@arco-design/web-vue','@nolebase/vitepress-plugin-enhanced-readabilities', '@nolebase/ui','naive-ui', 'date-fns', 'vueuc']
          : []
      },
    },

    //naive-ui
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
    transformHtml(code, id) {
      const html = id.split('/').pop()
      if (!html)
        return
      const style = fileAndStyles[`/${html}`]
      if (style) {
        return code.replace(/<\/head>/, `${style}</head>`)
      }
    }

    
  },
  
));