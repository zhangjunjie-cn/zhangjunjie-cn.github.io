import { defineConfig } from 'vitepress';
import { resolve } from "node:path";
import { metaData } from './config/constants';
import { head } from './config/head';
import { markdown } from './config/markdown';
import { themeConfig } from './config/theme';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// 自动导入TDesign 
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from "vite-plugin-compression";
import UnoCSS from 'unocss/vite'
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'

const fileAndStyles: Record<string, string> = {}

export default defineConfig({
    outDir: resolve(__dirname, "../../dist"),
    lang: metaData.lang,
    title: metaData.title,
    description: metaData.description,

    cleanUrls: true,
    lastUpdated: true, // 显示最后更新时间

    head, // <head>内标签配置
    markdown: markdown, // Markdown配置
    themeConfig, // 主题配置

    /*** 看图浏览组件库 ***/
    vite: {
      optimizeDeps: {
        exclude: [ 
          '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
          'vitepress', 
          '@nolebase/ui', 
        ], 
      },
      plugins: [
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
          resolvers: [TDesignResolver({
            library: 'vue-next'
          }),
          // 自动导入图标组件
          ArcoResolver({
            sideEffect: true,
            resolveIcons: true
          })],
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
  
);