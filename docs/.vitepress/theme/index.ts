import { h, watch,onMounted, nextTick,defineComponent,inject } from "vue";
import { useData, EnhanceAppContext,inBrowser  } from "vitepress";
import DefaultTheme from 'vitepress/theme-without-fonts'; 
import "./styles/font.css";
import './styles/index.scss'
//naive-ui

import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
// import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue';
import '@shikijs/vitepress-twoslash/style.css'

import MNavLinks from './components/MNavLinks.vue'
import Theme from 'vitepress/theme'
import { DocBox, DocBoxCube, DocLinks, DocPill } from '@theojs/lumen'

import { NolebaseEnhancedReadabilitiesPlugin } from '@nolebase/vitepress-plugin-enhanced-readabilities/client';





// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import TwoSlash from '@shikijs/vitepress-twoslash/client'
import { useRoute } from 'vitepress'
import 'uno.css'

//切换窗口进度条
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import { 
  NolebaseGitChangelogPlugin 
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

import {
	initFirstScreen,
	destructionObserver,
	animateFn,
} from '../theme/composables/animatePlusgin'

//主题色
import '@theojs/lumen/theme'



export default Object.assign({}, Theme, {

  // 滚动进入动画
  setup() {
		const route = useRoute()
		onMounted(() => {
			initFirstScreen()
			animateFn()
		})
		watch(
			() => route.path,
			() =>
				nextTick(() => {
					destructionObserver()
					initFirstScreen()
					animateFn()
				})
		)
	},

  Layout: () => {

    //naive-ui
    const { Layout } = DefaultTheme;

    const CssRenderStyle = defineComponent({
      setup() {
        const collect = inject('css-render-collect')
        return {
          style: collect()
        }
      },
      render() {
        return h('css-render-style', {
          innerHTML: this.style
        })
      }
    })
    
    const VitepressPath = defineComponent({
      setup() {
        const route = useRoute()
        return () => {
          return h('vitepress-path', null, [route.path])
        }
      }
    })
    
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
        )
      }
    })

    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    return h(MyLayout, props);
  },







  async enhanceApp({ app, router }: EnhanceAppContext) {
    
    
    app.component('MNavLinks', MNavLinks);
    app.use(TwoSlash as any)
    // app.component('Box', DocBox) 
    // app.component('Pill', DocPill) 
    app.component('Links', DocLinks) 
    // app.component('BoxCube', DocBoxCube) 
    app.use(NolebaseGitChangelogPlugin)  
    app.use(NolebaseEnhancedReadabilitiesPlugin)


    //naive-ui
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }


    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
          NProgress.done() // 停止进度条
      }
    }
    
  }
  
})