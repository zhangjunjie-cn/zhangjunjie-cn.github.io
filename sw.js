if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>i(s,r),d={module:{uri:r},exports:a,require:u};e[r]=Promise.all(l.map((s=>d[s]||u(s)))).then((s=>(n(...s),a)))}}define(["./workbox-8a682eb8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"7e3019d75da16448ccd828ac2a0d336c"},{url:"8dd7a1cccc979328e9ca030c9fe44038.txt",revision:"512d042eadfa13f49ba74487a95d8c49"},{url:"archives.html",revision:"d48cddff7e91e7587de986c8db145f75"},{url:"assets/app.BedvvV4y.js",revision:null},{url:"assets/archives.md.DDnvKIt2.js",revision:null},{url:"assets/archives.md.DDnvKIt2.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.BMAuSqfG.js",revision:null},{url:"assets/chunks/article.data.CuMbQhiw.js",revision:null},{url:"assets/chunks/framework.ksdMcADN.js",revision:null},{url:"assets/chunks/theme.9pQ8dM16.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.NSo_RKWw.js",revision:null},{url:"assets/docs_index.md.CLUCwqx_.js",revision:null},{url:"assets/docs_index.md.CLUCwqx_.lean.js",revision:null},{url:"assets/fa-brands-400.BU4mH_I_.woff2",revision:null},{url:"assets/fa-regular-400.Cy4iLbxs.woff2",revision:null},{url:"assets/fa-solid-900.CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility.B9t6EWrS.woff2",revision:null},{url:"assets/image.CPMGMrSV.png",revision:null},{url:"assets/index.md.EAD17TON.js",revision:null},{url:"assets/index.md.EAD17TON.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_计算机网络_index.md.B9FGBhYQ.js",revision:null},{url:"assets/nav_计算机网络_index.md.B9FGBhYQ.lean.js",revision:null},{url:"assets/nav_运维_index.md.BebLuHEo.js",revision:null},{url:"assets/nav_运维_index.md.BebLuHEo.lean.js",revision:null},{url:"assets/nav.md.CbdR7Ksj.js",revision:null},{url:"assets/nav.md.CbdR7Ksj.lean.js",revision:null},{url:"assets/style.Cwx6ja3g.css",revision:null},{url:"assets/tags.md.TiLq-lFZ.js",revision:null},{url:"assets/tags.md.TiLq-lFZ.lean.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BKEzbCGQ.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BKEzbCGQ.lean.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.DGMabSJP.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.DGMabSJP.lean.js",revision:null},{url:"assets/博客_2024_02_index.md.DidzfvvK.js",revision:null},{url:"assets/博客_2024_02_index.md.DidzfvvK.lean.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.Dg_swB__.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.Dg_swB__.lean.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.DL7Rhug_.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.DL7Rhug_.lean.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.D2Gw8XRQ.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.D2Gw8XRQ.lean.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.BwqcIm8Q.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.BwqcIm8Q.lean.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.BIN6dR8b.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.BIN6dR8b.lean.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DgRYILWc.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DgRYILWc.lean.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.C70J_xiT.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.C70J_xiT.lean.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.BZxWuFNP.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.BZxWuFNP.lean.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C_svtoF8.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C_svtoF8.lean.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.DzceRIdH.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.DzceRIdH.lean.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.ZeewnAo_.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.ZeewnAo_.lean.js",revision:null},{url:"assets/博客_2024_11_23第七版博客发布.md.DUDt99TQ.js",revision:null},{url:"assets/博客_2024_11_23第七版博客发布.md.DUDt99TQ.lean.js",revision:null},{url:"assets/博客_2024_11_25开始记录生活.md.pMTaBnY_.js",revision:null},{url:"assets/博客_2024_11_25开始记录生活.md.pMTaBnY_.lean.js",revision:null},{url:"assets/博客_2024_11_26周二的一天.md.7RQA0Jqf.js",revision:null},{url:"assets/博客_2024_11_26周二的一天.md.7RQA0Jqf.lean.js",revision:null},{url:"assets/博客_2024_11_27Daily Notes.md.Mk8KMNRo.js",revision:null},{url:"assets/博客_2024_11_27Daily Notes.md.Mk8KMNRo.lean.js",revision:null},{url:"assets/博客_2024_index.md.DWRUZgA4.js",revision:null},{url:"assets/博客_2024_index.md.DWRUZgA4.lean.js",revision:null},{url:"assets/博客_index.md.DA-s0j7F.js",revision:null},{url:"assets/博客_index.md.DA-s0j7F.lean.js",revision:null},{url:"assets/笔记_C__进阶_index.md.DVRG5yYF.js",revision:null},{url:"assets/笔记_C__进阶_index.md.DVRG5yYF.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.T8MK5gCO.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.T8MK5gCO.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DCEnstsv.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DCEnstsv.lean.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.iTiIyTa2.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.iTiIyTa2.lean.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CMiUW3p3.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CMiUW3p3.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.aK4F5C0j.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.aK4F5C0j.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.CEIhPoxu.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.CEIhPoxu.lean.js",revision:null},{url:"assets/笔记_CPP基础_index.md.Em3pFeET.js",revision:null},{url:"assets/笔记_CPP基础_index.md.Em3pFeET.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_index.md.-ecijkai.js",revision:null},{url:"assets/笔记_EnergyPlus_index.md.-ecijkai.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Czb0boMV.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Czb0boMV.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BZzim933.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BZzim933.lean.js",revision:null},{url:"assets/笔记_index.md.Ca1MClPE.js",revision:null},{url:"assets/笔记_index.md.Ca1MClPE.lean.js",revision:null},{url:"assets/笔记_Python_index.md.Bwn6e8bU.js",revision:null},{url:"assets/笔记_Python_index.md.Bwn6e8bU.lean.js",revision:null},{url:"assets/笔记_Python_Python入门.md.Bz9Qk38u.js",revision:null},{url:"assets/笔记_Python_Python入门.md.Bz9Qk38u.lean.js",revision:null},{url:"assets/笔记_Python_Python基础.md.B0r-8sGE.js",revision:null},{url:"assets/笔记_Python_Python基础.md.B0r-8sGE.lean.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.23u7wy5U.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.23u7wy5U.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.eaqjVA75.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.eaqjVA75.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_index.md.DwugEXLJ.js",revision:null},{url:"assets/笔记_Sinergym项目_index.md.DwugEXLJ.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.D4BpdMUQ.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.D4BpdMUQ.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.C_GMoSJd.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.C_GMoSJd.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.D26ag7nv.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.D26ag7nv.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_index.md.NkQD2o8I.js",revision:null},{url:"assets/笔记_UE4虚幻_index.md.NkQD2o8I.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.BAWRuVIL.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.BAWRuVIL.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.DBt5uOKT.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.DBt5uOKT.lean.js",revision:null},{url:"assets/笔记_入门_index.md.BQ22mcnD.js",revision:null},{url:"assets/笔记_入门_index.md.BQ22mcnD.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.B4hMGEC5.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.B4hMGEC5.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.DRraBk_G.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.DRraBk_G.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_index.md.BFnZMESY.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_index.md.BFnZMESY.lean.js",revision:null},{url:"assets/笔记_杂项_index.md.CY-lSHKJ.js",revision:null},{url:"assets/笔记_杂项_index.md.CY-lSHKJ.lean.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.DESb5qFo.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.DESb5qFo.lean.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.B3h-NCxm.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.B3h-NCxm.lean.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.BBlvCJUC.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.BBlvCJUC.lean.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.BNlhw4kJ.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.BNlhw4kJ.lean.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.BucK-ugb.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.BucK-ugb.lean.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.C4xi7isG.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.C4xi7isG.lean.js",revision:null},{url:"assets/笔记_桌面运维_index.md.CxioJlxy.js",revision:null},{url:"assets/笔记_桌面运维_index.md.CxioJlxy.lean.js",revision:null},{url:"assets/笔记_桌面运维_磁盘损坏.md.ByGo0_4p.js",revision:null},{url:"assets/笔记_桌面运维_磁盘损坏.md.ByGo0_4p.lean.js",revision:null},{url:"assets/笔记_桌面运维_防火墙配置.md.BdazwmNP.js",revision:null},{url:"assets/笔记_桌面运维_防火墙配置.md.BdazwmNP.lean.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Vh3chNfE.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Vh3chNfE.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DpQX4L80.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DpQX4L80.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.DUjZqN_o.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.DUjZqN_o.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DzB7OhXV.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DzB7OhXV.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.D4gZQVIo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.D4gZQVIo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.UIfcrrOh.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.UIfcrrOh.lean.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.CD7YoU7z.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.CD7YoU7z.lean.js",revision:null},{url:"docs/index.html",revision:"dbdee092afca414d96436bd9c2fffa73"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"6f90e4ceaeba6265d287136ab92726fa"},{url:"img/svg/about-repos-header.svg",revision:"2a15a863832adc536bf95cc3f0f6eb56"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"index.html",revision:"3316bcd0e3e461a8fdad90fba4a7b8a7"},{url:"logo.png",revision:"711c445a59ecf03e12cf2b23a6b340e3"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav.html",revision:"d1ef646783b06f673ebc6df429b66237"},{url:"nav/计算机网络/index.html",revision:"9dcd9368ed3a3d2d77cfc291672e90d4"},{url:"nav/运维/index.html",revision:"322ed06ae41860a92ee3071902989215"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"tags.html",revision:"08e87eb2b3234c8fb8b40e7eb8fe57d5"},{url:"博客/2024/02/10第二版博客搭建完成.html",revision:"09302cb8708c857c3a116a3c07d61f7a"},{url:"博客/2024/02/11新年快乐.html",revision:"862fe454e6b43457991181d2a24fe705"},{url:"博客/2024/02/index.html",revision:"309cf39f01397d9c99655ca9eacc18b4"},{url:"博客/2024/05/05第三版博客搭建完成.html",revision:"ed48c5d02c2139ba97016486cd06ca8b"},{url:"博客/2024/05/11第四版博客新题性.html",revision:"0da73e649a2dabce95b75aaa72282c38"},{url:"博客/2024/05/23第五版博客发布完成.html",revision:"8aa7a89e7ac7834a9e38d49ce2e74182"},{url:"博客/2024/05/26HA综合布线.html",revision:"cab718c972eb1b3c45d2af6e4dd767b0"},{url:"博客/2024/05/29打印机共享.html",revision:"6edf5b0e447648b0e4954995165e2fdd"},{url:"博客/2024/06/02性能优化.html",revision:"0b22dd185d73c670668cfc95341df574"},{url:"博客/2024/06/03Excel大小优化.html",revision:"98b9d2bbe7dbe6ffc2cface4b2bf2ff8"},{url:"博客/2024/06/10更好的svg集成.html",revision:"f933ae07140f3c3b173c143362185993"},{url:"博客/2024/06/17商业报告模板.html",revision:"0536ce99a9d060b374de777ff5f36b5b"},{url:"博客/2024/07/21快速开发流程.html",revision:"438f8406bf1219595fbd75a4ae70fd66"},{url:"博客/2024/08/18第六版博客发布.html",revision:"334238568d09b4eafdfc5a36a3d1eb3d"},{url:"博客/2024/11/23第七版博客发布.html",revision:"c3d0a0c7f3247b6f15b43ff1f298c312"},{url:"博客/2024/11/25开始记录生活.html",revision:"fcf8beb524e7e882847134993935c725"},{url:"博客/2024/11/26周二的一天.html",revision:"9698b459c85f2710b2aace4dcc320c27"},{url:"博客/2024/11/27Daily Notes.html",revision:"0caa2c30da3552660c98fc6dcf12bf37"},{url:"博客/2024/index.html",revision:"8212467d625e9d099e84b5eaf33cf3c7"},{url:"博客/index.html",revision:"1afb65373b31606a0ce16a4f0cc712d9"},{url:"未标题-12.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"笔记/C++进阶/index.html",revision:"a12f08b6ad6e21695a882c135342395d"},{url:"笔记/C++进阶/Linux系统编程.html",revision:"a5db4a23ca116863e3ad0b89f2676d0c"},{url:"笔记/C++进阶/Linux系统编程2.html",revision:"81a548e2d45dcfc43a39f0142a374f8a"},{url:"笔记/C++进阶/多进程.html",revision:"4bac3ee36ff2d18697b9ed374b0c7fdb"},{url:"笔记/C++进阶/线程.html",revision:"0d6615a30bdc8763ea0ddc6f383292e6"},{url:"笔记/CPP基础/CPP基础-1.html",revision:"fc3c3e19d6323fbcf4609efe4560c61f"},{url:"笔记/CPP基础/CPP基础-2.html",revision:"58173614fd4c54b612e20f39ecb13697"},{url:"笔记/CPP基础/index.html",revision:"106a26333071949642a110b879ceb3a9"},{url:"笔记/EnergyPlus/index.html",revision:"a323c5eaef42b79fa9018877d48d244a"},{url:"笔记/EnergyPlus/入门.html",revision:"beefc882d35dbcab2415b692bd50af86"},{url:"笔记/EnergyPlus/安装EnergyPlus环境.html",revision:"5156c6ebc207e18e8a663b5f5303e06d"},{url:"笔记/index.html",revision:"1d0b1327360a68256ed81d6c9135c434"},{url:"笔记/Python/index.html",revision:"cc06d065b6ed68bbfcdf08f90f3ccd01"},{url:"笔记/Python/Python入门.html",revision:"6a72f4f7052329c198fc3fb534f80a0b"},{url:"笔记/Python/Python基础.html",revision:"856ad47ed203473f5ee4f0c3e98bdcbc"},{url:"笔记/Python/Python基础2.html",revision:"0ce3557826b6e97d9243aacd83689520"},{url:"笔记/Sinergym项目/gym互联网相关资料.html",revision:"953d1b25eb89e7fba0a8f49da27de8a5"},{url:"笔记/Sinergym项目/index.html",revision:"ec8702bce741835c95d9983b646895f1"},{url:"笔记/Sinergym项目/sinergym学习.html",revision:"79fb09799316d0d3e0abb75cf61edc46"},{url:"笔记/Sinergym项目/sinergym论文.html",revision:"e9f232e28c0feb6b1dd0ccdcf6d16488"},{url:"笔记/Sinergym项目/强化学习bilibili/强化学习1.html",revision:"505ccc0b02d3a24ccb22809b7f88ed2a"},{url:"笔记/UE4虚幻/index.html",revision:"75665cd2752e8c39b163a66ace8bd51d"},{url:"笔记/UE4虚幻/UE4CPP-1.html",revision:"8c299b6f72eef911a83152db8512a62b"},{url:"笔记/UE4虚幻/UE4CPP-2.html",revision:"d7fe64014b55772d9eddb0d52f45d9b4"},{url:"笔记/入门/index.html",revision:"c33ff5cfa59c674559b6ad0d4a515333"},{url:"笔记/大型园区网络实战设计/1.园区网概述.html",revision:"259d603dd18e591e54e41018ed0aa5c4"},{url:"笔记/大型园区网络实战设计/2.路由交换设计.html",revision:"65c83b485bf37af18c2d43fdeeba6b04"},{url:"笔记/大型园区网络实战设计/index.html",revision:"e2199e2d77307b92c177826f6bbbb11e"},{url:"笔记/杂项/index.html",revision:"e24e7c0aad7bb92312a9260cfb321486"},{url:"笔记/杂项/snapd软件.html",revision:"b00614f2bbebac94a9111fa3ec01f131"},{url:"笔记/杂项/ubuntu安装软件教程.html",revision:"71b49dfdd1a418b4918965ae9a3d494d"},{url:"笔记/杂项/如何用Python绘制焓湿图.html",revision:"c5dfeef780e74c4b3715e065cbf16f0c"},{url:"笔记/杂项/安装linux 的 nodejs需要注意的问题.html",revision:"0c1bfa12f114ad00ce58af266ec45381"},{url:"笔记/杂项/安装ubuntu版本的idea教程.html",revision:"5665e7a3a69f9afc178663df07fb66bc"},{url:"笔记/杂项/解压软件.html",revision:"74026a633ee0c9432bc8421990b9c402"},{url:"笔记/桌面运维/index.html",revision:"afbf703f7cb8922f2678161197a136f7"},{url:"笔记/桌面运维/磁盘损坏.html",revision:"98424bc7c351b24f1cb243d81bd7a534"},{url:"笔记/桌面运维/防火墙配置.html",revision:"9b0f8186033ded8187776538997e6634"},{url:"笔记/计算机网络/index.html",revision:"61c8bb2bdbea68022e5bccf7916e36ab"},{url:"笔记/计算机网络/桌面运维/局域网文件共享.html",revision:"b7556fd33e2ec53bae3029da42efed22"},{url:"笔记/计算机网络/桌面运维/微信清理工具.html",revision:"2e1edaa27881e7ad7d71304ac6b32845"},{url:"笔记/计算机网络/桌面运维/普通打印机共享.html",revision:"d7f3f782ec137a9c480d6e9b7666aee8"},{url:"笔记/计算机网络/桌面运维/磁盘空间清理.html",revision:"5b49196328d25df756629e079c353fc6"},{url:"笔记/计算机网络/桌面运维/网络打印机.html",revision:"0d577b97c4dee2e09b03da97d679830b"},{url:"笔记/计算机网络/网工.html",revision:"5728b806fe32a47d0edd7d7d4c211645"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
