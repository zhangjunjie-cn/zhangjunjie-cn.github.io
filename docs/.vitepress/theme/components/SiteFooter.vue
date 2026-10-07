<script setup lang="ts">
type FooterBadge = {
  /** Local asset path resolved from the manifest's original shields.io URL. */
  src: string
  href: string
  title: string
  alt: string
}

const BADGES: FooterBadge[] = [
  {
    src: "/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/eae14b27-Frame-VitePress-4868C2.svg",
    href: "https://vitepress.dev/",
    title: "本站框架基于 VitePress_v1.6.3",
    alt: "VitePress",
  },
  {
    src: "/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/182ab04a-Search-Algolia-3095FA.svg",
    href: "https://www.algolia.com/",
    title: "本站搜索服务使用 Algolia",
    alt: "Algolia",
  },
  {
    src: "/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/a80d9e3d-Comments-Twikoo-0072F9.svg",
    href: "https://twikoo.js.org/",
    title: "本站评论系统使用 Twikoo",
    alt: "Twikoo",
  },
  {
    src: "/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/ba378f17-Deploy-Cloudflare-F5762A.svg",
    href: "https://dash.cloudflare.com/",
    title: "本站部署于 Cloudflare",
    alt: "Cloudflare",
  },
  {
    src: "/sites/note.weizwz.com-afbb9997/root-8a5edab2/images/d497ee92-Copyright-BY-NC-SA-4.0.svg",
    href: "http://creativecommons.org/licenses/by-nc-sa/4.0/",
    title: "本站内容采用 CC BY-NC-SA 4.0 国际许可协议进行许可",
    alt: "Copyright",
  },
]
</script>

<template>
  <footer class="bg-bg relative z-10 w-full p-6">
    <div class="mx-auto flex w-full max-w-384 flex-col justify-center text-center">
      <p class="text-text2 text-sm leading-6 font-medium">Copyright © 2022-2026 weizwz</p>
      <p class="text-text2 flex flex-wrap justify-center gap-2 text-sm leading-6 font-medium">
        <a
          v-for="badge in BADGES"
          :key="badge.href"
          class="mt-2 block transition-colors duration-[250ms]"
          :href="badge.href"
          target="_blank"
          :title="badge.title"
          rel="noreferrer"
        >
          <img class="block h-5 w-auto max-w-full" :src="badge.src" :alt="badge.alt" />
        </a>
      </p>
    </div>
  </footer>
</template>
