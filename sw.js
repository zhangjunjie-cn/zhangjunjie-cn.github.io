if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),d={module:{uri:r},exports:a,require:u};e[r]=Promise.all(n.map((s=>d[s]||u(s)))).then((s=>(i(...s),a)))}}define(["./workbox-a7491250"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"e4854f2054ca8bb76874b3a26ffb5326"},{url:"assets/app.WfhPMnqL.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.Bws38kJ_.js",revision:null},{url:"assets/chunks/framework.DhOjAug6.js",revision:null},{url:"assets/chunks/index.BNnYFWcz.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.CfNs8s07.js",revision:null},{url:"assets/docs_index.md.Djv1Bs6w.js",revision:null},{url:"assets/docs_index.md.Djv1Bs6w.lean.js",revision:null},{url:"assets/hengan_print.md.5FneI6QA.js",revision:null},{url:"assets/hengan_print.md.5FneI6QA.lean.js",revision:null},{url:"assets/hengan_share.md.Cm9N52IC.js",revision:null},{url:"assets/hengan_share.md.Cm9N52IC.lean.js",revision:null},{url:"assets/image.CPMGMrSV.png",revision:null},{url:"assets/index.md.11UUQvAX.js",revision:null},{url:"assets/index.md.11UUQvAX.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_计算机网络_index.md.C4EtsKov.js",revision:null},{url:"assets/nav_计算机网络_index.md.C4EtsKov.lean.js",revision:null},{url:"assets/nav_运维_index.md.DvNZpBxX.js",revision:null},{url:"assets/nav_运维_index.md.DvNZpBxX.lean.js",revision:null},{url:"assets/nav.md.pwnTRWmY.js",revision:null},{url:"assets/nav.md.pwnTRWmY.lean.js",revision:null},{url:"assets/style.D_zdIyfV.css",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BlZZlJpS.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BlZZlJpS.lean.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.C3SZBOZC.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.C3SZBOZC.lean.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.D4eVmS8p.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.D4eVmS8p.lean.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.CAlrkqiA.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.CAlrkqiA.lean.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.BttDPBNn.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.BttDPBNn.lean.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.Cxd4SiMK.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.Cxd4SiMK.lean.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.DRyVV5lw.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.DRyVV5lw.lean.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.Cd8qZ8g-.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.Cd8qZ8g-.lean.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.WdP4G7ed.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.WdP4G7ed.lean.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.DwMWSSVJ.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.DwMWSSVJ.lean.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C0giyY8g.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C0giyY8g.lean.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.BR6C_6_C.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.BR6C_6_C.lean.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.DiRqyO0N.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.DiRqyO0N.lean.js",revision:null},{url:"assets/博客_index.md.BLl8kQIh.js",revision:null},{url:"assets/博客_index.md.BLl8kQIh.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.L_sV6fld.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.L_sV6fld.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.BzWnnJ_I.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.BzWnnJ_I.lean.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.BvEZkpaf.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.BvEZkpaf.lean.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CrqNpiJT.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CrqNpiJT.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.CxzXdTrs.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.CxzXdTrs.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.BMZp9rDO.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.BMZp9rDO.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.tyU-c0Kw.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.tyU-c0Kw.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.CvzKPa1t.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.CvzKPa1t.lean.js",revision:null},{url:"assets/笔记_index.md.c7stXpEG.js",revision:null},{url:"assets/笔记_index.md.c7stXpEG.lean.js",revision:null},{url:"assets/笔记_Python_Python入门.md.CjPj55Uw.js",revision:null},{url:"assets/笔记_Python_Python入门.md.CjPj55Uw.lean.js",revision:null},{url:"assets/笔记_Python_Python基础.md.DCtswhco.js",revision:null},{url:"assets/笔记_Python_Python基础.md.DCtswhco.lean.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.S74f9TYa.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.S74f9TYa.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.BG72VVQM.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.BG72VVQM.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.KtSxjHpE.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.KtSxjHpE.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.BLn9-jQM.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.BLn9-jQM.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.C8jTopU9.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.C8jTopU9.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.CG_gPVLO.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.CG_gPVLO.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.C9986Yrp.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.C9986Yrp.lean.js",revision:null},{url:"assets/笔记_VitePress进阶_vitepress进阶教程.md.fQPU9rRx.js",revision:null},{url:"assets/笔记_VitePress进阶_vitepress进阶教程.md.fQPU9rRx.lean.js",revision:null},{url:"assets/笔记_入门_01起步.md.BcOypTds.js",revision:null},{url:"assets/笔记_入门_01起步.md.BcOypTds.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.Dm3QueOW.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.Dm3QueOW.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.j4t_5Zs2.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.j4t_5Zs2.lean.js",revision:null},{url:"assets/笔记_杂项_mima.md.D8bgaWVs.js",revision:null},{url:"assets/笔记_杂项_mima.md.D8bgaWVs.lean.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.B0hRfxcf.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.B0hRfxcf.lean.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.C19z3SaV.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.C19z3SaV.lean.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.LfgfBeoK.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.LfgfBeoK.lean.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md._a3BWMQm.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md._a3BWMQm.lean.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.zArWSgnf.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.zArWSgnf.lean.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.BloTqouv.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.BloTqouv.lean.js",revision:null},{url:"assets/笔记_计算机网络_index.md.B9PklO4m.js",revision:null},{url:"assets/笔记_计算机网络_index.md.B9PklO4m.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_index.md.Bg9N-6sB.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_index.md.Bg9N-6sB.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_SAP安装教程.md.BbgLOPqo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_SAP安装教程.md.BbgLOPqo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.kKtmOJ7V.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.kKtmOJ7V.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.BsqB-CZe.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.BsqB-CZe.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DQaTCFoo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DQaTCFoo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.Bq2VXO4B.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.Bq2VXO4B.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.BILlZFQ-.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.BILlZFQ-.lean.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.Br0N5kzt.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.Br0N5kzt.lean.js",revision:null},{url:"docs/index.html",revision:"d2406534b99ddff030f833328e5a855c"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"hengan/print.html",revision:"986b712ddda01d3d56a0ae8c0108d5e4"},{url:"hengan/share.html",revision:"c2f597a4d3913c5ac2ec564c5a3a8bb2"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"index.html",revision:"ba1035f4c626f08e0b25e7256e879f3f"},{url:"logo.png",revision:"711c445a59ecf03e12cf2b23a6b340e3"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav.html",revision:"2a6c2b3dc6f8734c8485151d72808f0f"},{url:"nav/计算机网络/index.html",revision:"a0a11c14e330e31c484131ad11e118b6"},{url:"nav/运维/index.html",revision:"6b9e0999b3966c74d1bd58be2686db2d"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"博客/2024/02/10第二版博客搭建完成.html",revision:"d9167b22911b04b2de56c60dcf43e511"},{url:"博客/2024/02/11新年快乐.html",revision:"2dd420a6e2224ecdee8040a7561f7c41"},{url:"博客/2024/05/05第三版博客搭建完成.html",revision:"f9fab5c40932336ba6042fd3971cb236"},{url:"博客/2024/05/11第四版博客新题性.html",revision:"8e832eb79010fe6e65512f56830bde9c"},{url:"博客/2024/05/23第五版博客发布完成.html",revision:"cd5f58e4c615aa3bef331465f8fdf5a6"},{url:"博客/2024/05/26HA综合布线.html",revision:"be7a08beaeb8e52eaa5a1d6878de8394"},{url:"博客/2024/05/29打印机共享.html",revision:"5968b371e07dab1f7d952b83037207e0"},{url:"博客/2024/06/02性能优化.html",revision:"91d7dd317470f8c23546675d1f1bc8b2"},{url:"博客/2024/06/03Excel大小优化.html",revision:"b52d4f85626125dc481ed26381fc0fe9"},{url:"博客/2024/06/10更好的svg集成.html",revision:"2638a82acdb8809f3e7c71d880697d3d"},{url:"博客/2024/06/17商业报告模板.html",revision:"7bb8873b75d47219e77ac84a00091c15"},{url:"博客/2024/07/21快速开发流程.html",revision:"1aa40a26c2aa06ec0ad4e604b742188e"},{url:"博客/2024/08/18第六版博客发布.html",revision:"5c0293bff00b8e56ebe4ce5d8dc8df1a"},{url:"博客/index.html",revision:"abf71d0cfbfbd201e839f78a946d1405"},{url:"未标题-12.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"笔记/C++进阶/Linux系统编程.html",revision:"d028c08de5c923425b62ff23ed7365e6"},{url:"笔记/C++进阶/Linux系统编程2.html",revision:"af6fbf490bb21374f8d2ea6b933d704d"},{url:"笔记/C++进阶/多进程.html",revision:"59e8a25e783eca929792102727f61a14"},{url:"笔记/C++进阶/线程.html",revision:"199e34d3f5eaf85ea9358a37bafb1809"},{url:"笔记/CPP基础/CPP基础-1.html",revision:"5ed0816ea8ad90181a2a96676abfeb15"},{url:"笔记/CPP基础/CPP基础-2.html",revision:"56a25461a75e5a4a9c6b64f36389d46f"},{url:"笔记/EnergyPlus/入门.html",revision:"3de49d92bc9e00f740aad0db27569cdd"},{url:"笔记/EnergyPlus/安装EnergyPlus环境.html",revision:"478365413854932e6ec147ff9b5aefce"},{url:"笔记/index.html",revision:"6432a72f26dad2f0d634431a7e1407ec"},{url:"笔记/Python/Python入门.html",revision:"063baf7076e1019222ebf9c41c6a1d39"},{url:"笔记/Python/Python基础.html",revision:"8952bde21c9df7f63529cc80b9ec51cb"},{url:"笔记/Python/Python基础2.html",revision:"ea17510d8f3d8429ca9a9f854c43eb6a"},{url:"笔记/Sinergym项目/gym互联网相关资料.html",revision:"e5abd5395f8ac2e26105f1ac0205f393"},{url:"笔记/Sinergym项目/sinergym学习.html",revision:"b232c7c2be169a3ac3d87b30db8c7b1f"},{url:"笔记/Sinergym项目/sinergym论文.html",revision:"f1fffd00d03b4715213d1fca6d3f6a63"},{url:"笔记/Sinergym项目/强化学习bilibili/强化学习1.html",revision:"f491284dea6f64f0c84a075f13f5d8a3"},{url:"笔记/UE4虚幻/UE4CPP-1.html",revision:"b8b4850766838eeaa5449dd8fb2fec4c"},{url:"笔记/UE4虚幻/UE4CPP-2.html",revision:"f0d1e02abe90d9fedb8589855bd15f2b"},{url:"笔记/VitePress进阶/vitepress进阶教程.html",revision:"f2becc34731d2bdeecd77852498589f0"},{url:"笔记/入门/01起步.html",revision:"5ef28d8cc4e0c095e272414b1bf64433"},{url:"笔记/大型园区网络实战设计/1.园区网概述.html",revision:"6c365e9c3a1332c835952a2882a1b50a"},{url:"笔记/大型园区网络实战设计/2.路由交换设计.html",revision:"5bbba6cc6d8b373a7ef4af9918ddef31"},{url:"笔记/杂项/mima.html",revision:"33347d2d4ff168aab0a01042724c639a"},{url:"笔记/杂项/snapd软件.html",revision:"1283b60480997ddc99a02576493d1b6e"},{url:"笔记/杂项/ubuntu安装软件教程.html",revision:"14c2d9fd8e6bdd443c2d95e93fc5f4b4"},{url:"笔记/杂项/如何用Python绘制焓湿图.html",revision:"0af125fa3e2f7685c8f902a8b185893e"},{url:"笔记/杂项/安装linux 的 nodejs需要注意的问题.html",revision:"47e8e698279a2d56111dea844d8ee62b"},{url:"笔记/杂项/安装ubuntu版本的idea教程.html",revision:"f9342bd766e5a627d2f2df91bf4d8837"},{url:"笔记/杂项/解压软件.html",revision:"d758dda9ae427bbd6389f0898a25b2ed"},{url:"笔记/计算机网络/index.html",revision:"f715ca2335a468f54862d76435eb2ad7"},{url:"笔记/计算机网络/桌面运维/index.html",revision:"e90493a873aadf786a4ea8ccb34db2d4"},{url:"笔记/计算机网络/桌面运维/SAP安装教程.html",revision:"d5ad8d84278b027de37efd43a2a2bd30"},{url:"笔记/计算机网络/桌面运维/局域网文件共享.html",revision:"1d6f6e4d686bd9679a9bd4f281d2c0f9"},{url:"笔记/计算机网络/桌面运维/微信清理工具.html",revision:"cd66375b97e808ee5fe6524b43979e76"},{url:"笔记/计算机网络/桌面运维/普通打印机共享.html",revision:"6cca65d5953227627e7b2ff1109b58e7"},{url:"笔记/计算机网络/桌面运维/磁盘空间清理.html",revision:"efe8ebf7e835b401c96e4dc4c56f454a"},{url:"笔记/计算机网络/桌面运维/网络打印机.html",revision:"148054d36eae2c43c71a823636c76ca4"},{url:"笔记/计算机网络/网工.html",revision:"f2ddbd01efa57b9d12c17f8d0b6df181"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));