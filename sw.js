if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,l)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let r={};const u=s=>a(s,i),o={module:{uri:i},exports:r,require:u};e[i]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(l(...s),r)))}}define(["./workbox-d761f494"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"96ad1369c4917f6c7a883cfced52e399"},{url:"about/index.html",revision:"242e9eb07392f533f2becfb231eb6df6"},{url:"about/me.html",revision:"b72e683688e22e32f26bd033df247374"},{url:"archives.html",revision:"d0d1734547399d2e95a721f3ee023d2e"},{url:"assets/about_index.md.Dg7WIaho.js",revision:null},{url:"assets/about_index.md.Dg7WIaho.lean.js",revision:null},{url:"assets/about_me.md.CdgXmyFK.js",revision:null},{url:"assets/about_me.md.CdgXmyFK.lean.js",revision:null},{url:"assets/app.BiTx0wuU.js",revision:null},{url:"assets/archives.md.Bi-kt_ss.js",revision:null},{url:"assets/archives.md.Bi-kt_ss.lean.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.CbxKPdtN.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.CbxKPdtN.lean.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.CpmlZ8Gh.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.CpmlZ8Gh.lean.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.DJoSzaLW.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.DJoSzaLW.lean.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.C4rHXvcH.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.C4rHXvcH.lean.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.CxNCUosK.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.CxNCUosK.lean.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.BlCHTwiO.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.BlCHTwiO.lean.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.YT4WKoFS.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.YT4WKoFS.lean.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.Bt0n2tQz.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.Bt0n2tQz.lean.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.DukqMbY-.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.DukqMbY-.lean.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.B4iNTs1L.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.B4iNTs1L.lean.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.DRD8iYz6.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.DRD8iYz6.lean.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.D5HqcmN9.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.D5HqcmN9.lean.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.nWXE7eVE.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.nWXE7eVE.lean.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.qit9CzzC.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.qit9CzzC.lean.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.DrlwTLjc.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.DrlwTLjc.lean.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.b7gSDKQX.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.b7gSDKQX.lean.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.BIGSfhVj.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.BIGSfhVj.lean.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.-asncsb8.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.-asncsb8.lean.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.Bjs1r0cu.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.Bjs1r0cu.lean.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.CyWsMfGq.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.CyWsMfGq.lean.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.CtRNlK0D.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.CtRNlK0D.lean.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.DqpiOpAk.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.DqpiOpAk.lean.js",revision:null},{url:"assets/categories_annals_2024_index.md.1S5GJQ0U.js",revision:null},{url:"assets/categories_annals_2024_index.md.1S5GJQ0U.lean.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.CY3ipLAE.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.CY3ipLAE.lean.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.Bdp-tgUI.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.Bdp-tgUI.lean.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.ClYGfpjj.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.ClYGfpjj.lean.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.Crvfi04c.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.Crvfi04c.lean.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.DeAaUrmW.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.DeAaUrmW.lean.js",revision:null},{url:"assets/categories_annals_2025_03_17_交换机教程.md.Ceq4oKVy.js",revision:null},{url:"assets/categories_annals_2025_03_17_交换机教程.md.Ceq4oKVy.lean.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机初始化教程.md.bb9vFYIQ.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机初始化教程.md.bb9vFYIQ.lean.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机选型避坑.md.CF4AJWHD.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机选型避坑.md.CF4AJWHD.lean.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机错误排查.md.QqTMrqtw.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机错误排查.md.QqTMrqtw.lean.js",revision:null},{url:"assets/categories_annals_2025_03_21_windows文件服务器.md.B0hoT5Km.js",revision:null},{url:"assets/categories_annals_2025_03_21_windows文件服务器.md.B0hoT5Km.lean.js",revision:null},{url:"assets/categories_annals_2025_03_24_fortiClientGate学习.md.BvDQjyux.js",revision:null},{url:"assets/categories_annals_2025_03_24_fortiClientGate学习.md.BvDQjyux.lean.js",revision:null},{url:"assets/categories_annals_2025_03_24_自定义策略路由.md.Dr9pESSz.js",revision:null},{url:"assets/categories_annals_2025_03_24_自定义策略路由.md.Dr9pESSz.lean.js",revision:null},{url:"assets/categories_annals_2025_03_24_路由出站入站分析.md.CcxxLXKr.js",revision:null},{url:"assets/categories_annals_2025_03_24_路由出站入站分析.md.CcxxLXKr.lean.js",revision:null},{url:"assets/categories_annals_2025_03_24_防火墙路由之静态路由（一）.md.BE7a5AaE.js",revision:null},{url:"assets/categories_annals_2025_03_24_防火墙路由之静态路由（一）.md.BE7a5AaE.lean.js",revision:null},{url:"assets/categories_annals_2025_03_25_华为交换机系列.md.CsomRmS-.js",revision:null},{url:"assets/categories_annals_2025_03_25_华为交换机系列.md.CsomRmS-.lean.js",revision:null},{url:"assets/categories_annals_2025_03_26_防火墙路由之策略路由（二）.md.Dou3GZ5t.js",revision:null},{url:"assets/categories_annals_2025_03_26_防火墙路由之策略路由（二）.md.Dou3GZ5t.lean.js",revision:null},{url:"assets/categories_annals_2025_03_26_防火墙路由之防火墙策略（三）.md.CBbRvAhb.js",revision:null},{url:"assets/categories_annals_2025_03_26_防火墙路由之防火墙策略（三）.md.CBbRvAhb.lean.js",revision:null},{url:"assets/categories_annals_2025_04_13_三层交换机防病毒.md.BlSjBitV.js",revision:null},{url:"assets/categories_annals_2025_04_13_三层交换机防病毒.md.BlSjBitV.lean.js",revision:null},{url:"assets/categories_annals_2025_04_13_交换机的 VLANIF 接口详解.md.CA7fVJeo.js",revision:null},{url:"assets/categories_annals_2025_04_13_交换机的 VLANIF 接口详解.md.CA7fVJeo.lean.js",revision:null},{url:"assets/categories_annals_2025_04_13_企业级网络架构分析.md.DAvMdd-n.js",revision:null},{url:"assets/categories_annals_2025_04_13_企业级网络架构分析.md.DAvMdd-n.lean.js",revision:null},{url:"assets/categories_annals_2025_04_13_傻瓜交换机架构最佳实践.md.Jo2pmcII.js",revision:null},{url:"assets/categories_annals_2025_04_13_傻瓜交换机架构最佳实践.md.Jo2pmcII.lean.js",revision:null},{url:"assets/categories_annals_2025_index.md.D1PiFK1o.js",revision:null},{url:"assets/categories_annals_2025_index.md.D1PiFK1o.lean.js",revision:null},{url:"assets/categories_annals_index.md.Cwc7RQn2.js",revision:null},{url:"assets/categories_annals_index.md.Cwc7RQn2.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.B4OwoCUp.js",revision:null},{url:"assets/chunks/about-footer.H0rUUxsb.js",revision:null},{url:"assets/chunks/arc.CwiF0KQk.js",revision:null},{url:"assets/chunks/architectureDiagram-IEHRJDOE.d_PJCrg9.js",revision:null},{url:"assets/chunks/article.data.ya4vJllV.js",revision:null},{url:"assets/chunks/ArticleGPT.Bb1dTucW.js",revision:null},{url:"assets/chunks/ArticleMetadata.D_IfFL7L.js",revision:null},{url:"assets/chunks/band.BwxuWtAG.js",revision:null},{url:"assets/chunks/blockDiagram-JOT3LUYC.3W7Ja1SR.js",revision:null},{url:"assets/chunks/c4Diagram-VJAJSXHY.2ukD1JPV.js",revision:null},{url:"assets/chunks/channel.PyZqFgRS.js",revision:null},{url:"assets/chunks/chunk-4BMEZGHF.Wcm0v2Yc.js",revision:null},{url:"assets/chunks/chunk-A2AXSNBT.CSc1OIOZ.js",revision:null},{url:"assets/chunks/chunk-AEK57VVT.BPPyirev.js",revision:null},{url:"assets/chunks/chunk-D6G4REZN.c-h9UbMt.js",revision:null},{url:"assets/chunks/chunk-RZ5BOZE2.q19kUBh8.js",revision:null},{url:"assets/chunks/chunk-XZIHB7SX.DM2KUjqV.js",revision:null},{url:"assets/chunks/classDiagram-GIVACNV2.BPHGPD4u.js",revision:null},{url:"assets/chunks/classDiagram-v2-COTLJTTW.BPHGPD4u.js",revision:null},{url:"assets/chunks/cytoscape.esm.CfBqOv7Q.js",revision:null},{url:"assets/chunks/dagre-OKDRZEBW.BelKFjjT.js",revision:null},{url:"assets/chunks/dayjs.min.BY7vXWf5.js",revision:null},{url:"assets/chunks/diagram-SSKATNLV.BQKkAL2M.js",revision:null},{url:"assets/chunks/diagram-VNBRO52H.BuxNSdJM.js",revision:null},{url:"assets/chunks/erDiagram-Q7BY3M3F.MAaHQv_Y.js",revision:null},{url:"assets/chunks/flowDiagram-4HSFHLVR.CM5cOCnB.js",revision:null},{url:"assets/chunks/framework.DfjUQpHG.js",revision:null},{url:"assets/chunks/ganttDiagram-APWFNJXF.Cj9mOCiB.js",revision:null},{url:"assets/chunks/gitGraphDiagram-7IBYFJ6S.XXp4iL5w.js",revision:null},{url:"assets/chunks/graph.Cd7OW8jN.js",revision:null},{url:"assets/chunks/home.BukgtVfD.js",revision:null},{url:"assets/chunks/index.0fKt7v9s.js",revision:null},{url:"assets/chunks/index.Deh-lfQt.js",revision:null},{url:"assets/chunks/index.Dfdwop9x.js",revision:null},{url:"assets/chunks/index.es.DImF4M5O.js",revision:null},{url:"assets/chunks/infoDiagram-PH2N3AL5.GugCWkQO.js",revision:null},{url:"assets/chunks/init.Dmth1JHB.js",revision:null},{url:"assets/chunks/journeyDiagram-U35MCT3I.DmnK6XQQ.js",revision:null},{url:"assets/chunks/kanban-definition-NDS4AKOZ.HbNvx1VW.js",revision:null},{url:"assets/chunks/katex.ChWnQ-fc.js",revision:null},{url:"assets/chunks/layout.CHH1mkxl.js",revision:null},{url:"assets/chunks/linear.pmWNyHP6.js",revision:null},{url:"assets/chunks/LinkInline.vue_vue_type_script_setup_true_lang.e1lmoHZd.js",revision:null},{url:"assets/chunks/mindmap-definition-ALO5MXBD.BE1hxYXs.js",revision:null},{url:"assets/chunks/ordinal.BJp8kCrd.js",revision:null},{url:"assets/chunks/pieDiagram-IB7DONF6.uqvslMJW.js",revision:null},{url:"assets/chunks/quadrantDiagram-7GDLP6J5.1hE5Hoja.js",revision:null},{url:"assets/chunks/radar-MK3ICKWK.BAsjWDnC.js",revision:null},{url:"assets/chunks/requirementDiagram-KVF5MWMF.DAQ-ceml.js",revision:null},{url:"assets/chunks/sankeyDiagram-QLVOVGJD.DgS4lGrr.js",revision:null},{url:"assets/chunks/sequenceDiagram-X6HHIX6F.Bl7bc2UU.js",revision:null},{url:"assets/chunks/stateDiagram-DGXRK772.C1XFtzb8.js",revision:null},{url:"assets/chunks/stateDiagram-v2-YXO3MK2T.BCqUxPy9.js",revision:null},{url:"assets/chunks/Tableau10.1LCcg9PS.js",revision:null},{url:"assets/chunks/theme.Dc4MCUcl.js",revision:null},{url:"assets/chunks/time.Bp2vK2M7.js",revision:null},{url:"assets/chunks/timeline-definition-BDJGKUSR.DwrTDgAY.js",revision:null},{url:"assets/chunks/Timeline.BYQFc4zZ.js",revision:null},{url:"assets/chunks/transform.CWwOAeQB.js",revision:null},{url:"assets/chunks/virtual_mermaid-config.DDnGl6nM.js",revision:null},{url:"assets/chunks/virtual_pwa-register.Y2ixBI0b.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.C_6YRN4z.js",revision:null},{url:"assets/chunks/workbox-window.prod.es5.Cr_0OO2S.js",revision:null},{url:"assets/chunks/xychartDiagram-VJFVF3MP._88qenOW.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.gLA03frm.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.gLA03frm.lean.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.DQbL4pIz.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.DQbL4pIz.lean.js",revision:null},{url:"assets/courses_java_index.md.CxUjc9rd.js",revision:null},{url:"assets/courses_java_index.md.CxUjc9rd.lean.js",revision:null},{url:"assets/docs_index.md.7V5pWkw-.js",revision:null},{url:"assets/docs_index.md.7V5pWkw-.lean.js",revision:null},{url:"assets/fa-brands-400.D_cYUPeE.woff2",revision:null},{url:"assets/fa-regular-400.BjRzuEpd.woff2",revision:null},{url:"assets/fa-solid-900.CTAAxXor.woff2",revision:null},{url:"assets/fa-v4compatibility.C9RhG_FT.woff2",revision:null},{url:"assets/features_index.md.6HmWUjjM.js",revision:null},{url:"assets/features_index.md.6HmWUjjM.lean.js",revision:null},{url:"assets/features_test.md.BbiuWLZy.js",revision:null},{url:"assets/features_test.md.BbiuWLZy.lean.js",revision:null},{url:"assets/index.md.HgeQC-4s.js",revision:null},{url:"assets/index.md.HgeQC-4s.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_index.md.XrfASz9P.js",revision:null},{url:"assets/nav_index.md.XrfASz9P.lean.js",revision:null},{url:"assets/style.PrrlmEAO.css",revision:null},{url:"assets/tags.md.BWBn693K.js",revision:null},{url:"assets/tags.md.BWBn693K.lean.js",revision:null},{url:"author.png",revision:"a400a82a2bb636b6f1888827611cbc1d"},{url:"categories/annals/2024/02/10/第二版博客搭建完成.html",revision:"e1a11c7c7a8e048eadd2d4cb0bf39d96"},{url:"categories/annals/2024/02/11/新年快乐.html",revision:"a4a9519180339bafb0ab0385d80d3778"},{url:"categories/annals/2024/05/05/第三版博客搭建完成.html",revision:"c677d86ea94f523b2e727639fdfba141"},{url:"categories/annals/2024/05/11/第四版博客新题性.html",revision:"fa3e5a93aaebf135f355afa74228ea8c"},{url:"categories/annals/2024/05/23/第五版博客发布完成.html",revision:"cacf49044c9eeebb9acaa76a00d78f8b"},{url:"categories/annals/2024/05/26/HA综合布线.html",revision:"ef7eb92ddb786f6608cdcdf55075c630"},{url:"categories/annals/2024/05/29/打印机共享.html",revision:"aa180746868c4273875777d105aa0929"},{url:"categories/annals/2024/06/02/性能优化.html",revision:"8b4d3c70dd2c5613ca45d2ecb4cc6aae"},{url:"categories/annals/2024/06/03/Excel大小优化.html",revision:"8d46c8541e8a12ea96430abe2451dde8"},{url:"categories/annals/2024/06/10/更好的svg集成.html",revision:"9ed058cb52071a0a550dfc423ee9e407"},{url:"categories/annals/2024/06/17/商业报告模板.html",revision:"0f98d4216805c3399d4317fb34f89a30"},{url:"categories/annals/2024/08/18/第六版博客发布.html",revision:"f98b82e3cdf881181861968de5a4b0c2"},{url:"categories/annals/2024/11/23/第七版博客发布.html",revision:"7e1044cec5ca9aee33fc3271a04de64f"},{url:"categories/annals/2024/11/25/开始记录生活.html",revision:"fd1f65c9fe55b3c52f40cb771656648c"},{url:"categories/annals/2024/11/26/周二的一天.html",revision:"8649e0634c549cdcaf0399c78037d598"},{url:"categories/annals/2024/11/27/Daily Notes.html",revision:"ab4a52948be4669bb89179e904587425"},{url:"categories/annals/2024/11/28/防火墙学习.html",revision:"84d839eec1f9669f2a00c8936398c48d"},{url:"categories/annals/2024/11/29/萤石云app接入.html",revision:"a820edea7049a0a0e6fb240e97430a2a"},{url:"categories/annals/2024/12/01/默认路由.html",revision:"3525cd2617e55efd8abbb508c75297e5"},{url:"categories/annals/2024/12/02/加班处理考勤掉线.html",revision:"f7ecc656f2841588ec67bdb7f9d762b8"},{url:"categories/annals/2024/12/04/局域网路由.html",revision:"53a1702fc59635cf02e5df3f33181623"},{url:"categories/annals/2024/12/12/最近日常.html",revision:"fa006f08f25670b455dbda10bef6b62a"},{url:"categories/annals/2024/index.html",revision:"2ca99506fdeb5233890942cef7d78596"},{url:"categories/annals/2025/01/01/云贵之旅.html",revision:"f74697a3e8effbc8a24779118a9a51ad"},{url:"categories/annals/2025/01/02/新一年，新篇章.html",revision:"f69349ab2013f7fda8b168cff63a7a1f"},{url:"categories/annals/2025/01/05/第八版博客发布.html",revision:"72470421c1c2845313d2f4c3335e4f58"},{url:"categories/annals/2025/01/12/双栏布局.html",revision:"71991e7c03180a6051e2e716251dc12a"},{url:"categories/annals/2025/01/16/工作日常.html",revision:"0091a1eb4a9c12baa5cd0b00c6dffa0e"},{url:"categories/annals/2025/03/17/交换机教程.html",revision:"8f78fb97f4bbf9608860decff204cda8"},{url:"categories/annals/2025/03/18/交换机初始化教程.html",revision:"2b4116fd7c8659a5f654699258d06f10"},{url:"categories/annals/2025/03/18/交换机选型避坑.html",revision:"9a52873534c19cde3e2f2a83d960d026"},{url:"categories/annals/2025/03/18/交换机错误排查.html",revision:"9c428196f5cce12570e652c5f30b1cac"},{url:"categories/annals/2025/03/21/windows文件服务器.html",revision:"ceb3abb535261904efed40e4c93bad91"},{url:"categories/annals/2025/03/24/fortiClientGate学习.html",revision:"b6dbbbd08324063aafba981484cdaf4f"},{url:"categories/annals/2025/03/24/自定义策略路由.html",revision:"177d4228eeb61831fe8aee6f4eca41ac"},{url:"categories/annals/2025/03/24/路由出站入站分析.html",revision:"6abdac70569a656cc6b2d1b08d26ef3c"},{url:"categories/annals/2025/03/24/防火墙路由之静态路由（一）.html",revision:"7bd621a25b56f6d1d00504cef2578710"},{url:"categories/annals/2025/03/25/华为交换机系列.html",revision:"c5e79cf017af9e28b204a35c2ebbaa99"},{url:"categories/annals/2025/03/26/防火墙路由之策略路由（二）.html",revision:"e67da48feffc4f44abf07ba67e53b293"},{url:"categories/annals/2025/03/26/防火墙路由之防火墙策略（三）.html",revision:"d86628ee58f62ea0c4216008e9dc485c"},{url:"categories/annals/2025/04/13/三层交换机防病毒.html",revision:"81d08124341d039ac207784d3f1c376a"},{url:"categories/annals/2025/04/13/交换机的 VLANIF 接口详解.html",revision:"e649e0da6057db15adffd1c8015f51e8"},{url:"categories/annals/2025/04/13/企业级网络架构分析.html",revision:"c5bb09552382e775a686d741e8e16ba3"},{url:"categories/annals/2025/04/13/傻瓜交换机架构最佳实践.html",revision:"971a5330b21168559854098ac448f5e2"},{url:"categories/annals/2025/index.html",revision:"161b39d457bc512c9a0a25c7b77118c7"},{url:"categories/annals/index.html",revision:"8c21f84079de0521f23894c1122edfc3"},{url:"courses/java/01-Java语法入门/01-开发环境搭建.html",revision:"e6503890fc83c1a368b285950eed2e08"},{url:"courses/java/01-Java语法入门/test.html",revision:"d7bf0095fb8f0aff6a5f940ae7f00059"},{url:"courses/java/index.html",revision:"891f0d05941d84161447560264fc47b8"},{url:"docs/index.html",revision:"7e6d2f37a6696f189f861d9ae192b7f8"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"features/index.html",revision:"f5939ce7ea39b80e338845cb6f34a8dd"},{url:"features/test.html",revision:"6551a7dfdc03ce580737ff703dae271e"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/go_top.png",revision:"b0605bbb765779aa0d422643acfdc3bf"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"2eccb8521c39244ff257848037f464dd"},{url:"img/svg/about-repos-header.svg",revision:"7993542574165fd3323f476d048ce4fb"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"index.html",revision:"f4a019db43b6d82c422af9383e6d419a"},{url:"logo.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav/index.html",revision:"4422df2920f15aceefb965db7ef9b13b"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"tags.html",revision:"6e98a527330399b69e129f7a2478aa33"},{url:"template.mp4",revision:"cb5023ade0e1c52bc4cb1a9f4b3a6fc2"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"未标题-5(1)(1).png",revision:"3e3ff3ae13634c3bbcbcb17ea043a2ad"},{url:"符玄/符玄.4096/texture_00.png",revision:"d01da547b5801a08719f3117e69b6018"},{url:"符玄/符玄.4096/texture_01.png",revision:"27ce95fc29d6609c9e0783c504f02608"},{url:"符玄/符玄.4096/texture_02.png",revision:"dcb2a5ab8cb4f759f8180c92da1bee97"},{url:"符玄/符玄.4096/texture_03.png",revision:"e1fe5b8f74736ab44b73c96946efc0a9"},{url:"符玄/符玄.4096/texture_04.png",revision:"131e22a6817fbe1a9395758b6ca81ae5"},{url:"符玄/符玄.4096/texture_05.png",revision:"9e1f09d5fb8539a7b82076cad6eebd8d"},{url:"符玄/符玄.4096/texture_06.png",revision:"adfa6b396d13823f9b756c5013872a8e"},{url:"符玄/符玄.4096/texture_07.png",revision:"d7c3c68506b6301509f74ae90956f8d3"},{url:"manifest.webmanifest",revision:"43a492d1b1fdd2c814d97804090e59a1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/posts.+\.js$/,new s.StaleWhileRevalidate({cacheName:"article-content",plugins:[new s.ExpirationPlugin({maxEntries:100,maxAgeSeconds:604800})]}),"GET")}));
