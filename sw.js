if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),o={module:{uri:r},exports:a,require:u};e[r]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(i(...s),a)))}}define(["./workbox-683c2783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"1bd62fb155616ccf5b01d23e120021e0"},{url:"assets/app.BRLDO99T.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.DnjC4DfY.js",revision:null},{url:"assets/chunks/framework.DOiCuyYX.js",revision:null},{url:"assets/chunks/index.BNnYFWcz.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.CtZvLPda.js",revision:null},{url:"assets/docs_index.md.BCvSbzzE.js",revision:null},{url:"assets/docs_index.md.BCvSbzzE.lean.js",revision:null},{url:"assets/hengan_print.md.CZcU1xoq.js",revision:null},{url:"assets/hengan_print.md.CZcU1xoq.lean.js",revision:null},{url:"assets/hengan_share.md.CW5H9qnp.js",revision:null},{url:"assets/hengan_share.md.CW5H9qnp.lean.js",revision:null},{url:"assets/image.CPMGMrSV.png",revision:null},{url:"assets/index.md.DUI0aKRL.js",revision:null},{url:"assets/index.md.DUI0aKRL.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_计算机网络_index.md.CQ7pIDZ6.js",revision:null},{url:"assets/nav_计算机网络_index.md.CQ7pIDZ6.lean.js",revision:null},{url:"assets/nav_运维_index.md.C3yGb6-P.js",revision:null},{url:"assets/nav_运维_index.md.C3yGb6-P.lean.js",revision:null},{url:"assets/nav.md.DNsbV11W.js",revision:null},{url:"assets/nav.md.DNsbV11W.lean.js",revision:null},{url:"assets/style.CKHiS6kL.css",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BqpxvKgU.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BqpxvKgU.lean.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.CaKQVkNZ.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.CaKQVkNZ.lean.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.DGaYy2Vv.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.DGaYy2Vv.lean.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.w4Lh5Foc.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.w4Lh5Foc.lean.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.CqFWdsKf.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.CqFWdsKf.lean.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.Krb1fPUe.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.Krb1fPUe.lean.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.EQtoqMwz.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.EQtoqMwz.lean.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.BuyG32L8.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.BuyG32L8.lean.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.wh8YM-es.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.wh8YM-es.lean.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.CSdEMwly.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.CSdEMwly.lean.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.BuCfm4jl.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.BuCfm4jl.lean.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.cHJ8XgUr.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.cHJ8XgUr.lean.js",revision:null},{url:"assets/博客_2024_08_08第六版博客发布.md.Ccj9Qp51.js",revision:null},{url:"assets/博客_2024_08_08第六版博客发布.md.Ccj9Qp51.lean.js",revision:null},{url:"assets/博客_index.md.BwOq-80O.js",revision:null},{url:"assets/博客_index.md.BwOq-80O.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.D9uiA9fY.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.D9uiA9fY.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DqWipg07.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.DqWipg07.lean.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.BzBvyknN.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.BzBvyknN.lean.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.8isWuIoX.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.8isWuIoX.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.BG83SZ0L.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.BG83SZ0L.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.D0UWJ1qo.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.D0UWJ1qo.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Da5bK-TO.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.Da5bK-TO.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BKFJzl6H.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.BKFJzl6H.lean.js",revision:null},{url:"assets/笔记_index.md.Cbfj-PuQ.js",revision:null},{url:"assets/笔记_index.md.Cbfj-PuQ.lean.js",revision:null},{url:"assets/笔记_Python_Python入门.md.C4YHPqR8.js",revision:null},{url:"assets/笔记_Python_Python入门.md.C4YHPqR8.lean.js",revision:null},{url:"assets/笔记_Python_Python基础.md.D1uvO6vh.js",revision:null},{url:"assets/笔记_Python_Python基础.md.D1uvO6vh.lean.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.JTvknwCC.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.JTvknwCC.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.C-P9QurK.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.C-P9QurK.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.50W4eJsr.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.50W4eJsr.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.CLEYhDNu.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.CLEYhDNu.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.E6oBwPrc.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.E6oBwPrc.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.CwzPOBKC.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.CwzPOBKC.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.kv_R9BgO.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.kv_R9BgO.lean.js",revision:null},{url:"assets/笔记_VitePress进阶_vitepress进阶教程.md.BvvF_Nbk.js",revision:null},{url:"assets/笔记_VitePress进阶_vitepress进阶教程.md.BvvF_Nbk.lean.js",revision:null},{url:"assets/笔记_入门_01起步.md.BR_u0TwW.js",revision:null},{url:"assets/笔记_入门_01起步.md.BR_u0TwW.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.Bo_vu9nW.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.Bo_vu9nW.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.C4QO-kBR.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.C4QO-kBR.lean.js",revision:null},{url:"assets/笔记_杂项_mima.md.CxnpYl66.js",revision:null},{url:"assets/笔记_杂项_mima.md.CxnpYl66.lean.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.Cqh9KUNV.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.Cqh9KUNV.lean.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.Bd2RTuHr.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.Bd2RTuHr.lean.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.D5an4Lu1.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.D5an4Lu1.lean.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.Crb5GMFD.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md.Crb5GMFD.lean.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.SoH8zQ2r.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.SoH8zQ2r.lean.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.DuE3OL-J.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.DuE3OL-J.lean.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Bs3Fp_GV.js",revision:null},{url:"assets/笔记_计算机网络_index.md.Bs3Fp_GV.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_index.md.CcG3CLcw.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_index.md.CcG3CLcw.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_SAP安装教程.md.Cy722ylW.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_SAP安装教程.md.Cy722ylW.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DQofchyh.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.DQofchyh.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.2op3BllN.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.2op3BllN.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DqPopSQm.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DqPopSQm.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.Cm9l90fO.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.Cm9l90fO.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.BpTPpbQA.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.BpTPpbQA.lean.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.kZJ6YRUI.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.kZJ6YRUI.lean.js",revision:null},{url:"docs/index.html",revision:"50fab3b3546cbf81107e96d1edb211a3"},{url:"favicon.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"hengan/print.html",revision:"3efceb2fdfa3e1feb18ec228d71b6be7"},{url:"hengan/share.html",revision:"84276cfdc0627af82349f46c3d1cb995"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"index.html",revision:"7300774581ae7e031f4891259d0348f5"},{url:"logo.png",revision:"711c445a59ecf03e12cf2b23a6b340e3"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav.html",revision:"6900d156d953851bc1972321ccd84689"},{url:"nav/计算机网络/index.html",revision:"c3aae10389040e06fa92485304cfdf4e"},{url:"nav/运维/index.html",revision:"a31cc5903a8576e58cd5af943c023b16"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"博客/2024/02/10第二版博客搭建完成.html",revision:"a484c04c5e62bdb3f42832590cb40b94"},{url:"博客/2024/02/11新年快乐.html",revision:"8c6098f57e32578a24e5a099d8268e76"},{url:"博客/2024/05/05第三版博客搭建完成.html",revision:"e54b67bd52f1af632d62918dc21d1b34"},{url:"博客/2024/05/11第四版博客新题性.html",revision:"5a79a927d38f86517ac40fdb8ec355d3"},{url:"博客/2024/05/23第五版博客发布完成.html",revision:"77e7f9efa7520ae2590385a76e33a718"},{url:"博客/2024/05/26HA综合布线.html",revision:"38c1850c1e625362fdd550e78b7a4f80"},{url:"博客/2024/05/29打印机共享.html",revision:"cdd62159c4acc6c6757a614bf3976ab0"},{url:"博客/2024/06/02性能优化.html",revision:"acee76e8cd93182394f1ba81247d0a63"},{url:"博客/2024/06/03Excel大小优化.html",revision:"06d542639c39ec11991fc06efc4bd739"},{url:"博客/2024/06/10更好的svg集成.html",revision:"99ac973b6bf4fae143bb9f7a7f29b1a6"},{url:"博客/2024/06/17商业报告模板.html",revision:"ae24a84c096854cc8d159590efd79cd1"},{url:"博客/2024/07/21快速开发流程.html",revision:"e6c8442c1149826d1e48edeb0b875354"},{url:"博客/2024/08/08第六版博客发布.html",revision:"22c161479e586b5f5ccbc99d4c8ac5ce"},{url:"博客/index.html",revision:"2f9faeffe14275db60e3989520a1ad3a"},{url:"未标题-12.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"笔记/C++进阶/Linux系统编程.html",revision:"341546fde7efa88e87f02b2802e977fb"},{url:"笔记/C++进阶/Linux系统编程2.html",revision:"4694d9de3e3cbe166a2ae5115ac7be40"},{url:"笔记/C++进阶/多进程.html",revision:"d50cf103a38f0b4570d69065d178c06a"},{url:"笔记/C++进阶/线程.html",revision:"89851fa8b408f754727358265033d1ba"},{url:"笔记/CPP基础/CPP基础-1.html",revision:"1c32b81e89e79db944cf5874bf6fe0ca"},{url:"笔记/CPP基础/CPP基础-2.html",revision:"8fd94e2393d4d9a37b4dc9836a9631c8"},{url:"笔记/EnergyPlus/入门.html",revision:"b90707d801989b98461710bda1ddd6e5"},{url:"笔记/EnergyPlus/安装EnergyPlus环境.html",revision:"5f87120c3e12e04ef8f9b031ce49fd8b"},{url:"笔记/index.html",revision:"0ee525eb953cb3c75bebcaf84e9af08e"},{url:"笔记/Python/Python入门.html",revision:"3b8ead12e260a57dceca3fd13c04180e"},{url:"笔记/Python/Python基础.html",revision:"49e34924f9412ab431c3f504784f044b"},{url:"笔记/Python/Python基础2.html",revision:"b060fcd6ba06a4f82549ec215186a3e3"},{url:"笔记/Sinergym项目/gym互联网相关资料.html",revision:"31746eb3745aa3cb8d08f5c075703803"},{url:"笔记/Sinergym项目/sinergym学习.html",revision:"b1336e7d6173a7be4e133e1a1286a315"},{url:"笔记/Sinergym项目/sinergym论文.html",revision:"b9c326658931e36d125986b47433ae7d"},{url:"笔记/Sinergym项目/强化学习bilibili/强化学习1.html",revision:"06e3c1cc012016efc50bef204acdaff1"},{url:"笔记/UE4虚幻/UE4CPP-1.html",revision:"2384446f174697a481a5cc9e4a0b8c61"},{url:"笔记/UE4虚幻/UE4CPP-2.html",revision:"b4804080294e8f882743f00fe64dde05"},{url:"笔记/VitePress进阶/vitepress进阶教程.html",revision:"a6ea3913a1ed5631ca1400fbbb956d35"},{url:"笔记/入门/01起步.html",revision:"9750e12642cfec93e52486f297dc1dbe"},{url:"笔记/大型园区网络实战设计/1.园区网概述.html",revision:"6f2311133ef99d56dc1886ea425e199d"},{url:"笔记/大型园区网络实战设计/2.路由交换设计.html",revision:"cf24f9a0f7e748b431c15d46725d54f1"},{url:"笔记/杂项/mima.html",revision:"a31b3408545346eda2fee26b10792b7b"},{url:"笔记/杂项/snapd软件.html",revision:"6a4a249819273530f07931af30b9c0bf"},{url:"笔记/杂项/ubuntu安装软件教程.html",revision:"660a849ceb3073a8670b02d7da26f651"},{url:"笔记/杂项/如何用Python绘制焓湿图.html",revision:"877b340aee2ea93165546f99c6f30d7b"},{url:"笔记/杂项/安装linux 的 nodejs需要注意的问题.html",revision:"0d385e5c64199e89c48063c0ca2f80bb"},{url:"笔记/杂项/安装ubuntu版本的idea教程.html",revision:"169142557653dfa36dfd72d4c0699ada"},{url:"笔记/杂项/解压软件.html",revision:"84f62a9db1a6946a3137c05de468d2de"},{url:"笔记/计算机网络/index.html",revision:"1ae5ef1be801c9eff2e2cbf75d8a2f5c"},{url:"笔记/计算机网络/桌面运维/index.html",revision:"79783271325f7f177aad1dd2335b9ae0"},{url:"笔记/计算机网络/桌面运维/SAP安装教程.html",revision:"355ea2d13700cea21e5a34bce273cca4"},{url:"笔记/计算机网络/桌面运维/局域网文件共享.html",revision:"2ed30618ab856be96e76f5c8a3b49191"},{url:"笔记/计算机网络/桌面运维/微信清理工具.html",revision:"65ec73f6dce35f6b0dfa1b5d7b4cc11c"},{url:"笔记/计算机网络/桌面运维/普通打印机共享.html",revision:"e72200d7a1296906aad169424fc25581"},{url:"笔记/计算机网络/桌面运维/磁盘空间清理.html",revision:"a930e36b5fefb9f91bba26f48a7a4af8"},{url:"笔记/计算机网络/桌面运维/网络打印机.html",revision:"ffc30a5469106148b9ef81406e216b43"},{url:"笔记/计算机网络/网工.html",revision:"b9e5a5c7e618810b93cd261786888150"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
