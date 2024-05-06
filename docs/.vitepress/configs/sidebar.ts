import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/笔记/":[
    {
      text:"入门",
      collapsed:false,
      items:[
        {text:"01起步",link:"/笔记/入门/01起步"},

      ]
    },
    {
      text:"CPP基础",
      collapsed:false,
      items:[
        {text:"C++语言基础-1",link:"/笔记/CPP基础/CPP基础-1"},
        {text:"C++语言基础-2",link:"/笔记/CPP基础/CPP基础-2"},
      ]
    },
    {
      text:"C++进阶",
      collapsed:true,
      items:[
        {text:"多进程",link:"/笔记/C++进阶/多进程"},
        {text:"线程",link:"/笔记/C++进阶/线程"},
        {text:"Linux系统编程",link:"/笔记/C++进阶/Linux系统编程"},
        {text:"Linux系统编程-2",link:"/笔记/C++进阶/Linux系统编程2"},
      ]
    },
    {
      text:"UE4虚幻",
      collapsed:true,
      items:[
        {text:"UE4蓝图-1",link:"/笔记/UE4虚幻/UE4CPP-1"},
        {text:"UE4蓝图-2",link:"/笔记/UE4虚幻/UE4CPP-2"},

      ]
    },
    
  ].map((item, i) => (!i ? item : { ...item, collapsed: true })),
  "/博客/":[
    {
      text: "2024年",
      collapsed: false,
      collapsible: true,
      items:[
        {
          text:"2月",
          items:[
            {text:"10 -> 第二版博客搭建完成",link:"/博客/2024/02/10第二版博客搭建完成"},
            {text:"11 -> 新年快乐！！🎉🎉",link:"/博客/2024/02/11新年快乐"},
            
          ]
        },
        {
          text:"5月",
          items:[
            {text:"05 -> 第三版博客搭建完成",link:"/博客/2024/05/05第三版博客搭建完成"}            
          ]
        }
      ]
    }
  ].map((item, i) => (!i ? item : { ...item, collapsed: true })),

  "/笔记/杂项/":[
    {
      text: "Linux系统编程",
      collapsed: false,
      collapsible: true,
      items:[
        {
          text:"杂项",
          items:[
            {text:"1.安装linux 的 nodejs需要注意的问题",link:"/笔记/杂项/安装linux 的 nodejs需要注意的问题"},
            {text:"2.安装ubuntu版本的idea教程",link:"/笔记/杂项/安装ubuntu版本的idea教程"},
          ]
        }
      ]
    }
  ].map((item, i) => (!i ? item : { ...item, collapsed: true })),

  "/笔记/Sinergym项目/":[
    {
      text: "Linux系统编程",
      collapsed: false,
      collapsible: true,
      items:[
        {
          text:"bilibili教程",
          items:[
            {text:"强化学习系列教程1：",link:"/笔记/Sinergym项目/强化学习bilibili/强化学习1"},
          ]
        }
      ]
    }
  ].map((item, i) => (!i ? item : { ...item, collapsed: true })),
  
  

  
  // "/fe/": [
  //   {
  //     text: "JavaScript 基础知识",
  //     collapsed: false,
  //     items: [
  //       { text: "数据类型", link: "/fe/javascript/types" },
  //       { text: "引用类型的拷贝", link: "/fe/javascript/clone" },
  //       { text: "类型转换", link: "/fe/javascript/conversions" },
  //       { text: "原型和原型链", link: "/fe/javascript/prototype" },
  //       { text: "继承", link: "/fe/javascript/inherit" },
  //     ],
  //   },
  //   {
  //     text: "ES6 常用知识点",
  //     link: "/fe/es6/",
  //   },
  //   {
  //     text: "TypeScript",
  //     link: "/fe/typescript/base",
  //   },
  //   {
  //     text: "HTML / CSS",
  //     collapsed: false,
  //     items: [
  //       { text: "HTML 理论知识点", link: "/fe/html/" },
  //       { text: "CSS 理论知识点", link: "/fe/css/" },
  //     ],
  //   },
  //   {
  //     text: "浏览器与网络",
  //     collapsed: false,
  //     items: [
  //       { text: "浏览器相关知识点", link: "/fe/browser/" },
  //       { text: "TCP", link: "/fe/network/tcp" },
  //       { text: "HTTP", link: "/fe/network/http" },
  //     ],
  //   },
  //   {
  //     text: "概念知识点",
  //     collapsed: false,
  //     items: [
  //       { text: "模块化", link: "/fe/concept/module" },
  //       { text: "前端页面渲染方式", link: "/fe/concept/page-rendering" },
  //     ],
  //   },
  //   {
  //     text: "编程题",
  //     link: "/fe/coding/",
  //   },
  // ],
  // "/analysis/": [
  //   {
  //     text: "工具库",
  //     // collapsed: false,
  //     items: [
  //       { text: "only-allow", link: "/analysis/utils/only-allow" },
  //       { text: "clsx", link: "/analysis/utils/clsx" },
  //     ],
  //   },
  // ],
  // "/workflow/": [
  //   {
  //     text: "常用工具/方法",
  //     collapsed: false,
  //     items: [
  //       { text: "工具库整理", link: "/workflow/utils/library" },
  //       { text: "常用正则整理", link: "/workflow/utils/regexp" },
  //       { text: "常用方法整理", link: "/workflow/utils/function" },
  //     ],
  //   },
  //   {
  //     text: "CSS 相关",
  //     collapsed: false,
  //     items: [
  //       { text: "CSS 语法", link: "/workflow/css/spec" },
  //       { text: "CSS 奇淫技巧", link: "/workflow/css/tricks" },
  //       { text: "Sass 常用技巧", link: "/workflow/sass/" },
  //     ],
  //   },
  //   {
  //     text: "Vue 相关",
  //     link: "/workflow/vue/",
  //   },
  //   {
  //     text: "Node 相关",
  //     // collapsed: false,
  //     items: [{ text: "npm 常用命令", link: "/workflow/node/npm" }],
  //   },
  //   {
  //     text: "终端相关",
  //     collapsed: false,
  //     items: [
  //       { text: "Zsh 配置", link: "/workflow/terminal/zsh" },
  //       { text: "命令行工具", link: "/workflow/terminal/toolkit" },
  //       { text: "Shell 命令", link: "/workflow/terminal/shell" },
  //     ],
  //   },
  //   {
  //     text: "Git 相关",
  //     collapsed: false,
  //     items: [
  //       { text: "Git 相关技巧", link: "/workflow/git/" },
  //       { text: "Git 命令清单", link: "/workflow/git/command" },
  //     ],
  //   },
  // ],
  // "/efficiency/": [
  //   {
  //     text: "软件推荐与配置",
  //     // collapsed: false,
  //     items: [
  //       { text: "多平台软件", link: "/efficiency/software/cross-platform" },
  //       { text: "Mac 平台", link: "/efficiency/software/mac" },
  //       { text: "Windows 平台", link: "/efficiency/software/windows" },
  //       { text: "浏览器设置与扩展", link: "/efficiency/software/browser" },
  //       {
  //         text: "Visual Studio Code 配置",
  //         link: "/efficiency/software/vscode",
  //       },
  //       { text: "WebStorm 配置", link: "/efficiency/software/webstorm" },
  //     ],
  //   },
  //   { text: "在线工具", link: "/efficiency/online-tools" },
  //   { text: "书签脚本", link: "/efficiency/bookmark-scripts" },
  // ],
  // "/pit/": [
  //   {
  //     text: "踩坑记录",
  //     // collapsed: false,
  //     items: [
  //       { text: "npm 踩坑记录", link: "/pit/npm" },
  //       { text: "PC 踩坑记录", link: "/pit/pc" },
  //       { text: "H5 踩坑记录", link: "/pit/h5" },
  //     ],
  //   },
  // ],
};

