import { defineConfig } from 'vitepress';
import { build, defineConfigWithTheme, useData } from 'vitepress'
import { VuetomThemeConfig } from 'vitepress-theme-vuetom'
import { resolve } from "node:path";
import { metaData } from './config/constants';
import { head } from './config/head';
import { markdown } from './config/markdown';
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

import { nav } from './config/nav';
import { sidebar } from './config/sidebar';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { withMermaid } from "vitepress-plugin-mermaid";
import dynamicImport from 'vite-plugin-dynamic-import';

const fileAndStyles: Record<string, string> = {}

export default withPwa(defineConfigWithTheme<VuetomThemeConfig>(
  withMermaid({
    outDir: resolve(__dirname, "../../dist"),
    lang: metaData.lang,
    title: metaData.title,
    description: metaData.description,

    cleanUrls: true,
    lastUpdated: true, // 显示最后更新时间

    head, // <head>内标签配置
    markdown: markdown, // Markdown配置
    themeConfig:{
        nav, // 导航栏配置
        sidebar, // 侧边栏配置
      
        i18nRouting: false,
        logo: '/logo.png',
        siteTitle: false,
        flashEnable: true,
        outline: {
          level: [2, 3], // 右侧大纲标题层级
          label: '目录', // 右侧大纲标题文本配置
        },
        darkModeSwitchLabel: '切换日光/暗黑模式',
        sidebarMenuLabel: '文章',
        returnToTopLabel: '返回顶部',
        lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
        // 文档页脚文本配置
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },
        // 编辑链接配置
        editLink: {
          pattern: 'https://github.com/Charles7c/charles7c.github.io/edit/main/docs/:path',
          text: '不妥之处，敬请雅正'
        },
        // 搜索配置（二选一）
        // search: {
        //   // provider: 'algolia',
        //   // options: algoliaSearchOptions,
        //   // 本地离线搜索
        //   provider: 'local',
        //   options: localSearchOptions
        // },
      
        //外链图标
        externalLinkIcon:false,
        // 导航栏右侧社交链接配置
        socialLinks: [
          { icon: 'github', link: 'https://github.com/zhangjunjie-cn/zhangjunjie-cn.github.io' },
          // {
          //   icon: {
          //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>码云</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
          //   },
          //   link: 'https://gitee.com/Charles7c/charles7c'
          // },
          {
            icon: {
              svg: `<svg width="33" height="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.8 204">
                      <title>ContiNew Admin</title>
                      <path fill="#307AF2" d="M86.7,0l88,51v.2l-16.3,9.4v-.2L86.7,18.9Zm71.8,143.5,16.3,9.4v.2L86.8,204h0l-16.3-9.4,16.3-9.4h0l71.7-41.5v-.2Z"/>
                      <path fill="#12D2AC" d="M16.3,143.5v.2L58,167.8l-16.3,9.4L0,153.1v-.2Z"/>
                      <path fill="#12D2AC" d="M104.1,93,15.9,143.8l-.2-.1V124.9l.2.1L87.7,83.6,104.1,93Z"/>
                      <path fill="#0057FE" d="M88.1,0,.1,51v.2l16.3,9.4v-.2L88.1,18.9Z"/>
                      <path fill="#307AF2" d="M.1,50.9.2,152.6l.2.1,16.3-9.4-.2-.1-.1-82.9L.1,50.9Z"/>
                      <path fill="#0057FE" d="M174.7,50.9l-.1,101.7-.2.1-16.3-9.4.2-.1.1-82.9Z"/>
                      <path fill="#12D2AC" d="M41.7,158.5l16.1,9.4,100.6-58.7V90.4Z"/>
                    </svg>`
            },
            link: 'https://zhangjunjiee.netlify.app/'
          }
        ],
      
      
      
        
      
      
        // 自定义扩展: 文章元数据配置
        // @ts-ignore
        articleMetadataConfig: {
          author: '张俊杰', // 文章全局默认作者名称
          authorLink: '/about/me', // 点击作者名时默认跳转的链接
          showViewCount: false, // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
        },
        // 自定义扩展: 文章版权配置
        copyrightConfig: {
          license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
          licenseLink: 'http://creativecommons.org/licenses/by-sa/4.0/'
        },
        // 自定义扩展: 评论配置
        commentConfig: {
          type: 'gitalk',
          showComment: true // 是否显示评论
        },
        // 自定义扩展: 页脚配置
        footerConfig: {
          showFooter: true, // 是否显示页脚
          showRainbow: true, // 是否显示彩虹
          icpRecordCode: '津ICP备2022005864号-2', // ICP备案号
          publicSecurityRecordCode: '津公网安备12011202000677号', // 联网备案号
          copyright: `Copyright © 2019-${new Date().getFullYear()} Charles7c` // 版权信息
        },
      
      
        // 404
        notFound: {
          title: '找不到页面',
          quote: '页面不见了，也许它去找寻新的冒险了！',
          linkLabel: '返回首页重新探索',
          linkText: '返回首页',
          code: '404'
        },
      
      
        /*** 自定义配置 ***/
        visitor: {
          badgeId: 'zhangjunjie.page.visitor',
        },
    },
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
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.md\?vue/],
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
          defaultStyle: 'display: inline-block;',
        }),
        UnoCSS()
      ],
      ssr: {
        noExternal: process.env.NODE_ENV === 'production'
          ? ['@arco-design/web-vue','@nolebase/vitepress-plugin-enhanced-readabilities','vitepress-theme-vuetom', '@nolebase/ui','naive-ui', 'date-fns', 'vueuc', 'simple-mind-map']
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
  
)));