import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "首页", link: "/", activeMatch: "^/" },
  { text: "导航", link: "/nav", activeMatch: "^/nav" },
  {
    text: "笔记",  
    items:[
      {text: "入门", link:"/笔记/入门/01起步"},
      {text: "CPP编程⬇️", 
        items:[
          {text: "C++基础", link: "/笔记/index"},
        ]},
      {text: "Linux编程⬇️", 
        items:[
          {text: "Linux系统编程" , link:"/笔记/杂项/安装ubuntu版本的idea教程"},
          {text: "Sinergym项目" , link:"/笔记/Sinergym项目/gym互联网相关资料"}
        ]},
      {text: "计算机网络⬇️", 
      items:[
        {text: "网工" , link:"/笔记/计算机网络/index"},
      ]}
    ],
    activeMatch: "^/笔记",
  },
  {
    text: "博客",  
    items:[
      {text: "回顾2023年", 
        items:[]
      },
      {text: "2024年⬇️", 
        items:[
          {text: "上半年", link: "/博客/index"}
        ]}
    ],
    activeMatch: "^/博客",
  },
  
  
  {
    text: "docs",  link: "/docs/index"
  },
  // {
  //   text: "前端物语",
  //   items: [
  //     { text: "JavaScript 基础知识", link: "/fe/javascript/types" },
  //     { text: "ES6 常用知识", link: "/fe/es6/" },
  //     { text: "TypeScript 基础知识", link: "/fe/typescript/base" },
  //     { text: "浏览器相关知识", link: "/fe/browser/" },
  //   ],
  //   activeMatch: "^/fe",
  // },
  // {
  //   text: "源码阅读",
  //   link: "/analysis/utils/only-allow",
  //   activeMatch: "^/analysis",
  // },
  // {
  //   text: "Workflow",
  //   items: [
  //     {
  //       text: "常用工具/方法",
  //       items: [
  //         { text: "工具库整理", link: "/workflow/utils/library" },
  //         { text: "常用正则整理", link: "/workflow/utils/regexp" },
  //         { text: "常用方法整理", link: "/workflow/utils/function" },
  //       ],
  //     },
  //     {
  //       text: "CSS 相关",
  //       items: [
  //         { text: "CSS 语法", link: "/workflow/css/spec" },
  //         { text: "CSS 奇淫技巧", link: "/workflow/css/tricks" },
  //         { text: "Sass 常用技巧", link: "/workflow/sass/" },
  //       ],
  //     },
  //     {
  //       text: "Vue 小技巧",
  //       link: "/workflow/vue/",
  //     },
  //     { text: "npm 常用命令", link: "/workflow/node/npm" },
  //     // {
  //     //   text: '终端相关',
  //     //   items: [
  //     { text: "Zsh 配置", link: "/workflow/terminal/zsh" },
  //     { text: "命令行工具", link: "/workflow/terminal/toolkit" },
  //     { text: "Shell 命令", link: "/workflow/terminal/shell" },
  //     //   ]
  //     // },
  //     { text: "Git 相关技巧", link: "/workflow/git/" },
  //     { text: "Git 命令清单", link: "/workflow/git/command" },
  //   ],
  //   activeMatch: "^/workflow",
  // },
  // { text: "踩坑记录", link: "/pit/npm", activeMatch: "^/pit" },
  // {
  //   text: "提效工具",
  //   items: [
  //     {
  //       text: "软件推荐与配置",
  //       items: [
  //         { text: "多平台软件", link: "/efficiency/software/cross-platform" },
  //         { text: "Mac 平台", link: "/efficiency/software/mac" },
  //         { text: "Windows 平台", link: "/efficiency/software/windows" },
  //         { text: "浏览器设置与扩展", link: "/efficiency/software/browser" },
  //         {
  //           text: "Visual Studio Code 配置",
  //           link: "/efficiency/software/vscode",
  //         },
  //         { text: "WebStorm 配置", link: "/efficiency/software/webstorm" },
  //       ],
  //     },
  //     { text: "在线工具", link: "/efficiency/online-tools" },
  //     { text: "书签脚本", link: "/efficiency/bookmark-scripts" },
  //   ],
  //   activeMatch: "^/efficiency",
  // },
  // {
  //   text: "茂茂",
  //   items: [
  //     { text: "个人主页", link: "https://fe-mm.com" },
  //     {
  //       text: "日常笔记",
  //       link: "https://github.com/maomao1996/daily-notes",
  //     },
  //     { text: "mmPlayer", link: "https://netease-music.fe-mm.com" },
  //     {
  //       text: "油猴脚本",
  //       link: "https://github.com/maomao1996/tampermonkey-scripts",
  //     },
  //   ],
  // },
];
