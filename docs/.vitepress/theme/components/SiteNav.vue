<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useData } from 'vitepress'
import {
  chevronDownIcon,
  moonIcon,
  moonIconFaded,
  searchIcon,
  sunIcon,
  sunIconFaded,
} from './icons/navIcons'

const LOGO_SRC =
  '/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/3ebeb6ef-logo.png'

/** VitePress owns the colour scheme (`html.dark` + localStorage). */
const { isDark, frontmatter } = useData()

type NavLink = { label: string; href: string }
type NavGroup = { title?: string; links: NavLink[] }
type NavEntry =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'group'; label: string; groups: NavGroup[] }

/** Nav menu, verbatim from the original (extraction.json → navLinks + page.html). */
const NAV: NavEntry[] = [
  { kind: 'link', label: '首页', href: '/' },
  { kind: 'link', label: '归档', href: '/pages/posts' },
  { kind: 'link', label: '标签', href: '/pages/tags' },
  { kind: 'link', label: '案例', href: '/pages/case' },
  {
    kind: 'group',
    label: '推荐',
    groups: [
      {
        links: [
          { label: 'Claude Code 学习笔记', href: '/editor/ai/claude-learn' },
          { label: 'Antigravity Skills 配置', href: '/editor/ai/antigravity-skills-guide' },
          { label: '2026 年度 Mac 软件推荐', href: '/macos/app/2026' },
          { label: 'VitePress 建站资源汇总', href: '/vitepress/all/resource-all' },
          { label: 'Kiro 等 AI 编辑器快速上手', href: '/editor/ai/to-kiro' },
          { label: 'VSCode 接入 AI 大模型', href: '/editor/vscode/vscode-ai-cn' },
          { label: 'MacOS 26 基础优化设置', href: '/macos/setting/base-init' },
          { label: 'Git 使用记录 - 持续更新', href: '/git/use-log' },
          { label: '前端常用图标资源库汇总', href: '/resource/image/icon-all' },
          { label: 'uni-app+vue3 常见问题', href: '/mobile/uniapp/important-point-uniapp-vue3' },
          { label: 'Vite+TS+Vue3 从零搭建', href: '/vuejs/apply/project-building-vite-ts-1' },
        ],
      },
    ],
  },
  {
    kind: 'group',
    label: '技术探讨',
    groups: [
      {
        links: [
          { label: '前端术语', href: '/terminology/design-paradigm' },
          { label: 'CSS 样式', href: '/css/apply/icon-label-shields' },
          { label: 'JS 基础', href: '/js/apply/compare-number' },
          { label: '浏览器', href: '/browser/apply/browser-plugin' },
          { label: 'TS 基础', href: '/ts/basic/ts-normal-summary' },
          { label: 'Nodejs', href: '/nodejs/apply/pnpm-setting' },
          { label: 'Nginx', href: '/nginx/nginx-web-cross-domain' },
        ],
      },
      {
        links: [
          { label: 'Vue.js', href: '/vuejs/basic/vue-mvvm-binding' },
          { label: 'uni-app', href: '/mobile/uniapp/project-building-uniapp-vue3' },
          { label: 'Vite', href: '/pages/tags?q=Vite' },
          { label: 'Element', href: '/element/responsive-layout' },
        ],
      },
      {
        links: [
          { label: '终端配置', href: '/pages/tags?q=%E7%BB%88%E7%AB%AF' },
          { label: 'Git 配置', href: '/git/use-log' },
          { label: '开发工具', href: '/editor/vscode/vscode-self-plugin' },
          { label: 'PS 教程', href: '/editor/ps/photo-change-bg' },
        ],
      },
    ],
  },
  {
    kind: 'group',
    label: '资源分享',
    groups: [
      {
        links: [
          { label: '前端导航', href: 'https://nav.weizwz.com/' },
          { label: 'AI工具集', href: 'https://ai-bot.cn/' },
          { label: 'GitHub', href: '/pages/tags?q=Github' },
        ],
      },
      {
        links: [
          { label: '应用分享', href: '/app/network/clash-verge' },
          { label: 'Windows', href: '/windows/setting/terminal-beautify' },
          { label: 'MacOS', href: '/macos/setting/base-init' },
        ],
      },
      {
        links: [
          { label: '前端设计', href: '/resource/design/all' },
          { label: '开源字体', href: '/resource/font/open-source-font' },
          { label: '图标图片', href: '/resource/image/icon-all' },
        ],
      },
    ],
  },
  {
    kind: 'group',
    label: '博客建站',
    groups: [
      {
        title: '网站管理',
        links: [{ label: '域名证书', href: '/site/third-level-domain' }],
      },
      {
        title: 'Vitepress',
        links: [
          { label: '资源汇总', href: '/vitepress/all/resource-all' },
          { label: '基础配置', href: '/vitepress/basic/api-examples' },
          { label: '进阶用法', href: '/vitepress/extend/post-data' },
          { label: '常见问题', href: '/vitepress/problem/error-mismatches' },
        ],
      },
      {
        title: 'Hexo框架',
        links: [
          { label: '基础配置', href: '/hexo/basic/hexo-github-blog' },
          { label: '进阶用法', href: '/hexo/extend/hexo-butterfly-recommend' },
        ],
      },
    ],
  },
  {
    kind: 'group',
    label: '关于',
    groups: [
      {
        links: [
          { label: '我的友链', href: '/pages/links' },
          { label: '更新日志', href: '/pages/logs' },
          { label: '订阅本站', href: 'https://note.weizwz.com/feed.xml' },
          { label: '我的主页', href: 'https://weizwz.com/' },
          { label: '站点监控', href: 'https://status.weizwz.com/' },
        ],
      },
      {
        title: '我的项目',
        links: [
          { label: 'hexo插件', href: '/hexo/extend/hexo-butterfly-recommend' },
          { label: '唯知导航', href: 'https://nav.weizwz.com/' },
          { label: '唯知工具', href: 'https://tools.weizwz.com/' },
          { label: '封面制作', href: 'https://cover.weizwz.com/' },
          { label: '趣味动画', href: 'https://animation.weizwz.com' },
          { label: '大屏演示', href: 'https://vue3-charts.weizwz.com' },
        ],
      },
    ],
  },
]

function isExternal(href: string): boolean {
  return href.startsWith('http')
}

/** Narrowing helpers — keep the discriminated union usable inside the template. */
function navHref(entry: NavEntry): string {
  return entry.kind === 'link' ? entry.href : ''
}

function navGroups(entry: NavEntry): NavGroup[] {
  return entry.kind === 'group' ? entry.groups : []
}

const MENU_LINK_CLASS =
  'block rounded-md px-3 text-sm font-medium leading-8 whitespace-nowrap text-text1 transition-[background-color,color] duration-[250ms] hover:bg-secondary hover:text-main'

const MENU_GROUP_CLASS =
  '-mx-3 mt-3 border-t border-divider px-3 pt-3 first:mt-0 first:border-t-0 first:pt-0'

const scrolled = ref(false)
const mobileOpen = ref(false)
/** Per-dropdown open state, keyed by the entry label. */
const openMenus = reactive<Record<string, boolean>>({})

/**
 * The navbar is transparent while the page is at the top and opaque once
 * scrolled (or while the mobile panel is open). A page with a banner
 * (`frontmatter.overBanner`, i.e. `/pages/case`) additionally turns its text and
 * icons white, because the banner runs underneath it — the source does the same
 * with `.tk-article-banner ~ .VPNav .VPNavBar:not(.home).top`.
 */
const overBanner = computed(() => !scrolled.value && frontmatter.value.overBanner === true)
const navBg = computed(() => (scrolled.value || mobileOpen.value ? 'bg-bg' : 'bg-transparent'))

function toggleAppearance() {
  isDark.value = !isDark.value
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function openMenu(label: string) {
  openMenus[label] = true
}

function closeMenu(label: string) {
  openMenus[label] = false
}

/** React's onBlur bubbles (focusout), so mirror that to survive child focus moves. */
function onMenuBlur(label: string, event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (!(event.currentTarget as HTMLElement).contains(next)) {
    openMenus[label] = false
  }
}

function onMenuKeydown(label: string, event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  openMenus[label] = false
  const trigger = (event.currentTarget as HTMLElement).querySelector('button')
  trigger?.focus()
}

function onScroll() {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="site-nav fixed inset-x-0 top-0 z-30 h-16"
    :class="{ 'site-nav--over-banner': overBanner }"
  >
    <div
      class="relative h-16 w-full [transition:background-color_.25s]"
      :class="navBg"
    >
      <div class="px-2 pl-6 md:px-8">
        <div class="mx-auto flex h-16 max-w-[1472px] justify-between">
          <div class="flex shrink-0 items-center">
            <a
              class="flex h-16 items-center text-[16px] font-semibold text-text1 [transition:opacity_.25s]"
              href="/"
            >
              <img class="mr-2 h-6 w-6" :src="LOGO_SRC" alt="" width="24" height="24" />
              <span>唯知笔记</span>
            </a>
          </div>

          <div class="flex min-w-0 flex-1 items-center justify-end">
            <div class="hidden md:flex md:flex-1 md:items-center md:pl-8">
              <div class="block">
                <button
                  type="button"
                  aria-label="搜索文档"
                  class="site-nav__search flex h-10 w-full items-center justify-start rounded-lg border border-transparent bg-bg-soft px-[10px] pl-3 [transition:border-color_.25s] hover:border-main hover:bg-secondary"
                >
                  <span class="inline-flex" v-html="searchIcon" />
                  <span class="site-nav__search-label mt-0.5 pr-4 text-[13px] font-medium text-text2">搜索文档</span>
                  <span class="flex min-w-0 items-center">
                    <kbd
                      class="site-nav__kbd mt-0.5 h-[22px] rounded-l-[4px] border border-r-0 border-divider pl-1.5 text-[12px] leading-[22px] font-medium text-text2 [transition:color_.5s,border-color_.5s]"
                    >
                      Ctrl
                    </kbd>
                    <kbd
                      class="site-nav__kbd mt-0.5 h-[22px] rounded-r-[4px] border border-l-0 border-divider pr-1.5 pl-0.5 text-[12px] leading-[22px] font-medium text-text2 [transition:color_.5s,border-color_.5s]"
                    >
                      K
                    </kbd>
                  </span>
                </button>
              </div>
            </div>

            <nav aria-label="Main Navigation" class="hidden md:flex">
              <template v-for="entry in NAV" :key="entry.label">
                <a
                  v-if="entry.kind === 'link'"
                  :href="navHref(entry)"
                  :class="[
                    'flex items-center px-3 text-sm leading-16 font-medium text-text1 transition-[color] duration-[250ms] hover:text-main',
                    navHref(entry) === '/' && 'text-main',
                  ]"
                >
                  {{ entry.label }}
                </a>
                <div
                  v-else
                  class="group relative"
                  @mouseenter="openMenu(entry.label)"
                  @mouseleave="closeMenu(entry.label)"
                  @focusin="openMenu(entry.label)"
                  @focusout="onMenuBlur(entry.label, $event)"
                  @keydown="onMenuKeydown(entry.label, $event)"
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    :aria-expanded="openMenus[entry.label] ?? false"
                    class="site-nav__group flex h-16 items-center px-3 text-text1 [transition:color_.5s]"
                  >
                    <span
                      class="flex items-center text-sm font-medium leading-16 text-text1 [transition:color_.25s] group-hover:text-text2"
                    >
                      {{ entry.label }}
                      <span class="inline-flex" v-html="chevronDownIcon" />
                    </span>
                  </button>
                  <div
                    :class="[
                      'absolute top-[52px] right-0 [transition:opacity_.25s,visibility_.25s,transform_.25s]',
                      openMenus[entry.label] ? 'visible opacity-100' : 'invisible opacity-0',
                    ]"
                  >
                    <div
                      class="max-h-[calc(100vh-64px)] min-w-32 overflow-y-auto rounded-xl border border-divider bg-bg p-3 shadow-[0_12px_32px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.08)] [transition:background-color_.5s]"
                    >
                      <div
                        v-for="(group, index) in navGroups(entry)"
                        :key="group.title ?? `group-${index}`"
                        :class="MENU_GROUP_CLASS"
                      >
                        <p
                          v-if="group.title"
                          class="px-3 text-sm leading-8 font-semibold whitespace-nowrap text-text3"
                        >
                          {{ group.title }}
                        </p>
                        <a
                          v-for="link in group.links"
                          :key="`${link.label}-${link.href}`"
                          :href="link.href"
                          :target="isExternal(link.href) ? '_blank' : undefined"
                          :rel="isExternal(link.href) ? 'noreferrer' : undefined"
                          :class="MENU_LINK_CLASS"
                        >
                          {{ link.label }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </nav>

            <div class="hidden pl-6 md:flex md:items-center">
              <button
                type="button"
                role="switch"
                :aria-checked="isDark"
                :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
                class="site-nav__toggle relative block h-[22px] w-10 shrink-0 rounded-[11px] border border-border bg-secondary [transition:border-color_.25s] hover:border-main"
                @click="toggleAppearance"
              >
                <span
                  :class="[
                    'absolute top-px left-px h-[18px] w-[18px] rounded-full bg-bg shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] [transition:transform_.25s]',
                    isDark && 'translate-x-[18px]',
                  ]"
                >
                  <span class="relative block h-[18px] w-[18px] overflow-hidden rounded-full">
                    <span class="inline-flex" v-html="isDark ? sunIconFaded : sunIcon" />
                    <span class="inline-flex" v-html="isDark ? moonIcon : moonIconFaded" />
                  </span>
                </span>
              </button>
            </div>

            <button
              type="button"
              aria-label="mobile navigation"
              :aria-expanded="mobileOpen"
              aria-controls="SiteNavMobile"
              class="flex h-16 w-12 cursor-pointer items-center justify-center md:hidden"
              @click="toggleMobile"
            >
              <span class="site-nav__burger relative block h-3.5 w-4 overflow-hidden">
                <span
                  class="absolute top-0 left-0 h-0.5 w-4 bg-text1 [transition:top_.25s,background-color_.5s,transform_.25s]"
                />
                <span
                  class="absolute top-1.5 left-0 h-0.5 w-4 bg-text1 [transition:top_.25s,background-color_.5s,transform_.25s]"
                />
                <span
                  class="absolute top-3 left-0 h-0.5 w-4 bg-text1 [transition:top_.25s,background-color_.5s,transform_.25s]"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="h-px w-full">
        <div
          :class="[
            'h-px w-full bg-divider [transition:transform_.5s,opacity_.25s]',
            scrolled ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
          ]"
        />
      </div>

      <div id="SiteNavMobile">
        <div
          v-if="mobileOpen"
          class="absolute inset-x-0 top-16 z-30 max-h-[calc(100vh-64px)] overflow-y-auto border-t border-divider bg-bg px-6 py-4 md:hidden"
        >
          <nav class="flex flex-col">
            <template v-for="entry in NAV" :key="entry.label">
              <a
                v-if="entry.kind === 'link'"
                :href="navHref(entry)"
                class="block rounded-md px-3 text-sm font-medium leading-8 text-text1 transition-[background-color,color] duration-[250ms] hover:bg-secondary hover:text-main"
              >
                {{ entry.label }}
              </a>
              <div
                v-else
                class="-mx-3 mt-3 border-t border-divider px-3 pt-3 first:mt-0 first:border-t-0 first:pt-0"
              >
                <p class="px-3 text-sm leading-8 font-semibold whitespace-nowrap text-text3">
                  {{ entry.label }}
                </p>
                <template v-for="(group, index) in navGroups(entry)" :key="index">
                  <a
                    v-for="link in group.links"
                    :key="`${entry.label}-${index}-${link.label}`"
                    :href="link.href"
                    :target="isExternal(link.href) ? '_blank' : undefined"
                    :rel="isExternal(link.href) ? 'noreferrer' : undefined"
                    class="block rounded-md px-3 text-sm font-medium leading-8 text-text2 transition-[background-color,color] duration-[250ms] hover:bg-secondary hover:text-main"
                  >
                    {{ link.label }}
                  </a>
                </template>
              </div>
            </template>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
