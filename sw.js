if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),d={module:{uri:r},exports:a,require:u};e[r]=Promise.all(n.map((s=>d[s]||u(s)))).then((s=>(i(...s),a)))}}define(["./workbox-a7491250"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"716b1e7b25cb939d5460198d59fea987"},{url:"assets/app.CqcOK8zl.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.C9DMhETL.js",revision:null},{url:"assets/chunks/framework.DhOjAug6.js",revision:null},{url:"assets/chunks/index.BNnYFWcz.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.djfFvg_0.js",revision:null},{url:"assets/docs_index.md.Djv1Bs6w.js",revision:null},{url:"assets/docs_index.md.Djv1Bs6w.lean.js",revision:null},{url:"assets/hengan_360net.md.DNVOu7I7.js",revision:null},{url:"assets/hengan_360net.md.DNVOu7I7.lean.js",revision:null},{url:"assets/hengan_dns.md.BVo4lrnV.js",revision:null},{url:"assets/hengan_dns.md.BVo4lrnV.lean.js",revision:null},{url:"assets/hengan_net-error.md.nkEW9ymT.js",revision:null},{url:"assets/hengan_net-error.md.nkEW9ymT.lean.js",revision:null},{url:"assets/hengan_netlink.md.NNhBBwDz.js",revision:null},{url:"assets/hengan_netlink.md.NNhBBwDz.lean.js",revision:null},{url:"assets/hengan_print.md.5FneI6QA.js",revision:null},{url:"assets/hengan_print.md.5FneI6QA.lean.js",revision:null},{url:"assets/hengan_sap.md.Do2xcLE6.js",revision:null},{url:"assets/hengan_sap.md.Do2xcLE6.lean.js",revision:null},{url:"assets/hengan_share.md.Cm9N52IC.js",revision:null},{url:"assets/hengan_share.md.Cm9N52IC.lean.js",revision:null},{url:"assets/hengan_studio.md.DgjeM2bJ.js",revision:null},{url:"assets/hengan_studio.md.DgjeM2bJ.lean.js",revision:null},{url:"assets/image.CPMGMrSV.png",revision:null},{url:"assets/index.md.CPSN8QLG.js",revision:null},{url:"assets/index.md.CPSN8QLG.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_计算机网络_index.md.C4EtsKov.js",revision:null},{url:"assets/nav_计算机网络_index.md.C4EtsKov.lean.js",revision:null},{url:"assets/nav_运维_index.md.CdQWuvBn.js",revision:null},{url:"assets/nav_运维_index.md.CdQWuvBn.lean.js",revision:null},{url:"assets/nav.md.D4pFAYos.js",revision:null},{url:"assets/nav.md.D4pFAYos.lean.js",revision:null},{url:"assets/style.CYJo477w.css",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BlZZlJpS.js",revision:null},{url:"assets/博客_2024_02_10第二版博客搭建完成.md.BlZZlJpS.lean.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.BuSAQP_u.js",revision:null},{url:"assets/博客_2024_02_11新年快乐.md.BuSAQP_u.lean.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.D4eVmS8p.js",revision:null},{url:"assets/博客_2024_05_05第三版博客搭建完成.md.D4eVmS8p.lean.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.3UqOkvzD.js",revision:null},{url:"assets/博客_2024_05_11第四版博客新题性.md.3UqOkvzD.lean.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.4OTQD1ke.js",revision:null},{url:"assets/博客_2024_05_23第五版博客发布完成.md.4OTQD1ke.lean.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.wdgJ9eBs.js",revision:null},{url:"assets/博客_2024_05_26HA综合布线.md.wdgJ9eBs.lean.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.DRyVV5lw.js",revision:null},{url:"assets/博客_2024_05_29打印机共享.md.DRyVV5lw.lean.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DPjHhp94.js",revision:null},{url:"assets/博客_2024_06_02性能优化.md.DPjHhp94.lean.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.WdP4G7ed.js",revision:null},{url:"assets/博客_2024_06_03Excel大小优化.md.WdP4G7ed.lean.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.Ch0Suydr.js",revision:null},{url:"assets/博客_2024_06_10更好的svg集成.md.Ch0Suydr.lean.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C0giyY8g.js",revision:null},{url:"assets/博客_2024_06_17商业报告模板.md.C0giyY8g.lean.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.BR6C_6_C.js",revision:null},{url:"assets/博客_2024_07_21快速开发流程.md.BR6C_6_C.lean.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.BH7t6vet.js",revision:null},{url:"assets/博客_2024_08_18第六版博客发布.md.BH7t6vet.lean.js",revision:null},{url:"assets/博客_index.md.DQEbhV0R.js",revision:null},{url:"assets/博客_index.md.DQEbhV0R.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.L_sV6fld.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程.md.L_sV6fld.lean.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.BzWnnJ_I.js",revision:null},{url:"assets/笔记_C__进阶_Linux系统编程2.md.BzWnnJ_I.lean.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.BvEZkpaf.js",revision:null},{url:"assets/笔记_C__进阶_多进程.md.BvEZkpaf.lean.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CrqNpiJT.js",revision:null},{url:"assets/笔记_C__进阶_线程.md.CrqNpiJT.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.CxzXdTrs.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-1.md.CxzXdTrs.lean.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.BMZp9rDO.js",revision:null},{url:"assets/笔记_CPP基础_CPP基础-2.md.BMZp9rDO.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.tyU-c0Kw.js",revision:null},{url:"assets/笔记_EnergyPlus_入门.md.tyU-c0Kw.lean.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.CvzKPa1t.js",revision:null},{url:"assets/笔记_EnergyPlus_安装EnergyPlus环境.md.CvzKPa1t.lean.js",revision:null},{url:"assets/笔记_index.md.C10QiHf6.js",revision:null},{url:"assets/笔记_index.md.C10QiHf6.lean.js",revision:null},{url:"assets/笔记_Python_Python入门.md.CjPj55Uw.js",revision:null},{url:"assets/笔记_Python_Python入门.md.CjPj55Uw.lean.js",revision:null},{url:"assets/笔记_Python_Python基础.md.DCtswhco.js",revision:null},{url:"assets/笔记_Python_Python基础.md.DCtswhco.lean.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.S74f9TYa.js",revision:null},{url:"assets/笔记_Python_Python基础2.md.S74f9TYa.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.BG72VVQM.js",revision:null},{url:"assets/笔记_Sinergym项目_gym互联网相关资料.md.BG72VVQM.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.KtSxjHpE.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym学习.md.KtSxjHpE.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.BLn9-jQM.js",revision:null},{url:"assets/笔记_Sinergym项目_sinergym论文.md.BLn9-jQM.lean.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.C8jTopU9.js",revision:null},{url:"assets/笔记_Sinergym项目_强化学习bilibili_强化学习1.md.C8jTopU9.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.CG_gPVLO.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-1.md.CG_gPVLO.lean.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.C9986Yrp.js",revision:null},{url:"assets/笔记_UE4虚幻_UE4CPP-2.md.C9986Yrp.lean.js",revision:null},{url:"assets/笔记_VitePress进阶_vitepress进阶教程.md.fQPU9rRx.js",revision:null},{url:"assets/笔记_VitePress进阶_vitepress进阶教程.md.fQPU9rRx.lean.js",revision:null},{url:"assets/笔记_入门_01起步.md.DCs4eRiI.js",revision:null},{url:"assets/笔记_入门_01起步.md.DCs4eRiI.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.Dm3QueOW.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_1.园区网概述.md.Dm3QueOW.lean.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.j4t_5Zs2.js",revision:null},{url:"assets/笔记_大型园区网络实战设计_2.路由交换设计.md.j4t_5Zs2.lean.js",revision:null},{url:"assets/笔记_杂项_mima.md.D8bgaWVs.js",revision:null},{url:"assets/笔记_杂项_mima.md.D8bgaWVs.lean.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.B0hRfxcf.js",revision:null},{url:"assets/笔记_杂项_snapd软件.md.B0hRfxcf.lean.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.C19z3SaV.js",revision:null},{url:"assets/笔记_杂项_ubuntu安装软件教程.md.C19z3SaV.lean.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.LfgfBeoK.js",revision:null},{url:"assets/笔记_杂项_如何用Python绘制焓湿图.md.LfgfBeoK.lean.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md._a3BWMQm.js",revision:null},{url:"assets/笔记_杂项_安装linux 的 nodejs需要注意的问题.md._a3BWMQm.lean.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.zArWSgnf.js",revision:null},{url:"assets/笔记_杂项_安装ubuntu版本的idea教程.md.zArWSgnf.lean.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.BloTqouv.js",revision:null},{url:"assets/笔记_杂项_解压软件.md.BloTqouv.lean.js",revision:null},{url:"assets/笔记_计算机网络_index.md.B9PklO4m.js",revision:null},{url:"assets/笔记_计算机网络_index.md.B9PklO4m.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_index.md.Bg9N-6sB.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_index.md.Bg9N-6sB.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_SAP安装教程.md.BbgLOPqo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_SAP安装教程.md.BbgLOPqo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.kKtmOJ7V.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_局域网文件共享.md.kKtmOJ7V.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.elRJoeax.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_微信清理工具.md.elRJoeax.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DQaTCFoo.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_普通打印机共享.md.DQaTCFoo.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.CAQMdI6y.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_磁盘空间清理.md.CAQMdI6y.lean.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.BILlZFQ-.js",revision:null},{url:"assets/笔记_计算机网络_桌面运维_网络打印机.md.BILlZFQ-.lean.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.DgRViYtW.js",revision:null},{url:"assets/笔记_计算机网络_网工.md.DgRViYtW.lean.js",revision:null},{url:"docs/index.html",revision:"9745da71356a67dff0ebad68101db7f4"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"hengan/360net.html",revision:"cf279c968077574b4a7916f16812519e"},{url:"hengan/dns.html",revision:"269f251ab83d12ab3708421cf3c91e3a"},{url:"hengan/net-error.html",revision:"199cafbba154616a27c807751792a05b"},{url:"hengan/netlink.html",revision:"719d9453a0c6f94c0509cf0463dedb3a"},{url:"hengan/print.html",revision:"4ad79c1cd9c6e11b7a565e6e49cd371c"},{url:"hengan/sap.html",revision:"5734421e83835c6c785ad9eda92d7b10"},{url:"hengan/share.html",revision:"9c040ee69cc09a1758ac0ddc183ea55b"},{url:"hengan/studio.html",revision:"66ede7cbf571a527f6db9f67797fdd5c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"index.html",revision:"d81376057c80ad5b355f88360fa17c8b"},{url:"logo.png",revision:"711c445a59ecf03e12cf2b23a6b340e3"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav.html",revision:"aae1d5cf8e62e55dc6701ebd393ffb36"},{url:"nav/计算机网络/index.html",revision:"472f022527ff19567bf4fe05cd0944de"},{url:"nav/运维/index.html",revision:"d9595c948cc669a7f47369cf5fa87631"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"博客/2024/02/10第二版博客搭建完成.html",revision:"e489cb92d98892255eefc5282be46bd2"},{url:"博客/2024/02/11新年快乐.html",revision:"df178e44d51cdc7f90bdc44330bc24ac"},{url:"博客/2024/05/05第三版博客搭建完成.html",revision:"4fbc18e03dac275a311f6e221ca98131"},{url:"博客/2024/05/11第四版博客新题性.html",revision:"b50e47a82d622b9303cb05785dbef0c7"},{url:"博客/2024/05/23第五版博客发布完成.html",revision:"e451514ba2f57e053dd1c927e772b9a4"},{url:"博客/2024/05/26HA综合布线.html",revision:"53910c7402639fbdc03454ef31536879"},{url:"博客/2024/05/29打印机共享.html",revision:"f5e9ef4ca5051df4fe802fa4d2f008ab"},{url:"博客/2024/06/02性能优化.html",revision:"80e4742ec197cad9213f67edfe327ba9"},{url:"博客/2024/06/03Excel大小优化.html",revision:"a0766172eb1fd18443c762fe91b4258e"},{url:"博客/2024/06/10更好的svg集成.html",revision:"b51fad198aabf70e5487ea2fffa9335b"},{url:"博客/2024/06/17商业报告模板.html",revision:"1abc7af0f03d58d1619afd0edfb7d4d1"},{url:"博客/2024/07/21快速开发流程.html",revision:"9fb3044a93cdad3128271a08cb06af31"},{url:"博客/2024/08/18第六版博客发布.html",revision:"d57045f54ec4b64acc3e90ee2674ab64"},{url:"博客/index.html",revision:"d91ae49836ed94df61b2a2760f473246"},{url:"未标题-12.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"笔记/C++进阶/Linux系统编程.html",revision:"7baf86132767235a67c35a580eb02029"},{url:"笔记/C++进阶/Linux系统编程2.html",revision:"a61a315a804c6fc05ced6cf55db474f8"},{url:"笔记/C++进阶/多进程.html",revision:"799c8db368ed6238c275ab87a572c17c"},{url:"笔记/C++进阶/线程.html",revision:"330fb7405fec0a3a195e939f1cfece00"},{url:"笔记/CPP基础/CPP基础-1.html",revision:"7ff778b4d81596865627138417c262ca"},{url:"笔记/CPP基础/CPP基础-2.html",revision:"7d25b60addeee85534c9fae28e523c8c"},{url:"笔记/EnergyPlus/入门.html",revision:"98ba4519c50b4ade3d1f18597d0b66a1"},{url:"笔记/EnergyPlus/安装EnergyPlus环境.html",revision:"34c3101ebf1cad797c87201fdb955918"},{url:"笔记/index.html",revision:"1962cdb82cbd5b1e3f909f40905cc969"},{url:"笔记/Python/Python入门.html",revision:"d24cb6847aad88e8ba28ab4d617f909a"},{url:"笔记/Python/Python基础.html",revision:"8d967e3787bd568f0cc245351afc9838"},{url:"笔记/Python/Python基础2.html",revision:"8767ee4923510748996af306bbe6fb19"},{url:"笔记/Sinergym项目/gym互联网相关资料.html",revision:"1094fb84cd4a0b2eb0df93a61301de63"},{url:"笔记/Sinergym项目/sinergym学习.html",revision:"9aa72eba3233df87a1d4c701ccb4788e"},{url:"笔记/Sinergym项目/sinergym论文.html",revision:"16586d8720de03d9e41f92c2a96791e6"},{url:"笔记/Sinergym项目/强化学习bilibili/强化学习1.html",revision:"a1338a3e842637922b83bc6e667844a3"},{url:"笔记/UE4虚幻/UE4CPP-1.html",revision:"0c3e0d479c039bc23f1f5e79b3122476"},{url:"笔记/UE4虚幻/UE4CPP-2.html",revision:"84d3421671a6fd26155068d17e573251"},{url:"笔记/VitePress进阶/vitepress进阶教程.html",revision:"5213f2d91e8e0ed7faff67e2711e2df1"},{url:"笔记/入门/01起步.html",revision:"7eb5aa6b440a164028a794c491a90819"},{url:"笔记/大型园区网络实战设计/1.园区网概述.html",revision:"5121f3e21d5c047efa7b444330a069d0"},{url:"笔记/大型园区网络实战设计/2.路由交换设计.html",revision:"41335236a734c9139071ad240410bbda"},{url:"笔记/杂项/mima.html",revision:"f182e4f00eecb235ddd7519325ed4409"},{url:"笔记/杂项/snapd软件.html",revision:"9991eb4664a88463d9c066ac24e4400a"},{url:"笔记/杂项/ubuntu安装软件教程.html",revision:"4a24eee6264017299961afec956acc16"},{url:"笔记/杂项/如何用Python绘制焓湿图.html",revision:"f8e5e82d787dda9b0ede342a1c60a932"},{url:"笔记/杂项/安装linux 的 nodejs需要注意的问题.html",revision:"0f6c1d26c54262fcbb6dad1d0d9a6428"},{url:"笔记/杂项/安装ubuntu版本的idea教程.html",revision:"ee25aad039ff6c0ad6852a0e87f8a0ce"},{url:"笔记/杂项/解压软件.html",revision:"e4dcb19cd649eeaa1c7d239de974ad28"},{url:"笔记/计算机网络/index.html",revision:"8ed2207a2c4a7268bf94537a82fc6ab3"},{url:"笔记/计算机网络/桌面运维/index.html",revision:"6f9b260f82786e99f3c276408ec28625"},{url:"笔记/计算机网络/桌面运维/SAP安装教程.html",revision:"33b0d92083f9cc3e21541425947566af"},{url:"笔记/计算机网络/桌面运维/局域网文件共享.html",revision:"0cc32add8fd2d4fa48e9e7f21de9fab3"},{url:"笔记/计算机网络/桌面运维/微信清理工具.html",revision:"4b7716074075c89e672947c4e8a6ab8b"},{url:"笔记/计算机网络/桌面运维/普通打印机共享.html",revision:"ff7095001a730fb50dfa0c37a1ff9d5b"},{url:"笔记/计算机网络/桌面运维/磁盘空间清理.html",revision:"6d9cfa9342fdedb4a572702bbfabcc15"},{url:"笔记/计算机网络/桌面运维/网络打印机.html",revision:"ea2e1ba1e964d474cf4b077c5046189e"},{url:"笔记/计算机网络/网工.html",revision:"aeea42c275fcc34427017b45e2f15d74"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
