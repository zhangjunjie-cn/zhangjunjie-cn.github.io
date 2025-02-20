import { h, watch, onMounted, nextTick, defineComponent, inject } from "vue";
import { useData, EnhanceAppContext, Theme, inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { NConfigProvider } from 'naive-ui';
import { setup } from '@css-render/vue3-ssr';
import { useRoute } from 'vitepress';
import { defineAsyncComponent } from 'vue';  // 引入 defineAsyncComponent

// 异步加载组件
const Timeline = defineAsyncComponent(() => import('./components/Timeline.vue'));
const MNavLinks = defineAsyncComponent(() => import("./components/MNavLinks.vue"));
const ArticleMetadata1 = defineAsyncComponent(() => import("./components/ArticleMetadata1.vue"));
const Archive = defineAsyncComponent(() => import("./components/Archive.vue"));
const MLayout = defineAsyncComponent(() => import('./components/MLayout.vue'));
const x = defineAsyncComponent(() => import("./composables/echarts"));
import "vitepress-markdown-timeline/dist/theme/index.css";

// 导入主题色
import '@theojs/lumen/theme';

// 引入样式和插件
import "./styles/index.scss";
import { NolebaseEnhancedReadabilitiesPlugin } from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";
import codeblocksFold from 'vitepress-plugin-codeblocks-fold'; 
import 'vitepress-plugin-codeblocks-fold/style/index.css';
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css';
import { DocBox, DocLinks, DocBoxCube, HomeUnderline } from '@theojs/lumen';
import { initFirstScreen, destructionObserver, animateFn } from '../utils/animatePlusgin';

// 进度条组件
import { NProgress } from 'nprogress-v2/dist/index.js'; 
import 'nprogress-v2/dist/index.css';

// 主题配置
export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();

    // 动画初始化
    onMounted(() => {
      initFirstScreen();
      animateFn();
    });

    // 监听路由变化，优化动画执行
    watch(
      () => route.path,
      () => nextTick(() => {
        destructionObserver();
        initFirstScreen();
        animateFn();
      })
    );
  },

  Layout: () => {
    const props: Record<string, any> = {};
    const { frontmatter } = useData();
    const route = useRoute();

    // 代码区域折叠
    codeblocksFold({ route, frontmatter }, true, 400);

    const CssRenderStyle = defineComponent({
      setup() {
        const collect = inject('css-render-collect');
        return { style: collect() };
      },
      render() {
        return h('css-render-style', { innerHTML: this.style });
      }
    });

    const VitepressPath = defineComponent({
      setup() {
        const route = useRoute();
        return () => h('vitepress-path', null, [route.path]);
      }
    });

    const NaiveUIProvider = defineComponent({
      render() {
        return h(NConfigProvider, { abstract: true, inlineThemeDisabled: true }, {
          default: () => [
            h(MLayout, null, { default: this.$slots.default?.() }),
            import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
          ]
        });
      }
    });

    // 添加自定义类
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    return h(MLayout, props);
  },

  async enhanceApp({ app, router }: EnhanceAppContext) {
    // 插件
    app.use(NolebaseInlineLinkPreviewPlugin);
    app.use(NolebaseEnhancedReadabilitiesPlugin);
    app.use(NolebaseGitChangelogPlugin);

    // 注册异步组件
    app.component('MNavLinks', MNavLinks);
    app.component('ArticleMetadata1', ArticleMetadata1);
    app.component('Box', DocBox);
    app.component('Links', DocLinks);
    app.component('BoxCube', DocBoxCube);
    app.component('Home', HomeUnderline);
    app.component('Test', x);  // ECharts 示例组件
    app.component('Timeline', Timeline);

    // 提供环境变量
    app.provide("DEV", process.env.NODE_ENV === "development");

    // 路由变化监听，优化主页样式
    if (typeof window !== "undefined") {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === "/"),
        { immediate: true }
      );
    }

    // SSR 设置
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide('css-render-collect', collect);
    }

    // 客户端处理进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => NProgress.start();
      router.onAfterRouteChanged = () => NProgress.done();
    }
  }
};

// 更新首页样式
let homePageStyle: HTMLStyleElement | undefined;
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
      :root {
        animation: rainbow 12s linear infinite;
      }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}

// 浏览器样式检测
if (typeof window !== "undefined") {
  const browser = navigator.userAgent.toLowerCase();
  if (browser.includes("chrome")) {
    document.documentElement.classList.add("browser-chrome");
  } else if (browser.includes("firefox")) {
    document.documentElement.classList.add("browser-firefox");
  } else if (browser.includes("safari")) {
    document.documentElement.classList.add("browser-safari");
  }
}
