import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'
import { defineConfig, type SiteConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import vueComponents from 'unplugin-vue-components/vite'
import compression from 'vite-plugin-compression'
import { generateSidebar } from 'vitepress-sidebar'
import type { Plugin } from 'vite'

/**
 * Nav menu, verbatim from the original (extraction.json → navLinks + page.html).
 *
 * The doc pages render VitePress's own `VPNavBar`, so the data lives here
 * instead of in the hand-ported `SiteNav.vue` the three custom layouts use.
 * A group without `text` renders no title — the original relies on that for
 * 推荐 / 技术探讨 / 资源分享.
 */
const NAV = [
  { text: '首页', link: '/' },
  { text: '归档', link: '/pages/posts' },
  { text: '标签', link: '/pages/tags' },
  { text: '案例', link: '/pages/case' },
  {
    text: '推荐',
    items: [
      {
        items: [
          { text: 'Claude Code 学习笔记', link: '/editor/ai/claude-learn' },
          { text: 'Antigravity Skills 配置', link: '/editor/ai/antigravity-skills-guide' },
          { text: '2026 年度 Mac 软件推荐', link: '/macos/app/2026' },
          { text: 'VitePress 建站资源汇总', link: '/vitepress/all/resource-all' },
          { text: 'Kiro 等 AI 编辑器快速上手', link: '/editor/ai/to-kiro' },
          { text: 'VSCode 接入 AI 大模型', link: '/editor/vscode/vscode-ai-cn' },
          { text: 'MacOS 26 基础优化设置', link: '/macos/setting/base-init' },
          { text: 'Git 使用记录 - 持续更新', link: '/git/use-log' },
          { text: '前端常用图标资源库汇总', link: '/resource/image/icon-all' },
          { text: 'uni-app+vue3 常见问题', link: '/mobile/uniapp/important-point-uniapp-vue3' },
          { text: 'Vite+TS+Vue3 从零搭建', link: '/vuejs/apply/project-building-vite-ts-1' },
        ],
      },
    ],
  },
  {
    text: '技术探讨',
    items: [
      {
        items: [
          { text: '前端术语', link: '/terminology/design-paradigm' },
          { text: 'CSS 样式', link: '/css/apply/icon-label-shields' },
          { text: 'JS 基础', link: '/js/apply/compare-number' },
          { text: '浏览器', link: '/browser/apply/browser-plugin' },
          { text: 'TS 基础', link: '/ts/basic/ts-normal-summary' },
          { text: 'Nodejs', link: '/nodejs/apply/pnpm-setting' },
          { text: 'Nginx', link: '/nginx/nginx-web-cross-domain' },
        ],
      },
      {
        items: [
          { text: 'Vue.js', link: '/vuejs/basic/vue-mvvm-binding' },
          { text: 'uni-app', link: '/mobile/uniapp/project-building-uniapp-vue3' },
          { text: 'Vite', link: '/pages/tags?q=Vite' },
          { text: 'Element', link: '/element/responsive-layout' },
        ],
      },
      {
        items: [
          { text: '终端配置', link: '/pages/tags?q=%E7%BB%88%E7%AB%AF' },
          { text: 'Git 配置', link: '/git/use-log' },
          { text: '开发工具', link: '/editor/vscode/vscode-self-plugin' },
          { text: 'PS 教程', link: '/editor/ps/photo-change-bg' },
        ],
      },
    ],
  },
  {
    text: '资源分享',
    items: [
      {
        items: [
          { text: '前端导航', link: 'https://nav.weizwz.com/' },
          { text: 'AI工具集', link: 'https://ai-bot.cn/' },
          { text: 'GitHub', link: '/pages/tags?q=Github' },
        ],
      },
      {
        items: [
          { text: '应用分享', link: '/app/network/clash-verge' },
          { text: 'Windows', link: '/windows/setting/terminal-beautify' },
          { text: 'MacOS', link: '/macos/setting/base-init' },
        ],
      },
      {
        items: [
          { text: '前端设计', link: '/resource/design/all' },
          { text: '开源字体', link: '/resource/font/open-source-font' },
          { text: '图标图片', link: '/resource/image/icon-all' },
        ],
      },
    ],
  },
  {
    text: '博客建站',
    items: [
      {
        text: '网站管理',
        items: [{ text: '域名证书', link: '/site/third-level-domain' }],
      },
      {
        text: 'Vitepress',
        items: [
          { text: '资源汇总', link: '/vitepress/all/resource-all' },
          { text: '基础配置', link: '/vitepress/basic/api-examples' },
          { text: '进阶用法', link: '/vitepress/extend/post-data' },
          { text: '常见问题', link: '/vitepress/problem/error-mismatches' },
        ],
      },
      {
        text: 'Hexo框架',
        items: [
          { text: '基础配置', link: '/hexo/basic/hexo-github-blog' },
          { text: '进阶用法', link: '/hexo/extend/hexo-butterfly-recommend' },
        ],
      },
    ],
  },
  {
    text: '关于',
    items: [
      {
        items: [
          { text: '我的友链', link: '/pages/links' },
          { text: '更新日志', link: '/pages/logs' },
          { text: '订阅本站', link: 'https://note.weizwz.com/feed.xml' },
          { text: '我的主页', link: 'https://weizwz.com/' },
          { text: '站点监控', link: 'https://status.weizwz.com/' },
        ],
      },
      {
        text: '我的项目',
        items: [
          { text: 'hexo插件', link: '/hexo/extend/hexo-butterfly-recommend' },
          { text: '唯知导航', link: 'https://nav.weizwz.com/' },
          { text: '唯知工具', link: 'https://tools.weizwz.com/' },
          { text: '封面制作', link: 'https://cover.weizwz.com/' },
          { text: '趣味动画', link: 'https://animation.weizwz.com' },
          { text: '大屏演示', link: 'https://vue3-charts.weizwz.com' },
        ],
      },
    ],
  },
]

/**
 * 侧栏按 `docs/` 的目录结构自动生成（vitepress-sidebar）：新增一篇 `.md` 就会
 * 出现在所属分组的侧栏里，不用再回到这里手写一条。
 *
 * 标题优先取 frontmatter 的 `title`，没有就用正文的一级标题；分组名就是目录
 * 名。`pages/` 与 `travel/` 是自定义布局的页面（归档 / 标签 / 案例 / 游记），
 * 它们由 `theme/Layout.vue` 接管、根本不显示 VitePress 的侧栏，整目录排除。
 */
const SIDEBAR = generateSidebar({
  documentRootPath: 'docs',
  excludeByGlobPattern: ['pages/**', 'travel/**'],
  useTitleFromFrontmatter: true,
  useTitleFromFileHeading: true,
  sortMenusByName: true,
})

/**
 * 预压缩产物。`vite-plugin-compression` 是在 `closeBundle` 里扫输出目录的，而
 * VitePress 一次 `build` 会跑两遍构建：客户端产物进 `docs/.vitepress/dist`，
 * SSR 产物进 cache 临时目录 —— 这里用 Vite 的 `isSsrBuild` 把后者挡掉，既省
 * 一遍压缩，也让日志里只有真正要发布的那些文件。
 */
const compress = (options: Parameters<typeof compression>[0]): Plugin => ({
  ...compression(options),
  apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
})

/** 只压文本类产物：图片 / 视频 / 字体本身就是压缩格式，再压只会变大。 */
const COMPRESSIBLE = /\.(js|mjs|css|html|svg|json|txt|xml)$/i

/** 递归列出 outDir 下的所有 .html。 */
async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const found = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return htmlFiles(path)
      return entry.name.endsWith('.html') ? [path] : []
    }),
  )
  return found.flat()
}

/**
 * 补压 HTML。页面是 VitePress 的 render 阶段才写进 dist 的，那时两遍 Vite
 * 构建（以及 `vite-plugin-compression` 的 `closeBundle`）都跑完了 —— 首页那份
 * HTML 有 150KB，只压 JS/CSS 等于漏了最大的一块。`buildEnd` 在渲染结束之后
 * 触发，正好在这儿把 .html.gz / .html.br 补齐。
 */
async function compressHtml(siteConfig: SiteConfig): Promise<void> {
  for (const file of await htmlFiles(siteConfig.outDir)) {
    const html = await readFile(file)
    await writeFile(`${file}.gz`, gzipSync(html, { level: 9 }))
    await writeFile(
      `${file}.br`,
      brotliCompressSync(html, {
        params: { [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY },
      }),
    )
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: '唯知笔记',
  description: '在这里，我们分享技术、探索AI，一起漫游科技未来与生活百态1',
  // 文章页标题形如「腾讯Agent Mail开测！速抢ID - 唯知笔记」；
  // 首页在 index.md 里用 `titleTemplate: false` 关掉后缀，保持「唯知笔记」。
  titleTemplate: ':title - 唯知笔记',
  // 源站是干净的 URL（/ai/qq-agent-mail 而非 .html），侧栏与导航里的链接
  // 也全部写成无后缀形式。
  cleanUrls: true,
  // VitePress persists the colour scheme under localStorage['vitepress-theme-appearance']
  // and toggles the `dark` class on <html> before first paint — the same contract the
  // original site uses, so the ported theme toggle works unchanged.
  appearance: true,
  // 文章 frontmatter 里的 `lastUpdated`（Date）优先于 git 提交时间，见
  // node/…/chunk: `if (frontmatter.lastUpdated instanceof Date) pageData.lastUpdated = +…`。
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      {
        rel: 'preload',
        href: '/fonts/inter-roman-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: '',
      },
    ],
  ],
  markdown: {
    // 原站每个代码块都带 `line-numbers-mode` + `line-numbers-wrapper`。
    lineNumbers: true,
  },
  // 渲染结束后补压 HTML（见上面的 `compressHtml`）。
  buildEnd: compressHtml,
  themeConfig: {
    logo: '/logo.png',
    nav: NAV,
    sidebar: SIDEBAR,
    outlineTitle: '目录',
    editLink: {
      // 原站的编辑链接指向 docs/post/<相对路径>，与本地文档目录不同名，故显式给模板。
      pattern: 'https://github.com/weizwz/note/edit/main/docs/post/:path',
      text: '在GitHub编辑本页',
    },
    // 传对象（而非 true）既开启「最后更新」，又覆盖默认文案。
    // 源站显示到秒（2026/7/1 17:31:13），因此把 timeStyle 提到 medium 并用
    // `forceLocale` 固定按页面语言（zh-CN）格式化；默认的 dateStyle/timeStyle
    // 'short' 会丢掉秒，且跟随浏览器区域。
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { forceLocale: true, dateStyle: 'short', timeStyle: 'medium' },
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
  },
  vite: {
    plugins: [
      tailwindcss(),
      // md / vue 里直接写 `<Swiper />`、`<PostMeta />` 就行，用到哪个引入哪个，
      // 不需要再在 `theme/index.ts` 里一个个 `app.component()` 注册。
      vueComponents({
        dirs: fileURLToPath(new URL('./theme/components', import.meta.url)),
        // 插件的默认 include 只管 `.vue`，而 VitePress 是把每个 `.md` 编译成
        // Vue SFC 的：模板块落在 `…/note.md?vue&type=template&lang.js` 里。
        // 不补上 `.md` 这两条，md 里写的 `<Swiper />`、`<PostMeta />` 就没人
        // 接管（SSR 与客户端都会渲染成空注释）。前面四条是插件的默认值。
        include: [
          /\.vue$/,
          /\.vue\?vue/,
          /\.vue\.[tj]sx?\?vue/,
          /\.vue\?v=/,
          /\.md$/,
          /\.md\?vue/,
        ],
        // 本项目不跑 vue-tsc，不生成 components.d.ts。
        dts: false,
      }),
      // 注：加了 `/\.md$/`、`/\.md\?vue/` 之后，md 页面 chunk 会直接 import 主题
      // 组件，分块方式随之改变，Rollup 就会对 VitePress 自己的 `Content` 报两条
      // `CYCLIC_CROSS_CHUNK_REEXPORT`：`app/components/Content.js` 要从 `vitepress`
      // （即 `dist/client/index.js`）取 `useData` / `useRoute`，而 `index.js` 又再
      // 导出 `Content` —— 两者互为依赖，把谁挪到对方那一块都只是换一个环，
      // manualChunks 消不掉。它只是分块提示，产物没问题（下面逐页验过 SSR 与客户
      // 端导航）。想彻底消掉这两条，就删掉 `include` 里的 `/\.md$/` 与
      // `/\.md\?vue/`，回到 `theme/index.ts` 里用 `app.component()` 注册 md 组件。
      //
      // 同一种产物出 .gz + .br 两份，交给部署端（Nginx gzip_static / CDN）直接发。
      compress({ algorithm: 'gzip', ext: '.gz', filter: COMPRESSIBLE, verbose: false }),
      compress({
        algorithm: 'brotliCompress',
        ext: '.br',
        filter: COMPRESSIBLE,
        verbose: false,
      }),
    ],
    // 默认 host 为 'localhost'，在 Windows 上 Node 只会绑定 IPv6 的 ::1，
    // 导致 http://127.0.0.1:5173 直接连接被拒。显式绑定 IPv4 回环地址，
    // 让 localhost / 127.0.0.1 都能访问；如需手机或其他设备访问改成 true。
    server: {
      host: '127.0.0.1',
    },
  },
})
