// docs/.vitepress/config.mts
import { defineConfig } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/vitepress@1.6.4_@algolia+cl_df5490f92655c4140614bdfec8383752/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/utils/handleHeadMeta.ts
import "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/vitepress@1.6.4_@algolia+cl_df5490f92655c4140614bdfec8383752/node_modules/vitepress/dist/node/index.js";
function handleHeadMeta(context) {
  const { description, title, relativePath } = context.pageData;
  const ogUrl = ["meta", { property: "og:url", content: addBase(relativePath.slice(0, -3)) + ".html" }];
  const ogTitle = ["meta", { property: "og:title", content: title }];
  const ogDescription = ["meta", { property: "og:description", content: description || context.description }];
  const ogImage = ["meta", { property: "og:image", content: "/favicon.ico" }];
  const twitterCard = ["meta", { name: "twitter:card", content: "summary" }];
  const twitterImage = ["meta", { name: "twitter:image:src", content: "/favicon.ico" }];
  const twitterDescription = ["meta", { name: "twitter:description", content: description || context.description }];
  const twitterHead = [
    ogUrl,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterDescription,
    twitterImage
  ];
  return twitterHead;
}
function addBase(relativePath) {
  const host = "https://justin3go.com";
  if (relativePath.startsWith("/")) {
    return host + relativePath;
  } else {
    return host + "/" + relativePath;
  }
}

// docs/.vitepress/config.mts
import { fileURLToPath, URL } from "node:url";

// docs/.vitepress/theme/utils/tools.ts
var formatDate = (hasTime = false) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...hasTime && {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }
  };
  return new Intl.DateTimeFormat("zh-CN", options);
};
var dateToUTC8 = (date) => {
  let utcDate = date.replace(/\//g, "-");
  utcDate = utcDate.indexOf("+0800") >= 0 || utcDate.indexOf("+8:00") >= 0 ? utcDate.replace(" +0800", "+8:00") : utcDate + "+8:00";
  return utcDate;
};

// docs/.vitepress/theme/utils/fileTime.ts
import { spawn, spawnSync } from "child_process";
import { statSync } from "fs";
var getFileMetaTime = (filePath) => {
  const { birthtimeMs, mtimeMs } = statSync(filePath);
  return { birthtimeMs, mtimeMs };
};
var getGitTimestampSync = (command, cwd) => {
  const result = spawnSync("git", command, { cwd });
  return result.stdout.toString().trim();
};

// docs/.vitepress/theme/composables/addTime.ts
var getFileTimes = (filePath, cwd) => {
  let firstCommit = dateToUTC8(getGitTimestampSync(["log", "--reverse", "--diff-filter=A", '--pretty="%ai"', filePath], cwd));
  let lastUpdated = dateToUTC8(getGitTimestampSync(["log", "-1", '--pretty="%ai"', filePath], cwd));
  if (!firstCommit && !lastUpdated) {
    const { birthtimeMs, mtimeMs } = getFileMetaTime(filePath);
    const dateOption = formatDate(true);
    firstCommit = dateToUTC8(dateOption.format(birthtimeMs));
    lastUpdated = dateToUTC8(dateOption.format(mtimeMs));
  }
  return {
    firstCommit,
    lastUpdated
  };
};
var addTime = (code, filePath) => {
  if (!code.match(/---\n([\s\S]*?)\n---/)) return code;
  const frontmatter = code.match(/---\n([\s\S]*?)\n---/)[1];
  const hasFirstCommit = frontmatter.indexOf("firstCommit:") >= 0;
  const hasLastUpdated = frontmatter.indexOf("lastUpdated:") >= 0;
  if (hasFirstCommit && hasLastUpdated) return code;
  const { firstCommit, lastUpdated } = getFileTimes(filePath, process.cwd());
  let addTime2 = `---
`;
  if (!hasFirstCommit) {
    addTime2 += `firstCommit: ${firstCommit}
`;
  }
  if (!hasLastUpdated) {
    addTime2 += `lastUpdated: ${lastUpdated}
`;
  }
  return code.replace("---\n", addTime2);
};
var addTime_default = addTime;

// docs/.vitepress/config.mts
import AutoImport from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/unplugin-auto-import@20.2.0_010aa805d6d5d3a3b88ff343f403825f/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/unplugin-vue-components@29._0b75fa526898179193dcdc1385194070/node_modules/unplugin-vue-components/dist/vite.js";
import { ArcoResolver, ElementPlusResolver, TDesignResolver } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/unplugin-vue-components@29._0b75fa526898179193dcdc1385194070/node_modules/unplugin-vue-components/dist/resolvers.js";
import { resolve } from "node:path";
import dynamicImport from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/vite-plugin-dynamic-import@1.6.0/node_modules/vite-plugin-dynamic-import/dist/index.mjs";
import { transformerTwoslash } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/@shikijs+vitepress-twoslash@3.13.0_typescript@5.9.3/node_modules/@shikijs/vitepress-twoslash/dist/index.mjs";
import IconsResolver from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/unplugin-icons@22.4.2_@vue+compiler-sfc@3.5.22/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/unplugin-icons@22.4.2_@vue+compiler-sfc@3.5.22/node_modules/unplugin-icons/dist/vite.js";
import viteCompression from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/vite-plugin-compression@0.5_353fb0f0d4d32bb05dc2a9537f35eb86/node_modules/vite-plugin-compression/dist/index.mjs";
import { withPwa } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/@vite-pwa+vitepress@0.5.4_v_6ed5dad45e0da338ed6a3bba0f56e893/node_modules/@vite-pwa/vitepress/dist/index.mjs";
import UnoCSS from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/unocss@66.5.2_postcss@8.5.6_031f6d870aa1d114cc4580de020b53ea/node_modules/unocss/dist/vite.mjs";
import { generateSidebar } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/vitepress-sidebar@1.33.0/node_modules/vitepress-sidebar/dist/index.js";
import { vitepressPluginLegend } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/vitepress-plugin-legend@1.1_c1fa63540dd828772e3c3dffc6a4fd7f/node_modules/vitepress-plugin-legend/dist/index.js";
import { UnlazyImages } from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/@nolebase+markdown-it-unlaz_50ae1b19f1dc3c195f1fd2090d683a3d/node_modules/@nolebase/markdown-it-unlazy-img/dist/index.mjs";
import {
  ThumbnailHashImages
} from "file:///D:/zhangjunjie-cn.github.io/node_modules/.pnpm/@nolebase+vitepress-plugin-_b1a28a5f1d444c859561def5569d2f1d/node_modules/@nolebase/vitepress-plugin-thumbnail-hash/dist/vite/index.mjs";
var __vite_injected_original_dirname = "D:\\zhangjunjie-cn.github.io\\docs\\.vitepress";
var __vite_injected_original_import_meta_url = "file:///D:/zhangjunjie-cn.github.io/docs/.vitepress/config.mts";
var getSideBar = () => {
  const generatedSidebar = generateSidebar([
    {
      documentRootPath: "docs",
      // 文档根目录
      scanStartPath: "\u535A\u5BA2",
      // 扫描起始路径
      resolvePath: "/\u535A\u5BA2/",
      // 路由解析路径
      useTitleFromFileHeading: true,
      // 使用文件标题作为侧边栏显示文本
      hyphenToSpace: true,
      // 连字符转空格
      keepMarkdownSyntaxFromTitle: true,
      // 保留标题中的 Markdown 语法
      manualSortFileNameByPriority: [
        // 手动排序文件优先级
        "installation.md",
        "authentication.md",
        "final.md",
        "Advanced"
      ],
      // collapsed: false,                   // 侧边栏是否默认折叠
      collapseDepth: 2
      // 折叠深度
    },
    {
      documentRootPath: "docs",
      scanStartPath: "\u7B14\u8BB0",
      resolvePath: "/\u7B14\u8BB0/",
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      keepMarkdownSyntaxFromTitle: true
    }
  ]);
  return generatedSidebar ?? {};
};
var config_default = withPwa(defineConfig({
  outDir: resolve(__vite_injected_original_dirname, "../../dist"),
  // dist生成目录
  title: "\u5F20\u4FCA\u6770\u7684\u535A\u5BA2",
  titleTemplate: ":title-\u5F20\u4FCA\u6770\u7684\u535A\u5BA2",
  description: "\u575A\u6301\u6DF1\u8015\u6280\u672F\u9886\u57DF\u7684T\u578B\u524D\u7AEF\u7A0B\u5E8F\u5458, \u559C\u6B22Vuejs\u3001Nestjs, \u8FD8\u4F1A\u70B9python\u3001nlp\u3001web3\u3001\u540E\u7AEF",
  lang: "zh-CH",
  // 语言
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  // 忽略死链查询
  sitemap: {
    hostname: "https://www.baidu.com"
  },
  rewrites: {
    "post/(.*)": "(.*)"
    // 将所有以 /post/ 开头的 URL 重写为去掉 /post/ 前缀的 URL。
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    codeCopyButtonTitle: "\u590D\u5236\u4EE3\u7801",
    codeTransformers: [
      // 使用 `!!code` 和 `<!---@include` 防止转换，演示代码用
      {
        postprocess(code) {
          let _code = code.replace(/\[\!\!code/g, "[!code");
          _code = _code.replace(/!---@include/g, "!--@include");
          return _code;
        }
      },
      transformerTwoslash()
    ],
    // 对markdown中的内容进行替换或者批量处理
    config: (md) => {
      vitepressPluginLegend(md, {
        markmap: { showToolbar: true },
        // 启用脑图工具栏
        mermaid: true
        // 启用 Mermaid 支持
      });
      md.use(
        (md2) => {
          md2.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
            let htmlResult = slf.renderToken(tokens, idx, options);
            if (tokens[idx].tag === "h1")
              htmlResult += `
<ClientOnly><WDocTitleMeta v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showWDocTitleMeta ?? true)" :article="$frontmatter" /></ClientOnly>`;
            return htmlResult;
          };
          const defaultRender = md2.render;
          md2.render = function(...args) {
            args[0] = addTime_default(args[0], args[1].realPath);
            let defaultContent = defaultRender.apply(md2, args);
            return defaultContent;
          };
        },
        //动态模糊图片
        md.use(UnlazyImages(), {
          imgElementTag: "NolebaseUnlazyImg"
        })
      );
    }
  },
  head: [
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-MB7XVBG1TQ" }],
    ["script", { defer: "", async: "", src: "https://cn.vercount.one/js" }],
    //Vercount静态网站添加访问量统计
    // [
    //   "script",
    //   {},
    //   `window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'G-MB7XVBG1TQ');`,
    // ],
    // // 百度统计平台
    // [
    //   "script",
    //   {},
    //   `var _hmt = _hmt || [];
    // 	(function() {
    // 		var hm = document.createElement("script");
    // 		hm.src = "https://hm.baidu.com/hm.js?ea8a4869f485978692f89cd908f6906a";
    // 		var s = document.getElementsByTagName("script")[0]; 
    // 		s.parentNode.insertBefore(hm, s);
    // 	})();`,
    // ],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    // 添加苹果图标
    ["link", { rel: "preload", href: "/template.webm", as: "video", type: "video/webm" }],
    ["meta", { property: "og:image", content: "/og-image.png" }],
    // 社交媒体图片
    ["meta", { name: "referrer", content: "no-referrer" }]
  ],
  // https://vitepress.dev/reference/site-config#transformhead
  async transformHead(context) {
    return handleHeadMeta(context);
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],
    outlineTitle: "\u5927\u7EB2",
    lastUpdatedText: "\u6700\u8FD1\u66F4\u65B0\u65F6\u95F4",
    //   头部导航
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u535A\u5BA2", link: "/\u535A\u5BA2/", activeMatch: "/\u535A\u5BA2/" },
      { text: "\u7B14\u8BB0", link: "/\u7B14\u8BB0/", activeMatch: "/\u7B14\u8BB0/" },
      { text: "\u6807\u7B7E", link: "/pages/tags", activeMatch: "/pages/tags" },
      { text: "\u5F52\u6863", link: "/pages/posts", activeMatch: "/pages/posts" },
      {
        text: "\u7EBF\u4E0A",
        activeMatch: "/\u7EBF\u4E0A/",
        items: [
          {
            text: "\u81EA\u5EFA\u9879\u76EE",
            items: [
              { text: "\u7B11\u53CB\u5C0F\u7A0B\u5E8F", link: "https://oss.justin3go.com/blogs/xiaoyou-mp-code.png" },
              { text: "\u963F\u91CC\u4E91\u76D8\u641C\u7D22", link: "https://ssgo.app" },
              { text: "Use Sora", link: "https://usesora.app" },
              { text: "Excel2JSON", link: "https://bug404.dev" }
            ]
          },
          {
            text: "\u5F00\u6E90\u90E8\u7F72",
            items: [
              { text: "ChatGPT-Web", link: "https://chat.justin3go.com/" },
              { text: "LobeChat", link: "https://chatc.app" }
            ]
          }
        ]
      }
    ],
    // @ts-ignore
    // sidebar: createSidebar(),
    sidebar: getSideBar(),
    logo: "/logo.png",
    siteTitle: false,
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS\u8BA2\u9605</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'
        },
        link: "/feed.xml"
      }
    ],
    footer: {
      message: '<a href="https://github.com/Justin3go/justin3go.github.io" target="_blank">\u7F51\u7AD9\u5DF2\u5F00\u6E90\uFF0C\u6BCF\u5468\u672B\u5982\u6709\u66F4\u65B0release\u4E00\u6B21\uFF0C\u6B22\u8FCEstar</a>',
      copyright: '<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">Copyright\xA9 2021-present \u6E1DICP\u59072021006879\u53F7</a>'
    },
    search: {
      provider: "local"
    },
    editLink: {
      pattern: "https://github.com/Justin3go/justin3go.github.io/edit/master/docs/:path",
      text: "\u5728GitHub\u4E0A\u7F16\u8F91\u6B64\u9875"
    },
    returnToTopLabel: "\u{1F446}Code is building the world.",
    sidebarMenuLabel: "\u76EE\u5F55",
    darkModeSwitchLabel: "\u6DF1\u8272\u6A21\u5F0F",
    docFooter: {
      prev: false,
      next: false
    },
    // 自定义扩展: 页脚配置
    footerConfig: {
      showFooter: true,
      // 是否显示页脚
      showRainbow: true,
      // 是否显示彩虹
      icpRecordCode: "\u6D25ICP\u59072022005864\u53F7-2",
      // ICP备案号
      publicSecurityRecordCode: "\u6D25\u516C\u7F51\u5B89\u590712011202000677\u53F7",
      // 联网备案号
      copyright: `Copyright \xA9 2019-${(/* @__PURE__ */ new Date()).getFullYear()} Charles7c`
      // 版权信息
    }
  },
  pwa: {
    // 根目录
    outDir: resolve(__vite_injected_original_dirname, "../../dist"),
    // mode: 'development',
    mode: "production",
    strategies: "generateSW",
    // 明确使用 generateSW 策略
    // selfDestroying: false, // 确保 Service Worker 不会自动注销
    registerType: "prompt",
    //提示更新
    injectRegister: "auto",
    // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    includeManifestIcons: false,
    manifest: {
      id: "/",
      name: "\u5F20\u4FCA\u6770\u7684\u535A\u5BA2",
      short_name: "\u5F20\u4FCA\u6770\u7684\u535A\u5BA2",
      description: "\u5F20\u4FCA\u6770\u7684\u535A\u5BA2\u4EBA\u751F",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/images/pwa-120x120.png",
          sizes: "120x120",
          type: "image/png"
        },
        {
          src: "/images/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/images/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        }
      ]
    },
    injectManifest: {
      injectionPoint: void 0
    },
    workbox: {
      // 定制缓存策略
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      runtimeCaching: [
        {
          // 匹配文章相关的js文件
          urlPattern: /posts.+\.js$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "article-content",
            expiration: {
              maxEntries: 100,
              // 最多缓存100篇文章
              maxAgeSeconds: 7 * 24 * 60 * 60
              // 缓存一周
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ],
      // 预缓存重要资源
      globPatterns: ["**/*.{css,js,html,svg,png,ico,webm,moc3,mp4,txt}"],
      // exclude: [/sw.js$/, /workbox-.*\.js$/],        // 不要缓存 sw.js 本身
      cleanupOutdatedCaches: true,
      skipWaiting: false,
      // 新 SW 立即接管
      clientsClaim: true
      // 控制所有页面
    },
    devOptions: {
      enabled: true,
      // 开发环境是否启用
      type: "module"
    }
  },
  vite: {
    optimizeDeps: {
      include: ["element-plus"],
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui",
        "@vueuse/core"
      ]
    },
    plugins: [
      ThumbnailHashImages(),
      //动态模糊图
      AutoImport({
        resolvers: [
          TDesignResolver({
            library: "vue-next"
          }),
          ElementPlusResolver({})
        ]
      }),
      Components({
        dts: "components.d.ts",
        // 生成到 VitePress 目录
        // 自动加载 components 下的vue文件为组件，省去import 导入。
        dirs: [".vitepress/theme/components"],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.md\?vue/],
        // 添加这个以确保处理 Markdown 文件
        resolvers: [
          // 导入图标组件
          IconsResolver({
            componentPrefix: "",
            enabledCollections: ["carbon"],
            // 添加以下配置确保生产环境也能识别
            alias: {
              cb: "carbon"
            }
          }),
          TDesignResolver({
            library: "vue-next"
          }),
          ElementPlusResolver({}),
          // 自动导入图标组件
          ArcoResolver({
            sideEffect: true,
            resolveIcons: true
          })
        ]
      }),
      dynamicImport(),
      // 运行时导入
      Icons({
        autoInstall: true,
        // 自动安装图标集
        defaultStyle: "display: inline-block;"
      }),
      //gzip和brotli 压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "brotliCompress",
        ext: ".br"
      }),
      UnoCSS()
    ],
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "element-plus",
        "@arco-design/web-vue",
        "vitepress",
        "@nolebase/ui"
      ]
    },
    resolve: {
      alias: {
        // @ 指向 .vitepress 目录
        "@": fileURLToPath(new URL("./.vitepress", __vite_injected_original_import_meta_url)),
        // 如果需要访问 docs 根目录，可以添加另一个别名
        "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url))
      }
    },
    // plugins: [
    // 	// ...
    // AutoImport({
    // 	resolvers: [TDesignResolver({
    // 		library: 'vue-next'
    // 	})],
    // }),
    // 	Components({
    // 		resolvers: [TDesignResolver({
    // 			library: 'vue-next'
    // 		})],
    // 	}),
    // ],
    // 解决sass告警的问题 Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    }
  },
  vue: {
    template: {
      transformAssetUrls: {
        // 其他各种配置...
        NolebaseUnlazyImg: ["src"]
      }
    }
  },
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587"
    },
    en: {
      label: "English",
      link: "https://en.justin3go.com"
    }
  }
}));
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3V0aWxzL2hhbmRsZUhlYWRNZXRhLnRzIiwgImRvY3MvLnZpdGVwcmVzcy90aGVtZS91dGlscy90b29scy50cyIsICJkb2NzLy52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZmlsZVRpbWUudHMiLCAiZG9jcy8udml0ZXByZXNzL3RoZW1lL2NvbXBvc2FibGVzL2FkZFRpbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx6aGFuZ2p1bmppZS1jbi5naXRodWIuaW9cXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx6aGFuZ2p1bmppZS1jbi5naXRodWIuaW9cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3poYW5nanVuamllLWNuLmdpdGh1Yi5pby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBTaXRlQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVTaWRlYmFyIH0gZnJvbSBcIi4vdXRpbHMvY3JlYXRlU2lkZWJhclwiO1xyXG5pbXBvcnQgeyBoYW5kbGVIZWFkTWV0YSB9IGZyb20gXCIuL3V0aWxzL2hhbmRsZUhlYWRNZXRhXCI7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQgYWRkVGltZSBmcm9tIFwiLi90aGVtZS9jb21wb3NhYmxlcy9hZGRUaW1lXCI7XHJcbi8vIFx1ODFFQVx1NTJBOGltcG9ydCBcdTVFMzhcdTc1MjhcdTc2ODRBUElcdUZGMENcdTUwQ0ZcdTY2MkZ2dWUgXHU3Njg0cmVmXHUzMDAxY29tcHV0ZWRcdTMwMDFvbk1vdW50ZWRcdUZGMENcdTdCMkNcdTRFMDlcdTY1QjlcdTc2ODRheGlvc1x1MzAwMXZ1ZVVzZVx1NzY4NEFQSSBcdTdCNDlcdTdCNDlcdTMwMDJcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcclxuLy8gXHU4MUVBXHU1MkE4aW1wb3J0IGNvbXBvbmVudFxyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQgeyBBcmNvUmVzb2x2ZXIsIEVsZW1lbnRQbHVzUmVzb2x2ZXIsIFREZXNpZ25SZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcclxuaW1wb3J0IGR5bmFtaWNJbXBvcnQgZnJvbSBcInZpdGUtcGx1Z2luLWR5bmFtaWMtaW1wb3J0XCI7IC8vIFx1OEZEMFx1ODg0Q1x1NjVGNlx1NUJGQ1x1NTE2NVxyXG5pbXBvcnQgeyB0cmFuc2Zvcm1lclR3b3NsYXNoIH0gZnJvbSBcIkBzaGlraWpzL3ZpdGVwcmVzcy10d29zbGFzaFwiO1xyXG4vLyBjYXJib25cdTU2RkVcdTY4MDdcdTk2QzZcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSBcInVucGx1Z2luLWljb25zL3Jlc29sdmVyXCI7XHJcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xyXG5cclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjsgIC8vZ3ppcFx1NTQ4Q2Jyb3RsaSBcdTUzOEJcdTdGMjlcclxuaW1wb3J0IHsgd2l0aFB3YSB9IGZyb20gXCJAdml0ZS1wd2Evdml0ZXByZXNzXCI7XHJcbi8vIGltcG9ydCB7IFREZXNpZ25SZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcbi8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVREZXNpZ25cclxuLy8gaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XHJcbi8vIGltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG4vLyBpbXBvcnQgeyBURGVzaWduUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xyXG4vLyBcdTVCRkNcdTUxNjUgXHU4MUVBXHU1MkE4XHU0RkE3XHU4RkI5XHU2ODBGXHU3RUM0XHU0RUY2IFx1NEY5RFx1OEQ1NlxyXG5pbXBvcnQgeyBnZW5lcmF0ZVNpZGViYXIgfSBmcm9tIFwidml0ZXByZXNzLXNpZGViYXJcIjtcclxuaW1wb3J0IHsgdml0ZXByZXNzUGx1Z2luTGVnZW5kIH0gZnJvbSBcInZpdGVwcmVzcy1wbHVnaW4tbGVnZW5kXCI7XHJcbmltcG9ydCB7IFVubGF6eUltYWdlcyB9IGZyb20gJ0Bub2xlYmFzZS9tYXJrZG93bi1pdC11bmxhenktaW1nJztcclxuaW1wb3J0IHsgXHJcbiAgVGh1bWJuYWlsSGFzaEltYWdlcywgXHJcbn0gZnJvbSAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4tdGh1bWJuYWlsLWhhc2gvdml0ZSc7XHJcbmNvbnN0IHZpdGVwcmVzc1NpZGViYXJPcHRpb25zID0ge1xyXG4gIC8qXHJcbiAgICAgICAgICogRm9yIGRldGFpbGVkIGluc3RydWN0aW9ucywgc2VlIHRoZSBsaW5rcyBiZWxvdzpcclxuICAgICAgICAgKiBodHRwczovL3ZpdGVwcmVzcy1zaWRlYmFyLmpvb3kyLmNvbS9ndWlkZS9hcGlcclxuICAgICAgICAgKi9cclxuICBkb2N1bWVudFJvb3RQYXRoOiAnL2RvY3MnLFxyXG4gIC8vIHNjYW5TdGFydFBhdGg6IG51bGwsXHJcbiAgcmVzb2x2ZVBhdGg6IG51bGwsXHJcbiAgLy8gdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXHQvL1x1NEY3Rlx1NzUyOFx1NjU4N1x1NEVGNlx1NjgwN1x1OTg5OFx1NEY1Q1x1NEUzQVx1ODNEQ1x1NTM1NVx1OTg3OVxyXG4gIHVzZVRpdGxlRnJvbUZyb250bWF0dGVyOiB0cnVlLFx0Ly9cdTRGN0ZcdTc1Mjhmcm9udG1hdHRlclx1NEUyRFx1NzY4NFx1NjgwN1x1OTg5OFxyXG4gIGZyb250bWF0dGVyVGl0bGVGaWVsZE5hbWU6ICd0aXRsZScsXHJcbiAgLy8gdXNlRm9sZGVyVGl0bGVGcm9tSW5kZXhGaWxlOiBmYWxzZSxcclxuICAvLyB1c2VGb2xkZXJMaW5rRnJvbUluZGV4RmlsZTogZmFsc2UsXHJcbiAgLy8gaHlwaGVuVG9TcGFjZTogdHJ1ZSxcclxuICAvLyB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSxcclxuICAvLyBjYXBpdGFsaXplRmlyc3Q6IGZhbHNlLFxyXG4gIC8vIGNhcGl0YWxpemVFYWNoV29yZHM6IGZhbHNlLFxyXG4gIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgY29sbGFwc2VEZXB0aDogMyxcclxuICAvLyBzb3J0TWVudXNCeU5hbWU6IGZhbHNlLFxyXG4gIC8vIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJPcmRlcjogZmFsc2UsXHQvLyBcdTYzMDlmcm9udG1hdHRlclx1OTg3QVx1NUU4Rlx1NjM5Mlx1NUU4RlxyXG4gIC8vIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJEYXRlOiBmYWxzZSxcdFx0Ly9cdTYzMDlmcm9udG1hdHRlclx1NjVFNVx1NjcxRlx1NjM5Mlx1NUU4RlxyXG4gIC8vIHNvcnRNZW51c09yZGVyQnlEZXNjZW5kaW5nOiBmYWxzZSxcdFx0Ly9cdTk2NERcdTVFOEZcdTYzOTJcdTVFOEZcclxuICAvLyBzb3J0TWVudXNPcmRlck51bWVyaWNhbGx5RnJvbVRpdGxlOiBmYWxzZSxcclxuICAvLyBzb3J0TWVudXNPcmRlck51bWVyaWNhbGx5RnJvbUxpbms6IGZhbHNlLFxyXG4gIC8vIGZyb250bWF0dGVyT3JkZXJEZWZhdWx0VmFsdWU6IDAsXHJcbiAgLy8gbWFudWFsU29ydEZpbGVOYW1lQnlQcmlvcml0eTogWydmaXJzdC5tZCcsICdzZWNvbmQnLCAndGhpcmQubWQnXSwgLy9cdTYyNEJcdTUyQThcdTYzOTJcdTVFOEZcdUZGMENcdTY1ODdcdTRFRjZcdTU5MzlcdTRFMERcdTc1MjhcdTVFMjZcdTU0MEVcdTdGMDBcclxuICAvLyByZW1vdmVQcmVmaXhBZnRlck9yZGVyaW5nOiBmYWxzZSxcclxuICAvLyBwcmVmaXhTZXBhcmF0b3I6ICcuJyxcclxuXHQvLyBleGNsdWRlRmlsZXM6IFsgJ2ZlYXR1cmVzLyoubWQnLCd0YWdzLm1kJ10sXHJcblx0ZXhjbHVkZVBhdHRlcm46IFsnZmVhdHVyZXMvKionLCdwYWdlcy8qKiddLFxyXG5cdGV4Y2x1ZGVGaWxlc0J5RnJvbnRtYXR0ZXJGaWVsZE5hbWU6ICdleGNsdWRlJyxcclxuXHQvLyBleGNsdWRlRm9sZGVyczogWydmZWF0dXJlcyddLFxyXG4gIC8vIGluY2x1ZGVEb3RGaWxlczogZmFsc2UsXHJcbiAgLy8gaW5jbHVkZVJvb3RJbmRleEZpbGU6IGZhbHNlLFxyXG4gIC8vIGluY2x1ZGVGb2xkZXJJbmRleEZpbGU6IGZhbHNlLFxyXG4gIC8vIGluY2x1ZGVFbXB0eUZvbGRlcjogZmFsc2UsXHJcbiAgLy8gcm9vdEdyb3VwVGV4dDogJ0NvbnRlbnRzJyxcclxuICAvLyByb290R3JvdXBMaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2pvb3kyJyxcclxuICAvLyByb290R3JvdXBDb2xsYXBzZWQ6IGZhbHNlLFxyXG4gIC8vIGNvbnZlcnRTYW1lTmFtZVN1YkZpbGVUb0dyb3VwSW5kZXhQYWdlOiBmYWxzZSxcclxuICAvLyBmb2xkZXJMaW5rTm90SW5jbHVkZXNGaWxlTmFtZTogZmFsc2UsXHJcbiAgLy8ga2VlcE1hcmtkb3duU3ludGF4RnJvbVRpdGxlOiBmYWxzZSxcclxuICAvLyBkZWJ1Z1ByaW50OiBmYWxzZSxcclxufVxyXG5cclxuY29uc3QgZ2V0U2lkZUJhciA9ICgpOiBhbnkgPT4ge1xyXG4gIGNvbnN0IGdlbmVyYXRlZFNpZGViYXIgPSBnZW5lcmF0ZVNpZGViYXIoW1xyXG4gICAge1xyXG5cdFx0ZG9jdW1lbnRSb290UGF0aDogXCJkb2NzXCIsICAgICAgICAvLyBcdTY1ODdcdTY4NjNcdTY4MzlcdTc2RUVcdTVGNTVcclxuXHRcdHNjYW5TdGFydFBhdGg6IFwiXHU1MzVBXHU1QkEyXCIsICAgICAgICAgIC8vIFx1NjI2Qlx1NjNDRlx1OEQ3N1x1NTlDQlx1OERFRlx1NUY4NFxyXG5cdFx0cmVzb2x2ZVBhdGg6IFwiL1x1NTM1QVx1NUJBMi9cIiwgICAgICAgICAgLy8gXHU4REVGXHU3NTMxXHU4OUUzXHU2NzkwXHU4REVGXHU1Rjg0XHJcblx0XHR1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSwgICAvLyBcdTRGN0ZcdTc1MjhcdTY1ODdcdTRFRjZcdTY4MDdcdTk4OThcdTRGNUNcdTRFM0FcdTRGQTdcdThGQjlcdTY4MEZcdTY2M0VcdTc5M0FcdTY1ODdcdTY3MkNcclxuXHRcdGh5cGhlblRvU3BhY2U6IHRydWUsICAgICAgICAgICAgLy8gXHU4RkRFXHU1QjU3XHU3QjI2XHU4RjZDXHU3QTdBXHU2ODNDXHJcblx0XHRrZWVwTWFya2Rvd25TeW50YXhGcm9tVGl0bGU6IHRydWUsIC8vIFx1NEZERFx1NzU1OVx1NjgwN1x1OTg5OFx1NEUyRFx1NzY4NCBNYXJrZG93biBcdThCRURcdTZDRDVcclxuXHRcdG1hbnVhbFNvcnRGaWxlTmFtZUJ5UHJpb3JpdHk6IFsgIC8vIFx1NjI0Qlx1NTJBOFx1NjM5Mlx1NUU4Rlx1NjU4N1x1NEVGNlx1NEYxOFx1NTE0OFx1N0VBN1xyXG5cdFx0XHRcImluc3RhbGxhdGlvbi5tZFwiLCBcclxuXHRcdFx0XCJhdXRoZW50aWNhdGlvbi5tZFwiLCBcclxuXHRcdFx0XCJmaW5hbC5tZFwiLFxyXG5cdFx0XHQnQWR2YW5jZWQnXHJcblx0XHRdLFxyXG5cdFx0Ly8gY29sbGFwc2VkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXHU2NjJGXHU1NDI2XHU5RUQ4XHU4QkE0XHU2Mjk4XHU1M0UwXHJcbiAgICAgIFx0Y29sbGFwc2VEZXB0aDogMiAgICAgICAgICAgICAgICAgICAgLy8gXHU2Mjk4XHU1M0UwXHU2REYxXHU1RUE2XHJcblx0fSxcclxuICAgIHtcclxuXHRcdGRvY3VtZW50Um9vdFBhdGg6IFwiZG9jc1wiLFxyXG5cdFx0c2NhblN0YXJ0UGF0aDogXCJcdTdCMTRcdThCQjBcIixcclxuXHRcdHJlc29sdmVQYXRoOiBcIi9cdTdCMTRcdThCQjAvXCIsXHJcblx0XHR1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcclxuXHRcdGh5cGhlblRvU3BhY2U6IHRydWUsXHJcblx0XHRrZWVwTWFya2Rvd25TeW50YXhGcm9tVGl0bGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0pO1xyXG4gIHJldHVybiBnZW5lcmF0ZWRTaWRlYmFyID8/IHt9O1xyXG59O1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xyXG5leHBvcnQgZGVmYXVsdCB3aXRoUHdhKGRlZmluZUNvbmZpZyh7XHJcbiAgb3V0RGlyOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9kaXN0XCIpLCAvLyBkaXN0XHU3NTFGXHU2MjEwXHU3NkVFXHU1RjU1XHJcbiAgdGl0bGU6IFwiXHU1RjIwXHU0RkNBXHU2NzcwXHU3Njg0XHU1MzVBXHU1QkEyXCIsXHJcbiAgdGl0bGVUZW1wbGF0ZTogXCI6dGl0bGUtXHU1RjIwXHU0RkNBXHU2NzcwXHU3Njg0XHU1MzVBXHU1QkEyXCIsXHJcbiAgZGVzY3JpcHRpb246IFwiXHU1NzVBXHU2MzAxXHU2REYxXHU4MDE1XHU2MjgwXHU2NzJGXHU5ODg2XHU1N0RGXHU3Njg0VFx1NTc4Qlx1NTI0RFx1N0FFRlx1N0EwQlx1NUU4Rlx1NTQ1OCwgXHU1NTlDXHU2QjIyVnVlanNcdTMwMDFOZXN0anMsIFx1OEZEOFx1NEYxQVx1NzBCOXB5dGhvblx1MzAwMW5scFx1MzAwMXdlYjNcdTMwMDFcdTU0MEVcdTdBRUZcIixcclxuICBsYW5nOiBcInpoLUNIXCIsIC8vIFx1OEJFRFx1OEEwMFxyXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gIGNsZWFuVXJsczogdHJ1ZSxcclxuICBpZ25vcmVEZWFkTGlua3M6IHRydWUsIC8vIFx1NUZGRFx1NzU2NVx1NkI3Qlx1OTRGRVx1NjdFNVx1OEJFMlxyXG4gIHNpdGVtYXA6IHtcclxuICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vd3d3LmJhaWR1LmNvbVwiLFxyXG4gIH0sXHJcbiAgcmV3cml0ZXM6IHtcclxuICAgIFwicG9zdC8oLiopXCI6IFwiKC4qKVwiLCAvLyBcdTVDMDZcdTYyNDBcdTY3MDlcdTRFRTUgL3Bvc3QvIFx1NUYwMFx1NTkzNFx1NzY4NCBVUkwgXHU5MUNEXHU1MTk5XHU0RTNBXHU1M0JCXHU2Mzg5IC9wb3N0LyBcdTUyNERcdTdGMDBcdTc2ODQgVVJMXHUzMDAyXHJcbiAgfSxcclxuICBtYXJrZG93bjoge1xyXG4gICAgbGluZU51bWJlcnM6IHRydWUsXHJcbiAgICBpbWFnZToge1xyXG4gICAgICBsYXp5TG9hZGluZzogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBjb2RlQ29weUJ1dHRvblRpdGxlOiBcIlx1NTkwRFx1NTIzNlx1NEVFM1x1NzgwMVwiLFxyXG4gICAgY29kZVRyYW5zZm9ybWVyczogW1xyXG4gICAgICAvLyBcdTRGN0ZcdTc1MjggYCEhY29kZWAgXHU1NDhDIGA8IS0tLUBpbmNsdWRlYCBcdTk2MzJcdTZCNjJcdThGNkNcdTYzNjJcdUZGMENcdTZGMTRcdTc5M0FcdTRFRTNcdTc4MDFcdTc1MjhcclxuICAgICAge1xyXG4gICAgICAgIHBvc3Rwcm9jZXNzKGNvZGUpIHtcclxuICAgICAgICAgIGxldCBfY29kZSA9IGNvZGUucmVwbGFjZSgvXFxbXFwhXFwhY29kZS9nLCBcIlshY29kZVwiKTtcclxuICAgICAgICAgIC8vIFx1NzZGNFx1NjNBNVx1NjZGRlx1NjM2Mlx1ODhBQlx1NkQ0Rlx1ODlDOFx1NTY2OFx1OTYzQlx1NkI2Mlx1RkYwQ1x1OTA3Rlx1NTE0RFx1NjgwN1x1N0I3RVx1NkNFOFx1NTE2NVxyXG4gICAgICAgICAgX2NvZGUgPSBfY29kZS5yZXBsYWNlKC8hLS0tQGluY2x1ZGUvZywgXCIhLS1AaW5jbHVkZVwiKTtcclxuICAgICAgICAgIHJldHVybiBfY29kZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB0cmFuc2Zvcm1lclR3b3NsYXNoKCksXHJcbiAgICBdLFxyXG4gICAgLy8gXHU1QkY5bWFya2Rvd25cdTRFMkRcdTc2ODRcdTUxODVcdTVCQjlcdThGREJcdTg4NENcdTY2RkZcdTYzNjJcdTYyMTZcdTgwMDVcdTYyNzlcdTkxQ0ZcdTU5MDRcdTc0MDZcclxuICAgIGNvbmZpZzogKG1kKSA9PiB7XHJcbiAgICAgIC8vIFx1OTZDNlx1NjIxMCB2aXRlcHJlc3MtcGx1Z2luLWxlZ2VuZFxyXG4gICAgICB2aXRlcHJlc3NQbHVnaW5MZWdlbmQobWQsIHtcclxuICAgICAgICBtYXJrbWFwOiB7IHNob3dUb29sYmFyOiB0cnVlIH0sIC8vIFx1NTQyRlx1NzUyOFx1ODExMVx1NTZGRVx1NURFNVx1NTE3N1x1NjgwRlxyXG4gICAgICAgIG1lcm1haWQ6IHRydWUsIC8vIFx1NTQyRlx1NzUyOCBNZXJtYWlkIFx1NjUyRlx1NjMwMVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFx1NTIxQlx1NUVGQSBtYXJrZG93bi1pdCBcdTYzRDJcdTRFRjZcclxuICAgICAgbWQudXNlKChtZCkgPT4ge1xyXG4gICAgICAgIC8vIFx1N0VDNFx1NEVGNlx1NjNEMlx1NTE2NWgxXHU2ODA3XHU5ODk4XHU0RTBCXHJcbiAgICAgICAgbWQucmVuZGVyZXIucnVsZXMuaGVhZGluZ19jbG9zZSA9ICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpID0+IHtcclxuICAgICAgICAgIGxldCBodG1sUmVzdWx0ID0gc2xmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKTtcclxuICAgICAgICAgIGlmICh0b2tlbnNbaWR4XS50YWcgPT09IFwiaDFcIilcclxuICAgICAgICAgICAgaHRtbFJlc3VsdCArPSBgXFxuPENsaWVudE9ubHk+PFdEb2NUaXRsZU1ldGEgdi1pZj1cIigkZnJvbnRtYXR0ZXI/LmFzaWRlID8/IHRydWUpICYmICgkZnJvbnRtYXR0ZXI/LnNob3dXRG9jVGl0bGVNZXRhID8/IHRydWUpXCIgOmFydGljbGU9XCIkZnJvbnRtYXR0ZXJcIiAvPjwvQ2xpZW50T25seT5gO1xyXG4gICAgICAgICAgcmV0dXJuIGh0bWxSZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBkZWZhdWx0UmVuZGVyID0gbWQucmVuZGVyO1xyXG4gICAgICAgIC8vIDIuMC4wLWFscGhhLjIgXHU1MTQxXHU4QkI4XHU1RTc2XHU2M0E1XHU1M0Q3XHU1RjAyXHU2QjY1XHU1MUZEXHU2NTcwIFx1NTM0N1x1N0VBN1x1NTIzMFx1NkI2NFx1NzI0OFx1NjcyQ1x1NEU0Qlx1NTQwRVx1NjIxNlx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCBkb2NzLy52aXRlcHJlc3MvdXRpbHMvZmlsZVRpbWUudHNcclxuICAgICAgICBtZC5yZW5kZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgLy8gXHU1QkY5XHU1MzlGXHU3NTFGXHU1MTg1XHU1QkI5XHU1MDVBXHU1OTA0XHU3NDA2XHVGRjBDXHU1ODlFXHU1MkEwXHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1NDhDXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XHJcbiAgICAgICAgICBhcmdzWzBdID0gYWRkVGltZShhcmdzWzBdLCBhcmdzWzFdLnJlYWxQYXRoKTtcclxuICAgICAgICAgIC8vIFx1OEMwM1x1NzUyOFx1NTM5Rlx1NTlDQlx1NkUzMlx1NjdEM1xyXG4gICAgICAgICAgbGV0IGRlZmF1bHRDb250ZW50ID0gZGVmYXVsdFJlbmRlci5hcHBseShtZCwgYXJncyk7XHJcbiAgICAgICAgICAvLyBcdTY2RkZcdTYzNjJcdTUxODVcdTVCQjlcclxuICAgICAgICAgIC8vIGRlZmF1bHRDb250ZW50ID0gZGVmYXVsdENvbnRlbnRcclxuICAgICAgICAgIC8vICAgICAgIC5yZXBsYWNlKC88XFwhLS0tQGluY2x1ZGU6L2csICc8IS0tQGluY2x1ZGU6JylcclxuICAgICAgICAgIC8vIFx1OEZENFx1NTZERVx1NkUzMlx1NjdEM1x1NzY4NFx1NTE4NVx1NUJCOVxyXG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHRDb250ZW50O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvL1x1NTJBOFx1NjAwMVx1NkEyMVx1N0NDQVx1NTZGRVx1NzI0N1xyXG4gICAgICBtZC51c2UoVW5sYXp5SW1hZ2VzKCksIHsgXHJcbiAgICAgICAgaW1nRWxlbWVudFRhZzogJ05vbGViYXNlVW5sYXp5SW1nJywgXHJcbiAgICAgIH0pIFxyXG4gICAgXHJcbiAgICApO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGhlYWQ6IFtcclxuICAgIFtcInNjcmlwdFwiLCB7IGFzeW5jOiBcIlwiLCBzcmM6IFwiaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD1HLU1CN1hWQkcxVFFcIiB9XSxcclxuICAgIFsnc2NyaXB0Jyx7ZGVmZXI6ICcnLGFzeW5jOiAnJyxzcmM6ICdodHRwczovL2NuLnZlcmNvdW50Lm9uZS9qcyd9XSwvL1ZlcmNvdW50XHU5NzU5XHU2MDAxXHU3RjUxXHU3QUQ5XHU2REZCXHU1MkEwXHU4QkJGXHU5NUVFXHU5MUNGXHU3RURGXHU4QkExXHJcbiAgICAvLyBbXHJcbiAgICAvLyAgIFwic2NyaXB0XCIsXHJcbiAgICAvLyAgIHt9LFxyXG4gICAgLy8gICBgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XHJcbiAgICAvLyAgIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cclxuICAgIC8vICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcclxuICAgIC8vICAgZ3RhZygnY29uZmlnJywgJ0ctTUI3WFZCRzFUUScpO2AsXHJcbiAgICAvLyBdLFxyXG4gICAgLy8gLy8gXHU3NjdFXHU1RUE2XHU3RURGXHU4QkExXHU1RTczXHU1M0YwXHJcbiAgICAvLyBbXHJcbiAgICAvLyAgIFwic2NyaXB0XCIsXHJcbiAgICAvLyAgIHt9LFxyXG4gICAgLy8gICBgdmFyIF9obXQgPSBfaG10IHx8IFtdO1xyXG5cdFx0Ly8gXHQoZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBcdFx0dmFyIGhtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuXHRcdC8vIFx0XHRobS5zcmMgPSBcImh0dHBzOi8vaG0uYmFpZHUuY29tL2htLmpzP2VhOGE0ODY5ZjQ4NTk3ODY5MmY4OWNkOTA4ZjY5MDZhXCI7XHJcblx0XHQvLyBcdFx0dmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTsgXHJcblx0XHQvLyBcdFx0cy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShobSwgcyk7XHJcblx0XHQvLyBcdH0pKCk7YCxcclxuICAgIC8vIF0sXHJcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgaHJlZjogXCIvZmF2aWNvbi5pY29cIiB9XSxcclxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwiYXBwbGUtdG91Y2gtaWNvblwiLCBocmVmOiBcIi9hcHBsZS10b3VjaC1pY29uLnBuZ1wiIH1dLCAvLyBcdTZERkJcdTUyQTBcdTgyRjlcdTY3OUNcdTU2RkVcdTY4MDdcclxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwicHJlbG9hZFwiLCBocmVmOiBcIi90ZW1wbGF0ZS53ZWJtXCIsIGFzOiBcInZpZGVvXCIsIHR5cGU6IFwidmlkZW8vd2VibVwiIH1dLFxyXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogJy9vZy1pbWFnZS5wbmcnIH1dLCAvLyBcdTc5M0VcdTRFQTRcdTVBOTJcdTRGNTNcdTU2RkVcdTcyNDdcclxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInJlZmVycmVyXCIsIGNvbnRlbnQ6IFwibm8tcmVmZXJyZXJcIiB9XSxcclxuICAgICAgXHJcbiAgXSxcclxuICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnI3RyYW5zZm9ybWhlYWRcclxuICBhc3luYyB0cmFuc2Zvcm1IZWFkKGNvbnRleHQpIHtcclxuICAgIHJldHVybiBoYW5kbGVIZWFkTWV0YShjb250ZXh0KTtcclxuICB9LFxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXHJcbiAgICBvdXRsaW5lOiBbMiwgNF0sXHJcbiAgICBvdXRsaW5lVGl0bGU6IFwiXHU1OTI3XHU3RUIyXCIsXHJcbiAgICBsYXN0VXBkYXRlZFRleHQ6IFwiXHU2NzAwXHU4RkQxXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XCIsXHJcbiAgICAvLyAgIFx1NTkzNFx1OTBFOFx1NUJGQ1x1ODIyQVxyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogXCJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIlx1NTM1QVx1NUJBMlwiLCBsaW5rOiBcIi9cdTUzNUFcdTVCQTIvXCIsIGFjdGl2ZU1hdGNoOiBcIi9cdTUzNUFcdTVCQTIvXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIlx1N0IxNFx1OEJCMFwiLCBsaW5rOiBcIi9cdTdCMTRcdThCQjAvXCIsIGFjdGl2ZU1hdGNoOiBcIi9cdTdCMTRcdThCQjAvXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIlx1NjgwN1x1N0I3RVwiLCBsaW5rOiBcIi9wYWdlcy90YWdzXCIsIGFjdGl2ZU1hdGNoOiBcIi9wYWdlcy90YWdzXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIlx1NUY1Mlx1Njg2M1wiLCBsaW5rOiBcIi9wYWdlcy9wb3N0c1wiLCBhY3RpdmVNYXRjaDogXCIvcGFnZXMvcG9zdHNcIiB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTdFQkZcdTRFMEFcIixcclxuICAgICAgICBhY3RpdmVNYXRjaDogXCIvXHU3RUJGXHU0RTBBL1wiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiXHU4MUVBXHU1RUZBXHU5ODc5XHU3NkVFXCIsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1N0IxMVx1NTNDQlx1NUMwRlx1N0EwQlx1NUU4RlwiLCBsaW5rOiBcImh0dHBzOi8vb3NzLmp1c3RpbjNnby5jb20vYmxvZ3MveGlhb3lvdS1tcC1jb2RlLnBuZ1wiIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1OTYzRlx1OTFDQ1x1NEU5MVx1NzZEOFx1NjQxQ1x1N0QyMlwiLCBsaW5rOiBcImh0dHBzOi8vc3Nnby5hcHBcIiB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJVc2UgU29yYVwiLCBsaW5rOiBcImh0dHBzOi8vdXNlc29yYS5hcHBcIiB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJFeGNlbDJKU09OXCIsIGxpbms6IFwiaHR0cHM6Ly9idWc0MDQuZGV2XCIgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1RjAwXHU2RTkwXHU5MEU4XHU3RjcyXCIsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIkNoYXRHUFQtV2ViXCIsIGxpbms6IFwiaHR0cHM6Ly9jaGF0Lmp1c3RpbjNnby5jb20vXCIgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6IFwiTG9iZUNoYXRcIiwgbGluazogXCJodHRwczovL2NoYXRjLmFwcFwiIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgLy8gc2lkZWJhcjogY3JlYXRlU2lkZWJhcigpLFxyXG4gICAgc2lkZWJhcjogZ2V0U2lkZUJhcigpLFxyXG4gICAgbG9nbzogXCIvbG9nby5wbmdcIixcclxuICAgIHNpdGVUaXRsZTogZmFsc2UsXHJcblxyXG4gICAgc29jaWFsTGlua3M6IFtcclxuICAgICAge1xyXG4gICAgICAgIGljb246IHtcclxuICAgICAgICAgIHN2ZzogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiNTEyXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHRpdGxlPlJTU1x1OEJBMlx1OTYwNTwvdGl0bGU+PHBhdGggZD1cIk0xMDguNTYsMzQyLjc4YTYwLjM0LDYwLjM0LDAsMSwwLDYwLjU2LDYwLjQ0QTYwLjYzLDYwLjYzLDAsMCwwLDEwOC41NiwzNDIuNzhaXCIvPjxwYXRoIGQ9XCJNNDgsMTg2LjY3djg2LjU1YzUyLDAsMTAxLjk0LDE1LjM5LDEzOC42Nyw1Mi4xMXM1Miw4Ni41Niw1MiwxMzguNjdoODYuNjZDMzI1LjMzLDMxMi40NCwxOTkuNjcsMTg2LjY3LDQ4LDE4Ni42N1pcIi8+PHBhdGggZD1cIk00OCw0OHY4Ni41NmMxODUuMjUsMCwzMjkuMjIsMTQ0LjA4LDMyOS4yMiwzMjkuNDRINDY0QzQ2NCwyMzQuNjYsMjc3LjY3LDQ4LDQ4LDQ4WlwiLz48L3N2Zz4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogXCIvZmVlZC54bWxcIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcblxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgIG1lc3NhZ2U6XHJcbiAgICAgICAgJzxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vSnVzdGluM2dvL2p1c3RpbjNnby5naXRodWIuaW9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5cdTdGNTFcdTdBRDlcdTVERjJcdTVGMDBcdTZFOTBcdUZGMENcdTZCQ0ZcdTU0NjhcdTY3MkJcdTU5ODJcdTY3MDlcdTY2RjRcdTY1QjByZWxlYXNlXHU0RTAwXHU2QjIxXHVGRjBDXHU2QjIyXHU4RkNFc3RhcjwvYT4nLFxyXG4gICAgICBjb3B5cmlnaHQ6XHJcbiAgICAgICAgJzxhIGhyZWY9XCJodHRwczovL2JlaWFuLm1paXQuZ292LmNuLyMvSW50ZWdyYXRlZC9pbmRleFwiIHRhcmdldD1cIl9ibGFua1wiPkNvcHlyaWdodFx1MDBBOSAyMDIxLXByZXNlbnQgXHU2RTFESUNQXHU1OTA3MjAyMTAwNjg3OVx1NTNGNzwvYT4nLFxyXG4gICAgfSxcclxuICAgIHNlYXJjaDoge1xyXG4gICAgICBwcm92aWRlcjogXCJsb2NhbFwiLFxyXG4gICAgfSxcclxuICAgIGVkaXRMaW5rOiB7XHJcbiAgICAgIHBhdHRlcm46IFwiaHR0cHM6Ly9naXRodWIuY29tL0p1c3RpbjNnby9qdXN0aW4zZ28uZ2l0aHViLmlvL2VkaXQvbWFzdGVyL2RvY3MvOnBhdGhcIixcclxuICAgICAgdGV4dDogXCJcdTU3MjhHaXRIdWJcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcIixcclxuICAgIH0sXHJcbiAgICByZXR1cm5Ub1RvcExhYmVsOiBcIlx1RDgzRFx1REM0NkNvZGUgaXMgYnVpbGRpbmcgdGhlIHdvcmxkLlwiLFxyXG4gICAgc2lkZWJhck1lbnVMYWJlbDogXCJcdTc2RUVcdTVGNTVcIixcclxuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6IFwiXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXCIsXHJcbiAgICBkb2NGb290ZXI6IHtcclxuICAgICAgcHJldjogZmFsc2UsXHJcbiAgICAgIG5leHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjI2OVx1NUM1NTogXHU5ODc1XHU4MTFBXHU5MTREXHU3RjZFXHJcbiAgICBmb290ZXJDb25maWc6IHtcclxuICAgICAgc2hvd0Zvb3RlcjogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU5ODc1XHU4MTFBXHJcbiAgICAgIHNob3dSYWluYm93OiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcdTVGNjlcdTg2NzlcclxuICAgICAgaWNwUmVjb3JkQ29kZTogXCJcdTZEMjVJQ1BcdTU5MDcyMDIyMDA1ODY0XHU1M0Y3LTJcIiwgLy8gSUNQXHU1OTA3XHU2ODQ4XHU1M0Y3XHJcbiAgICAgIHB1YmxpY1NlY3VyaXR5UmVjb3JkQ29kZTogXCJcdTZEMjVcdTUxNkNcdTdGNTFcdTVCODlcdTU5MDcxMjAxMTIwMjAwMDY3N1x1NTNGN1wiLCAvLyBcdTgwNTRcdTdGNTFcdTU5MDdcdTY4NDhcdTUzRjdcclxuICAgICAgY29weXJpZ2h0OiBgQ29weXJpZ2h0IFx1MDBBOSAyMDE5LSR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBDaGFybGVzN2NgLCAvLyBcdTcyNDhcdTY3NDNcdTRGRTFcdTYwNkZcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgcHdhOiB7XHJcbiAgICAvLyBcdTY4MzlcdTc2RUVcdTVGNTVcclxuICAgIG91dERpcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vZGlzdFwiKSxcclxuICAgIC8vIG1vZGU6ICdkZXZlbG9wbWVudCcsXHJcbiAgICBtb2RlOiAncHJvZHVjdGlvbicsXHJcbiAgICBzdHJhdGVnaWVzOiAnZ2VuZXJhdGVTVycsIC8vIFx1NjYwRVx1Nzg2RVx1NEY3Rlx1NzUyOCBnZW5lcmF0ZVNXIFx1N0I1Nlx1NzU2NVxyXG4gICAgLy8gc2VsZkRlc3Ryb3lpbmc6IGZhbHNlLCAvLyBcdTc4NkVcdTRGREQgU2VydmljZSBXb3JrZXIgXHU0RTBEXHU0RjFBXHU4MUVBXHU1MkE4XHU2Q0U4XHU5NTAwXHJcbiAgICByZWdpc3RlclR5cGU6IFwicHJvbXB0XCIsIC8vXHU2M0QwXHU3OTNBXHU2NkY0XHU2NUIwXHJcbiAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxyXG4gICAgLy8gaW5jbHVkZUFzc2V0czogWydmYXZpY29uLmljbycsICdhcHBsZS10b3VjaC1pY29uLnBuZycsICdtYXNrLWljb24uc3ZnJ10sXHJcbiAgICBpbmNsdWRlTWFuaWZlc3RJY29uczogZmFsc2UsXHJcbiAgICBtYW5pZmVzdDoge1xyXG4gICAgICBpZDogXCIvXCIsXHJcbiAgICAgIG5hbWU6IFwiXHU1RjIwXHU0RkNBXHU2NzcwXHU3Njg0XHU1MzVBXHU1QkEyXCIsXHJcbiAgICAgIHNob3J0X25hbWU6IFwiXHU1RjIwXHU0RkNBXHU2NzcwXHU3Njg0XHU1MzVBXHU1QkEyXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlx1NUYyMFx1NEZDQVx1Njc3MFx1NzY4NFx1NTM1QVx1NUJBMlx1NEVCQVx1NzUxRlwiLFxyXG4gICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBpY29uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogXCIvaW1hZ2VzL3B3YS0xMjB4MTIwLnBuZ1wiLFxyXG4gICAgICAgICAgc2l6ZXM6IFwiMTIweDEyMFwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogXCIvaW1hZ2VzL3B3YS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogXCIvaW1hZ2VzL3B3YS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBpbmplY3RNYW5pZmVzdDoge1xyXG4gICAgICBpbmplY3Rpb25Qb2ludDogdW5kZWZpbmVkLFxyXG4gICAgfSxcclxuICAgIHdvcmtib3g6IHtcclxuICAgICAgLy8gXHU1QjlBXHU1MjM2XHU3RjEzXHU1QjU4XHU3QjU2XHU3NTY1XHJcbiAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiA1ICogMTAyNCAqIDEwMjQsXHJcbiAgICAgIHJ1bnRpbWVDYWNoaW5nOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gXHU1MzM5XHU5MTREXHU2NTg3XHU3QUUwXHU3NkY4XHU1MTczXHU3Njg0anNcdTY1ODdcdTRFRjZcclxuICAgICAgICAgIHVybFBhdHRlcm46IC9wb3N0cy4rXFwuanMkLyxcclxuICAgICAgICAgIGhhbmRsZXI6ICdTdGFsZVdoaWxlUmV2YWxpZGF0ZScsXHJcbiAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGNhY2hlTmFtZTogJ2FydGljbGUtY29udGVudCcsXHJcbiAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICBtYXhFbnRyaWVzOiAxMDAsIC8vIFx1NjcwMFx1NTkxQVx1N0YxM1x1NUI1ODEwMFx1N0JDN1x1NjU4N1x1N0FFMFxyXG4gICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDcgKiAyNCAqIDYwICogNjAsIC8vIFx1N0YxM1x1NUI1OFx1NEUwMFx1NTQ2OFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xyXG4gICAgICAgICAgICAgIHN0YXR1c2VzOiBbMCwgMjAwXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSwvLyBcdTk4ODRcdTdGMTNcdTVCNThcdTkxQ0RcdTg5ODFcdThENDRcdTZFOTBcclxuICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntjc3MsanMsaHRtbCxzdmcscG5nLGljbyx3ZWJtLG1vYzMsbXA0LHR4dH1cIl0sXHJcbiAgICAgIC8vIGV4Y2x1ZGU6IFsvc3cuanMkLywgL3dvcmtib3gtLipcXC5qcyQvXSwgICAgICAgIC8vIFx1NEUwRFx1ODk4MVx1N0YxM1x1NUI1OCBzdy5qcyBcdTY3MkNcdThFQUJcclxuICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOnRydWUsXHJcbiAgICAgIHNraXBXYWl0aW5nOiBmYWxzZSwgIC8vIFx1NjVCMCBTVyBcdTdBQ0JcdTUzNzNcdTYzQTVcdTdCQTFcclxuICAgICAgY2xpZW50c0NsYWltOiB0cnVlLCAvLyBcdTYzQTdcdTUyMzZcdTYyNDBcdTY3MDlcdTk4NzVcdTk3NjJcclxuICAgICAgXHJcbiAgICB9LFxyXG4gICAgZGV2T3B0aW9uczp7XHJcbiAgICAgIGVuYWJsZWQ6dHJ1ZSwvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcclxuICAgICAgdHlwZTonbW9kdWxlJ1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHZpdGU6IHtcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBpbmNsdWRlOiBbXCJlbGVtZW50LXBsdXNcIl0sXHJcbiAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICBcIkBub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWVuaGFuY2VkLXJlYWRhYmlsaXRpZXMvY2xpZW50XCIsXHJcbiAgICAgICAgXCJ2aXRlcHJlc3NcIixcclxuICAgICAgICBcIkBub2xlYmFzZS91aVwiLFxyXG4gICAgICAgIFwiQHZ1ZXVzZS9jb3JlXCIsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBUaHVtYm5haWxIYXNoSW1hZ2VzKCksICAvL1x1NTJBOFx1NjAwMVx1NkEyMVx1N0NDQVx1NTZGRVxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgIFREZXNpZ25SZXNvbHZlcih7XHJcbiAgICAgICAgICAgIGxpYnJhcnk6IFwidnVlLW5leHRcIixcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcih7fSksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIGR0czogXCJjb21wb25lbnRzLmQudHNcIiwgLy8gXHU3NTFGXHU2MjEwXHU1MjMwIFZpdGVQcmVzcyBcdTc2RUVcdTVGNTVcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTUyQTBcdThGN0QgY29tcG9uZW50cyBcdTRFMEJcdTc2ODR2dWVcdTY1ODdcdTRFRjZcdTRFM0FcdTdFQzRcdTRFRjZcdUZGMENcdTc3MDFcdTUzQkJpbXBvcnQgXHU1QkZDXHU1MTY1XHUzMDAyXHJcbiAgICAgICAgZGlyczogW1wiLnZpdGVwcmVzcy90aGVtZS9jb21wb25lbnRzXCJdLFxyXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkLywgL1xcLm1kXFw/dnVlL10sIC8vIFx1NkRGQlx1NTJBMFx1OEZEOVx1NEUyQVx1NEVFNVx1Nzg2RVx1NEZERFx1NTkwNFx1NzQwNiBNYXJrZG93biBcdTY1ODdcdTRFRjZcclxuICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgIC8vIFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxyXG4gICAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFByZWZpeDogXCJcIixcclxuICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbXCJjYXJib25cIl0sXHJcbiAgICAgICAgICAgIC8vIFx1NkRGQlx1NTJBMFx1NEVFNVx1NEUwQlx1OTE0RFx1N0Y2RVx1Nzg2RVx1NEZERFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NEU1Rlx1ODBGRFx1OEJDNlx1NTIyQlxyXG4gICAgICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAgIGNiOiBcImNhcmJvblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICBURGVzaWduUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBsaWJyYXJ5OiBcInZ1ZS1uZXh0XCIsXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe30pLFxyXG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHJcbiAgICAgICAgICBBcmNvUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBzaWRlRWZmZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICByZXNvbHZlSWNvbnM6IHRydWUsXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KSxcclxuICAgICAgZHluYW1pY0ltcG9ydCgpLCAvLyBcdThGRDBcdTg4NENcdTY1RjZcdTVCRkNcdTUxNjVcclxuICAgICAgSWNvbnMoe1xyXG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLCAvLyBcdTgxRUFcdTUyQThcdTVCODlcdTg4QzVcdTU2RkVcdTY4MDdcdTk2QzZcclxuICAgICAgICBkZWZhdWx0U3R5bGU6IFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiLFxyXG4gICAgICB9KSxcclxuICAgICAgLy9nemlwXHU1NDhDYnJvdGxpIFx1NTM4Qlx1N0YyOVxyXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgdmVyYm9zZTogdHJ1ZSxcclxuICAgICAgICAgIGRpc2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgdGhyZXNob2xkOiAxMDI0MCxcclxuICAgICAgICAgIGFsZ29yaXRobTogXCJnemlwXCIsXHJcbiAgICAgICAgICBleHQ6IFwiLmd6XCIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdml0ZUNvbXByZXNzaW9uKHtcclxuICAgICAgICAgICAgdmVyYm9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgZGlzYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNDAsXHJcbiAgICAgICAgICAgIGFsZ29yaXRobTogXCJicm90bGlDb21wcmVzc1wiLFxyXG4gICAgICAgICAgICBleHQ6IFwiLmJyXCIsXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICBVbm9DU1MoKSxcclxuICAgIF0sXHJcblxyXG4gICAgc3NyOiB7XHJcbiAgICAgIG5vRXh0ZXJuYWw6IFtcclxuICAgICAgICAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4tZW5oYW5jZWQtcmVhZGFiaWxpdGllcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cycsIFxyXG4gICAgICAgICdAYXJjby1kZXNpZ24vd2ViLXZ1ZScsIFxyXG4gICAgICAgICd2aXRlcHJlc3MnLFxyXG4gICAgICAgICdAbm9sZWJhc2UvdWknXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIC8vIEAgXHU2MzA3XHU1NDExIC52aXRlcHJlc3MgXHU3NkVFXHU1RjU1XHJcbiAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vLnZpdGVwcmVzc1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTk3MDBcdTg5ODFcdThCQkZcdTk1RUUgZG9jcyBcdTY4MzlcdTc2RUVcdTVGNTVcdUZGMENcdTUzRUZcdTRFRTVcdTZERkJcdTUyQTBcdTUzRTZcdTRFMDBcdTRFMkFcdTUyMkJcdTU0MERcclxuICAgICAgICBcIn5cIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9cIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHBsdWdpbnM6IFtcclxuICAgIC8vIFx0Ly8gLi4uXHJcbiAgICAvLyBBdXRvSW1wb3J0KHtcclxuICAgIC8vIFx0cmVzb2x2ZXJzOiBbVERlc2lnblJlc29sdmVyKHtcclxuICAgIC8vIFx0XHRsaWJyYXJ5OiAndnVlLW5leHQnXHJcbiAgICAvLyBcdH0pXSxcclxuICAgIC8vIH0pLFxyXG4gICAgLy8gXHRDb21wb25lbnRzKHtcclxuICAgIC8vIFx0XHRyZXNvbHZlcnM6IFtURGVzaWduUmVzb2x2ZXIoe1xyXG4gICAgLy8gXHRcdFx0bGlicmFyeTogJ3Z1ZS1uZXh0J1xyXG4gICAgLy8gXHRcdH0pXSxcclxuICAgIC8vIFx0fSksXHJcbiAgICAvLyBdLFxyXG4gICAgLy8gXHU4OUUzXHU1MUIzc2Fzc1x1NTQ0QVx1OEI2Nlx1NzY4NFx1OTVFRVx1OTg5OCBEZXByZWNhdGlvbiBXYXJuaW5nOiBUaGUgbGVnYWN5IEpTIEFQSSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gRGFydCBTYXNzIDIuMC4wLlxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhcGk6IFwibW9kZXJuXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBcclxuICB9LFxyXG4gIHZ1ZToge1xyXG4gICAgdGVtcGxhdGU6IHtcclxuICAgICAgdHJhbnNmb3JtQXNzZXRVcmxzOiB7XHJcbiAgICAgICAgLy8gXHU1MTc2XHU0RUQ2XHU1NDA0XHU3OUNEXHU5MTREXHU3RjZFLi4uXHJcbiAgICAgICAgTm9sZWJhc2VVbmxhenlJbWc6IFsnc3JjJ10sIFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGxvY2FsZXM6IHtcclxuICAgIHJvb3Q6IHtcclxuICAgICAgbGFiZWw6IFwiXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3XCIsXHJcbiAgICB9LFxyXG4gICAgZW46IHtcclxuICAgICAgbGFiZWw6IFwiRW5nbGlzaFwiLFxyXG4gICAgICBsaW5rOiBcImh0dHBzOi8vZW4uanVzdGluM2dvLmNvbVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx6aGFuZ2p1bmppZS1jbi5naXRodWIuaW9cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx6aGFuZ2p1bmppZS1jbi5naXRodWIuaW9cXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHV0aWxzXFxcXGhhbmRsZUhlYWRNZXRhLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi96aGFuZ2p1bmppZS1jbi5naXRodWIuaW8vZG9jcy8udml0ZXByZXNzL3V0aWxzL2hhbmRsZUhlYWRNZXRhLnRzXCI7aW1wb3J0IHsgdHlwZSBIZWFkQ29uZmlnLCB0eXBlIFRyYW5zZm9ybUNvbnRleHQgfSBmcm9tIFwidml0ZXByZXNzXCI7XHJcblxyXG4vLyBcdTU5MDRcdTc0MDZcdTZCQ0ZcdTRFMkFcdTk4NzVcdTk3NjJcdTc2ODRcdTUxNDNcdTY1NzBcdTYzNkVcclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUhlYWRNZXRhKGNvbnRleHQ6IFRyYW5zZm9ybUNvbnRleHQpIHtcclxuICBjb25zdCB7IGRlc2NyaXB0aW9uLCB0aXRsZSwgcmVsYXRpdmVQYXRoIH0gPSBjb250ZXh0LnBhZ2VEYXRhO1xyXG4gIC8vIFx1NTg5RVx1NTJBMFR3aXR0ZXJcdTUzNjFcdTcyNDdcclxuICBjb25zdCBvZ1VybDogSGVhZENvbmZpZyA9IFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp1cmxcIiwgY29udGVudDogYWRkQmFzZShyZWxhdGl2ZVBhdGguc2xpY2UoMCwgLTMpKSArICcuaHRtbCcgfV1cclxuICBjb25zdCBvZ1RpdGxlOiBIZWFkQ29uZmlnID0gW1wibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOnRpdGxlXCIsIGNvbnRlbnQ6IHRpdGxlIH1dXHJcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbjogSGVhZENvbmZpZyA9IFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpkZXNjcmlwdGlvblwiLCBjb250ZW50OiBkZXNjcmlwdGlvbiB8fCBjb250ZXh0LmRlc2NyaXB0aW9uIH1dXHJcbiAgY29uc3Qgb2dJbWFnZTogSGVhZENvbmZpZyA9IFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZVwiLCBjb250ZW50OiBcIi9mYXZpY29uLmljb1wiIH1dXHJcbiAgY29uc3QgdHdpdHRlckNhcmQ6IEhlYWRDb25maWcgPSBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmNhcmRcIiwgY29udGVudDogXCJzdW1tYXJ5XCIgfV1cclxuICBjb25zdCB0d2l0dGVySW1hZ2U6IEhlYWRDb25maWcgPSBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmltYWdlOnNyY1wiLCBjb250ZW50OiBcIi9mYXZpY29uLmljb1wiIH1dXHJcbiAgY29uc3QgdHdpdHRlckRlc2NyaXB0aW9uOiBIZWFkQ29uZmlnID0gW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLCBjb250ZW50OiBkZXNjcmlwdGlvbiB8fCBjb250ZXh0LmRlc2NyaXB0aW9uIH1dXHJcblxyXG4gIGNvbnN0IHR3aXR0ZXJIZWFkOiBIZWFkQ29uZmlnW10gPSBbXHJcbiAgICBvZ1VybCwgb2dUaXRsZSwgb2dEZXNjcmlwdGlvbiwgb2dJbWFnZSxcclxuICAgIHR3aXR0ZXJDYXJkLCB0d2l0dGVyRGVzY3JpcHRpb24sIHR3aXR0ZXJJbWFnZSxcclxuICBdXHJcblxyXG4gIHJldHVybiB0d2l0dGVySGVhZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQmFzZShyZWxhdGl2ZVBhdGg6IHN0cmluZykge1xyXG4gIGNvbnN0IGhvc3QgPSAnaHR0cHM6Ly9qdXN0aW4zZ28uY29tJ1xyXG4gIGlmIChyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnLycpKSB7XHJcbiAgICByZXR1cm4gaG9zdCArIHJlbGF0aXZlUGF0aFxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gaG9zdCArICcvJyArIHJlbGF0aXZlUGF0aFxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcXFxcdG9vbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3poYW5nanVuamllLWNuLmdpdGh1Yi5pby9kb2NzLy52aXRlcHJlc3MvdGhlbWUvdXRpbHMvdG9vbHMudHNcIjsvKipcclxuICogXHU4QkZCXHU1M0Q2IHNlc3Npb25TdG9yYWdlXHJcbiAqIEBwYXJhbSBrZXkgXHU5NTJFXHU1NDBEXHJcbiAqIEByZXR1cm5zIFx1NTAzQ1x1NjIxNiBudWxsXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0U2Vzc2lvblN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsXHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSlcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oYFtnZXRTZXNzaW9uU3RvcmFnZV0gRmFpbGVkIHRvIHJlYWQgJHtrZXl9OmAsIGUpXHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFx1OEJCRVx1N0Y2RSBzZXNzaW9uU3RvcmFnZVxyXG4gKiBAcGFyYW0ga2V5IFx1OTUyRVx1NTQwRFxyXG4gKiBAcGFyYW0gdmFsdWUgXHU5NTJFXHU1MDNDXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0U2Vzc2lvblN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxyXG4gIHRyeSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS53YXJuKGBbc2V0U2Vzc2lvblN0b3JhZ2VdIEZhaWxlZCB0byB3cml0ZSAke2tleX06YCwgZSlcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTY1ODdcdTVCNTdcdTdFREZcdThCQTEgKFx1NEUyRFx1NjU4N1x1NUI1N1x1N0IyNlx1NjMwOVx1NUI1N1x1NjU3MFx1OEJBMVx1RkYwQ1x1ODJGMVx1NjU4N1x1NTM1NVx1OEJDRFx1NjMwOTFcdTRFMkFcdThCQTEpXHJcbiAqIEBwYXJhbSBkYXRhIFx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gKiBAcmV0dXJucyBcdTdFREZcdThCQTFcdTdFRDNcdTY3OUNcclxuICovXHJcbmV4cG9ydCBjb25zdCBjb3VudFdvcmQgPSAoZGF0YTogc3RyaW5nKTogbnVtYmVyID0+IHtcclxuICBpZiAoIWRhdGEpIHJldHVybiAwXHJcbiAgLy8gXHU3OUZCXHU5NjY0IE1hcmtkb3duIFx1OEJFRFx1NkNENVx1NUU3Mlx1NjI3MFx1RkYwOFx1NTNFRlx1OTAwOVx1RkYwQ1x1ODlDNlx1OTcwMFx1NkM0Mlx1ODAwQ1x1NUI5QVx1RkYwOVxyXG4gIGNvbnN0IGNsZWFuRGF0YSA9IGRhdGEucmVwbGFjZSgvIVxcWy4qP1xcXVxcKC4qP1xcKXxcXFsuKj9cXF1cXCguKj9cXCl8PC4qPz4vZywgJycpXHJcblxyXG4gIC8vIFx1NTMzOVx1OTE0RFx1NEUyRFx1NjU4N1x1NUI1N1x1N0IyNlx1MzAwMVx1OTdFOVx1NjU4N1x1MzAwMVx1NjVFNVx1NjU4N1xyXG4gIGNvbnN0IGNqa1BhdHRlcm4gPSAvW1xcdTRFMDAtXFx1OUZGRlxcdTM0MDAtXFx1NERCRlxcdUY5MDAtXFx1RkFGRlxcdTMwNDAtXFx1MzA5RlxcdUFDMDAtXFx1RDdBRl0vZ1xyXG4gIC8vIFx1NTMzOVx1OTE0RFx1ODJGMVx1NjU4N1x1NTM1NVx1OEJDRFx1MzAwMVx1NjU3MFx1NUI1N1xyXG4gIGNvbnN0IHdvcmRQYXR0ZXJuID0gL1thLXpBLVowLTlfXFx1MDBDMC1cXHUwMEZGXSsvZ1xyXG5cclxuICBjb25zdCBjamtNYXRjaGVzID0gY2xlYW5EYXRhLm1hdGNoKGNqa1BhdHRlcm4pIHx8IFtdXHJcbiAgY29uc3Qgd29yZE1hdGNoZXMgPSBjbGVhbkRhdGEubWF0Y2god29yZFBhdHRlcm4pIHx8IFtdXHJcblxyXG4gIHJldHVybiBjamtNYXRjaGVzLmxlbmd0aCArIHdvcmRNYXRjaGVzLmxlbmd0aFxyXG59XHJcblxyXG4vKipcclxuICogXHU2NTcwXHU1QjU3XHU1MzQzXHU1MjA2XHU0RjREXHU4RjZDXHU2MzYyIDE1MDAgLT4gMS41S1x1RkYwQzE1MDAwMDAgLT4gMS41TVxyXG4gKiBAcGFyYW0gY291bnQgXHU2NTcwXHU1QjU3XHJcbiAqIEByZXR1cm5zIFx1NjgzQ1x1NUYwRlx1NTMxNlx1NTQwRVx1NzY4NFx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvdW50VHJhbnNLID0gKGNvdW50OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xyXG4gICAgbm90YXRpb246ICdjb21wYWN0JyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMVxyXG4gIH0pLmZvcm1hdChjb3VudClcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NUMwNlx1NjU3MFx1NUI1N1x1OEY2Q1x1NTMxNlx1NEUzQVx1NTM0M1x1NTIwNlx1NEY0RFx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFx1NjgzQ1x1NUYwRlxyXG4gKiBAcGFyYW0gbnVtIFx1NjU3MFx1NUI1N1xyXG4gKiBAcmV0dXJucyBcdTY4M0NcdTVGMEZcdTUzMTZcdTU0MEVcdTc2ODRcdTVCNTdcdTdCMjZcdTRFMzJcclxuICovXHJcbmV4cG9ydCBjb25zdCBudW1iZXJXaXRoQ29tbWFzID0gKG51bTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gbnVtLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycpXHJcbn1cclxuXHJcbi8qICNyZWdpb24gZm9ybWF0LWRhdGUgKi9cclxuLyoqXHJcbiAqIFx1NjVFNVx1NjcxRlx1NjgzQ1x1NUYwRlx1NTMxNlx1N0EwQlx1NUU4RlxyXG4gKiBAcGFyYW0gaGFzVGltZSBcdTY2MkZcdTU0MjZcdTUzMDVcdTU0MkJcdTY1RjZcdTk1RjRcclxuICogQHJldHVybnMgSW50bC5EYXRlVGltZUZvcm1hdCBcdTVCOUVcdTRGOEJcclxuICovXHJcbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlID0gKGhhc1RpbWUgPSBmYWxzZSk6IEludGwuRGF0ZVRpbWVGb3JtYXQgPT4ge1xyXG4gIGNvbnN0IG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xyXG4gICAgeWVhcjogJ251bWVyaWMnLFxyXG4gICAgbW9udGg6ICcyLWRpZ2l0JyxcclxuICAgIGRheTogJzItZGlnaXQnLFxyXG4gICAgLi4uKGhhc1RpbWUgJiYge1xyXG4gICAgICBob3VyOiAnMi1kaWdpdCcsXHJcbiAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxyXG4gICAgICBzZWNvbmQ6ICcyLWRpZ2l0JyxcclxuICAgICAgaG91cjEyOiBmYWxzZVxyXG4gICAgfSlcclxuICB9XHJcbiAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCd6aC1DTicsIG9wdGlvbnMpXHJcbn1cclxuLyogI2VuZHJlZ2lvbiBmb3JtYXQtZGF0ZSAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBcdTVDMDZcdTY1RTVcdTY3MUZcdTVCNTdcdTdCMjZcdTRFMzJcdThGNkNcdTYzNjJcdTRFM0FcdTRFMUNcdTUxNkJcdTUzM0FcdTY1RTVcdTY3MUZcdTVCNTdcdTdCMjZcdTRFMzJcclxuICogQHBhcmFtIGRhdGUgXHU2NUU1XHU2NzFGXHU1QjU3XHU3QjI2XHU0RTMyXHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGF0ZVRvVVRDOCA9IChkYXRlOiBzdHJpbmcpID0+IHtcclxuICBsZXQgdXRjRGF0ZSA9IGRhdGUucmVwbGFjZSgvXFwvL2csICctJylcclxuICB1dGNEYXRlID1cclxuICAgIHV0Y0RhdGUuaW5kZXhPZignKzA4MDAnKSA+PSAwIHx8IHV0Y0RhdGUuaW5kZXhPZignKzg6MDAnKSA+PSAwXHJcbiAgICAgID8gdXRjRGF0ZS5yZXBsYWNlKCcgKzA4MDAnLCAnKzg6MDAnKVxyXG4gICAgICA6IHV0Y0RhdGUgKyAnKzg6MDAnXHJcbiAgcmV0dXJuIHV0Y0RhdGVcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1OEJBMVx1N0I5N1x1NUI1N1x1N0IyNlx1NEUzMlx1OTU3Rlx1NUVBNiwgXHU2QzQ5XHU1QjU3XHU3Qjk3MS41XHU0RTJBXHU1QjU3XHU3QjI2XHJcbiAqIEBwYXJhbSBzdHIgXHU1QjU3XHU3QjI2XHU0RTMyXHJcbiAqIEByZXR1cm5zIFx1OTU3Rlx1NUVBNlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVN0ckxlbmd0aCA9IChzdHIpID0+IHtcclxuICBsZXQgbGVuZ3RoID0gMFxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpKVxyXG4gICAgLy8gXHU1MjI0XHU2NUFEXHU2NjJGXHU1NDI2XHU0RTNBXHU2QzQ5XHU1QjU3XHVGRjA4VW5pY29kZVx1ODMwM1x1NTZGNFx1RkYwOVxyXG4gICAgaWYgKGNoYXJDb2RlID49IDB4NGUwMCAmJiBjaGFyQ29kZSA8PSAweDlmZmYpIHtcclxuICAgICAgbGVuZ3RoICs9IDEuNVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gXHU5NzVFXHU2QzQ5XHU1QjU3XHU1QjU3XHU3QjI2XHVGRjBDXHU1MzA1XHU2MkVDXHU4MkYxXHU2NTg3XHU1QjU3XHU2QkNEXHUzMDAxXHU2NTcwXHU1QjU3XHUzMDAxXHU4MkYxXHU2NTg3XHU2ODA3XHU3MEI5XHU3QjQ5XHJcbiAgICAgIGxlbmd0aCArPSAxXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGVuZ3RoXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTYyMkFcdTUzRDZcdTVCNTdcdTdCMjZcdTRFMzIsIFx1NkM0OVx1NUI1N1x1N0I5NzEuNVx1NEUyQVx1NUI1N1x1N0IyNlxyXG4gKiBAcGFyYW0gc3RyXHJcbiAqIEBwYXJhbSBtYXhMZW5ndGhcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBjb25zdCB0cnVuY2F0ZVN0ciA9IChzdHIsIG1heExlbmd0aCkgPT4ge1xyXG4gIGxldCByZXN1bHQgPSAnJ1xyXG4gIGxldCBjdXJyZW50TGVuZ3RoID0gMFxyXG5cclxuICBmb3IgKGxldCBjaGFyIG9mIHN0cikge1xyXG4gICAgY29uc3QgY2hhckNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMClcclxuICAgIGNvbnN0IGNoYXJXZWlnaHQgPSBjaGFyQ29kZSA+PSAweDRlMDAgJiYgY2hhckNvZGUgPD0gMHg5ZmZmID8gMS41IDogMVxyXG5cclxuICAgIGlmIChjdXJyZW50TGVuZ3RoICsgY2hhcldlaWdodCA+IG1heExlbmd0aCkgYnJlYWtcclxuXHJcbiAgICByZXN1bHQgKz0gY2hhclxyXG4gICAgY3VycmVudExlbmd0aCArPSBjaGFyV2VpZ2h0XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2NTcwXHU3RUM0XHU0RTJEXHU5NjhGXHU2NzNBXHU1MTQzXHU3RDIwXHVGRjBDXHU2NTcwXHU3RUM0XHU0RTNBXHU3QTdBIFx1OEZENFx1NTZERWB1bmRlZmluZWRgLlxyXG4gKiBAcGFyYW0ge1RbXX0gYXJyIC0gXHU2NTcwXHU3RUM0XHJcbiAqIEByZXR1cm5zIHtUIHwgdW5kZWZpbmVkfSAtIFx1OEZENFx1NTZERVx1NTAzQ1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUVsZW1lbnQgPSAoYXJyKSA9PiB7XHJcbiAgcmV0dXJuIGFyci5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcdXRpbHNcXFxcZmlsZVRpbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3poYW5nanVuamllLWNuLmdpdGh1Yi5pby9kb2NzLy52aXRlcHJlc3MvdGhlbWUvdXRpbHMvZmlsZVRpbWUudHNcIjtpbXBvcnQgeyBzcGF3biwgc3Bhd25TeW5jIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIlxyXG5pbXBvcnQgeyBzdGF0U3luYyB9IGZyb20gXCJmc1wiXHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2RTkwXHU2NTg3XHU0RUY2XHU2NUY2XHU5NUY0XHJcbiAqIEBwYXJhbSBmaWxlUGF0aCBcclxuICogQHJldHVybnMgXHU2NUY2XHU5NUY0XHU1QkY5XHU4QzYxIHsgXHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHVGRjBDIFx1NEZFRVx1NjUzOVx1NjVGNlx1OTVGNCB9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0RmlsZU1ldGFUaW1lID0gKGZpbGVQYXRoKSA9PiB7XHJcbiAgY29uc3QgeyBiaXJ0aHRpbWVNcywgbXRpbWVNcyB9ID0gc3RhdFN5bmMoZmlsZVBhdGgpXHJcbiAgcmV0dXJuIHsgYmlydGh0aW1lTXMsIG10aW1lTXMgfVxyXG59XHJcblxyXG4vKipcclxuICogXHU4QkZCXHU1M0Q2Z2l0XHU2NUY2XHU5NUY0XHVGRjBDXHU1NDBDXHU2QjY1XHJcbiAqIEBwYXJhbSBjb21tYW5kIGdpdFx1NTQ3RFx1NEVFNFxyXG4gKiBAcGFyYW0gY3dkIFx1NjU4N1x1NEVGNlx1NzZFRVx1NUY1NVxyXG4gKiBAcmV0dXJucyBnaXRcdTY1RjZcdTk1RjRcdTVCNTdcdTdCMjZcdTRFMzJcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRHaXRUaW1lc3RhbXBTeW5jID0gKGNvbW1hbmQsIGN3ZCkgPT4ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYygnZ2l0JywgY29tbWFuZCwgeyBjd2QgfSlcclxuICByZXR1cm4gcmVzdWx0LnN0ZG91dC50b1N0cmluZygpLnRyaW0oKVxyXG59XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2NTg3XHU3QUUwXHU2NUY2XHU5NUY0XHVGRjBDXHU1RjAyXHU2QjY1XHJcbiAqIFx1NkNBMVx1NjcwOWdpdFx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1NzY4NFx1OEJERFx1ODNCN1x1NTNENlx1NkU5MFx1NjU4N1x1NEVGNlx1NTIxQlx1NUVGQVx1NTQ4Q1x1NEZFRVx1NjUzOVx1NjVGNlx1OTVGNFxyXG4gKiBAcGFyYW0gZmlsZVBhdGggXHJcbiAqIEByZXR1cm5zIFByb21pc2VcdTVCRjlcdThDNjEgcmVzb2x2ZVx1OEZENFx1NTZERVx1NjU3MFx1N0VDNCBbXHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHVGRjBDXHU2NzAwXHU1NDBFXHU0RTAwXHU2QjIxXHU0RkVFXHU2NTM5XHU2NUY2XHU5NUY0XVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEdpdFRpbWVzdGFtcCA9IChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlPFtudW1iZXIsIG51bWJlcl0+KChyZXNvbHZlKSA9PiB7XHJcbiAgICBsZXQgb3V0cHV0OiBudW1iZXJbXSA9IFtdXHJcblxyXG4gICAgLy8gXHU1RjAwXHU1NDJGXHU1QjUwXHU4RkRCXHU3QTBCXHU2MjY3XHU4ODRDZ2l0IGxvZ1x1NTQ3RFx1NEVFNFxyXG4gICAgY29uc3QgY2hpbGQgPSBzcGF3bignZ2l0JywgWyctLW5vLXBhZ2VyJywgJ2xvZycsICctLWZvbGxvdycsICctLXByZXR0eT1cIiVjaVwiJywgZmlsZVBhdGhdKVxyXG5cclxuICAgIC8vIFx1NzZEMVx1NTQyQ1x1OEY5M1x1NTFGQVx1NkQ0MVxyXG4gICAgY2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGQpID0+IHtcclxuICAgICAgY29uc3QgZGF0YSA9IFN0cmluZyhkKVxyXG4gICAgICAgIC5zcGxpdCgnXFxuJylcclxuICAgICAgICAubWFwKChpdGVtKSA9PiArbmV3IERhdGUoaXRlbSkpXHJcbiAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSlcclxuICAgICAgb3V0cHV0LnB1c2goLi4uZGF0YSlcclxuICAgIH0pXHJcblxyXG4gICAgLy8gXHU4RjkzXHU1MUZBXHU2M0E1XHU1M0Q3XHU1NDBFXHU4RkQ0XHU1NkRFXHJcbiAgICBjaGlsZC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgIGlmIChvdXRwdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gXHU4RkQ0XHU1NkRFW1x1NTNEMVx1NUUwM1x1NjVGNlx1OTVGNFx1RkYwQ1x1NjcwMFx1OEZEMVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNF1cclxuICAgICAgICByZXNvbHZlKFsrbmV3IERhdGUob3V0cHV0W291dHB1dC5sZW5ndGggLSAxXSksICtuZXcgRGF0ZShvdXRwdXRbMF0pXSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBcdTZDQTFcdTY3MDlnaXRcdTYzRDBcdTRFQTRcdThCQjBcdTVGNTVcdTY1RjZcdTRGN0ZcdTc1MjhcdTZFOTBcdTY1ODdcdTRFRjZcdTY1RjZcdTk1RjRcclxuICAgICAgICBjb25zdCB7IGJpcnRodGltZU1zLCBtdGltZU1zIH0gPSBnZXRGaWxlTWV0YVRpbWUoZmlsZVBhdGgpXHJcbiAgICAgICAgcmVzb2x2ZShbYmlydGh0aW1lTXMsIG10aW1lTXNdKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIFx1OEZEQlx1N0EwQlx1OTUxOVx1OEJFRlxyXG4gICAgY2hpbGQub24oJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICAvLyBcdTgzQjdcdTUzRDZcdTU5MzFcdThEMjVcdTY1RjZcdTRGN0ZcdTc1MjhcdTZFOTBcdTY1ODdcdTRFRjZcdTY1RjZcdTk1RjRcclxuICAgICAgY29uc3QgeyBiaXJ0aHRpbWVNcywgbXRpbWVNcyB9ID0gZ2V0RmlsZU1ldGFUaW1lKGZpbGVQYXRoKVxyXG4gICAgICByZXNvbHZlKFtiaXJ0aHRpbWVNcywgbXRpbWVNc10pXHJcbiAgICB9KVxyXG4gIH0pXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcY29tcG9zYWJsZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpoYW5nanVuamllLWNuLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdGhlbWVcXFxcY29tcG9zYWJsZXNcXFxcYWRkVGltZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovemhhbmdqdW5qaWUtY24uZ2l0aHViLmlvL2RvY3MvLnZpdGVwcmVzcy90aGVtZS9jb21wb3NhYmxlcy9hZGRUaW1lLnRzXCI7aW1wb3J0IHsgZm9ybWF0RGF0ZSwgZGF0ZVRvVVRDOCB9IGZyb20gJy4uL3V0aWxzL3Rvb2xzJ1xyXG5pbXBvcnQgeyBnZXRGaWxlTWV0YVRpbWUsIGdldEdpdFRpbWVzdGFtcFN5bmMgfSBmcm9tICcuLi91dGlscy9maWxlVGltZSdcclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZcdTY1ODdcdTRFRjZnaXRcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdUZGMENcdTg5ODFcdTZDNDJcdTY4M0NcdTVGMEYgeXl5eS1tbS1kZCBoaDptbTpzcys4OjAwXHJcbiAqIEBwYXJhbSBmaWxlUGF0aCBcclxuICogQHBhcmFtIGN3ZCBcclxuICogQHJldHVybnMgXHU2NUY2XHU5NUY0XHU1QkY5XHU4QzYxXHJcbiAqL1xyXG5jb25zdCBnZXRGaWxlVGltZXMgPSAoZmlsZVBhdGgsIGN3ZCkgPT4ge1xyXG4gIGxldCBmaXJzdENvbW1pdCA9IGRhdGVUb1VUQzgoZ2V0R2l0VGltZXN0YW1wU3luYyhbJ2xvZycsICctLXJldmVyc2UnLCAnLS1kaWZmLWZpbHRlcj1BJywgJy0tcHJldHR5PVwiJWFpXCInLCBmaWxlUGF0aF0sIGN3ZCkpXHJcbiAgbGV0IGxhc3RVcGRhdGVkID0gZGF0ZVRvVVRDOChnZXRHaXRUaW1lc3RhbXBTeW5jKFsnbG9nJywgJy0xJywgJy0tcHJldHR5PVwiJWFpXCInLCBmaWxlUGF0aF0sIGN3ZCkpXHJcblxyXG4gIC8vIFx1NkNBMVx1NjcwOWdpdFx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1NzY4NFx1OEJERFx1ODNCN1x1NTNENlx1NkU5MFx1NjU4N1x1NEVGNlx1NTIxQlx1NUVGQVx1NTQ4Q1x1NEZFRVx1NjUzOVx1NjVGNlx1OTVGNFxyXG4gIGlmICghZmlyc3RDb21taXQgJiYgIWxhc3RVcGRhdGVkKSB7XHJcbiAgICBjb25zdCB7IGJpcnRodGltZU1zLCBtdGltZU1zIH0gPSBnZXRGaWxlTWV0YVRpbWUoZmlsZVBhdGgpXHJcbiAgICBjb25zdCBkYXRlT3B0aW9uID0gZm9ybWF0RGF0ZSh0cnVlKTtcclxuXHJcbiAgICBmaXJzdENvbW1pdCA9IGRhdGVUb1VUQzgoZGF0ZU9wdGlvbi5mb3JtYXQoYmlydGh0aW1lTXMpKVxyXG4gICAgbGFzdFVwZGF0ZWQgPSBkYXRlVG9VVEM4KGRhdGVPcHRpb24uZm9ybWF0KG10aW1lTXMpKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZpcnN0Q29tbWl0LFxyXG4gICAgbGFzdFVwZGF0ZWRcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGFkZFRpbWUgPSAoY29kZSwgZmlsZVBhdGgpID0+IHtcclxuICBpZiAoIWNvZGUubWF0Y2goLy0tLVxcbihbXFxzXFxTXSo/KVxcbi0tLS8pKSByZXR1cm4gY29kZVxyXG5cclxuICBjb25zdCBmcm9udG1hdHRlciA9IGNvZGUubWF0Y2goLy0tLVxcbihbXFxzXFxTXSo/KVxcbi0tLS8pWzFdXHJcbiAgY29uc3QgaGFzRmlyc3RDb21taXQgPSBmcm9udG1hdHRlci5pbmRleE9mKCdmaXJzdENvbW1pdDonKSA+PSAwXHJcbiAgY29uc3QgaGFzTGFzdFVwZGF0ZWQgPSBmcm9udG1hdHRlci5pbmRleE9mKCdsYXN0VXBkYXRlZDonKSA+PSAwXHJcblxyXG4gIGlmKGhhc0ZpcnN0Q29tbWl0ICYmIGhhc0xhc3RVcGRhdGVkKSByZXR1cm4gY29kZVxyXG5cclxuICBjb25zdCB7IGZpcnN0Q29tbWl0LCBsYXN0VXBkYXRlZCB9ID0gZ2V0RmlsZVRpbWVzKGZpbGVQYXRoLCBwcm9jZXNzLmN3ZCgpKVxyXG5cclxuICBsZXQgYWRkVGltZSA9IGAtLS1cXG5gXHJcbiAgaWYgKCFoYXNGaXJzdENvbW1pdCkge1xyXG4gICAgYWRkVGltZSArPSBgZmlyc3RDb21taXQ6ICR7Zmlyc3RDb21taXR9XFxuYFxyXG4gIH1cclxuICBpZiAoIWhhc0xhc3RVcGRhdGVkKSB7XHJcbiAgICBhZGRUaW1lICs9IGBsYXN0VXBkYXRlZDogJHtsYXN0VXBkYXRlZH1cXG5gXHJcbiAgfVxyXG4gIC8vIFx1ODNCN1x1NTNENlx1NTIzMFx1NjVGNlx1OTVGNFx1NTQwRVx1NjNEMlx1NTE2NVx1NjU4N1x1N0FFMCBmcm9udG1hdHRlciBcdTUxODVcclxuICByZXR1cm4gY29kZS5yZXBsYWNlKCctLS1cXG4nLCBhZGRUaW1lKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhZGRUaW1lXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxvQkFBcUM7OztBQ0FaLE9BQXVEO0FBR3JZLFNBQVMsZUFBZSxTQUEyQjtBQUN4RCxRQUFNLEVBQUUsYUFBYSxPQUFPLGFBQWEsSUFBSSxRQUFRO0FBRXJELFFBQU0sUUFBb0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxVQUFVLFNBQVMsUUFBUSxhQUFhLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxRQUFRLENBQUM7QUFDaEgsUUFBTSxVQUFzQixDQUFDLFFBQVEsRUFBRSxVQUFVLFlBQVksU0FBUyxNQUFNLENBQUM7QUFDN0UsUUFBTSxnQkFBNEIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxrQkFBa0IsU0FBUyxlQUFlLFFBQVEsWUFBWSxDQUFDO0FBQ3RILFFBQU0sVUFBc0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxZQUFZLFNBQVMsZUFBZSxDQUFDO0FBQ3RGLFFBQU0sY0FBMEIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsU0FBUyxVQUFVLENBQUM7QUFDckYsUUFBTSxlQUEyQixDQUFDLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixTQUFTLGVB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
