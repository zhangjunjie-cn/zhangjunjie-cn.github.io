// docs/.vitepress/config.mts
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { defineConfig } from "file:///D:/%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99/zhangjunjie-cn.github.io/node_modules/.pnpm/vitepress@1.6.4_@algolia+cl_b26e88efac128eb62b711ff66778da62/node_modules/vitepress/dist/node/index.js";
import tailwindcss from "file:///D:/%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99/zhangjunjie-cn.github.io/node_modules/.pnpm/@tailwindcss+vite@4.3.3_vit_f2af3dd76004efee3bf6d045a34d6f68/node_modules/@tailwindcss/vite/dist/index.mjs";
import vueComponents from "file:///D:/%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99/zhangjunjie-cn.github.io/node_modules/.pnpm/unplugin-vue-components@32._d993492b983803ebf7a70a63629bf052/node_modules/unplugin-vue-components/dist/vite.mjs";
import compression from "file:///D:/%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99/zhangjunjie-cn.github.io/node_modules/.pnpm/vite-plugin-compression@0.5_00e74e489caea0a074c67a9444cc66e3/node_modules/vite-plugin-compression/dist/index.mjs";
import { generateSidebar } from "file:///D:/%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99/zhangjunjie-cn.github.io/node_modules/.pnpm/vitepress-sidebar@1.40.0/node_modules/vitepress-sidebar/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99/zhangjunjie-cn.github.io/docs/.vitepress/config.mts";
var NAV = [
  { text: "\u9996\u9875", link: "/" },
  { text: "\u5F52\u6863", link: "/pages/posts" },
  { text: "\u6807\u7B7E", link: "/pages/tags" },
  { text: "\u6848\u4F8B", link: "/pages/case" },
  {
    text: "\u63A8\u8350",
    items: [
      {
        items: [
          { text: "Claude Code \u5B66\u4E60\u7B14\u8BB0", link: "/editor/ai/claude-learn" },
          { text: "Antigravity Skills \u914D\u7F6E", link: "/editor/ai/antigravity-skills-guide" },
          { text: "2026 \u5E74\u5EA6 Mac \u8F6F\u4EF6\u63A8\u8350", link: "/macos/app/2026" },
          { text: "VitePress \u5EFA\u7AD9\u8D44\u6E90\u6C47\u603B", link: "/vitepress/all/resource-all" },
          { text: "Kiro \u7B49 AI \u7F16\u8F91\u5668\u5FEB\u901F\u4E0A\u624B", link: "/editor/ai/to-kiro" },
          { text: "VSCode \u63A5\u5165 AI \u5927\u6A21\u578B", link: "/editor/vscode/vscode-ai-cn" },
          { text: "MacOS 26 \u57FA\u7840\u4F18\u5316\u8BBE\u7F6E", link: "/macos/setting/base-init" },
          { text: "Git \u4F7F\u7528\u8BB0\u5F55 - \u6301\u7EED\u66F4\u65B0", link: "/git/use-log" },
          { text: "\u524D\u7AEF\u5E38\u7528\u56FE\u6807\u8D44\u6E90\u5E93\u6C47\u603B", link: "/resource/image/icon-all" },
          { text: "uni-app+vue3 \u5E38\u89C1\u95EE\u9898", link: "/mobile/uniapp/important-point-uniapp-vue3" },
          { text: "Vite+TS+Vue3 \u4ECE\u96F6\u642D\u5EFA", link: "/vuejs/apply/project-building-vite-ts-1" }
        ]
      }
    ]
  },
  {
    text: "\u6280\u672F\u63A2\u8BA8",
    items: [
      {
        items: [
          { text: "\u524D\u7AEF\u672F\u8BED", link: "/terminology/design-paradigm" },
          { text: "CSS \u6837\u5F0F", link: "/css/apply/icon-label-shields" },
          { text: "JS \u57FA\u7840", link: "/js/apply/compare-number" },
          { text: "\u6D4F\u89C8\u5668", link: "/browser/apply/browser-plugin" },
          { text: "TS \u57FA\u7840", link: "/ts/basic/ts-normal-summary" },
          { text: "Nodejs", link: "/nodejs/apply/pnpm-setting" },
          { text: "Nginx", link: "/nginx/nginx-web-cross-domain" }
        ]
      },
      {
        items: [
          { text: "Vue.js", link: "/vuejs/basic/vue-mvvm-binding" },
          { text: "uni-app", link: "/mobile/uniapp/project-building-uniapp-vue3" },
          { text: "Vite", link: "/pages/tags?q=Vite" },
          { text: "Element", link: "/element/responsive-layout" }
        ]
      },
      {
        items: [
          { text: "\u7EC8\u7AEF\u914D\u7F6E", link: "/pages/tags?q=%E7%BB%88%E7%AB%AF" },
          { text: "Git \u914D\u7F6E", link: "/git/use-log" },
          { text: "\u5F00\u53D1\u5DE5\u5177", link: "/editor/vscode/vscode-self-plugin" },
          { text: "PS \u6559\u7A0B", link: "/editor/ps/photo-change-bg" }
        ]
      }
    ]
  },
  {
    text: "\u8D44\u6E90\u5206\u4EAB",
    items: [
      {
        items: [
          { text: "\u524D\u7AEF\u5BFC\u822A", link: "https://nav.weizwz.com/" },
          { text: "AI\u5DE5\u5177\u96C6", link: "https://ai-bot.cn/" },
          { text: "GitHub", link: "/pages/tags?q=Github" }
        ]
      },
      {
        items: [
          { text: "\u5E94\u7528\u5206\u4EAB", link: "/app/network/clash-verge" },
          { text: "Windows", link: "/windows/setting/terminal-beautify" },
          { text: "MacOS", link: "/macos/setting/base-init" }
        ]
      },
      {
        items: [
          { text: "\u524D\u7AEF\u8BBE\u8BA1", link: "/resource/design/all" },
          { text: "\u5F00\u6E90\u5B57\u4F53", link: "/resource/font/open-source-font" },
          { text: "\u56FE\u6807\u56FE\u7247", link: "/resource/image/icon-all" }
        ]
      }
    ]
  },
  {
    text: "\u535A\u5BA2\u5EFA\u7AD9",
    items: [
      {
        text: "\u7F51\u7AD9\u7BA1\u7406",
        items: [{ text: "\u57DF\u540D\u8BC1\u4E66", link: "/site/third-level-domain" }]
      },
      {
        text: "Vitepress",
        items: [
          { text: "\u8D44\u6E90\u6C47\u603B", link: "/vitepress/all/resource-all" },
          { text: "\u57FA\u7840\u914D\u7F6E", link: "/vitepress/basic/api-examples" },
          { text: "\u8FDB\u9636\u7528\u6CD5", link: "/vitepress/extend/post-data" },
          { text: "\u5E38\u89C1\u95EE\u9898", link: "/vitepress/problem/error-mismatches" }
        ]
      },
      {
        text: "Hexo\u6846\u67B6",
        items: [
          { text: "\u57FA\u7840\u914D\u7F6E", link: "/hexo/basic/hexo-github-blog" },
          { text: "\u8FDB\u9636\u7528\u6CD5", link: "/hexo/extend/hexo-butterfly-recommend" }
        ]
      }
    ]
  },
  {
    text: "\u5173\u4E8E",
    items: [
      {
        items: [
          { text: "\u6211\u7684\u53CB\u94FE", link: "/pages/links" },
          { text: "\u66F4\u65B0\u65E5\u5FD7", link: "/pages/logs" },
          { text: "\u8BA2\u9605\u672C\u7AD9", link: "https://note.weizwz.com/feed.xml" },
          { text: "\u6211\u7684\u4E3B\u9875", link: "https://weizwz.com/" },
          { text: "\u7AD9\u70B9\u76D1\u63A7", link: "https://status.weizwz.com/" }
        ]
      },
      {
        text: "\u6211\u7684\u9879\u76EE",
        items: [
          { text: "hexo\u63D2\u4EF6", link: "/hexo/extend/hexo-butterfly-recommend" },
          { text: "\u552F\u77E5\u5BFC\u822A", link: "https://nav.weizwz.com/" },
          { text: "\u552F\u77E5\u5DE5\u5177", link: "https://tools.weizwz.com/" },
          { text: "\u5C01\u9762\u5236\u4F5C", link: "https://cover.weizwz.com/" },
          { text: "\u8DA3\u5473\u52A8\u753B", link: "https://animation.weizwz.com" },
          { text: "\u5927\u5C4F\u6F14\u793A", link: "https://vue3-charts.weizwz.com" }
        ]
      }
    ]
  }
];
var SIDEBAR = generateSidebar({
  documentRootPath: "docs",
  excludeByGlobPattern: ["pages/**", "travel/**"],
  useTitleFromFrontmatter: true,
  useTitleFromFileHeading: true,
  sortMenusByName: true
});
var compress = (options) => ({
  ...compression(options),
  apply: (_config, env) => env.command === "build" && !env.isSsrBuild
});
var COMPRESSIBLE = /\.(js|mjs|css|html|svg|json|txt|xml)$/i;
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith(".html") ? [path] : [];
    })
  );
  return found.flat();
}
async function compressHtml(siteConfig) {
  for (const file of await htmlFiles(siteConfig.outDir)) {
    const html = await readFile(file);
    await writeFile(`${file}.gz`, gzipSync(html, { level: 9 }));
    await writeFile(
      `${file}.br`,
      brotliCompressSync(html, {
        params: { [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY }
      })
    );
  }
}
var config_default = defineConfig({
  lang: "zh-CN",
  title: "\u552F\u77E5\u7B14\u8BB0",
  description: "\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u5206\u4EAB\u6280\u672F\u3001\u63A2\u7D22AI\uFF0C\u4E00\u8D77\u6F2B\u6E38\u79D1\u6280\u672A\u6765\u4E0E\u751F\u6D3B\u767E\u60011",
  // 文章页标题形如「腾讯Agent Mail开测！速抢ID - 唯知笔记」；
  // 首页在 index.md 里用 `titleTemplate: false` 关掉后缀，保持「唯知笔记」。
  titleTemplate: ":title - \u552F\u77E5\u7B14\u8BB0",
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
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/inter-roman-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: ""
      }
    ]
  ],
  markdown: {
    // 原站每个代码块都带 `line-numbers-mode` + `line-numbers-wrapper`。
    lineNumbers: true
  },
  // 渲染结束后补压 HTML（见上面的 `compressHtml`）。
  buildEnd: compressHtml,
  themeConfig: {
    logo: "/logo.png",
    nav: NAV,
    sidebar: SIDEBAR,
    outlineTitle: "\u76EE\u5F55",
    editLink: {
      // 原站的编辑链接指向 docs/post/<相对路径>，与本地文档目录不同名，故显式给模板。
      pattern: "https://github.com/weizwz/note/edit/main/docs/post/:path",
      text: "\u5728GitHub\u7F16\u8F91\u672C\u9875"
    },
    // 传对象（而非 true）既开启「最后更新」，又覆盖默认文案。
    // 源站显示到秒（2026/7/1 17:31:13），因此把 timeStyle 提到 medium 并用
    // `forceLocale` 固定按页面语言（zh-CN）格式化；默认的 dateStyle/timeStyle
    // 'short' 会丢掉秒，且跟随浏览器区域。
    lastUpdated: {
      text: "\u6700\u540E\u66F4\u65B0\u4E8E",
      formatOptions: { forceLocale: true, dateStyle: "short", timeStyle: "medium" }
    },
    docFooter: { prev: "\u4E0A\u4E00\u7BC7", next: "\u4E0B\u4E00\u7BC7" }
  },
  vite: {
    // 官方集成要求（@nolebase/vitepress-plugin-enhanced-readabilities）：
    // 这几个包不做依赖预构建 —— 它们自带 SFC 与样式，预构建会把样式丢掉（或报
    // 找不到导出）；SSR 阶段反过来不要外部化，让 Vite 自己编译它们的 .vue。
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui"
      ]
    },
    ssr: {
      noExternal: ["@nolebase/vitepress-plugin-enhanced-readabilities", "@nolebase/ui"]
    },
    plugins: [
      tailwindcss(),
      // md / vue 里直接写 `<Swiper />`、`<PostMeta />` 就行，用到哪个引入哪个，
      // 不需要再在 `theme/index.ts` 里一个个 `app.component()` 注册。
      vueComponents({
        dirs: fileURLToPath(new URL("./theme/components", __vite_injected_original_import_meta_url)),
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
          /\.md\?vue/
        ],
        // 本项目不跑 vue-tsc，不生成 components.d.ts。
        dts: false
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
      compress({ algorithm: "gzip", ext: ".gz", filter: COMPRESSIBLE, verbose: false }),
      compress({
        algorithm: "brotliCompress",
        ext: ".br",
        filter: COMPRESSIBLE,
        verbose: false
      })
    ],
    // 默认 host 为 'localhost'，在 Windows 上 Node 只会绑定 IPv6 的 ::1，
    // 导致 http://127.0.0.1:5173 直接连接被拒。显式绑定 IPv4 回环地址，
    // 让 localhost / 127.0.0.1 都能访问；如需手机或其他设备访问改成 true。
    server: {
      host: "127.0.0.1"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTYyMTFcdTc2ODRcdTdGNTFcdTdBRDlcXFxcemhhbmdqdW5qaWUtY24uZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2MjExXHU3Njg0XHU3RjUxXHU3QUQ5XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JTg4JTkxJUU3JTlBJTg0JUU3JUJEJTkxJUU3JUFCJTk5L3poYW5nanVuamllLWNuLmdpdGh1Yi5pby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IHJlYWRkaXIsIHJlYWRGaWxlLCB3cml0ZUZpbGUgfSBmcm9tICdub2RlOmZzL3Byb21pc2VzJ1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGJyb3RsaUNvbXByZXNzU3luYywgY29uc3RhbnRzLCBnemlwU3luYyB9IGZyb20gJ25vZGU6emxpYidcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFNpdGVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSdcclxuaW1wb3J0IHZ1ZUNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVNpZGViYXIgfSBmcm9tICd2aXRlcHJlc3Mtc2lkZWJhcidcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5cclxuLyoqXHJcbiAqIE5hdiBtZW51LCB2ZXJiYXRpbSBmcm9tIHRoZSBvcmlnaW5hbCAoZXh0cmFjdGlvbi5qc29uIFx1MjE5MiBuYXZMaW5rcyArIHBhZ2UuaHRtbCkuXHJcbiAqXHJcbiAqIEV2ZXJ5IHBhZ2Ugbm93IHJlbmRlcnMgVml0ZVByZXNzJ3Mgb3duIGBWUE5hdkJhcmAgXHUyMDE0IHRoZSBjdXN0b20gbGF5b3V0cyBpbmNsdWRlZFxyXG4gKiAoYExheW91dC52dWVgIHB1dHMgYSBuYXRpdmUgYFZQTmF2YCBpbnRvIHRoZWlyIHNoZWxsKSwgc28gdGhlIG1lbnUgZGF0YSBsaXZlc1xyXG4gKiBoZXJlIGluc3RlYWQgb2YgaW4gdGhlIGhhbmQtcG9ydGVkIG5hdmJhciB0aGF0IHVzZWQgdG8gc2VydmUgYC9gLCBgL3BhZ2VzLypgXHJcbiAqIGFuZCBgL3RyYXZlbC8qKmAuXHJcbiAqIEEgZ3JvdXAgd2l0aG91dCBgdGV4dGAgcmVuZGVycyBubyB0aXRsZSBcdTIwMTQgdGhlIG9yaWdpbmFsIHJlbGllcyBvbiB0aGF0IGZvclxyXG4gKiBcdTYzQThcdTgzNTAgLyBcdTYyODBcdTY3MkZcdTYzQTJcdThCQTggLyBcdThENDRcdTZFOTBcdTUyMDZcdTRFQUIuXHJcbiAqL1xyXG5jb25zdCBOQVYgPSBbXHJcbiAgeyB0ZXh0OiAnXHU5OTk2XHU5ODc1JywgbGluazogJy8nIH0sXHJcbiAgeyB0ZXh0OiAnXHU1RjUyXHU2ODYzJywgbGluazogJy9wYWdlcy9wb3N0cycgfSxcclxuICB7IHRleHQ6ICdcdTY4MDdcdTdCN0UnLCBsaW5rOiAnL3BhZ2VzL3RhZ3MnIH0sXHJcbiAgeyB0ZXh0OiAnXHU2ODQ4XHU0RjhCJywgbGluazogJy9wYWdlcy9jYXNlJyB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICdcdTYzQThcdTgzNTAnLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICdDbGF1ZGUgQ29kZSBcdTVCNjZcdTRFNjBcdTdCMTRcdThCQjAnLCBsaW5rOiAnL2VkaXRvci9haS9jbGF1ZGUtbGVhcm4nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdBbnRpZ3Jhdml0eSBTa2lsbHMgXHU5MTREXHU3RjZFJywgbGluazogJy9lZGl0b3IvYWkvYW50aWdyYXZpdHktc2tpbGxzLWd1aWRlJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnMjAyNiBcdTVFNzRcdTVFQTYgTWFjIFx1OEY2Rlx1NEVGNlx1NjNBOFx1ODM1MCcsIGxpbms6ICcvbWFjb3MvYXBwLzIwMjYnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdWaXRlUHJlc3MgXHU1RUZBXHU3QUQ5XHU4RDQ0XHU2RTkwXHU2QzQ3XHU2MDNCJywgbGluazogJy92aXRlcHJlc3MvYWxsL3Jlc291cmNlLWFsbCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0tpcm8gXHU3QjQ5IEFJIFx1N0YxNlx1OEY5MVx1NTY2OFx1NUZFQlx1OTAxRlx1NEUwQVx1NjI0QicsIGxpbms6ICcvZWRpdG9yL2FpL3RvLWtpcm8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdWU0NvZGUgXHU2M0E1XHU1MTY1IEFJIFx1NTkyN1x1NkEyMVx1NTc4QicsIGxpbms6ICcvZWRpdG9yL3ZzY29kZS92c2NvZGUtYWktY24nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdNYWNPUyAyNiBcdTU3RkFcdTc4NDBcdTRGMThcdTUzMTZcdThCQkVcdTdGNkUnLCBsaW5rOiAnL21hY29zL3NldHRpbmcvYmFzZS1pbml0JyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnR2l0IFx1NEY3Rlx1NzUyOFx1OEJCMFx1NUY1NSAtIFx1NjMwMVx1N0VFRFx1NjZGNFx1NjVCMCcsIGxpbms6ICcvZ2l0L3VzZS1sb2cnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTUyNERcdTdBRUZcdTVFMzhcdTc1MjhcdTU2RkVcdTY4MDdcdThENDRcdTZFOTBcdTVFOTNcdTZDNDdcdTYwM0InLCBsaW5rOiAnL3Jlc291cmNlL2ltYWdlL2ljb24tYWxsJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAndW5pLWFwcCt2dWUzIFx1NUUzOFx1ODlDMVx1OTVFRVx1OTg5OCcsIGxpbms6ICcvbW9iaWxlL3VuaWFwcC9pbXBvcnRhbnQtcG9pbnQtdW5pYXBwLXZ1ZTMnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdWaXRlK1RTK1Z1ZTMgXHU0RUNFXHU5NkY2XHU2NDJEXHU1RUZBJywgbGluazogJy92dWVqcy9hcHBseS9wcm9qZWN0LWJ1aWxkaW5nLXZpdGUtdHMtMScgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICdcdTYyODBcdTY3MkZcdTYzQTJcdThCQTgnLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTUyNERcdTdBRUZcdTY3MkZcdThCRUQnLCBsaW5rOiAnL3Rlcm1pbm9sb2d5L2Rlc2lnbi1wYXJhZGlnbScgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0NTUyBcdTY4MzdcdTVGMEYnLCBsaW5rOiAnL2Nzcy9hcHBseS9pY29uLWxhYmVsLXNoaWVsZHMnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdKUyBcdTU3RkFcdTc4NDAnLCBsaW5rOiAnL2pzL2FwcGx5L2NvbXBhcmUtbnVtYmVyJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2RDRGXHU4OUM4XHU1NjY4JywgbGluazogJy9icm93c2VyL2FwcGx5L2Jyb3dzZXItcGx1Z2luJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnVFMgXHU1N0ZBXHU3ODQwJywgbGluazogJy90cy9iYXNpYy90cy1ub3JtYWwtc3VtbWFyeScgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ05vZGVqcycsIGxpbms6ICcvbm9kZWpzL2FwcGx5L3BucG0tc2V0dGluZycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ05naW54JywgbGluazogJy9uZ2lueC9uZ2lueC13ZWItY3Jvc3MtZG9tYWluJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnVnVlLmpzJywgbGluazogJy92dWVqcy9iYXNpYy92dWUtbXZ2bS1iaW5kaW5nJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAndW5pLWFwcCcsIGxpbms6ICcvbW9iaWxlL3VuaWFwcC9wcm9qZWN0LWJ1aWxkaW5nLXVuaWFwcC12dWUzJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnVml0ZScsIGxpbms6ICcvcGFnZXMvdGFncz9xPVZpdGUnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdFbGVtZW50JywgbGluazogJy9lbGVtZW50L3Jlc3BvbnNpdmUtbGF5b3V0JyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU3RUM4XHU3QUVGXHU5MTREXHU3RjZFJywgbGluazogJy9wYWdlcy90YWdzP3E9JUU3JUJCJTg4JUU3JUFCJUFGJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnR2l0IFx1OTE0RFx1N0Y2RScsIGxpbms6ICcvZ2l0L3VzZS1sb2cnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVGMDBcdTUzRDFcdTVERTVcdTUxNzcnLCBsaW5rOiAnL2VkaXRvci92c2NvZGUvdnNjb2RlLXNlbGYtcGx1Z2luJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnUFMgXHU2NTU5XHU3QTBCJywgbGluazogJy9lZGl0b3IvcHMvcGhvdG8tY2hhbmdlLWJnJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJ1x1OEQ0NFx1NkU5MFx1NTIwNlx1NEVBQicsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NTI0RFx1N0FFRlx1NUJGQ1x1ODIyQScsIGxpbms6ICdodHRwczovL25hdi53ZWl6d3ouY29tLycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0FJXHU1REU1XHU1MTc3XHU5NkM2JywgbGluazogJ2h0dHBzOi8vYWktYm90LmNuLycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0dpdEh1YicsIGxpbms6ICcvcGFnZXMvdGFncz9xPUdpdGh1YicgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NUU5NFx1NzUyOFx1NTIwNlx1NEVBQicsIGxpbms6ICcvYXBwL25ldHdvcmsvY2xhc2gtdmVyZ2UnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdXaW5kb3dzJywgbGluazogJy93aW5kb3dzL3NldHRpbmcvdGVybWluYWwtYmVhdXRpZnknIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdNYWNPUycsIGxpbms6ICcvbWFjb3Mvc2V0dGluZy9iYXNlLWluaXQnIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTUyNERcdTdBRUZcdThCQkVcdThCQTEnLCBsaW5rOiAnL3Jlc291cmNlL2Rlc2lnbi9hbGwnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVGMDBcdTZFOTBcdTVCNTdcdTRGNTMnLCBsaW5rOiAnL3Jlc291cmNlL2ZvbnQvb3Blbi1zb3VyY2UtZm9udCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NTZGRVx1NjgwN1x1NTZGRVx1NzI0NycsIGxpbms6ICcvcmVzb3VyY2UvaW1hZ2UvaWNvbi1hbGwnIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnXHU1MzVBXHU1QkEyXHU1RUZBXHU3QUQ5JyxcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU3RjUxXHU3QUQ5XHU3QkExXHU3NDA2JyxcclxuICAgICAgICBpdGVtczogW3sgdGV4dDogJ1x1NTdERlx1NTQwRFx1OEJDMVx1NEU2NicsIGxpbms6ICcvc2l0ZS90aGlyZC1sZXZlbC1kb21haW4nIH1dLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1ZpdGVwcmVzcycsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OEQ0NFx1NkU5MFx1NkM0N1x1NjAzQicsIGxpbms6ICcvdml0ZXByZXNzL2FsbC9yZXNvdXJjZS1hbGwnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTU3RkFcdTc4NDBcdTkxNERcdTdGNkUnLCBsaW5rOiAnL3ZpdGVwcmVzcy9iYXNpYy9hcGktZXhhbXBsZXMnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdThGREJcdTk2MzZcdTc1MjhcdTZDRDUnLCBsaW5rOiAnL3ZpdGVwcmVzcy9leHRlbmQvcG9zdC1kYXRhJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1RTM4XHU4OUMxXHU5NUVFXHU5ODk4JywgbGluazogJy92aXRlcHJlc3MvcHJvYmxlbS9lcnJvci1taXNtYXRjaGVzJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnSGV4b1x1Njg0Nlx1NjdCNicsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NTdGQVx1Nzg0MFx1OTE0RFx1N0Y2RScsIGxpbms6ICcvaGV4by9iYXNpYy9oZXhvLWdpdGh1Yi1ibG9nJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU4RkRCXHU5NjM2XHU3NTI4XHU2Q0Q1JywgbGluazogJy9oZXhvL2V4dGVuZC9oZXhvLWJ1dHRlcmZseS1yZWNvbW1lbmQnIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnXHU1MTczXHU0RThFJyxcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2MjExXHU3Njg0XHU1M0NCXHU5NEZFJywgbGluazogJy9wYWdlcy9saW5rcycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NjZGNFx1NjVCMFx1NjVFNVx1NUZENycsIGxpbms6ICcvcGFnZXMvbG9ncycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OEJBMlx1OTYwNVx1NjcyQ1x1N0FEOScsIGxpbms6ICdodHRwczovL25vdGUud2Vpend6LmNvbS9mZWVkLnhtbCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NjIxMVx1NzY4NFx1NEUzQlx1OTg3NScsIGxpbms6ICdodHRwczovL3dlaXp3ei5jb20vJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU3QUQ5XHU3MEI5XHU3NkQxXHU2M0E3JywgbGluazogJ2h0dHBzOi8vc3RhdHVzLndlaXp3ei5jb20vJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnaGV4b1x1NjNEMlx1NEVGNicsIGxpbms6ICcvaGV4by9leHRlbmQvaGV4by1idXR0ZXJmbHktcmVjb21tZW5kJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1NTJGXHU3N0U1XHU1QkZDXHU4MjJBJywgbGluazogJ2h0dHBzOi8vbmF2LndlaXp3ei5jb20vJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1NTJGXHU3N0U1XHU1REU1XHU1MTc3JywgbGluazogJ2h0dHBzOi8vdG9vbHMud2Vpend6LmNvbS8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVDMDFcdTk3NjJcdTUyMzZcdTRGNUMnLCBsaW5rOiAnaHR0cHM6Ly9jb3Zlci53ZWl6d3ouY29tLycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OERBM1x1NTQ3M1x1NTJBOFx1NzUzQicsIGxpbms6ICdodHRwczovL2FuaW1hdGlvbi53ZWl6d3ouY29tJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1OTI3XHU1QzRGXHU2RjE0XHU3OTNBJywgbGluazogJ2h0dHBzOi8vdnVlMy1jaGFydHMud2Vpend6LmNvbScgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5dXHJcblxyXG4vKipcclxuICogXHU0RkE3XHU2ODBGXHU2MzA5IGBkb2NzL2AgXHU3Njg0XHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0XHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHVGRjA4dml0ZXByZXNzLXNpZGViYXJcdUZGMDlcdUZGMUFcdTY1QjBcdTU4OUVcdTRFMDBcdTdCQzcgYC5tZGAgXHU1QzMxXHU0RjFBXHJcbiAqIFx1NTFGQVx1NzNCMFx1NTcyOFx1NjI0MFx1NUM1RVx1NTIwNlx1N0VDNFx1NzY4NFx1NEZBN1x1NjgwRlx1OTFDQ1x1RkYwQ1x1NEUwRFx1NzUyOFx1NTE4RFx1NTZERVx1NTIzMFx1OEZEOVx1OTFDQ1x1NjI0Qlx1NTE5OVx1NEUwMFx1Njc2MVx1MzAwMlxyXG4gKlxyXG4gKiBcdTY4MDdcdTk4OThcdTRGMThcdTUxNDhcdTUzRDYgZnJvbnRtYXR0ZXIgXHU3Njg0IGB0aXRsZWBcdUZGMENcdTZDQTFcdTY3MDlcdTVDMzFcdTc1MjhcdTZCNjNcdTY1ODdcdTc2ODRcdTRFMDBcdTdFQTdcdTY4MDdcdTk4OThcdUZGMUJcdTUyMDZcdTdFQzRcdTU0MERcdTVDMzFcdTY2MkZcdTc2RUVcdTVGNTVcclxuICogXHU1NDBEXHUzMDAyYHBhZ2VzL2AgXHU0RTBFIGB0cmF2ZWwvYCBcdTY2MkZcdTgxRUFcdTVCOUFcdTRFNDlcdTVFMDNcdTVDNDBcdTc2ODRcdTk4NzVcdTk3NjJcdUZGMDhcdTVGNTJcdTY4NjMgLyBcdTY4MDdcdTdCN0UgLyBcdTY4NDhcdTRGOEIgLyBcdTZFMzhcdThCQjBcdUZGMDlcdUZGMENcclxuICogXHU1QjgzXHU0RUVDXHU3NTMxIGB0aGVtZS9MYXlvdXQudnVlYCBcdTYzQTVcdTdCQTFcdTMwMDFcdTY4MzlcdTY3MkNcdTRFMERcdTY2M0VcdTc5M0EgVml0ZVByZXNzIFx1NzY4NFx1NEZBN1x1NjgwRlx1RkYwQ1x1NjU3NFx1NzZFRVx1NUY1NVx1NjM5Mlx1OTY2NFx1MzAwMlxyXG4gKi9cclxuY29uc3QgU0lERUJBUiA9IGdlbmVyYXRlU2lkZWJhcih7XHJcbiAgZG9jdW1lbnRSb290UGF0aDogJ2RvY3MnLFxyXG4gIGV4Y2x1ZGVCeUdsb2JQYXR0ZXJuOiBbJ3BhZ2VzLyoqJywgJ3RyYXZlbC8qKiddLFxyXG4gIHVzZVRpdGxlRnJvbUZyb250bWF0dGVyOiB0cnVlLFxyXG4gIHVzZVRpdGxlRnJvbUZpbGVIZWFkaW5nOiB0cnVlLFxyXG4gIHNvcnRNZW51c0J5TmFtZTogdHJ1ZSxcclxufSlcclxuXHJcbi8qKlxyXG4gKiBcdTk4ODRcdTUzOEJcdTdGMjlcdTRFQTdcdTcyNjlcdTMwMDJgdml0ZS1wbHVnaW4tY29tcHJlc3Npb25gIFx1NjYyRlx1NTcyOCBgY2xvc2VCdW5kbGVgIFx1OTFDQ1x1NjI2Qlx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1NzY4NFx1RkYwQ1x1ODAwQ1xyXG4gKiBWaXRlUHJlc3MgXHU0RTAwXHU2QjIxIGBidWlsZGAgXHU0RjFBXHU4REQxXHU0RTI0XHU5MDREXHU2Nzg0XHU1RUZBXHVGRjFBXHU1QkEyXHU2MjM3XHU3QUVGXHU0RUE3XHU3MjY5XHU4RkRCIGBkb2NzLy52aXRlcHJlc3MvZGlzdGBcdUZGMENcclxuICogU1NSIFx1NEVBN1x1NzI2OVx1OEZEQiBjYWNoZSBcdTRFMzRcdTY1RjZcdTc2RUVcdTVGNTUgXHUyMDE0XHUyMDE0IFx1OEZEOVx1OTFDQ1x1NzUyOCBWaXRlIFx1NzY4NCBgaXNTc3JCdWlsZGAgXHU2MjhBXHU1NDBFXHU4MDA1XHU2MzIxXHU2Mzg5XHVGRjBDXHU2NUUyXHU3NzAxXHJcbiAqIFx1NEUwMFx1OTA0RFx1NTM4Qlx1N0YyOVx1RkYwQ1x1NEU1Rlx1OEJBOVx1NjVFNVx1NUZEN1x1OTFDQ1x1NTNFQVx1NjcwOVx1NzcxRlx1NkI2M1x1ODk4MVx1NTNEMVx1NUUwM1x1NzY4NFx1OTBBM1x1NEU5Qlx1NjU4N1x1NEVGNlx1MzAwMlxyXG4gKi9cclxuY29uc3QgY29tcHJlc3MgPSAob3B0aW9uczogUGFyYW1ldGVyczx0eXBlb2YgY29tcHJlc3Npb24+WzBdKTogUGx1Z2luID0+ICh7XHJcbiAgLi4uY29tcHJlc3Npb24ob3B0aW9ucyksXHJcbiAgYXBwbHk6IChfY29uZmlnLCBlbnYpID0+IGVudi5jb21tYW5kID09PSAnYnVpbGQnICYmICFlbnYuaXNTc3JCdWlsZCxcclxufSlcclxuXHJcbi8qKiBcdTUzRUFcdTUzOEJcdTY1ODdcdTY3MkNcdTdDN0JcdTRFQTdcdTcyNjlcdUZGMUFcdTU2RkVcdTcyNDcgLyBcdTg5QzZcdTk4OTEgLyBcdTVCNTdcdTRGNTNcdTY3MkNcdThFQUJcdTVDMzFcdTY2MkZcdTUzOEJcdTdGMjlcdTY4M0NcdTVGMEZcdUZGMENcdTUxOERcdTUzOEJcdTUzRUFcdTRGMUFcdTUzRDhcdTU5MjdcdTMwMDIgKi9cclxuY29uc3QgQ09NUFJFU1NJQkxFID0gL1xcLihqc3xtanN8Y3NzfGh0bWx8c3ZnfGpzb258dHh0fHhtbCkkL2lcclxuXHJcbi8qKiBcdTkwMTJcdTVGNTJcdTUyMTdcdTUxRkEgb3V0RGlyIFx1NEUwQlx1NzY4NFx1NjI0MFx1NjcwOSAuaHRtbFx1MzAwMiAqL1xyXG5hc3luYyBmdW5jdGlvbiBodG1sRmlsZXMoZGlyOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XHJcbiAgY29uc3QgZW50cmllcyA9IGF3YWl0IHJlYWRkaXIoZGlyLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSlcclxuICBjb25zdCBmb3VuZCA9IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBqb2luKGRpciwgZW50cnkubmFtZSlcclxuICAgICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KCkpIHJldHVybiBodG1sRmlsZXMocGF0aClcclxuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUuZW5kc1dpdGgoJy5odG1sJykgPyBbcGF0aF0gOiBbXVxyXG4gICAgfSksXHJcbiAgKVxyXG4gIHJldHVybiBmb3VuZC5mbGF0KClcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1ODg2NVx1NTM4QiBIVE1MXHUzMDAyXHU5ODc1XHU5NzYyXHU2NjJGIFZpdGVQcmVzcyBcdTc2ODQgcmVuZGVyIFx1OTYzNlx1NkJCNVx1NjI0RFx1NTE5OVx1OEZEQiBkaXN0IFx1NzY4NFx1RkYwQ1x1OTBBM1x1NjVGNlx1NEUyNFx1OTA0RCBWaXRlXHJcbiAqIFx1Njc4NFx1NUVGQVx1RkYwOFx1NEVFNVx1NTNDQSBgdml0ZS1wbHVnaW4tY29tcHJlc3Npb25gIFx1NzY4NCBgY2xvc2VCdW5kbGVgXHVGRjA5XHU5MEZEXHU4REQxXHU1QjhDXHU0RTg2IFx1MjAxNFx1MjAxNCBcdTk5OTZcdTk4NzVcdTkwQTNcdTRFRkRcclxuICogSFRNTCBcdTY3MDkgMTUwS0JcdUZGMENcdTUzRUFcdTUzOEIgSlMvQ1NTIFx1N0I0OVx1NEU4RVx1NkYwRlx1NEU4Nlx1NjcwMFx1NTkyN1x1NzY4NFx1NEUwMFx1NTc1N1x1MzAwMmBidWlsZEVuZGAgXHU1NzI4XHU2RTMyXHU2N0QzXHU3RUQzXHU2NzVGXHU0RTRCXHU1NDBFXHJcbiAqIFx1ODlFNlx1NTNEMVx1RkYwQ1x1NkI2M1x1NTk3RFx1NTcyOFx1OEZEOVx1NTEzRlx1NjI4QSAuaHRtbC5neiAvIC5odG1sLmJyIFx1ODg2NVx1OUY1MFx1MzAwMlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gY29tcHJlc3NIdG1sKHNpdGVDb25maWc6IFNpdGVDb25maWcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBmb3IgKGNvbnN0IGZpbGUgb2YgYXdhaXQgaHRtbEZpbGVzKHNpdGVDb25maWcub3V0RGlyKSkge1xyXG4gICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlYWRGaWxlKGZpbGUpXHJcbiAgICBhd2FpdCB3cml0ZUZpbGUoYCR7ZmlsZX0uZ3pgLCBnemlwU3luYyhodG1sLCB7IGxldmVsOiA5IH0pKVxyXG4gICAgYXdhaXQgd3JpdGVGaWxlKFxyXG4gICAgICBgJHtmaWxlfS5icmAsXHJcbiAgICAgIGJyb3RsaUNvbXByZXNzU3luYyhodG1sLCB7XHJcbiAgICAgICAgcGFyYW1zOiB7IFtjb25zdGFudHMuQlJPVExJX1BBUkFNX1FVQUxJVFldOiBjb25zdGFudHMuQlJPVExJX01BWF9RVUFMSVRZIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBsYW5nOiAnemgtQ04nLFxyXG4gIHRpdGxlOiAnXHU1NTJGXHU3N0U1XHU3QjE0XHU4QkIwJyxcclxuICBkZXNjcmlwdGlvbjogJ1x1NTcyOFx1OEZEOVx1OTFDQ1x1RkYwQ1x1NjIxMVx1NEVFQ1x1NTIwNlx1NEVBQlx1NjI4MFx1NjcyRlx1MzAwMVx1NjNBMlx1N0QyMkFJXHVGRjBDXHU0RTAwXHU4RDc3XHU2RjJCXHU2RTM4XHU3OUQxXHU2MjgwXHU2NzJBXHU2NzY1XHU0RTBFXHU3NTFGXHU2RDNCXHU3NjdFXHU2MDAxMScsXHJcbiAgLy8gXHU2NTg3XHU3QUUwXHU5ODc1XHU2ODA3XHU5ODk4XHU1RjYyXHU1OTgyXHUzMDBDXHU4MTdFXHU4QkFGQWdlbnQgTWFpbFx1NUYwMFx1NkQ0Qlx1RkYwMVx1OTAxRlx1NjJBMklEIC0gXHU1NTJGXHU3N0U1XHU3QjE0XHU4QkIwXHUzMDBEXHVGRjFCXHJcbiAgLy8gXHU5OTk2XHU5ODc1XHU1NzI4IGluZGV4Lm1kIFx1OTFDQ1x1NzUyOCBgdGl0bGVUZW1wbGF0ZTogZmFsc2VgIFx1NTE3M1x1NjM4OVx1NTQwRVx1N0YwMFx1RkYwQ1x1NEZERFx1NjMwMVx1MzAwQ1x1NTUyRlx1NzdFNVx1N0IxNFx1OEJCMFx1MzAwRFx1MzAwMlxyXG4gIHRpdGxlVGVtcGxhdGU6ICc6dGl0bGUgLSBcdTU1MkZcdTc3RTVcdTdCMTRcdThCQjAnLFxyXG4gIC8vIFx1NkU5MFx1N0FEOVx1NjYyRlx1NUU3Mlx1NTFDMFx1NzY4NCBVUkxcdUZGMDgvYWkvcXEtYWdlbnQtbWFpbCBcdTgwMENcdTk3NUUgLmh0bWxcdUZGMDlcdUZGMENcdTRGQTdcdTY4MEZcdTRFMEVcdTVCRkNcdTgyMkFcdTkxQ0NcdTc2ODRcdTk0RkVcdTYzQTVcclxuICAvLyBcdTRFNUZcdTUxNjhcdTkwRThcdTUxOTlcdTYyMTBcdTY1RTBcdTU0MEVcdTdGMDBcdTVGNjJcdTVGMEZcdTMwMDJcclxuICBjbGVhblVybHM6IHRydWUsXHJcbiAgLy8gVml0ZVByZXNzIHBlcnNpc3RzIHRoZSBjb2xvdXIgc2NoZW1lIHVuZGVyIGxvY2FsU3RvcmFnZVsndml0ZXByZXNzLXRoZW1lLWFwcGVhcmFuY2UnXVxyXG4gIC8vIGFuZCB0b2dnbGVzIHRoZSBgZGFya2AgY2xhc3Mgb24gPGh0bWw+IGJlZm9yZSBmaXJzdCBwYWludCBcdTIwMTQgdGhlIHNhbWUgY29udHJhY3QgdGhlXHJcbiAgLy8gb3JpZ2luYWwgc2l0ZSB1c2VzLCBzbyB0aGUgcG9ydGVkIHRoZW1lIHRvZ2dsZSB3b3JrcyB1bmNoYW5nZWQuXHJcbiAgYXBwZWFyYW5jZTogdHJ1ZSxcclxuICAvLyBcdTY1ODdcdTdBRTAgZnJvbnRtYXR0ZXIgXHU5MUNDXHU3Njg0IGBsYXN0VXBkYXRlZGBcdUZGMDhEYXRlXHVGRjA5XHU0RjE4XHU1MTQ4XHU0RThFIGdpdCBcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdUZGMENcdTg5QzFcclxuICAvLyBub2RlL1x1MjAyNi9jaHVuazogYGlmIChmcm9udG1hdHRlci5sYXN0VXBkYXRlZCBpbnN0YW5jZW9mIERhdGUpIHBhZ2VEYXRhLmxhc3RVcGRhdGVkID0gK1x1MjAyNmBcdTMwMDJcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBoZWFkOiBbXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2Zhdmljb24uaWNvJyB9XSxcclxuICAgIFtcclxuICAgICAgJ2xpbmsnLFxyXG4gICAgICB7XHJcbiAgICAgICAgcmVsOiAncHJlbG9hZCcsXHJcbiAgICAgICAgaHJlZjogJy9mb250cy9pbnRlci1yb21hbi1sYXRpbi53b2ZmMicsXHJcbiAgICAgICAgYXM6ICdmb250JyxcclxuICAgICAgICB0eXBlOiAnZm9udC93b2ZmMicsXHJcbiAgICAgICAgY3Jvc3NvcmlnaW46ICcnLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICBdLFxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICAvLyBcdTUzOUZcdTdBRDlcdTZCQ0ZcdTRFMkFcdTRFRTNcdTc4MDFcdTU3NTdcdTkwRkRcdTVFMjYgYGxpbmUtbnVtYmVycy1tb2RlYCArIGBsaW5lLW51bWJlcnMtd3JhcHBlcmBcdTMwMDJcclxuICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxyXG4gIH0sXHJcbiAgLy8gXHU2RTMyXHU2N0QzXHU3RUQzXHU2NzVGXHU1NDBFXHU4ODY1XHU1MzhCIEhUTUxcdUZGMDhcdTg5QzFcdTRFMEFcdTk3NjJcdTc2ODQgYGNvbXByZXNzSHRtbGBcdUZGMDlcdTMwMDJcclxuICBidWlsZEVuZDogY29tcHJlc3NIdG1sLFxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICBsb2dvOiAnL2xvZ28ucG5nJyxcclxuICAgIG5hdjogTkFWLFxyXG4gICAgc2lkZWJhcjogU0lERUJBUixcclxuICAgIG91dGxpbmVUaXRsZTogJ1x1NzZFRVx1NUY1NScsXHJcbiAgICBlZGl0TGluazoge1xyXG4gICAgICAvLyBcdTUzOUZcdTdBRDlcdTc2ODRcdTdGMTZcdThGOTFcdTk0RkVcdTYzQTVcdTYzMDdcdTU0MTEgZG9jcy9wb3N0LzxcdTc2RjhcdTVCRjlcdThERUZcdTVGODQ+XHVGRjBDXHU0RTBFXHU2NzJDXHU1NzMwXHU2NTg3XHU2ODYzXHU3NkVFXHU1RjU1XHU0RTBEXHU1NDBDXHU1NDBEXHVGRjBDXHU2NTQ1XHU2NjNFXHU1RjBGXHU3RUQ5XHU2QTIxXHU2NzdGXHUzMDAyXHJcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vd2Vpend6L25vdGUvZWRpdC9tYWluL2RvY3MvcG9zdC86cGF0aCcsXHJcbiAgICAgIHRleHQ6ICdcdTU3MjhHaXRIdWJcdTdGMTZcdThGOTFcdTY3MkNcdTk4NzUnLFxyXG4gICAgfSxcclxuICAgIC8vIFx1NEYyMFx1NUJGOVx1OEM2MVx1RkYwOFx1ODAwQ1x1OTc1RSB0cnVlXHVGRjA5XHU2NUUyXHU1RjAwXHU1NDJGXHUzMDBDXHU2NzAwXHU1NDBFXHU2NkY0XHU2NUIwXHUzMDBEXHVGRjBDXHU1M0M4XHU4OTg2XHU3NkQ2XHU5RUQ4XHU4QkE0XHU2NTg3XHU2ODQ4XHUzMDAyXHJcbiAgICAvLyBcdTZFOTBcdTdBRDlcdTY2M0VcdTc5M0FcdTUyMzBcdTc5RDJcdUZGMDgyMDI2LzcvMSAxNzozMToxM1x1RkYwOVx1RkYwQ1x1NTZFMFx1NkI2NFx1NjI4QSB0aW1lU3R5bGUgXHU2M0QwXHU1MjMwIG1lZGl1bSBcdTVFNzZcdTc1MjhcclxuICAgIC8vIGBmb3JjZUxvY2FsZWAgXHU1NkZBXHU1QjlBXHU2MzA5XHU5ODc1XHU5NzYyXHU4QkVEXHU4QTAwXHVGRjA4emgtQ05cdUZGMDlcdTY4M0NcdTVGMEZcdTUzMTZcdUZGMUJcdTlFRDhcdThCQTRcdTc2ODQgZGF0ZVN0eWxlL3RpbWVTdHlsZVxyXG4gICAgLy8gJ3Nob3J0JyBcdTRGMUFcdTRFMjJcdTYzODlcdTc5RDJcdUZGMENcdTRFMTRcdThEREZcdTk2OEZcdTZENEZcdTg5QzhcdTU2NjhcdTUzM0FcdTU3REZcdTMwMDJcclxuICAgIGxhc3RVcGRhdGVkOiB7XHJcbiAgICAgIHRleHQ6ICdcdTY3MDBcdTU0MEVcdTY2RjRcdTY1QjBcdTRFOEUnLFxyXG4gICAgICBmb3JtYXRPcHRpb25zOiB7IGZvcmNlTG9jYWxlOiB0cnVlLCBkYXRlU3R5bGU6ICdzaG9ydCcsIHRpbWVTdHlsZTogJ21lZGl1bScgfSxcclxuICAgIH0sXHJcbiAgICBkb2NGb290ZXI6IHsgcHJldjogJ1x1NEUwQVx1NEUwMFx1N0JDNycsIG5leHQ6ICdcdTRFMEJcdTRFMDBcdTdCQzcnIH0sXHJcbiAgfSxcclxuICB2aXRlOiB7XHJcbiAgICAvLyBcdTVCOThcdTY1QjlcdTk2QzZcdTYyMTBcdTg5ODFcdTZDNDJcdUZGMDhAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1lbmhhbmNlZC1yZWFkYWJpbGl0aWVzXHVGRjA5XHVGRjFBXHJcbiAgICAvLyBcdThGRDlcdTUxRTBcdTRFMkFcdTUzMDVcdTRFMERcdTUwNUFcdTRGOURcdThENTZcdTk4ODRcdTY3ODRcdTVFRkEgXHUyMDE0XHUyMDE0IFx1NUI4M1x1NEVFQ1x1ODFFQVx1NUUyNiBTRkMgXHU0RTBFXHU2ODM3XHU1RjBGXHVGRjBDXHU5ODg0XHU2Nzg0XHU1RUZBXHU0RjFBXHU2MjhBXHU2ODM3XHU1RjBGXHU0RTIyXHU2Mzg5XHVGRjA4XHU2MjE2XHU2MkE1XHJcbiAgICAvLyBcdTYyN0VcdTRFMERcdTUyMzBcdTVCRkNcdTUxRkFcdUZGMDlcdUZGMUJTU1IgXHU5NjM2XHU2QkI1XHU1M0NEXHU4RkM3XHU2NzY1XHU0RTBEXHU4OTgxXHU1OTE2XHU5MEU4XHU1MzE2XHVGRjBDXHU4QkE5IFZpdGUgXHU4MUVBXHU1REYxXHU3RjE2XHU4QkQxXHU1QjgzXHU0RUVDXHU3Njg0IC52dWVcdTMwMDJcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBleGNsdWRlOiBbXHJcbiAgICAgICAgJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWVuaGFuY2VkLXJlYWRhYmlsaXRpZXMvY2xpZW50JyxcclxuICAgICAgICAndml0ZXByZXNzJyxcclxuICAgICAgICAnQG5vbGViYXNlL3VpJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBzc3I6IHtcclxuICAgICAgbm9FeHRlcm5hbDogWydAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1lbmhhbmNlZC1yZWFkYWJpbGl0aWVzJywgJ0Bub2xlYmFzZS91aSddLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdGFpbHdpbmRjc3MoKSxcclxuICAgICAgLy8gbWQgLyB2dWUgXHU5MUNDXHU3NkY0XHU2M0E1XHU1MTk5IGA8U3dpcGVyIC8+YFx1MzAwMWA8UG9zdE1ldGEgLz5gIFx1NUMzMVx1ODg0Q1x1RkYwQ1x1NzUyOFx1NTIzMFx1NTRFQVx1NEUyQVx1NUYxNVx1NTE2NVx1NTRFQVx1NEUyQVx1RkYwQ1xyXG4gICAgICAvLyBcdTRFMERcdTk3MDBcdTg5ODFcdTUxOERcdTU3MjggYHRoZW1lL2luZGV4LnRzYCBcdTkxQ0NcdTRFMDBcdTRFMkFcdTRFMkEgYGFwcC5jb21wb25lbnQoKWAgXHU2Q0U4XHU1MThDXHUzMDAyXHJcbiAgICAgIHZ1ZUNvbXBvbmVudHMoe1xyXG4gICAgICAgIGRpcnM6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi90aGVtZS9jb21wb25lbnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgLy8gXHU2M0QyXHU0RUY2XHU3Njg0XHU5RUQ4XHU4QkE0IGluY2x1ZGUgXHU1M0VBXHU3QkExIGAudnVlYFx1RkYwQ1x1ODAwQyBWaXRlUHJlc3MgXHU2NjJGXHU2MjhBXHU2QkNGXHU0RTJBIGAubWRgIFx1N0YxNlx1OEJEMVx1NjIxMFxyXG4gICAgICAgIC8vIFZ1ZSBTRkMgXHU3Njg0XHVGRjFBXHU2QTIxXHU2NzdGXHU1NzU3XHU4NDNEXHU1NzI4IGBcdTIwMjYvbm90ZS5tZD92dWUmdHlwZT10ZW1wbGF0ZSZsYW5nLmpzYCBcdTkxQ0NcdTMwMDJcclxuICAgICAgICAvLyBcdTRFMERcdTg4NjVcdTRFMEEgYC5tZGAgXHU4RkQ5XHU0RTI0XHU2NzYxXHVGRjBDbWQgXHU5MUNDXHU1MTk5XHU3Njg0IGA8U3dpcGVyIC8+YFx1MzAwMWA8UG9zdE1ldGEgLz5gIFx1NUMzMVx1NkNBMVx1NEVCQVxyXG4gICAgICAgIC8vIFx1NjNBNVx1N0JBMVx1RkYwOFNTUiBcdTRFMEVcdTVCQTJcdTYyMzdcdTdBRUZcdTkwRkRcdTRGMUFcdTZFMzJcdTY3RDNcdTYyMTBcdTdBN0FcdTZDRThcdTkxQ0FcdUZGMDlcdTMwMDJcdTUyNERcdTk3NjJcdTU2REJcdTY3NjFcdTY2MkZcdTYzRDJcdTRFRjZcdTc2ODRcdTlFRDhcdThCQTRcdTUwM0NcdTMwMDJcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAvXFwudnVlJC8sXHJcbiAgICAgICAgICAvXFwudnVlXFw/dnVlLyxcclxuICAgICAgICAgIC9cXC52dWVcXC5bdGpdc3g/XFw/dnVlLyxcclxuICAgICAgICAgIC9cXC52dWVcXD92PS8sXHJcbiAgICAgICAgICAvXFwubWQkLyxcclxuICAgICAgICAgIC9cXC5tZFxcP3Z1ZS8sXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBcdTY3MkNcdTk4NzlcdTc2RUVcdTRFMERcdThERDEgdnVlLXRzY1x1RkYwQ1x1NEUwRFx1NzUxRlx1NjIxMCBjb21wb25lbnRzLmQudHNcdTMwMDJcclxuICAgICAgICBkdHM6IGZhbHNlLFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gXHU2Q0U4XHVGRjFBXHU1MkEwXHU0RTg2IGAvXFwubWQkL2BcdTMwMDFgL1xcLm1kXFw/dnVlL2AgXHU0RTRCXHU1NDBFXHVGRjBDbWQgXHU5ODc1XHU5NzYyIGNodW5rIFx1NEYxQVx1NzZGNFx1NjNBNSBpbXBvcnQgXHU0RTNCXHU5ODk4XHJcbiAgICAgIC8vIFx1N0VDNFx1NEVGNlx1RkYwQ1x1NTIwNlx1NTc1N1x1NjVCOVx1NUYwRlx1OTY4Rlx1NEU0Qlx1NjUzOVx1NTNEOFx1RkYwQ1JvbGx1cCBcdTVDMzFcdTRGMUFcdTVCRjkgVml0ZVByZXNzIFx1ODFFQVx1NURGMVx1NzY4NCBgQ29udGVudGAgXHU2MkE1XHU0RTI0XHU2NzYxXHJcbiAgICAgIC8vIGBDWUNMSUNfQ1JPU1NfQ0hVTktfUkVFWFBPUlRgXHVGRjFBYGFwcC9jb21wb25lbnRzL0NvbnRlbnQuanNgIFx1ODk4MVx1NEVDRSBgdml0ZXByZXNzYFxyXG4gICAgICAvLyBcdUZGMDhcdTUzNzMgYGRpc3QvY2xpZW50L2luZGV4LmpzYFx1RkYwOVx1NTNENiBgdXNlRGF0YWAgLyBgdXNlUm91dGVgXHVGRjBDXHU4MDBDIGBpbmRleC5qc2AgXHU1M0M4XHU1MThEXHJcbiAgICAgIC8vIFx1NUJGQ1x1NTFGQSBgQ29udGVudGAgXHUyMDE0XHUyMDE0IFx1NEUyNFx1ODAwNVx1NEU5Mlx1NEUzQVx1NEY5RFx1OEQ1Nlx1RkYwQ1x1NjI4QVx1OEMwMVx1NjMyQVx1NTIzMFx1NUJGOVx1NjVCOVx1OTBBM1x1NEUwMFx1NTc1N1x1OTBGRFx1NTNFQVx1NjYyRlx1NjM2Mlx1NEUwMFx1NEUyQVx1NzNBRlx1RkYwQ1xyXG4gICAgICAvLyBtYW51YWxDaHVua3MgXHU2RDg4XHU0RTBEXHU2Mzg5XHUzMDAyXHU1QjgzXHU1M0VBXHU2NjJGXHU1MjA2XHU1NzU3XHU2M0QwXHU3OTNBXHVGRjBDXHU0RUE3XHU3MjY5XHU2Q0ExXHU5NUVFXHU5ODk4XHVGRjA4XHU0RTBCXHU5NzYyXHU5MDEwXHU5ODc1XHU5QThDXHU4RkM3IFNTUiBcdTRFMEVcdTVCQTJcdTYyMzdcclxuICAgICAgLy8gXHU3QUVGXHU1QkZDXHU4MjJBXHVGRjA5XHUzMDAyXHU2MEYzXHU1RjdCXHU1RTk1XHU2RDg4XHU2Mzg5XHU4RkQ5XHU0RTI0XHU2NzYxXHVGRjBDXHU1QzMxXHU1MjIwXHU2Mzg5IGBpbmNsdWRlYCBcdTkxQ0NcdTc2ODQgYC9cXC5tZCQvYCBcdTRFMEVcclxuICAgICAgLy8gYC9cXC5tZFxcP3Z1ZS9gXHVGRjBDXHU1NkRFXHU1MjMwIGB0aGVtZS9pbmRleC50c2AgXHU5MUNDXHU3NTI4IGBhcHAuY29tcG9uZW50KClgIFx1NkNFOFx1NTE4QyBtZCBcdTdFQzRcdTRFRjZcdTMwMDJcclxuICAgICAgLy9cclxuICAgICAgLy8gXHU1NDBDXHU0RTAwXHU3OUNEXHU0RUE3XHU3MjY5XHU1MUZBIC5neiArIC5iciBcdTRFMjRcdTRFRkRcdUZGMENcdTRFQTRcdTdFRDlcdTkwRThcdTdGNzJcdTdBRUZcdUZGMDhOZ2lueCBnemlwX3N0YXRpYyAvIENETlx1RkYwOVx1NzZGNFx1NjNBNVx1NTNEMVx1MzAwMlxyXG4gICAgICBjb21wcmVzcyh7IGFsZ29yaXRobTogJ2d6aXAnLCBleHQ6ICcuZ3onLCBmaWx0ZXI6IENPTVBSRVNTSUJMRSwgdmVyYm9zZTogZmFsc2UgfSksXHJcbiAgICAgIGNvbXByZXNzKHtcclxuICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICAgICAgZXh0OiAnLmJyJyxcclxuICAgICAgICBmaWx0ZXI6IENPTVBSRVNTSUJMRSxcclxuICAgICAgICB2ZXJib3NlOiBmYWxzZSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgLy8gXHU5RUQ4XHU4QkE0IGhvc3QgXHU0RTNBICdsb2NhbGhvc3QnXHVGRjBDXHU1NzI4IFdpbmRvd3MgXHU0RTBBIE5vZGUgXHU1M0VBXHU0RjFBXHU3RUQxXHU1QjlBIElQdjYgXHU3Njg0IDo6MVx1RkYwQ1xyXG4gICAgLy8gXHU1QkZDXHU4MUY0IGh0dHA6Ly8xMjcuMC4wLjE6NTE3MyBcdTc2RjRcdTYzQTVcdThGREVcdTYzQTVcdTg4QUJcdTYyRDJcdTMwMDJcdTY2M0VcdTVGMEZcdTdFRDFcdTVCOUEgSVB2NCBcdTU2REVcdTczQUZcdTU3MzBcdTU3NDBcdUZGMENcclxuICAgIC8vIFx1OEJBOSBsb2NhbGhvc3QgLyAxMjcuMC4wLjEgXHU5MEZEXHU4MEZEXHU4QkJGXHU5NUVFXHVGRjFCXHU1OTgyXHU5NzAwXHU2MjRCXHU2NzNBXHU2MjE2XHU1MTc2XHU0RUQ2XHU4QkJFXHU1OTA3XHU4QkJGXHU5NUVFXHU2NTM5XHU2MjEwIHRydWVcdTMwMDJcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMTI3LjAuMC4xJyxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVyxTQUFTLFNBQVMsVUFBVSxpQkFBaUI7QUFDalosU0FBUyxZQUFZO0FBQ3JCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CLFdBQVcsZ0JBQWdCO0FBQ3hELFNBQVMsb0JBQXFDO0FBQzlDLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsdUJBQXVCO0FBUjZLLElBQU0sMkNBQTJDO0FBcUI5UCxJQUFNLE1BQU07QUFBQSxFQUNWLEVBQUUsTUFBTSxnQkFBTSxNQUFNLElBQUk7QUFBQSxFQUN4QixFQUFFLE1BQU0sZ0JBQU0sTUFBTSxlQUFlO0FBQUEsRUFDbkMsRUFBRSxNQUFNLGdCQUFNLE1BQU0sY0FBYztBQUFBLEVBQ2xDLEVBQUUsTUFBTSxnQkFBTSxNQUFNLGNBQWM7QUFBQSxFQUNsQztBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSx3Q0FBb0IsTUFBTSwwQkFBMEI7QUFBQSxVQUM1RCxFQUFFLE1BQU0sbUNBQXlCLE1BQU0sc0NBQXNDO0FBQUEsVUFDN0UsRUFBRSxNQUFNLGtEQUFvQixNQUFNLGtCQUFrQjtBQUFBLFVBQ3BELEVBQUUsTUFBTSxrREFBb0IsTUFBTSw4QkFBOEI7QUFBQSxVQUNoRSxFQUFFLE1BQU0sNkRBQXFCLE1BQU0scUJBQXFCO0FBQUEsVUFDeEQsRUFBRSxNQUFNLDZDQUFvQixNQUFNLDhCQUE4QjtBQUFBLFVBQ2hFLEVBQUUsTUFBTSxpREFBbUIsTUFBTSwyQkFBMkI7QUFBQSxVQUM1RCxFQUFFLE1BQU0s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
