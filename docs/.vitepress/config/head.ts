import type { HeadConfig } from "vitepress";
import { metaData } from './constants';
export const head: HeadConfig[] = [
  // 像小鱼一样的鼠标
  // ['link', { rel: 'stylesheet', href: "/mouse/nomouse.css" }],
  // 引入外部 JavaScript 文件
  // ['script', { src: "/mouse/pointer.js" }],

  ["meta", { name: "theme-color", content: "#ffffff" }],
  ["meta" ,{ name: "viewport" , content: "width=device-width,initial-scale=1"}],
  ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
  ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ["meta", { name: "msapplication-TileImage", content: "/favicon.ico" }],
  ['meta', { name: 'keywords',  content: 'PWA, VitePress, workbox, Vite, vite-plugin',}],
  // ["meta", { name: "baidu-site-verification", content: "codeva-Whjnr38WFE" }],
  ["link", { rel: "apple-touch-icon", href: "/favicon.ico" }],
  ["link", { rel: "mask-icon", href: "/favicon.ico", color: "#3eaf7c" }],
  ["link", { rel: "icon" , href: "/favicon.ico"}],
  ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
  ["meta", { name: "referrer", content: "no-referrer" }],

  //iconfont 图标
  [
    "link",
    {
      crossorigin: "anonymous",
      rel: "stylesheet",
      href: "//at.alicdn.com/t/c/font_3670842_e41u9aatldo.css",
    },
  ],



  // ['meta', { name: 'author', content: 'Charles7c' }],
  // ['meta', { name: 'keywords', content: '的知识库, 知识库, 博客, Charles7c' }],

  // ['meta', { name: 'HandheldFriendly', content: 'True' }],
  // ['meta', { name: 'MobileOptimized', content: '320' }],
  // ['meta', { name: 'theme-color', content: '#3c8772' }],

  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:locale', content: metaData.locale }],
  ['meta', { property: 'og:title', content: metaData.title }],
  ['meta', { property: 'og:description', content: metaData.description }],
  ['meta', { property: 'og:site', content: metaData.site }],
  ['meta', { property: 'og:site_name', content: metaData.title }],
  ['meta', { property: 'og:image', content: metaData.image }],

];
