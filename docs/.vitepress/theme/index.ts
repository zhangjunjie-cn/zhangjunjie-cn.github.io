// https://vitepress.dev/guide/custom-theme
import type { EnhanceAppContext } from 'vitepress'
import { useData,useRouter,inBrowser } from "vitepress";
import type { Theme } from 'vitepress'
import { h,onMounted, onUnmounted } from "vue";
import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/index.css'

import "./style/index.scss";
import MyLayout from './MyLayout.vue' // 导入布局组件
import { bindFancybox } from "./composables/ImgViewer";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条
import "nprogress-v2/dist/index.css";

// 暗黑样式
import '@shikijs/vitepress-twoslash/style.css'

import 'uno.css'

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Whome from './components/Whome.vue';
import WPosts from './components/WPosts.vue';
import WTag from './components/WTag.vue';
import KanbanExample from './components/KanbanExample.vue';
import { plugin } from './composables/slicksort_index';

export default {
  // extends: DefaultTheme,  
  // Layout: MyLayout, // 应用布局组件
  // enhanceApp({ app, router }: EnhanceAppContext) {
  //   app.use(TwoslashFloatingVue as any)


  extends: DefaultTheme,  
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 为 自定义界面 添加 自定义class */
    props.class = frontmatter.value?.layout || "";

    return h(MyLayout, props);
  },

  enhanceApp({ app, router }: EnhanceAppContext) {
    app.use(ElementPlus);
    app.component('Whome',Whome);
    app.component('WPosts',WPosts);
    app.component('WTag',WTag);
    app.component('KanbanExample', KanbanExample);
    app.use(TwoslashFloatingVue as any);
    app.use(plugin);
    

    if (inBrowser) {
      NProgress.configure({ showSpinner: false });

      const onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      const onAfterRouteChange = () => {
        NProgress.done(); // 停止进度条
        // busuanzi.fetch(); //卜算子统计
        bindFancybox();
      };
      router.onBeforeRouteChange = onBeforeRouteChange;
      router.onAfterRouteChange = onAfterRouteChange;
    }
  },


  setup() {
    const router = useRouter();
    onMounted(() => {
      bindFancybox();
    });
    onUnmounted(async () => {
      const { Fancybox } = await import("@fancyapps/ui");
      Fancybox.destroy();
      router.onBeforeRouteChange = undefined;
      router.onAfterRouteChange = undefined;
    });
  },
} satisfies Theme


