import type { HeadConfig } from "vitepress";

const isDevelopment = process.env.NODE_ENV === "development";

export const head: HeadConfig[] = [
  // 像小鱼一样的鼠标
  ['link', { rel: 'stylesheet', href: "/mouse/nomouse.css" }],
  // 引入外部 JavaScript 文件
  ['script', { src: "/mouse/pointer.js" }],

  ["meta", { name: "theme-color", content: "#ffffff" }],
  ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
  ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ["meta", { name: "msapplication-TileImage", content: "/favicon.ico" }],
  ["meta", { name: "baidu-site-verification", content: "codeva-Whjnr38WFE" }],
  ["link", { rel: "apple-touch-icon", href: "/favicon.ico" }],
  ["link", { rel: "mask-icon", href: "/favicon.ico", color: "#3eaf7c" }],
  ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
  ["meta", { name: "referrer", content: "no-referrer" }],
  [
    "script",
    {
      src: isDevelopment
        ? ""
        : "https://hm.baidu.com/hm.js?8092fab2f2adfc7938ba5b8885aef5b4",
    },
  ],


];
