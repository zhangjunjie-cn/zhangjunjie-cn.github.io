// https://vitepress.dev/guide/custom-theme
import type { EnhanceAppContext } from 'vitepress'
import { useData,useRouter,inBrowser } from "vitepress";
import type { Theme } from 'vitepress'
import { defineComponent,h,onMounted, onUnmounted } from "vue";
import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import ImageCard from './components/ImageCard.vue';
// import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/index.css'

import "./style/index.scss";
import MyLayout from './MyLayout.vue' // 导入布局组件
import { bindFancybox } from "./composables/ImgViewer";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条
import "nprogress-v2/dist/index.css";
import busuanzi from 'busuanzi.pure.js' //不蒜子统计
// 暗黑样式
import '@shikijs/vitepress-twoslash/style.css'

import 'uno.css'

//动态模糊图片
import { 
  NolebaseUnlazyImg, 
} from '@nolebase/vitepress-plugin-thumbnail-hash/client';
import '@nolebase/vitepress-plugin-thumbnail-hash/client/style.css';

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import Whome from './components/Whome.vue';
import WPosts from './components/WPosts.vue';
import WTag from './components/WTag.vue';
import KanbanExample from './components/KanbanExample.vue';
import PasswordProtect from './components/PasswordProtect.vue';
import { usePasswordProtection } from "./utils/PassWordUtil";
import Swiper from './components/Swiper.vue';
import CardMasonry from './components/CardMasonry.vue';
import { plugin } from './composables/slicksort_index';
import StickyWall from './components/StickyWall.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import { initComponent } from "vitepress-plugin-legend/component"; 
import "vitepress-plugin-legend/dist/index.css"; 

export default {
  // extends: DefaultTheme,  
  // Layout: MyLayout, // 应用布局组件
  // enhanceApp({ app, router }: EnhanceAppContext) {
  //   app.use(TwoslashFloatingVue as any)


  extends: DefaultTheme, 
    Layout: defineComponent({
    name: "LayoutProvider",

    setup() {
      const props: { class?: string } = {};
      // const { frontmatter } = useData();
      const { frontmatter, page } = useData();
      props.class = frontmatter.value?.layout || "";

      // 根据元数据动态应用 CSS 类，实现页面级样式定制
      // if (frontmatter.value?.layoutClass) {
      //   props.class = frontmatter.value.layoutClass;
      // }

      // 为每个页面生成唯一的 key
      const getLayoutKey = () => {
        // return `${page.value.relativePath}-${frontmatter.value?.layout || 'default'}`;
        // 只在布局真正改变时才改变 key
        return frontmatter.value?.layout || 'default';
      };

      const { showPassword, currentPassword, currentVerifyPrefix, handleVerified } = usePasswordProtection();

      
      // 渲染函数
      return () => {
        if (showPassword.value) {
          return h(PasswordProtect, {
            key: getLayoutKey(), // 添加 key
            correctPassword: currentPassword.value,
            pageId: currentVerifyPrefix.value,
            onVerified: handleVerified
          });
        }

        // 正常渲染 Teek 布局
        return [
          h(MyLayout, {
            key: getLayoutKey(),
            class: frontmatter.value?.layoutClass || frontmatter.value?.layout || ""
          }),
          h(MusicPlayer, {
            key: 'music-player' // 固定的 key
          })
        ];
      };
    }
  }),
  async enhanceApp({ app, router }: EnhanceAppContext) {
    app.use(ElementPlus);
    app.component('Whome',Whome);
    app.component('WPosts',WPosts);
    app.component('WTag',WTag);
    app.component('KanbanExample', KanbanExample);
    app.component('Swiper', Swiper);
    app.component('CardMasonry',CardMasonry);
    app.component('ImageCard',ImageCard);
    app.use(TwoslashFloatingVue as any);
    app.component('NolebaseUnlazyImg', NolebaseUnlazyImg);
    app.component('StickyWall', StickyWall);
    // app.component('MusicPlayer', MusicPlayer);
    app.use(plugin);

    app.provide('musicPlayerConfig', {  //音乐播放器
      autoPlay: false,
      volume: 0.7,
      loop: false,
      shuffle: false
    })

    initComponent(app); //Markmap
    

    if (inBrowser) {
      NProgress.configure({ showSpinner: false });

      const onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      const onAfterRouteChange = () => {
        NProgress.done(); // 停止进度条
        busuanzi.fetch(); //卜算子统计
        // 只在包含图片的页面绑定 Fancybox
        if (document.querySelector('img')) {
          bindFancybox();
        }
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


