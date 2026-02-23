import { defineConfig, type SiteConfig } from "vitepress";
import { themeConfig } from "./theme/config/theme-config";
import { createSidebar } from "./utils/createSidebar";
import { handleHeadMeta } from "./utils/handleHeadMeta";
import { fileURLToPath, URL } from "node:url";
import addTime from "./theme/composables/addTime";
// 自动import 常用的API，像是vue 的ref、computed、onMounted，第三方的axios、vueUse的API 等等。
import AutoImport from "unplugin-auto-import/vite";
// 自动import component
import Components from "unplugin-vue-components/vite";
import { ArcoResolver, ElementPlusResolver, TDesignResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "node:path";
import dynamicImport from "vite-plugin-dynamic-import"; // 运行时导入
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
// carbon图标集
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

import viteCompression from "vite-plugin-compression";  //gzip和brotli 压缩
import { withPwa } from "@vite-pwa/vitepress";
// import { TDesignResolver } from 'unplugin-vue-components/resolvers';
// 自动导入TDesign
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from "unocss/vite";
// 导入 自动侧边栏组件 依赖
import { generateSidebar } from "vitepress-sidebar";
import { vitepressPluginLegend } from "vitepress-plugin-legend";
import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img';
import { 
  ThumbnailHashImages, 
} from '@nolebase/vitepress-plugin-thumbnail-hash/vite';
const vitepressSidebarOptions = {
  /*
         * For detailed instructions, see the links below:
         * https://vitepress-sidebar.jooy2.com/guide/api
         */
  documentRootPath: '/docs',
  // scanStartPath: null,
  resolvePath: null,
  // useTitleFromFileHeading: true,	//使用文件标题作为菜单项
  useTitleFromFrontmatter: true,	//使用frontmatter中的标题
  frontmatterTitleFieldName: 'title',
  // useFolderTitleFromIndexFile: false,
  // useFolderLinkFromIndexFile: false,
  // hyphenToSpace: true,
  // underscoreToSpace: true,
  // capitalizeFirst: false,
  // capitalizeEachWords: false,
  collapsed: false,
  collapseDepth: 3,
  // sortMenusByName: false,
  // sortMenusByFrontmatterOrder: false,	// 按frontmatter顺序排序
  // sortMenusByFrontmatterDate: false,		//按frontmatter日期排序
  // sortMenusOrderByDescending: false,		//降序排序
  // sortMenusOrderNumericallyFromTitle: false,
  // sortMenusOrderNumericallyFromLink: false,
  // frontmatterOrderDefaultValue: 0,
  // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'], //手动排序，文件夹不用带后缀
  // removePrefixAfterOrdering: false,
  // prefixSeparator: '.',
	// excludeFiles: [ 'features/*.md','tags.md'],
	excludePattern: ['features/**','pages/**'],
	excludeFilesByFrontmatterFieldName: 'exclude',
	// excludeFolders: ['features'],
  // includeDotFiles: false,
  // includeRootIndexFile: false,
  // includeFolderIndexFile: false,
  // includeEmptyFolder: false,
  // rootGroupText: 'Contents',
  // rootGroupLink: 'https://github.com/jooy2',
  // rootGroupCollapsed: false,
  // convertSameNameSubFileToGroupIndexPage: false,
  // folderLinkNotIncludesFileName: false,
  // keepMarkdownSyntaxFromTitle: false,
  // debugPrint: false,
}

const getSideBar = (): any => {
  const generatedSidebar = generateSidebar([
    {
		documentRootPath: "docs",        // 文档根目录
		scanStartPath: "博客",          // 扫描起始路径
		resolvePath: "/博客/",          // 路由解析路径
		useTitleFromFileHeading: true,   // 使用文件标题作为侧边栏显示文本
		hyphenToSpace: true,            // 连字符转空格
		keepMarkdownSyntaxFromTitle: true, // 保留标题中的 Markdown 语法
		manualSortFileNameByPriority: [  // 手动排序文件优先级
			"installation.md", 
			"authentication.md", 
			"final.md",
			'Advanced'
		],
		// collapsed: false,                   // 侧边栏是否默认折叠
      	collapseDepth: 2                    // 折叠深度
	},
    {
		documentRootPath: "docs",
		scanStartPath: "笔记",
		resolvePath: "/笔记/",
		useTitleFromFileHeading: true,
		hyphenToSpace: true,
		keepMarkdownSyntaxFromTitle: true,
    },
  ]);
  return generatedSidebar ?? {};
};

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  outDir: resolve(__dirname, "../../dist"), // dist生成目录
  title: "张俊杰的博客",
  titleTemplate: ":title-张俊杰的博客",
  description: "坚持深耕技术领域的T型前端程序员, 喜欢Vuejs、Nestjs, 还会点python、nlp、web3、后端",
  lang: "zh-CH", // 语言
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true, // 忽略死链查询
  sitemap: {
    hostname: "https://www.baidu.com",
  },
  rewrites: {
    "post/(.*)": "(.*)", // 将所有以 /post/ 开头的 URL 重写为去掉 /post/ 前缀的 URL。
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    codeCopyButtonTitle: "复制代码",
    codeTransformers: [
      // 使用 `!!code` 和 `<!---@include` 防止转换，演示代码用
      {
        postprocess(code) {
          let _code = code.replace(/\[\!\!code/g, "[!code");
          // 直接替换被浏览器阻止，避免标签注入
          _code = _code.replace(/!---@include/g, "!--@include");
          return _code;
        },
      },
      transformerTwoslash(),
    ],
    // 对markdown中的内容进行替换或者批量处理
    config: (md) => {
      // 集成 vitepress-plugin-legend
      vitepressPluginLegend(md, {
        markmap: { showToolbar: true }, // 启用脑图工具栏
        mermaid: true, // 启用 Mermaid 支持
      });

      // 创建 markdown-it 插件
      md.use((md) => {
        // 组件插入h1标题下
        md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === "h1")
            htmlResult += `\n<ClientOnly><WDocTitleMeta v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showWDocTitleMeta ?? true)" :article="$frontmatter" /></ClientOnly>`;
          return htmlResult;
        };
        const defaultRender = md.render;
        // 2.0.0-alpha.2 允许并接受异步函数 升级到此版本之后或可以使用 docs/.vitepress/utils/fileTime.ts
        md.render = function (...args) {
          // 对原生内容做处理，增加创建时间和更新时间
          args[0] = addTime(args[0], args[1].realPath);
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args);
          // 替换内容
          // defaultContent = defaultContent
          //       .replace(/<\!---@include:/g, '<!--@include:')
          // 返回渲染的内容
          return defaultContent;
        };
        
      },

      //动态模糊图片
      md.use(UnlazyImages(), { 
        imgElementTag: 'NolebaseUnlazyImg', 
      }) 
    
    );
    },
  },

  //waves 主题配置
  extends: {
    themeConfig,
  },
  head: [
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-MB7XVBG1TQ" }],
    ['script',{defer: '',async: '',src: 'https://cn.vercount.one/js'}],//Vercount静态网站添加访问量统计
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
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }], // 添加苹果图标
    ["link", { rel: "preload", href: "/template.webm", as: "video", type: "video/webm" }],
    ['meta', { property: 'og:image', content: '/og-image.png' }], // 社交媒体图片
    ["meta", { name: "referrer", content: "no-referrer" }],
      
  ],
  // https://vitepress.dev/reference/site-config#transformhead
  async transformHead(context) {
    return handleHeadMeta(context);
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],
    outlineTitle: "大纲",
    lastUpdatedText: "最近更新时间",
    //   头部导航
    nav: [
      { text: "首页", link: "/" },
      { text: "旅行", link: "/pages/waves", activeMatch: "/pages/waves" },
      { text: "博客", link: "/博客/", activeMatch: "/博客/" },
      { text: "笔记", link: "/笔记/", activeMatch: "/笔记/" },
      { text: "标签", link: "/pages/tags", activeMatch: "/pages/tags" },
      { text: "归档", link: "/pages/posts", activeMatch: "/pages/posts" },
      // {
      //   text: "线上",
      //   activeMatch: "/线上/",
      //   items: [
      //     {
      //       text: "自建项目",
      //       items: [
      //         { text: "笑友小程序", link: "https://oss.justin3go.com/blogs/xiaoyou-mp-code.png" },
      //         { text: "阿里云盘搜索", link: "https://ssgo.app" },
      //         { text: "Use Sora", link: "https://usesora.app" },
      //         { text: "Excel2JSON", link: "https://bug404.dev" },
      //       ],
      //     },
      //     {
      //       text: "开源部署",
      //       items: [
      //         { text: "ChatGPT-Web", link: "https://chat.justin3go.com/" },
      //         { text: "LobeChat", link: "https://chatc.app" },
      //       ],
      //     },
      //   ],
      // },
    ],
    // @ts-ignore
    // sidebar: createSidebar(),
    sidebar: getSideBar(),
    logo: "/logo.png",
    siteTitle: false,

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS订阅</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>',
        },
        link: "/feed.xml",
      },
    ],

    footer: {
      message:
        '<a href="https://github.com/Justin3go/justin3go.github.io" target="_blank">网站已开源，每周末如有更新release一次，欢迎star</a>',
      copyright:
        '<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">Copyright© 2021-present 渝ICP备2021006879号</a>',
    },
    search: {
      provider: "local",
    },
    editLink: {
      pattern: "https://github.com/Justin3go/justin3go.github.io/edit/master/docs/:path",
      text: "在GitHub上编辑此页",
    },
    returnToTopLabel: "👆Code is building the world.",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "深色模式",
    docFooter: {
      prev: false,
      next: false,
    },
    // 自定义扩展: 页脚配置
    footerConfig: {
      showFooter: true, // 是否显示页脚
      showRainbow: true, // 是否显示彩虹
      icpRecordCode: "津ICP备2022005864号-2", // ICP备案号
      publicSecurityRecordCode: "津公网安备12011202000677号", // 联网备案号
      copyright: `Copyright © 2019-${new Date().getFullYear()} Charles7c`, // 版权信息
    },
  },

  pwa: {
    // 根目录
    outDir: resolve(__dirname, "../../dist"),
    // mode: 'development',
    mode: 'production',
    strategies: 'generateSW', // 明确使用 generateSW 策略
    // selfDestroying: false, // 确保 Service Worker 不会自动注销
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
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],// 预缓存重要资源
      globPatterns: ["**/*.{css,js,html,svg,png,ico,webm,moc3,mp4,txt}"],
      // exclude: [/sw.js$/, /workbox-.*\.js$/],        // 不要缓存 sw.js 本身
      cleanupOutdatedCaches:true,
      skipWaiting: false,  // 新 SW 立即接管
      clientsClaim: true, // 控制所有页面
      
    },
    devOptions:{
      enabled:true,// 开发环境是否启用
      type:'module'
    }
  },

  vite: {
    optimizeDeps: {
      include: ["element-plus"],
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui",
        "@vueuse/core",
      ],
    },
    plugins: [
      ThumbnailHashImages(),  //动态模糊图
      AutoImport({
        resolvers: [
          TDesignResolver({
            library: "vue-next",
          }),
          ElementPlusResolver({}),
        ],
      }),
      Components({
        dts: "components.d.ts", // 生成到 VitePress 目录
        // 自动加载 components 下的vue文件为组件，省去import 导入。
        dirs: [".vitepress/theme/components"],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.md\?vue/], // 添加这个以确保处理 Markdown 文件
        resolvers: [
          // 导入图标组件
          IconsResolver({
            componentPrefix: "",
            enabledCollections: ["carbon"],
            // 添加以下配置确保生产环境也能识别
            alias: {
              cb: "carbon",
            },
          }),
          TDesignResolver({
            library: "vue-next",
          }),
          ElementPlusResolver({}),
          // 自动导入图标组件
          ArcoResolver({
            sideEffect: true,
            resolveIcons: true,
          }),
        ],
      }),
      dynamicImport(), // 运行时导入
      Icons({
        autoInstall: true, // 自动安装图标集
        defaultStyle: "display: inline-block;",
      }),
      //gzip和brotli 压缩
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

      UnoCSS(),
    ],

    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        'element-plus', 
        '@arco-design/web-vue', 
        'vitepress',
        '@nolebase/ui'
      ],
    },
    resolve: {
      alias: {
        // @ 指向 .vitepress 目录
        "@": fileURLToPath(new URL("./.vitepress", import.meta.url)),
        // 如果需要访问 docs 根目录，可以添加另一个别名
        "~": fileURLToPath(new URL("./", import.meta.url)),
      },
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
          api: "modern",
        },
      },
    },
    
  },
  vue: {
    template: {
      transformAssetUrls: {
        // 其他各种配置...
        NolebaseUnlazyImg: ['src'], 
      },
    },
  },
  // locales: {
  //   root: {
  //     label: "简体中文",
  //   },
  //   en: {
  //     label: "English",
  //     link: "https://en.justin3go.com",
  //   },
  // },
}));