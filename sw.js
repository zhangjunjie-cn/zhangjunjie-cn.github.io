if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),d={module:{uri:r},exports:a,require:u};e[r]=Promise.all(i.map((s=>d[s]||u(s)))).then((s=>(n(...s),a)))}}define(["./workbox-8a682eb8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"be326f9058f95359d8b088eb0ba84770"},{url:"8dd7a1cccc979328e9ca030c9fe44038.txt",revision:"512d042eadfa13f49ba74487a95d8c49"},{url:"archives.html",revision:"d294849b7486eebb76bf5602e0288f59"},{url:"assets/app.B7Jr6feF.js",revision:null},{url:"assets/archives.md.Dx550jqq.js",revision:null},{url:"assets/archives.md.Dx550jqq.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.Blr82Yqn.js",revision:null},{url:"assets/chunks/article.data.BDmsq79X.js",revision:null},{url:"assets/chunks/framework.ksdMcADN.js",revision:null},{url:"assets/chunks/theme.FQCQ24Zg.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.B8vapk2O.js",revision:null},{url:"assets/docs_index.md.Dh_pZu1J.js",revision:null},{url:"assets/docs_index.md.Dh_pZu1J.lean.js",revision:null},{url:"assets/fa-brands-400.BU4mH_I_.woff2",revision:null},{url:"assets/fa-regular-400.Cy4iLbxs.woff2",revision:null},{url:"assets/fa-solid-900.CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility.B9t6EWrS.woff2",revision:null},{url:"assets/image.CPMGMrSV.png",revision:null},{url:"assets/index.md.CbtbVxFy.js",revision:null},{url:"assets/index.md.CbtbVxFy.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_计算机网络_index.md.B9FGBhYQ.js",revision:null},{url:"assets/nav_计算机网络_index.md.B9FGBhYQ.lean.js",revision:null},{url:"assets/nav_运维_index.md.08pfkLZX.js",revision:null},{url:"assets/nav_运维_index.md.08pfkLZX.lean.js",revision:null},{url:"assets/nav.md.CbdR7Ksj.js",revision:null},{url:"assets/nav.md.CbdR7Ksj.lean.js",revision:null},{url:"assets/style.D-TDt9_7.css",revision:null},{url:"assets/tags.md.AlWEmfnl.js",revision:null},{url:"assets/tags.md.AlWEmfnl.lean.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BbtIvon8.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BbtIvon8.lean.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.BIksr78a.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.BIksr78a.lean.js",revision:null},{url:"assets/博客_2024_02_index.md.DidzfvvK.js",revision:null},{url:"assets/博客_2024_02_index.md.DidzfvvK.lean.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.Dg_swB__.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.Dg_swB__.lean.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.B96f0mmN.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.B96f0mmN.lean.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.D2Gw8XRQ.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.D2Gw8XRQ.lean.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.BwqcIm8Q.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.BwqcIm8Q.lean.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.BIN6dR8b.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.BIN6dR8b.lean.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DAVOK1ug.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DAVOK1ug.lean.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.C70J_xiT.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.C70J_xiT.lean.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.D4_GNJTI.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.D4_GNJTI.lean.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C_svtoF8.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C_svtoF8.lean.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.uRai6KIz.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.uRai6KIz.lean.js",revision:null},{url:"assets/博客_2024_11_23第七版博客发布.md.CmobYvvy.js",revision:null},{url:"assets/博客_2024_11_23第七版博客发布.md.CmobYvvy.lean.js",revision:null},{url:"assets/博客_2024_11_25开始记录生活.md.pMTaBnY_.js",revision:null},{url:"assets/博客_2024_11_25开始记录生活.md.pMTaBnY_.lean.js",revision:null},{url:"assets/博客_2024_11_26周二的一天.md.7RQA0Jqf.js",revision:null},{url:"assets/博客_2024_11_26周二的一天.md.7RQA0Jqf.lean.js",revision:null},{url:"assets/博客_2024_11_27Daily Notes.md.Mk8KMNRo.js",revision:null},{url:"assets/博客_2024_11_27Daily Notes.md.Mk8KMNRo.lean.js",revision:null},{url:"assets/博客_2024_11_28防火墙学习.md.COeLSLGW.js",revision:null},{url:"assets/博客_2024_11_28防火墙学习.md.COeLSLGW.lean.js",revision:null},{url:"assets/博客_2024_11_29萤石云app接入.md.RVgfDd6X.js",revision:null},{url:"assets/博客_2024_11_29萤石云app接入.md.RVgfDd6X.lean.js",revision:null},{url:"assets/博客_2024_12_01默认路由.md.BcyxsWK7.js",revision:null},{url:"assets/博客_2024_12_01默认路由.md.BcyxsWK7.lean.js",revision:null},{url:"assets/博客_2024_12_02加班处理考勤掉线.md.BQj60CZo.js",revision:null},{url:"assets/博客_2024_12_02加班处理考勤掉线.md.BQj60CZo.lean.js",revision:null},{url:"assets/博客_2024_12_04局域网路由.md.Cm1iQ8pR.js",revision:null},{url:"assets/博客_2024_12_04局域网路由.md.Cm1iQ8pR.lean.js",revision:null},{url:"assets/博客_2024_12_12最近日常.md.D_aRct_H.js",revision:null},{url:"assets/博客_2024_12_12最近日常.md.D_aRct_H.lean.js",revision:null},{url:"assets/博客_2024_index.md.Byigs-oK.js",revision:null},{url:"assets/博客_2024_index.md.Byigs-oK.lean.js",revision:null},{url:"assets/博客_2025_01_01云贵之旅.md.CI45mIk2.js",revision:null},{url:"assets/博客_2025_01_01云贵之旅.md.CI45mIk2.lean.js",revision:null},{url:"assets/博客_2025_01_02新一年，新篇章.md.MrVX6rsP.js",revision:null},{url:"assets/博客_2025_01_02新一年，新篇章.md.MrVX6rsP.lean.js",revision:null},{url:"assets/博客_2025_01_05第八版博客发布.md.DdR_-kQ5.js",revision:null},{url:"assets/博客_2025_01_05第八版博客发布.md.DdR_-kQ5.lean.js",revision:null},{url:"assets/博客_2025_01_12双栏布局.md.DmgK0v9_.js",revision:null},{url:"assets/博客_2025_01_12双栏布局.md.DmgK0v9_.lean.js",revision:null},{url:"assets/博客_2025_01_16工作日常.md.Di4r_o0w.js",revision:null},{url:"assets/博客_2025_01_16工作日常.md.Di4r_o0w.lean.js",revision:null},{url:"assets/博客_2025_index.md.q-3cSDpY.js",revision:null},{url:"assets/博客_2025_index.md.q-3cSDpY.lean.js",revision:null},{url:"assets/博客_index.md.EhlkpbOj.js",revision:null},{url:"assets/博客_index.md.EhlkpbOj.lean.js",revision:null},{url:"assets/笔记_C__进阶_index.md.DVRG5yYF.js",revision:null},{url:"assets/笔记_C__进阶_index.md.DVRG5yYF.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.T8MK5gCO.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.T8MK5gCO.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DCEnstsv.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DCEnstsv.lean.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.iTiIyTa2.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.iTiIyTa2.lean.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CMiUW3p3.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CMiUW3p3.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.aK4F5C0j.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.aK4F5C0j.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.CEIhPoxu.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.CEIhPoxu.lean.js",revision:null},{url:"assets/笔记_CPP基础_index.md.Em3pFeET.js",revision:null},{url:"assets/笔记_CPP基础_index.md.Em3pFeET.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_index.md.-ecijkai.js",revision:null},{url:"assets/笔记_EnergyPlus_index.md.-ecijkai.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Czb0boMV.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Czb0boMV.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BZzim933.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BZzim933.lean.js",revision:null},{url:"assets/笔记_index.md.Ca1MClPE.js",revision:null},{url:"assets/笔记_index.md.Ca1MClPE.lean.js",revision:null},{url:"assets/笔记_Python_index.md.Bwn6e8bU.js",revision:null},{url:"assets/笔记_Python_index.md.Bwn6e8bU.lean.js",revision:null},{url:"assets/笔记_Python_Python入门.md.Bz9Qk38u.js",revision:null},{url:"assets/笔记_Python_Python入门.md.Bz9Qk38u.lean.js",revision:null},{url:"assets/笔记_Python_Python基础.md.B0r-8sGE.js",revision:null},{url:"assets/笔记_Python_Python基础.md.B0r-8sGE.lean.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.23u7wy5U.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.23u7wy5U.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_index.md.DwugEXLJ.js",revision:null},{url:"assets/笔记_Sinergym项目_index.md.DwugEXLJ.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.D4BpdMUQ.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.D4BpdMUQ.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.C_GMoSJd.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.C_GMoSJd.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.D26ag7nv.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.D26ag7nv.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_index.md.NkQD2o8I.js",revision:null},{url:"assets/笔记_UE4虚幻_index.md.NkQD2o8I.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.BAWRuVIL.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.BAWRuVIL.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.DBt5uOKT.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.DBt5uOKT.lean.js",revision:null},{url:"assets/笔记_入门_index.md.BQ22mcnD.js",revision:null},{url:"assets/笔记_入门_index.md.BQ22mcnD.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.B4hMGEC5.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.B4hMGEC5.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.DRraBk_G.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.DRraBk_G.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_index.md.BFnZMESY.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_index.md.BFnZMESY.lean.js",revision:null},{url:"assets/笔记_杂项_index.md.CY-lSHKJ.js",revision:null},{url:"assets/笔记_杂项_index.md.CY-lSHKJ.lean.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.DESb5qFo.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.DESb5qFo.lean.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.B3h-NCxm.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.B3h-NCxm.lean.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.BBlvCJUC.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.BBlvCJUC.lean.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.BNlhw4kJ.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.BNlhw4kJ.lean.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.C4xi7isG.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.C4xi7isG.lean.js",revision:null},{url:"assets/笔记_桌面运维_index.md.CxioJlxy.js",revision:null},{url:"assets/笔记_桌面运维_index.md.CxioJlxy.lean.js",revision:null},{url:"assets/笔记_桌面运维_磁盘损坏.md.JSGgaHLu.js",revision:null},{url:"assets/笔记_桌面运维_磁盘损坏.md.JSGgaHLu.lean.js",revision:null},{url:"assets/笔记_桌面运维_防火墙配置.md.BdazwmNP.js",revision:null},{url:"assets/笔记_桌面运维_防火墙配置.md.BdazwmNP.lean.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Vh3chNfE.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Vh3chNfE.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DpQX4L80.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DpQX4L80.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.DUjZqN_o.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.DUjZqN_o.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DzB7OhXV.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DzB7OhXV.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.D4gZQVIo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.D4gZQVIo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.UIfcrrOh.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.UIfcrrOh.lean.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.CD7YoU7z.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.CD7YoU7z.lean.js",revision:null},{url:"assets/笔记_雾都夜话_情感之言.md.VQlVqLm9.js",revision:null},{url:"assets/笔记_雾都夜话_情感之言.md.VQlVqLm9.lean.js",revision:null},{url:"docs/index.html",revision:"0b6d950584159afaf658be899ce43fd9"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"6f90e4ceaeba6265d287136ab92726fa"},{url:"img/svg/about-repos-header.svg",revision:"2a15a863832adc536bf95cc3f0f6eb56"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"index.html",revision:"572f95378c31bc0fb06f7cdf7fedeecb"},{url:"logo.png",revision:"711c445a59ecf03e12cf2b23a6b340e3"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav.html",revision:"e6f228a499f395c6a9f1c94444bdacd0"},{url:"nav/计算机网络/index.html",revision:"7ffb7af11b3cecbaa1cc92c4952742b8"},{url:"nav/运维/index.html",revision:"c99a01cb7d8aa031b6b3cd515d282f56"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"tags.html",revision:"4b8ce1eafdc52e5a06b3548165245727"},{url:"博客/2024/02/10第二版博客搭建完成.html",revision:"6d17c5dc06cb9065a4d2e85a56540bd9"},{url:"博客/2024/02/11新年快乐.html",revision:"c932ce0ae4601f563239e29710a5b259"},{url:"博客/2024/02/index.html",revision:"bdc430666132e3ae93a9270d2033d489"},{url:"博客/2024/05/05第三版博客搭建完成.html",revision:"5952236f1f0e7a9d9a32f4a0df552226"},{url:"博客/2024/05/11第四版博客新题性.html",revision:"9fea95d6f78eb2db909f7155cb617599"},{url:"博客/2024/05/23第五版博客发布完成.html",revision:"58c0f66ee31b528398390ef13e164e23"},{url:"博客/2024/05/26HA综合布线.html",revision:"daf9ecaa195d08fd74626ad63c0493ed"},{url:"博客/2024/05/29打印机共享.html",revision:"774e6e8d93bc9bc5e26b617c7a1d9fe5"},{url:"博客/2024/06/02性能优化.html",revision:"a985f06ee1bea25f5121e75b893432d6"},{url:"博客/2024/06/03Excel大小优化.html",revision:"572097fae2fadc6686ac42877b8a451b"},{url:"博客/2024/06/10更好的svg集成.html",revision:"d6d267eb3e1b63132a666727708e509b"},{url:"博客/2024/06/17商业报告模板.html",revision:"def0a7e81c66e45666f8c922691039b8"},{url:"博客/2024/08/18第六版博客发布.html",revision:"7e9f6a20ef2465f84a6822f03a35e1f8"},{url:"博客/2024/11/23第七版博客发布.html",revision:"acad8ffc29a74d2871f8c31ac2e3fa5e"},{url:"博客/2024/11/25开始记录生活.html",revision:"407a2153829cc3e62d8a0549eb1208aa"},{url:"博客/2024/11/26周二的一天.html",revision:"c646e2c1095663d645010832cbcd0a79"},{url:"博客/2024/11/27Daily Notes.html",revision:"727817d200aa337204c181d1fed054f2"},{url:"博客/2024/11/28防火墙学习.html",revision:"edd1bab0d429f35300c1faf191ba98b7"},{url:"博客/2024/11/29萤石云app接入.html",revision:"98c00ff7625955d631c97375c35e29aa"},{url:"博客/2024/12/01默认路由.html",revision:"7608dec93701afac4d5a28da701eae43"},{url:"博客/2024/12/02加班处理考勤掉线.html",revision:"e1a9ba8fe23c4ba5b4f0f54f574f987c"},{url:"博客/2024/12/04局域网路由.html",revision:"fac1adadf5499a0f31cf479d30d5b61d"},{url:"博客/2024/12/12最近日常.html",revision:"4d4b2c0ede0592abaeb145eb8f7e8eed"},{url:"博客/2024/index.html",revision:"802c4ee02e5b98dfd05ab16ab50d7e6e"},{url:"博客/2025/01/01云贵之旅.html",revision:"4cafc8969c948abb65d158a11e373462"},{url:"博客/2025/01/02新一年，新篇章.html",revision:"1edc0f1ebba0f749fda01baacc497014"},{url:"博客/2025/01/05第八版博客发布.html",revision:"d51af21f809d0fbf6c1ec3de452358de"},{url:"博客/2025/01/12双栏布局.html",revision:"211de4edfef6c9aef326ae6dab1feaa2"},{url:"博客/2025/01/16工作日常.html",revision:"a02ae3ff42fed9a9f19452d51c8159e2"},{url:"博客/2025/index.html",revision:"e8dc3d6ba6900c31e7359af663fdb23a"},{url:"博客/index.html",revision:"04e933ade4fd79f95567a1a96666b9c8"},{url:"未标题-12.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"笔记/C++进阶/index.html",revision:"d3f3fa077f588977b9283cb65b5c739e"},{url:"笔记/C++进阶/Linux系统编程.html",revision:"0cd19f203c772d010f3c06c2bf831f26"},{url:"笔记/C++进阶/Linux系统编程2.html",revision:"04c772775701844e1bedc6bdbe48cbdc"},{url:"笔记/C++进阶/多进程.html",revision:"ad92d3210c80791b860397f1d722f9c3"},{url:"笔记/C++进阶/线程.html",revision:"ecd38cc838c6bb6241e3c0f743eaa16d"},{url:"笔记/CPP基础/CPP基础-1.html",revision:"c16ac00fd56a48ca7a4ef24217e3b979"},{url:"笔记/CPP基础/CPP基础-2.html",revision:"d44d37e7e101ae3f704ca80e28b69cee"},{url:"笔记/CPP基础/index.html",revision:"7b980d4e60a7b094371ce51726d4e1a6"},{url:"笔记/EnergyPlus/index.html",revision:"baef503b5f63636698880e2e09cb1194"},{url:"笔记/EnergyPlus/入门.html",revision:"683953a7ed2ee6208b662d9881b9e35f"},{url:"笔记/EnergyPlus/安装EnergyPlus环境.html",revision:"74c4a441ec84256860fa82749519d7fe"},{url:"笔记/index.html",revision:"daf0bd8f50cca1c2a0472bbb514d8e63"},{url:"笔记/Python/index.html",revision:"61a094b30fc304a364e1fc7a029ae90b"},{url:"笔记/Python/Python入门.html",revision:"0dbe504908edf4c9563a6c2bf154ac52"},{url:"笔记/Python/Python基础.html",revision:"b0a5858b0dd30950f3dd49a332a092a1"},{url:"笔记/Python/Python基础2.html",revision:"cfeaa8c64fd318997471f22c43285cc1"},{url:"笔记/Sinergym项目/index.html",revision:"74dd67ebeeb4b3a9167b665d49530f79"},{url:"笔记/Sinergym项目/sinergym学习.html",revision:"46c8a41bf6494d3ac886fde19e528bdd"},{url:"笔记/Sinergym项目/sinergym论文.html",revision:"843383990c4608216bb63371457eb09a"},{url:"笔记/Sinergym项目/强化学习bilibili/强化学习1.html",revision:"3c9817e0bb14a5fb92e983366d12421a"},{url:"笔记/UE4虚幻/index.html",revision:"6ea29467adac7dbf8edda68822361c7b"},{url:"笔记/UE4虚幻/UE4CPP-1.html",revision:"6a1e163339b638532cb30674f4a274e9"},{url:"笔记/UE4虚幻/UE4CPP-2.html",revision:"eb5daeca28df0bccb2d32a0e6a8bb35a"},{url:"笔记/入门/index.html",revision:"c68deb0f77775d2122e91d8955a47643"},{url:"笔记/大型园区网络实战设计/1.园区网概述.html",revision:"7154e1475418d6ca63c4fa88567cd2a3"},{url:"笔记/大型园区网络实战设计/2.路由交换设计.html",revision:"a387ea519b6563f0ce627752e6236d8c"},{url:"笔记/大型园区网络实战设计/index.html",revision:"2eb900cc4d39fc9f4b818e6d06d4b654"},{url:"笔记/杂项/index.html",revision:"fd58790187965cfd3b24a0bfc8edf666"},{url:"笔记/杂项/snapd软件.html",revision:"04aeac02fab7e6149a20fbacfabeadf9"},{url:"笔记/杂项/ubuntu安装软件教程.html",revision:"e0cd4f08bbcf1c2f654b613f0724d480"},{url:"笔记/杂项/如何用Python绘制焓湿图.html",revision:"f3dacb7677bde1b858c65800b946c41e"},{url:"笔记/杂项/安装linux 的 nodejs需要注意的问题.html",revision:"ae294c58131a5172784a8d430aff26a9"},{url:"笔记/杂项/解压软件.html",revision:"bd9a813be42ccfb0eca8884d24df2d5f"},{url:"笔记/桌面运维/index.html",revision:"cd11b663dcd8e95cb4202f732b2e839b"},{url:"笔记/桌面运维/磁盘损坏.html",revision:"d8e0971bca3dced274b46e020542db20"},{url:"笔记/桌面运维/防火墙配置.html",revision:"faf72efd7f8ec46e687ef573c98da878"},{url:"笔记/计算机网络/index.html",revision:"857207a6da8d915f4189d77a5ac08894"},{url:"笔记/计算机网络/桌面运维/局域网文件共享.html",revision:"aba33951e2849f88c9d635dc2623a091"},{url:"笔记/计算机网络/桌面运维/微信清理工具.html",revision:"f6f91e5f5f5c866b970186f3fe277339"},{url:"笔记/计算机网络/桌面运维/普通打印机共享.html",revision:"24d2b5aebfe1a5ef6850aaf3eb140aaf"},{url:"笔记/计算机网络/桌面运维/磁盘空间清理.html",revision:"8f353c4fa03030a2d82f903509077259"},{url:"笔记/计算机网络/桌面运维/网络打印机.html",revision:"2e097149b1c3656a39e892f74056ca65"},{url:"笔记/计算机网络/网工.html",revision:"f7b3065bb4a4b870c8df8f119025f8a1"},{url:"笔记/雾都夜话/情感之言.html",revision:"55d3a527b832b66b2b40f9d75c05c945"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
