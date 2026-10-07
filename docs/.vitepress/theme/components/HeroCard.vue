<script setup lang="ts">
import { tagIcons } from './icons/tagIcons'
import {
  CnblogsSocialIcon,
  GithubSocialIcon,
  GiteeSocialIcon,
  HomeSocialIcon,
} from './icons/socialIcons'

type Tag = {
  label: string
  href: string
}

type SocialLink = {
  title: string
  href: string
  icon: string
}

/** Avatar served from the site's CDN, downloaded into this page's asset namespace. */
const AVATAR_SRC =
  "/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/a62bb89b-head_ai_256_592865eed0296836.webp"

const tags: readonly Tag[] = [
  { label: "AI", href: "pages/tags?q=AI" },
  { label: "Tencent", href: "pages/tags?q=Tencent" },
  { label: "VSCode", href: "pages/tags?q=VSCode" },
  { label: "网站", href: "pages/tags?q=%E7%BD%91%E7%AB%99" },
  { label: "Vercel", href: "pages/tags?q=Vercel" },
  { label: "CloudFlare", href: "pages/tags?q=CloudFlare" },
  { label: "Obsidian", href: "pages/tags?q=Obsidian" },
  { label: "Markdown", href: "pages/tags?q=Markdown" },
  { label: "Skill", href: "pages/tags?q=Skill" },
  { label: "Design", href: "pages/tags?q=Design" },
  { label: "TailwindCSS", href: "pages/tags?q=TailwindCSS" },
  { label: "Github", href: "pages/tags?q=Github" },
  { label: "Vue.js", href: "pages/tags?q=Vue.js" },
  { label: "MacOS", href: "pages/tags?q=MacOS" },
  { label: "APP", href: "pages/tags?q=APP" },
  { label: "PS", href: "pages/tags?q=PS" },
  { label: "图片", href: "pages/tags?q=%E5%9B%BE%E7%89%87" },
  { label: "字体", href: "pages/tags?q=%E5%AD%97%E4%BD%93" },
  { label: "Next.js", href: "pages/tags?q=Next.js" },
  { label: "React", href: "pages/tags?q=React" },
  { label: "TypeScript", href: "pages/tags?q=TypeScript" },
  { label: "图标", href: "pages/tags?q=%E5%9B%BE%E6%A0%87" },
  { label: "CSS", href: "pages/tags?q=CSS" },
  { label: "Node.js", href: "pages/tags?q=Node.js" },
  { label: "Git", href: "pages/tags?q=Git" },
  { label: "术语", href: "pages/tags?q=%E6%9C%AF%E8%AF%AD" },
  { label: "JavaScript", href: "pages/tags?q=JavaScript" },
  { label: "SSR", href: "pages/tags?q=SSR" },
  { label: "Sass", href: "pages/tags?q=Sass" },
  { label: "webpack", href: "pages/tags?q=webpack" },
  { label: "Element", href: "pages/tags?q=Element" },
  { label: "SVG", href: "pages/tags?q=SVG" },
  { label: "浏览器", href: "pages/tags?q=%E6%B5%8F%E8%A7%88%E5%99%A8" },
  { label: "Hexo", href: "pages/tags?q=Hexo" },
  { label: "终端", href: "pages/tags?q=%E7%BB%88%E7%AB%AF" },
  { label: "图表", href: "pages/tags?q=%E5%9B%BE%E8%A1%A8" },
  { label: "HTTP", href: "pages/tags?q=HTTP" },
  { label: "Windows", href: "pages/tags?q=Windows" },
  { label: "npm", href: "pages/tags?q=npm" },
  { label: "状态管理", href: "pages/tags?q=%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86" },
  { label: "Router", href: "pages/tags?q=Router" },
  { label: "nginx", href: "pages/tags?q=nginx" },
  { label: "OPPO", href: "pages/tags?q=OPPO" },
  { label: "Python", href: "pages/tags?q=Python" },
]

const socialLinks: readonly SocialLink[] = [
  { title: "个人主页", href: "https://weizwz.com/", icon: HomeSocialIcon },
  { title: "GitHub", href: "https://github.com/weizwz", icon: GithubSocialIcon },
  { title: "Gitee", href: "https://gitee.com/weizwz", icon: GiteeSocialIcon },
  { title: "博客园", href: "https://www.cnblogs.com/weizwz", icon: CnblogsSocialIcon },
]
</script>

<template>
  <div class="bg-bg shadow-shadow group/intro flex h-full w-full flex-col justify-between rounded-2xl p-6 shadow-xs">
    <div>
      <h1 class="text-text1 mb-2! text-3xl! font-bold!">探索知识的无限可能</h1>
      <p class="text-text2 text-base! font-bold!">在1这里，我们分享技术、探索AI，一起漫游科技未来与生活百态</p>
    </div>

    <div class="tag-marquee group relative overflow-hidden py-6">
      <div class="tag-marquee-track flex w-max">
        <div v-for="copy in [0, 1]" :key="copy" class="flex shrink-0 items-center">
          <div v-for="tag in tags" :key="tag.label" class="bg-bg-soft hover:bg-main/20 transition-bg mr-3 rounded-full duration-300">
            <a :href="tag.href" class="flex h-8 items-center px-4 py-1 font-medium">
              <span v-html="tagIcons[tag.label]"></span>
              <span class="mr-1 text-xs font-medium text-gray-400">#</span> {{ tag.label }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <a
        href="https://weizwz.com/"
        target="_blank"
        rel="noreferrer"
        class="border-border relative block h-20 w-20 shrink-0 overflow-hidden rounded-full border p-2"
      >
        <img
          :src="AVATAR_SRC"
          alt="weizwz head"
          class="h-full w-full object-cover transition-transform duration-600 hover:scale-130"
        />
      </a>
      <div class="ml-6">
        <h3 class="text-text1 text-base! font-bold!">weizwz</h3>
        <p class="text-text2 mb-2! text-sm! font-bold!">唯知AI · 用 AI 重构效率生活</p>
        <div class="flex gap-2">
          <a
            v-for="link in socialLinks"
            :key="link.title"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
            :title="link.title"
            class="group flex"
            v-html="link.icon"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
