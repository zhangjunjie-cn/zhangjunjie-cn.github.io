import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'
import { defineConfig, type SiteConfig } from 'vitepress'
import { PageProperties } from '@nolebase/vitepress-plugin-page-properties/vite'
import tailwindcss from '@tailwindcss/vite'
import vueComponents from 'unplugin-vue-components/vite'
import compression from 'vite-plugin-compression'
import { generateSidebar } from 'vitepress-sidebar'
import type { Plugin } from 'vite'
import { registerRspressContainers } from './theme/rspress/containers'

/**
 * Nav menu, verbatim from the original (extraction.json → navLinks + page.html).
 *
 * Every page now renders VitePress's own `VPNavBar` — the custom layouts included
 * (`Layout.vue` puts a native `VPNav` into their shell), so the menu data lives
 * here instead of in the hand-ported navbar that used to serve `/`, `/pages/*`
 * and `/travel/**`.
 * A group without `text` renders no title — the original relies on that for
 * 推荐 / 技术探讨 / 资源分享.
 */
const NAV = [
  { text: '首页', link: '/' },
  { text: '归档', link: '/pages/posts' },
  { text: '标签', link: '/pages/tags' },
  { text: '旅途', link: '/pages/case' },
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
  // {
  //   text: '技术探讨',
  //   items: [
  //     {
  //       items: [
  //         { text: '前端术语', link: '/terminology/design-paradigm' },
  //         { text: 'CSS 样式', link: '/css/apply/icon-label-shields' },
  //         { text: 'JS 基础', link: '/js/apply/compare-number' },
  //         { text: '浏览器', link: '/browser/apply/browser-plugin' },
  //         { text: 'TS 基础', link: '/ts/basic/ts-normal-summary' },
  //         { text: 'Nodejs', link: '/nodejs/apply/pnpm-setting' },
  //         { text: 'Nginx', link: '/nginx/nginx-web-cross-domain' },
  //       ],
  //     },
  //     {
  //       items: [
  //         { text: 'Vue.js', link: '/vuejs/basic/vue-mvvm-binding' },
  //         { text: 'uni-app', link: '/mobile/uniapp/project-building-uniapp-vue3' },
  //         { text: 'Vite', link: '/pages/tags?q=Vite' },
  //         { text: 'Element', link: '/element/responsive-layout' },
  //       ],
  //     },
  //     {
  //       items: [
  //         { text: '终端配置', link: '/pages/tags?q=%E7%BB%88%E7%AB%AF' },
  //         { text: 'Git 配置', link: '/git/use-log' },
  //         { text: '开发工具', link: '/editor/vscode/vscode-self-plugin' },
  //         { text: 'PS 教程', link: '/editor/ps/photo-change-bg' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   text: '资源分享',
  //   items: [
  //     {
  //       items: [
  //         { text: '前端导航', link: 'https://nav.weizwz.com/' },
  //         { text: 'AI工具集', link: 'https://ai-bot.cn/' },
  //         { text: 'GitHub', link: '/pages/tags?q=Github' },
  //       ],
  //     },
  //     {
  //       items: [
  //         { text: '应用分享', link: '/app/network/clash-verge' },
  //         { text: 'Windows', link: '/windows/setting/terminal-beautify' },
  //         { text: 'MacOS', link: '/macos/setting/base-init' },
  //       ],
  //     },
  //     {
  //       items: [
  //         { text: '前端设计', link: '/resource/design/all' },
  //         { text: '开源字体', link: '/resource/font/open-source-font' },
  //         { text: '图标图片', link: '/resource/image/icon-all' },
  //       ],
  //     },
  //   ],
  // },
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
 * 标题优先取 frontmatter 的 `title`，没有就用正文的一级标题；分组名默认取目录名，
 * 目录里带 index.md 时取它的一级标题。`pages/` 与 `travel/` 是自定义布局的页面
 * （归档 / 标签 / 案例 / 游记），它们由 `theme/Layout.vue` 接管、根本不显示
 * VitePress 的侧栏，整目录排除。
 */
const SIDEBAR = generateSidebar({
  documentRootPath: 'docs',
  excludeByGlobPattern: ['pages/**', 'travel/**'],
  useTitleFromFrontmatter: true,
  useTitleFromFileHeading: true,
  // 目录里的 index.md 同时充当分组标题和分组入口链接。不开这两项时，分组名会是
  // 英文目录名（`writing-guide`），而且 index 页在侧栏里根本点不到。
  // 全站只有根目录和 `notes/writing-guide/` 带 index.md，根目录是 layout: home，
  // 不进侧栏，所以这两项不会波及其它分组。
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  // 分组入口指向目录本身（`/notes/writing-guide/`），而不是 `/…/index`。
  folderLinkNotIncludesFileName: true,
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

/**
 * 开发期补丁：`@nolebase/vitepress-plugin-page-properties@2.18.2` 自带的 dev 数据
 * 通道在 `vitepress dev docs`（cwd 为项目根）下失效 —— 它把相对 `srcDir` 的
 * `page.filePath`（如 `ai/qq-agent-mail.md`）直接交给 `existsSync`，永远命中不到
 * 文件，卡片会一直空着。这里在客户端挂载后按插件同一套口径重算字数与阅读时间，
 * 再把数据回推给组件；构建产物走插件自己的统计，不受影响。
 */
function pagePropertiesDevData(): Plugin {
  const handlers = [
    { regex: /\p{Script=Hiragana}|\p{Script=Katakana}/gu, wordsPerMinute: 400 },
    { regex: /\p{Script=Han}/gu, wordsPerMinute: 300 },
    {
      regex: /[\p{Script=Latin}\p{Script=Cyrillic}\p{Mark}\p{Punctuation}\p{Number}]+/gu,
      wordsPerMinute: 160,
    },
  ]
  return {
    name: 'local:page-properties-dev-data',
    apply: 'serve',
    configureServer(server) {
      server.ws.on(
        'nolebase-page-properties:client-mounted',
        async (payload: unknown, client) => {
          const filePath = (payload as { page?: { filePath?: unknown } })?.page?.filePath
          if (typeof filePath !== 'string' || !filePath.endsWith('.md')) return

          let body: string
          try {
            body = await readFile(
              fileURLToPath(new URL(`../${filePath}`, import.meta.url)),
              'utf-8',
            )
          } catch {
            return
          }
          body = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')

          let wordsCount = 0
          let minutes = 0
          for (const { regex, wordsPerMinute } of handlers) {
            const count = body.match(regex)?.length ?? 0
            wordsCount += count
            minutes += count / wordsPerMinute
          }
          client.send('nolebase-page-properties:updated', {
            [filePath.toLowerCase()]: { wordsCount, readingTime: Math.ceil(minutes) },
          })
        },
      )
    },
  }
}

/**
 * 代码高亮主题：`createCssVariablesTheme()` 的返回值，原样内联。
 *
 * 为什么不 `import { createCssVariablesTheme } from 'shiki'`：pnpm 严格隔离下
 * 项目根目录没有 `node_modules/shiki`（shiki 只是 vitepress 的传递依赖），config
 * 里解析不到它。而这个函数返回的是一份纯数据主题（没有函数和类），内联的成本只是
 * 这几十行字面量，换来零新增依赖；将来升级 shiki 后作用域若有变化，同步一次即可。
 *
 * `name` 字段决定 VitePress 走哪条分支：`hasSingleTheme = 'name' in theme`，命中
 * 单主题时 `theme` 会被原样交给 shiki（双主题才走 `themes` + `defaultColor: false`）。
 * 单主题 + 默认 `defaultColor` 后，每个 token 输出的是
 * `style="color:var(--shiki-token-keyword)"` 这样的**变量引用**，真实色值全由 CSS
 * 提供（见 `theme/styles/tailwind.css` 的 `--shiki-*`），于是一份主题同时服务明暗
 * 两套色板，暗色只是重定义一组变量。pre 上的内联背景会被 VitePress 自带的
 * `vitepress:clean-up` 删掉，容器外观也完全交给 CSS。
 *
 * `colors` 里的 `terminal.ansi*` 本站用不到（没有 ansi 渲染），但保留才能与上游实现
 * 保持一致，避免以后开 ansi 代码块时莫名丢色。
 */
const CODE_THEME = {
  name: 'css-variables',
  type: 'dark' as const,
  colors: {
    'editor.foreground': 'var(--shiki-foreground)',
    'editor.background': 'var(--shiki-background)',
    'terminal.ansiBlack': 'var(--shiki-ansi-black)',
    'terminal.ansiRed': 'var(--shiki-ansi-red)',
    'terminal.ansiGreen': 'var(--shiki-ansi-green)',
    'terminal.ansiYellow': 'var(--shiki-ansi-yellow)',
    'terminal.ansiBlue': 'var(--shiki-ansi-blue)',
    'terminal.ansiMagenta': 'var(--shiki-ansi-magenta)',
    'terminal.ansiCyan': 'var(--shiki-ansi-cyan)',
    'terminal.ansiWhite': 'var(--shiki-ansi-white)',
    'terminal.ansiBrightBlack': 'var(--shiki-ansi-bright-black)',
    'terminal.ansiBrightRed': 'var(--shiki-ansi-bright-red)',
    'terminal.ansiBrightGreen': 'var(--shiki-ansi-bright-green)',
    'terminal.ansiBrightYellow': 'var(--shiki-ansi-bright-yellow)',
    'terminal.ansiBrightBlue': 'var(--shiki-ansi-bright-blue)',
    'terminal.ansiBrightMagenta': 'var(--shiki-ansi-bright-magenta)',
    'terminal.ansiBrightCyan': 'var(--shiki-ansi-bright-cyan)',
    'terminal.ansiBrightWhite': 'var(--shiki-ansi-bright-white)',
  },
  tokenColors: [
    {
      scope: [
        'keyword.operator.accessor',
        'meta.group.braces.round.function.arguments',
        'meta.template.expression',
        'markup.fenced_code meta.embedded.block',
      ],
      settings: { foreground: 'var(--shiki-foreground)' },
    },
    { scope: 'emphasis', settings: { fontStyle: 'italic' } },
    {
      scope: ['strong', 'markup.heading.markdown', 'markup.bold.markdown'],
      settings: { fontStyle: 'bold' },
    },
    { scope: ['markup.italic.markdown'], settings: { fontStyle: 'italic' } },
    {
      scope: 'meta.link.inline.markdown',
      settings: { fontStyle: 'underline', foreground: 'var(--shiki-token-link)' },
    },
    {
      scope: ['string', 'markup.fenced_code', 'markup.inline'],
      settings: { foreground: 'var(--shiki-token-string)' },
    },
    {
      scope: ['comment', 'string.quoted.docstring.multi'],
      settings: { foreground: 'var(--shiki-token-comment)' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.other.placeholder',
        'constant.character.format.placeholder',
        'variable.language.this',
        'variable.other.object',
        'variable.other.class',
        'variable.other.constant',
        'meta.property-name',
        'meta.property-value',
        'support',
      ],
      settings: { foreground: 'var(--shiki-token-constant)' },
    },
    {
      scope: [
        'keyword',
        'storage.modifier',
        'storage.type',
        'storage.control.clojure',
        'entity.name.function.clojure',
        'entity.name.tag.yaml',
        'support.function.node',
        'support.type.property-name.json',
        'punctuation.separator.key-value',
        'punctuation.definition.template-expression',
      ],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: 'variable.parameter.function',
      settings: { foreground: 'var(--shiki-token-parameter)' },
    },
    {
      scope: [
        'support.function',
        'entity.name.type',
        'entity.other.inherited-class',
        'meta.function-call',
        'meta.instance.constructor',
        'entity.other.attribute-name',
        'entity.name.function',
        'constant.keyword.clojure',
      ],
      settings: { foreground: 'var(--shiki-token-function)' },
    },
    {
      scope: [
        'entity.name.tag',
        'string.quoted',
        'string.regexp',
        'string.interpolated',
        'string.template',
        'string.unquoted.plain.out.yaml',
        'keyword.other.template',
      ],
      settings: { foreground: 'var(--shiki-token-string-expression)' },
    },
    {
      scope: [
        'punctuation.definition.arguments',
        'punctuation.definition.dict',
        'punctuation.separator',
        'meta.function-call.arguments',
      ],
      settings: { foreground: 'var(--shiki-token-punctuation)' },
    },
    {
      scope: ['markup.underline.link', 'punctuation.definition.metadata.markdown'],
      settings: { foreground: 'var(--shiki-token-link)' },
    },
    {
      scope: ['beginning.punctuation.definition.list.markdown'],
      settings: { foreground: 'var(--shiki-token-string)' },
    },
    {
      scope: [
        'punctuation.definition.string.begin.markdown',
        'punctuation.definition.string.end.markdown',
        'string.other.link.title.markdown',
        'string.other.link.description.markdown',
      ],
      settings: { foreground: 'var(--shiki-token-keyword)' },
    },
    {
      scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
      settings: { foreground: 'var(--shiki-token-inserted)' },
    },
    {
      scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
      settings: { foreground: 'var(--shiki-token-deleted)' },
    },
    {
      scope: ['markup.changed', 'punctuation.definition.changed'],
      settings: { foreground: 'var(--shiki-token-changed)' },
    },
  ],
}

export default defineConfig({
  lang: 'zh-CN',
  title: '俊杰笔记',
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
  // Sitemap：构建时输出 /sitemap.xml。hostname 是对外域名、末尾不带斜杠
  // （生成器按 `${hostname}${pagePath}` 拼绝对地址）；`cleanUrls` 已开，
  // 因此条目里都是无 .html 后缀的干净 URL。
  sitemap: {
    hostname: 'https://zhangjunjiee.netlify.app',
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    // 代码块配色走 css-variables 主题，实际色值在 tailwind.css 里按明暗两套定义。
    theme: CODE_THEME,
    // 代码块默认不带左侧行号 —— Rspress 那边也是显式写 `:line-numbers` 才显示。
    // 个别块想要行号，在围栏语言后面加 `:line-numbers` 即可。
    lineNumbers: false,
    // 容器语法换成 Rspress 那一套（`:::tip` / `:::tip 标题` / `:::tip{title="…"}` /
    // `:::prompt`）。必须挂在 `preConfig`：VitePress 自带的容器插件在它之后才注册，
    // 而 markdown-it 的 Ruler 取第一条命中的规则，先注册才压得住同名的 `::: tip`。
    preConfig: registerRspressContainers,
  },
  
  // 渲染结束后补压 HTML（见上面的 `compressHtml`）。
  buildEnd: compressHtml,
  themeConfig: {
    logo: '/logo.png',
    nav: NAV,
    sidebar: SIDEBAR,
    outlineTitle: '目录',
    // 目录带 h3：右侧导轨（`theme/components/AsideRail.vue`）复刻的是 ui.nuxt.com
    // 那条「电路折线」，子级条目靠这段阶梯错位才看得出来；默认的 `2` 只有 h2，
    // 折线就会退化成一根直的。想回到只有 h2，改回 `outline: 2` 即可。
    outline: [2, 3],
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
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'ESC'
                }
              }
            }
          }
        }
      }
    }
  },
  vite: {
    // 官方集成要求（@nolebase/vitepress-plugin-enhanced-readabilities）：
    // 这几个包不做依赖预构建 —— 它们自带 SFC 与样式，预构建会把样式丢掉（或报
    // 找不到导出）；SSR 阶段反过来不要外部化，让 Vite 自己编译它们的 .vue。
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
      ],
    },
    ssr: {
      noExternal: ['@nolebase/vitepress-plugin-enhanced-readabilities', '@nolebase/ui'],
    },
    plugins: [
      tailwindcss(),
      // 「页面属性」卡片（@nolebase/vitepress-plugin-page-properties）：在预构建阶段
      // 统计每篇 md 的正文字数与阅读时间，客户端通过 `virtual:nolebase-page-properties`
      // 读取；卡片本身仍由 md 里的 `<NolebasePageProperties />` 手动放置。
      PageProperties(),
      pagePropertiesDevData(),
      // md / vue 里直接写 `<Swiper />`、`<NolebasePageProperties />` 就行，用到哪个引入哪个，
      // 不需要再在 `theme/index.ts` 里一个个 `app.component()` 注册。
      vueComponents({
        dirs: fileURLToPath(new URL('./theme/components', import.meta.url)),
        // 插件的默认 include 只管 `.vue`，而 VitePress 是把每个 `.md` 编译成
        // Vue SFC 的：模板块落在 `…/note.md?vue&type=template&lang.js` 里。
        // 不补上 `.md` 这两条，md 里写的 `<Swiper />` 这类本地组件就没人
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
