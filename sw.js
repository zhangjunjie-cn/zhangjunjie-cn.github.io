if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),d={module:{uri:r},exports:a,require:u};e[r]=Promise.all(i.map((s=>d[s]||u(s)))).then((s=>(n(...s),a)))}}define(["./workbox-8a682eb8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"4f6f9d77f8b0bd1c7996d612cb556927"},{url:"8dd7a1cccc979328e9ca030c9fe44038.txt",revision:"512d042eadfa13f49ba74487a95d8c49"},{url:"archives.html",revision:"6fb4ea91d18f8b0e907da414560c0076"},{url:"assets/app.CuBavIRq.js",revision:null},{url:"assets/archives.md.Bj93ttXj.js",revision:null},{url:"assets/archives.md.Bj93ttXj.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.DzhAQU0r.js",revision:null},{url:"assets/chunks/article.data.BQbT-80R.js",revision:null},{url:"assets/chunks/framework.ksdMcADN.js",revision:null},{url:"assets/chunks/theme.Duzi-eds.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.Fn2y1hDf.js",revision:null},{url:"assets/docs_index.md.Dh_pZu1J.js",revision:null},{url:"assets/docs_index.md.Dh_pZu1J.lean.js",revision:null},{url:"assets/fa-brands-400.BU4mH_I_.woff2",revision:null},{url:"assets/fa-regular-400.Cy4iLbxs.woff2",revision:null},{url:"assets/fa-solid-900.CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility.B9t6EWrS.woff2",revision:null},{url:"assets/image.CPMGMrSV.png",revision:null},{url:"assets/index.md.C6TeYK54.js",revision:null},{url:"assets/index.md.C6TeYK54.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_计算机网络_index.md.B9FGBhYQ.js",revision:null},{url:"assets/nav_计算机网络_index.md.B9FGBhYQ.lean.js",revision:null},{url:"assets/nav_运维_index.md.BvZ8lS65.js",revision:null},{url:"assets/nav_运维_index.md.BvZ8lS65.lean.js",revision:null},{url:"assets/nav.md.CbdR7Ksj.js",revision:null},{url:"assets/nav.md.CbdR7Ksj.lean.js",revision:null},{url:"assets/style.3a_Hvl7i.css",revision:null},{url:"assets/tags.md.CU6-gMY4.js",revision:null},{url:"assets/tags.md.CU6-gMY4.lean.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BbtIvon8.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BbtIvon8.lean.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.BAgjvr2M.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.BAgjvr2M.lean.js",revision:null},{url:"assets/博客_2024_02_index.md.DidzfvvK.js",revision:null},{url:"assets/博客_2024_02_index.md.DidzfvvK.lean.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.Dg_swB__.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.Dg_swB__.lean.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.B96f0mmN.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.B96f0mmN.lean.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.D2Gw8XRQ.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.D2Gw8XRQ.lean.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.BwqcIm8Q.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.BwqcIm8Q.lean.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.BIN6dR8b.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.BIN6dR8b.lean.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DAVOK1ug.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DAVOK1ug.lean.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.C70J_xiT.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.C70J_xiT.lean.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.Cp9-dmCE.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.Cp9-dmCE.lean.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C_svtoF8.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C_svtoF8.lean.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.B8Efe27k.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.B8Efe27k.lean.js",revision:null},{url:"assets/博客_2024_11_23第七版博客发布.md.C2R9nV81.js",revision:null},{url:"assets/博客_2024_11_23第七版博客发布.md.C2R9nV81.lean.js",revision:null},{url:"assets/博客_2024_11_25开始记录生活.md.pMTaBnY_.js",revision:null},{url:"assets/博客_2024_11_25开始记录生活.md.pMTaBnY_.lean.js",revision:null},{url:"assets/博客_2024_11_26周二的一天.md.7RQA0Jqf.js",revision:null},{url:"assets/博客_2024_11_26周二的一天.md.7RQA0Jqf.lean.js",revision:null},{url:"assets/博客_2024_11_27Daily Notes.md.Mk8KMNRo.js",revision:null},{url:"assets/博客_2024_11_27Daily Notes.md.Mk8KMNRo.lean.js",revision:null},{url:"assets/博客_2024_11_28防火墙学习.md.COeLSLGW.js",revision:null},{url:"assets/博客_2024_11_28防火墙学习.md.COeLSLGW.lean.js",revision:null},{url:"assets/博客_2024_11_29萤石云app接入.md.RVgfDd6X.js",revision:null},{url:"assets/博客_2024_11_29萤石云app接入.md.RVgfDd6X.lean.js",revision:null},{url:"assets/博客_2024_12_01默认路由.md.BcyxsWK7.js",revision:null},{url:"assets/博客_2024_12_01默认路由.md.BcyxsWK7.lean.js",revision:null},{url:"assets/博客_2024_12_02加班处理考勤掉线.md.BQj60CZo.js",revision:null},{url:"assets/博客_2024_12_02加班处理考勤掉线.md.BQj60CZo.lean.js",revision:null},{url:"assets/博客_2024_12_04局域网路由.md.Cm1iQ8pR.js",revision:null},{url:"assets/博客_2024_12_04局域网路由.md.Cm1iQ8pR.lean.js",revision:null},{url:"assets/博客_2024_12_12最近日常.md.D_aRct_H.js",revision:null},{url:"assets/博客_2024_12_12最近日常.md.D_aRct_H.lean.js",revision:null},{url:"assets/博客_2024_index.md.Byigs-oK.js",revision:null},{url:"assets/博客_2024_index.md.Byigs-oK.lean.js",revision:null},{url:"assets/博客_2025_01_01云贵之旅.md.rvoQzWbu.js",revision:null},{url:"assets/博客_2025_01_01云贵之旅.md.rvoQzWbu.lean.js",revision:null},{url:"assets/博客_2025_01_02新一年，新篇章.md.AEnN8E-j.js",revision:null},{url:"assets/博客_2025_01_02新一年，新篇章.md.AEnN8E-j.lean.js",revision:null},{url:"assets/博客_2025_01_05第八版博客发布.md.DdR_-kQ5.js",revision:null},{url:"assets/博客_2025_01_05第八版博客发布.md.DdR_-kQ5.lean.js",revision:null},{url:"assets/博客_2025_index.md.Dzrk_B_r.js",revision:null},{url:"assets/博客_2025_index.md.Dzrk_B_r.lean.js",revision:null},{url:"assets/博客_index.md.EhlkpbOj.js",revision:null},{url:"assets/博客_index.md.EhlkpbOj.lean.js",revision:null},{url:"assets/笔记_C__进阶_index.md.DVRG5yYF.js",revision:null},{url:"assets/笔记_C__进阶_index.md.DVRG5yYF.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.T8MK5gCO.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.T8MK5gCO.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DCEnstsv.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DCEnstsv.lean.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.iTiIyTa2.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.iTiIyTa2.lean.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CMiUW3p3.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CMiUW3p3.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.aK4F5C0j.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.aK4F5C0j.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.CEIhPoxu.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.CEIhPoxu.lean.js",revision:null},{url:"assets/笔记_CPP基础_index.md.Em3pFeET.js",revision:null},{url:"assets/笔记_CPP基础_index.md.Em3pFeET.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_index.md.-ecijkai.js",revision:null},{url:"assets/笔记_EnergyPlus_index.md.-ecijkai.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Czb0boMV.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Czb0boMV.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BZzim933.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BZzim933.lean.js",revision:null},{url:"assets/笔记_index.md.Ca1MClPE.js",revision:null},{url:"assets/笔记_index.md.Ca1MClPE.lean.js",revision:null},{url:"assets/笔记_Python_index.md.Bwn6e8bU.js",revision:null},{url:"assets/笔记_Python_index.md.Bwn6e8bU.lean.js",revision:null},{url:"assets/笔记_Python_Python入门.md.Bz9Qk38u.js",revision:null},{url:"assets/笔记_Python_Python入门.md.Bz9Qk38u.lean.js",revision:null},{url:"assets/笔记_Python_Python基础.md.B0r-8sGE.js",revision:null},{url:"assets/笔记_Python_Python基础.md.B0r-8sGE.lean.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.23u7wy5U.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.23u7wy5U.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_index.md.DwugEXLJ.js",revision:null},{url:"assets/笔记_Sinergym项目_index.md.DwugEXLJ.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.D4BpdMUQ.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.D4BpdMUQ.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.C_GMoSJd.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.C_GMoSJd.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.D26ag7nv.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.D26ag7nv.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_index.md.NkQD2o8I.js",revision:null},{url:"assets/笔记_UE4虚幻_index.md.NkQD2o8I.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.BAWRuVIL.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.BAWRuVIL.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.DBt5uOKT.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.DBt5uOKT.lean.js",revision:null},{url:"assets/笔记_入门_index.md.BQ22mcnD.js",revision:null},{url:"assets/笔记_入门_index.md.BQ22mcnD.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.B4hMGEC5.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.B4hMGEC5.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.DRraBk_G.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.DRraBk_G.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_index.md.BFnZMESY.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_index.md.BFnZMESY.lean.js",revision:null},{url:"assets/笔记_杂项_index.md.CY-lSHKJ.js",revision:null},{url:"assets/笔记_杂项_index.md.CY-lSHKJ.lean.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.DESb5qFo.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.DESb5qFo.lean.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.B3h-NCxm.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.B3h-NCxm.lean.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.BBlvCJUC.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.BBlvCJUC.lean.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.BNlhw4kJ.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.BNlhw4kJ.lean.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.C4xi7isG.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.C4xi7isG.lean.js",revision:null},{url:"assets/笔记_桌面运维_index.md.CxioJlxy.js",revision:null},{url:"assets/笔记_桌面运维_index.md.CxioJlxy.lean.js",revision:null},{url:"assets/笔记_桌面运维_磁盘损坏.md.D6zKOA-4.js",revision:null},{url:"assets/笔记_桌面运维_磁盘损坏.md.D6zKOA-4.lean.js",revision:null},{url:"assets/笔记_桌面运维_防火墙配置.md.BdazwmNP.js",revision:null},{url:"assets/笔记_桌面运维_防火墙配置.md.BdazwmNP.lean.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Vh3chNfE.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Vh3chNfE.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DpQX4L80.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DpQX4L80.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.DUjZqN_o.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.DUjZqN_o.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DzB7OhXV.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DzB7OhXV.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.D4gZQVIo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.D4gZQVIo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.UIfcrrOh.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.UIfcrrOh.lean.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.CD7YoU7z.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.CD7YoU7z.lean.js",revision:null},{url:"docs/index.html",revision:"5f84997779d3747192322c8fe6542959"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"6f90e4ceaeba6265d287136ab92726fa"},{url:"img/svg/about-repos-header.svg",revision:"2a15a863832adc536bf95cc3f0f6eb56"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"index.html",revision:"e02d9a584b1406761a3b048914c62b65"},{url:"logo.png",revision:"711c445a59ecf03e12cf2b23a6b340e3"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav.html",revision:"58b09ffcac74dad4e1fbe79f5edf868a"},{url:"nav/计算机网络/index.html",revision:"a294d23915c48891456db2a90e076765"},{url:"nav/运维/index.html",revision:"7587335439b0cd045b68dd05926015b8"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"tags.html",revision:"6ce4c57e9ae5f61af27964ac7b4dc487"},{url:"博客/2024/02/10第二版博客搭建完成.html",revision:"2725f667ab8c4cc0f4e3d67234367493"},{url:"博客/2024/02/11新年快乐.html",revision:"a353be65f0aba2bd0978f3a454c57826"},{url:"博客/2024/02/index.html",revision:"6c94f6ecd8758504af6a2c1cd4329c43"},{url:"博客/2024/05/05第三版博客搭建完成.html",revision:"2448a811446bbfe7f911c47a043cd6df"},{url:"博客/2024/05/11第四版博客新题性.html",revision:"cb2e3f68d529077c0076bac498e3a61e"},{url:"博客/2024/05/23第五版博客发布完成.html",revision:"69be9925ee7f2b37bbe3111774a90463"},{url:"博客/2024/05/26HA综合布线.html",revision:"889875058c170edbf5b4f9b3f9e68b93"},{url:"博客/2024/05/29打印机共享.html",revision:"b9986133d99cda8026351058e3eee1da"},{url:"博客/2024/06/02性能优化.html",revision:"1fc2dbe059c6bcfa4bde1e280a7f9677"},{url:"博客/2024/06/03Excel大小优化.html",revision:"4878f6a8b01accbcf571d4f4a3d1c051"},{url:"博客/2024/06/10更好的svg集成.html",revision:"914a8698ae3173d0155ac65e6b925c4a"},{url:"博客/2024/06/17商业报告模板.html",revision:"3015e6c1e6f57828560ba8c28d053f87"},{url:"博客/2024/08/18第六版博客发布.html",revision:"13b1c92c3d155e931925956b19f2120c"},{url:"博客/2024/11/23第七版博客发布.html",revision:"d3e3b03c0d6d6c989379f9f0c8f946df"},{url:"博客/2024/11/25开始记录生活.html",revision:"76d64d6cf9810f8aa8af119fc8924969"},{url:"博客/2024/11/26周二的一天.html",revision:"e2123da2d4bbdffac915745ac4ede02a"},{url:"博客/2024/11/27Daily Notes.html",revision:"67a049c04ceec3a7fb1c9c00ef06753d"},{url:"博客/2024/11/28防火墙学习.html",revision:"47e1e9b55dae4ccb17f5c7469dead123"},{url:"博客/2024/11/29萤石云app接入.html",revision:"dc7a62214e7d792c0680f4e268ce54cd"},{url:"博客/2024/12/01默认路由.html",revision:"537bb83a6cdac9e56dcc4bacac15dc89"},{url:"博客/2024/12/02加班处理考勤掉线.html",revision:"296d784131acdca1ceb62d3067751b20"},{url:"博客/2024/12/04局域网路由.html",revision:"c1f808c73d9fef38c4d75e94659db81b"},{url:"博客/2024/12/12最近日常.html",revision:"05bc6287ff365e4357eb3ffbc39df01b"},{url:"博客/2024/index.html",revision:"8d734d7268cff9971e0d72ac4817fbd4"},{url:"博客/2025/01/01云贵之旅.html",revision:"2b05a7bc5c8c76d62a9ff406a4d7326a"},{url:"博客/2025/01/02新一年，新篇章.html",revision:"3f85c340da7b83583cac0549c4d62661"},{url:"博客/2025/01/05第八版博客发布.html",revision:"322e835ff4f1aedc5770190b763784e6"},{url:"博客/2025/index.html",revision:"67d72c5380929d19fda9b880bcb39be4"},{url:"博客/index.html",revision:"0677ff101cc91a239958178112e42625"},{url:"未标题-12.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"笔记/C++进阶/index.html",revision:"fa2594e2b40ed8847cad11b169914886"},{url:"笔记/C++进阶/Linux系统编程.html",revision:"f02ba191eb756266004d41560076e7d5"},{url:"笔记/C++进阶/Linux系统编程2.html",revision:"62fb57432fca312aa9b994a67a303167"},{url:"笔记/C++进阶/多进程.html",revision:"90532eecffc7e2436c88925d0140f903"},{url:"笔记/C++进阶/线程.html",revision:"77b81f0ae5d248ad2ddc709192d07c78"},{url:"笔记/CPP基础/CPP基础-1.html",revision:"0cd1cb6e377d63564705d69d1f84f390"},{url:"笔记/CPP基础/CPP基础-2.html",revision:"29b0bc24f0dc6780599d4ccd672e34f2"},{url:"笔记/CPP基础/index.html",revision:"8b7a42e0bd65bd8a0ee0cc8d502a48b1"},{url:"笔记/EnergyPlus/index.html",revision:"4ceeb86c588af1d5e6dc4206f700d464"},{url:"笔记/EnergyPlus/入门.html",revision:"600ceb8db2753c24656dda893a04e28e"},{url:"笔记/EnergyPlus/安装EnergyPlus环境.html",revision:"b1326c87871808a6e3eb523f63381a51"},{url:"笔记/index.html",revision:"32af8bb4d183463073cebc6f975de819"},{url:"笔记/Python/index.html",revision:"d252d298005b15e92ad9866ce3107045"},{url:"笔记/Python/Python入门.html",revision:"17fda9b086de0d68cfbc9ae22bfb6e54"},{url:"笔记/Python/Python基础.html",revision:"1a52c6b23edbbe775518e3cf30538f24"},{url:"笔记/Python/Python基础2.html",revision:"948b56b2f62674e96aa402fdc6f99d6c"},{url:"笔记/Sinergym项目/index.html",revision:"e3ceab61c9287e83352dea106cdaacbf"},{url:"笔记/Sinergym项目/sinergym学习.html",revision:"9b47ba5aaccab0fc18bf4d39c43f6cf0"},{url:"笔记/Sinergym项目/sinergym论文.html",revision:"88d6893bdabf731d93cd0ae557540bdd"},{url:"笔记/Sinergym项目/强化学习bilibili/强化学习1.html",revision:"98decd54dc2eac926a355d0e7b4f0f96"},{url:"笔记/UE4虚幻/index.html",revision:"8388654ff3d0e53d2295d01b7aa97dd5"},{url:"笔记/UE4虚幻/UE4CPP-1.html",revision:"41303bad829556ed1a36314bb1f15b37"},{url:"笔记/UE4虚幻/UE4CPP-2.html",revision:"4f8ef44ed03b0fef919355ae53fa8554"},{url:"笔记/入门/index.html",revision:"302445eda6edfe5856050d0112047351"},{url:"笔记/大型园区网络实战设计/1.园区网概述.html",revision:"72e37262836528865f44611e8037b549"},{url:"笔记/大型园区网络实战设计/2.路由交换设计.html",revision:"1cb7b1fa2b5cea37d54679bc42456a5c"},{url:"笔记/大型园区网络实战设计/index.html",revision:"1c8cfbb44428a80594a4346602fc706f"},{url:"笔记/杂项/index.html",revision:"7d15796e8044d147e27041aca9ec6f39"},{url:"笔记/杂项/snapd软件.html",revision:"dc95639948e45fd673929da5f9840568"},{url:"笔记/杂项/ubuntu安装软件教程.html",revision:"175587e2a6fe410f2cd142f7fbe39064"},{url:"笔记/杂项/如何用Python绘制焓湿图.html",revision:"468b6244f8b1b71b712768aad735f8eb"},{url:"笔记/杂项/安装linux 的 nodejs需要注意的问题.html",revision:"17141b0b77be645ca3e9c275f27b00c9"},{url:"笔记/杂项/解压软件.html",revision:"7a3f2bdc836ca8b934fa9b451a05f5bd"},{url:"笔记/桌面运维/index.html",revision:"cef4aae8940f725ead6fa6c25b4ff1f1"},{url:"笔记/桌面运维/磁盘损坏.html",revision:"cb34d60f58fe4b29c7f32f072ccf0337"},{url:"笔记/桌面运维/防火墙配置.html",revision:"100ddb27c2734eded194f4a5cf4ee832"},{url:"笔记/计算机网络/index.html",revision:"7af90bb3713a4cdc141d3b9be41b9128"},{url:"笔记/计算机网络/桌面运维/局域网文件共享.html",revision:"2f640a3cba1734716a27395ff61a9870"},{url:"笔记/计算机网络/桌面运维/微信清理工具.html",revision:"7f575f432c05673e2eb88eb0b56da4bc"},{url:"笔记/计算机网络/桌面运维/普通打印机共享.html",revision:"db0ef7df5e58c4253ef5fb10780c887a"},{url:"笔记/计算机网络/桌面运维/磁盘空间清理.html",revision:"d5fe4ab46d5c6bb606e311eb5f3a819c"},{url:"笔记/计算机网络/桌面运维/网络打印机.html",revision:"d4ac46c2b4baa81d8adc862327a62131"},{url:"笔记/计算机网络/网工.html",revision:"7edaf2bc1a71a635bcc4d048fd68d541"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
