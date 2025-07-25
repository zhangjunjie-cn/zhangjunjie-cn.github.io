import { h, onUnmounted,watch, onMounted, nextTick, defineComponent, inject } from "vue";
import { useData, EnhanceAppContext, inBrowser, useRoute } from "vitepress";
import DefaultTheme from 'vitepress/theme-without-fonts';
import "vitepress-markdown-timeline/dist/theme/index.css";


import "./styles/font.css";
import './styles/index.scss';
import './styles/fancybox.css';

//naive-ui
import { setup } from '@css-render/vue3-ssr';
import { NConfigProvider } from 'naive-ui';
import MyLayout from './MyLayout.vue';

import '@shikijs/vitepress-twoslash/style.css';
import MNavLinks from './components/MNavLinks.vue';
import FeaturesOverview from './components/FeaturesOverview.vue';
import FeatureTag from './components/FeatureTag.vue';

import Markmap from './components/Markmap.vue'

import Theme from 'vitepress/theme';
import { DocBox, DocBoxCube, DocLinks, DocPill } from '@theojs/lumen';
// import 'tdesign-vue-next/es/style/index.css';
import TwoSlash from '@shikijs/vitepress-twoslash/client';
import 'uno.css';
import { NProgress } from 'nprogress-v2/dist/index.js'; // 进度条组件
import 'nprogress-v2/dist/index.css'; // 进度条样式
import { bindFancybox, destroyFancybox } from './composables/ImgViewer'; // 图片查看器
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';
import { 
  InjectionKey as NolebaseEnhancedReadabilitiesInjectionKey,
  LayoutMode as NolebaseEnhancedReadabilitiesLayoutMode,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css';
import { initFirstScreen, destructionObserver, animateFn } from '../theme/composables/animatePlusgin';
import '@theojs/lumen/theme';
import {
  NolebasePagePropertiesPlugin,
} from '@nolebase/vitepress-plugin-page-properties/client'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'
import '@nolebase/vitepress-plugin-thumbnail-hash/client/style.css'
import {
  NolebaseUnlazyImg,
} from '@nolebase/vitepress-plugin-thumbnail-hash/client'
import('@nolebase/vitepress-plugin-inline-link-preview/client')
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import {
  NolebaseInlineLinkPreviewPlugin,
} from '@nolebase/vitepress-plugin-inline-link-preview/client'

import { LiteTree } from "@lite-tree/vue";

// 代码折叠
import codeblocksFold from 'vitepress-plugin-codeblocks-fold'; // import method
import 'vitepress-plugin-codeblocks-fold/style/index.css'; // import style

export default Object.assign({}, Theme, {
  
  // 滚动进入动画
  setup() {

    // 获取前言和路由
    const { frontmatter } = useData();
    const route = useRoute();
    // 基础使用
    codeblocksFold({ route, frontmatter }, true, 400);

    onMounted(async () => {
      if (inBrowser) {
        initFirstScreen();
        animateFn();
        bindFancybox(); // 绑定图片查看器
      }
    });

    onUnmounted(() => {
      destroyFancybox();
    })

    watch(
      () => route.path,
      () =>
        nextTick(() => {
          if (inBrowser) {
            destructionObserver(); // 每次路由切换时销毁上一次的动画
            initFirstScreen(); // 初始化
            animateFn(); // 执行动画
            bindFancybox(); // 每次路由切换时重新绑定Fancybox
          }
        })
    );
  },

  Layout: () => {
    
    //naive-ui
    const { Layout } = DefaultTheme;
    const CssRenderStyle = defineComponent({
      setup() {

        const collect = inject('css-render-collect');
        return {
          style: collect()
        };
      },
      render() {
        return h('css-render-style', {
          innerHTML: this.style
        });
      }
    });

    const VitepressPath = defineComponent({
      setup() {
        const route = useRoute();
        return () => {
          return h('vitepress-path', null, [route.path]);
        };
      }
    });

    const NaiveUIProvider = defineComponent({
      render() {
        return h(
          NConfigProvider,
          { abstract: true, inlineThemeDisabled: true },
          {
            default: () => [
              h(Layout, null, { default: this.$slots.default?.() }),
              import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
            ]
          }
        );
      }
    });

    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();
    const route = useRoute();
    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    return h(MyLayout, props);
  },

  async enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('MNavLinks', MNavLinks);
    app.use(TwoSlash as any);
    app.component('Links', DocLinks);
    app.use(NolebaseGitChangelogPlugin);
    app.component('FeaturesOverview', FeaturesOverview);
    app.component('FeatureTag', FeatureTag);
    app.component('Markmap', Markmap);
    app.component('LiteTree',LiteTree);
    app.config.globalProperties.isLoadLive2d = false;//全局设置一个属性是否加载live2d，避免重复加载
    app.component('NolebaseUnlazyImg', NolebaseUnlazyImg);
    app.use(NolebaseInlineLinkPreviewPlugin)
    app.use(NolebasePagePropertiesPlugin<{
      tags: string[]
      progress: number
    }>(), {
      properties: {
        'zh-CN': [
          {
            key: 'tags',
            type: 'tags',
            title: '标签',
          },
          {
            key: 'progress',
            type: 'progress',
            title: '完成进度',
          },
          {
            key: 'wordCount',
            type: 'dynamic',
            title: '字数',
            options: {
              type: 'wordsCount',
            },
          },
          {
            key: 'readingTime',
            type: 'dynamic',
            title: '阅读时间',
            options: {
              type: 'readingTime',
              dateFnsLocaleName: 'zhCN',
            },
          },
        ],
      },
    });

    app.provide(NolebaseEnhancedReadabilitiesInjectionKey, {
      layoutSwitch: {
        defaultMode: NolebaseEnhancedReadabilitiesLayoutMode.SidebarWidthAdjustableOnly,
      },
      spotlight: {
        defaultToggle: true,
        hoverBlockColor: 'rgb(240 197 52 / 7%)',
      },
    })

    // if (!import.meta.env.SSR) {
    //   await import("vitepress-vue3-components/dist/style.css");
    //   const plugin = await import("vitepress-vue3-components");
    //   app.use(plugin.default);
    // }


    //naive-ui
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide('css-render-collect', collect);
    }

    if (inBrowser) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      router.onAfterRouteChanged = () => {
        NProgress.done(); // 结束进度条
      };
    }

    //live2D
    if (!import.meta.env.SSR) {
      // 使用 setTimeout 延迟加载
      setTimeout(async () => {
        const { loadOml2d } = await import('oh-my-live2d');
        loadOml2d({
          models: [
            {
              path: 'https://zhangjunjie.pages.dev/符玄/符玄.model3.json',
              position: [-20, 60],
              mobilePosition: [80, 80],
              scale: 0.047,
              mobileScale: 0.06,
              stageStyle: {
                height: 450,
              },
              mobileStageStyle: {
                height: 370,
                width: 400,
              },
            }
          ]
        });
      }, 3000); // 延迟3秒加载
    }
  }

  
});

// onMounted(() => {
//   ////防止 PWA（渐进式网页应用）的缓存机制导致页面更新后无法加载最新内容。
//   if (inBrowser) {
//     // 注销 PWA 服务
//     if (window.navigator && navigator.serviceWorker) {
//       navigator.serviceWorker.getRegistrations().then(function (registrations) {
//         for (let registration of registrations) {
//           registration.unregister();
//         }
//       });
//     }

//     //确保用户在访问页面时加载的是最新的资源，而不是旧版本的缓存。
//     if ('caches' in window) {
//       caches.keys().then(function (keyList) {
//         return Promise.all(
//           keyList.map(function (key) {
//             return caches.delete(key);
//           }),
//         );
//       });
//     }

//     // 检测浏览器类型
//     const browser = navigator.userAgent.toLowerCase();
//     if (browser.includes('chrome')) {
//       document.documentElement.classList.add('browser-chrome');
//     } else if (browser.includes('firefox')) {
//       document.documentElement.classList.add('browser-firefox');
//     } else if (browser.includes('safari')) {
//       document.documentElement.classList.add('browser-safari');
//     }
//   }
// });