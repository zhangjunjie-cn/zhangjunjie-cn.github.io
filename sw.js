if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,i)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let r={};const o=s=>a(s,l),c={module:{uri:l},exports:r,require:o};e[l]=Promise.all(n.map((s=>c[s]||o(s)))).then((s=>(i(...s),r)))}}define(["./workbox-8a682eb8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"1dea711b9dc4fd3c8e18a173c4420980"},{url:"about/index.html",revision:"bce73b9bd17a8bf5c1612811da8cf3ab"},{url:"about/me.html",revision:"e533181f2e86881b0277eab8a74f9824"},{url:"archives.html",revision:"593fd0caa0347751d6d76ffb0c0b1d99"},{url:"assets/about_index.md.BSN7tIBv.js",revision:null},{url:"assets/about_index.md.BSN7tIBv.lean.js",revision:null},{url:"assets/about_me.md.DM973pnv.js",revision:null},{url:"assets/about_me.md.DM973pnv.lean.js",revision:null},{url:"assets/app.B6usSZkG.js",revision:null},{url:"assets/archives.md.CRDufu7x.js",revision:null},{url:"assets/archives.md.CRDufu7x.lean.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.C50U5kcC.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.C50U5kcC.lean.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.Cxd2FOFk.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.Cxd2FOFk.lean.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.JOfeWwiz.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.JOfeWwiz.lean.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.DASJPwf6.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.DASJPwf6.lean.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.C6aZ8qNd.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.C6aZ8qNd.lean.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.DtjcJllt.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.DtjcJllt.lean.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.BPn6KQkg.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.BPn6KQkg.lean.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.UkQQ0yC1.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.UkQQ0yC1.lean.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.B3e6-Fxb.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.B3e6-Fxb.lean.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.qvAlGT_E.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.qvAlGT_E.lean.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.DmoHHzLk.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.DmoHHzLk.lean.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.Dt30xrj7.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.Dt30xrj7.lean.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.DnVtzAu5.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.DnVtzAu5.lean.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.YPutRP_d.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.YPutRP_d.lean.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.eE7qEkqu.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.eE7qEkqu.lean.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.BB-dL9ip.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.BB-dL9ip.lean.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.zS1uPNii.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.zS1uPNii.lean.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.D_oMNitF.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.D_oMNitF.lean.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.DQkiYrVV.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.DQkiYrVV.lean.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.BCPAVpBr.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.BCPAVpBr.lean.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.KT2-jUlT.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.KT2-jUlT.lean.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.CbMRYLiX.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.CbMRYLiX.lean.js",revision:null},{url:"assets/categories_annals_2024_index.md.V-Fnow67.js",revision:null},{url:"assets/categories_annals_2024_index.md.V-Fnow67.lean.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.D9KYtr-2.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.D9KYtr-2.lean.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.DaR2VZ8b.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.DaR2VZ8b.lean.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.DbxYX17d.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.DbxYX17d.lean.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.p21PN9Fc.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.p21PN9Fc.lean.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.mJuYL-Sd.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.mJuYL-Sd.lean.js",revision:null},{url:"assets/categories_annals_2025_index.md.C7XDci1n.js",revision:null},{url:"assets/categories_annals_2025_index.md.C7XDci1n.lean.js",revision:null},{url:"assets/categories_annals_index.md.DBX9AhPl.js",revision:null},{url:"assets/categories_annals_index.md.DBX9AhPl.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.CZlbWD9c.js",revision:null},{url:"assets/chunks/about-footer.H0rUUxsb.js",revision:null},{url:"assets/chunks/article.data.DeNfr3FY.js",revision:null},{url:"assets/chunks/ArticleMetadata.CJUTEUfa.js",revision:null},{url:"assets/chunks/cubic.CjKFoKw7.js",revision:null},{url:"assets/chunks/framework.CqMsGXHl.js",revision:null},{url:"assets/chunks/home.CI_tMMzU.js",revision:null},{url:"assets/chunks/index.BGGXrlai.js",revision:null},{url:"assets/chunks/theme.B7M2F_Xz.js",revision:null},{url:"assets/chunks/Timeline.DVrXOlEy.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.D4lPaLzR.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.B8pYlpZv.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.B8pYlpZv.lean.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.CELia2sh.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.CELia2sh.lean.js",revision:null},{url:"assets/courses_java_index.md.pEk8RZU-.js",revision:null},{url:"assets/courses_java_index.md.pEk8RZU-.lean.js",revision:null},{url:"assets/docs_index.md.jNRNuUuc.js",revision:null},{url:"assets/docs_index.md.jNRNuUuc.lean.js",revision:null},{url:"assets/fa-brands-400.BU4mH_I_.woff2",revision:null},{url:"assets/fa-regular-400.Cy4iLbxs.woff2",revision:null},{url:"assets/fa-solid-900.CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility.B9t6EWrS.woff2",revision:null},{url:"assets/index.md.DzWqEjTn.js",revision:null},{url:"assets/index.md.DzWqEjTn.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_index.md.D0g_HcE4.js",revision:null},{url:"assets/nav_index.md.D0g_HcE4.lean.js",revision:null},{url:"assets/style.B19irmnV.css",revision:null},{url:"assets/tags.md.BlPdsfBD.js",revision:null},{url:"assets/tags.md.BlPdsfBD.lean.js",revision:null},{url:"author.png",revision:"a400a82a2bb636b6f1888827611cbc1d"},{url:"categories/annals/2024/02/10/第二版博客搭建完成.html",revision:"7925a15a2cf618b4f2b68d3d4f5922a3"},{url:"categories/annals/2024/02/11/新年快乐.html",revision:"4605ccb54ca987c21235840982eb39c7"},{url:"categories/annals/2024/05/05/第三版博客搭建完成.html",revision:"2434714a7ff2f365d1cc0da9943037be"},{url:"categories/annals/2024/05/11/第四版博客新题性.html",revision:"1161b4e179857cb3054af21f6a553009"},{url:"categories/annals/2024/05/23/第五版博客发布完成.html",revision:"c6f671f07dcd73185cfb1877832daa6b"},{url:"categories/annals/2024/05/26/HA综合布线.html",revision:"41a778890c9ff8548b0923d95bef90d5"},{url:"categories/annals/2024/05/29/打印机共享.html",revision:"26bcca1f48c26ccbe90856a81931c8fc"},{url:"categories/annals/2024/06/02/性能优化.html",revision:"373ceb6328ce56a8abc3dfff84e7e5d3"},{url:"categories/annals/2024/06/03/Excel大小优化.html",revision:"4fd264420d5c420bb9bbe8fb5acf6737"},{url:"categories/annals/2024/06/10/更好的svg集成.html",revision:"5f766b5ec151d90d6712c5508d52a284"},{url:"categories/annals/2024/06/17/商业报告模板.html",revision:"2f1d8116ed8a24c795053aa8669948cd"},{url:"categories/annals/2024/08/18/第六版博客发布.html",revision:"2e7c02ac8e10b3d4946fc68f43b0aaa0"},{url:"categories/annals/2024/11/23/第七版博客发布.html",revision:"3403ec62d1394d9d87d79fe3071e0961"},{url:"categories/annals/2024/11/25/开始记录生活.html",revision:"56b8f854b4fd841108cfda251038db12"},{url:"categories/annals/2024/11/26/周二的一天.html",revision:"dbbc65a6175660710dff1f3472a51f3d"},{url:"categories/annals/2024/11/27/Daily Notes.html",revision:"c57dcf2f4c2a01fb92c8bf133e6c7a36"},{url:"categories/annals/2024/11/28/防火墙学习.html",revision:"dc140af4738208c42493e568106f7182"},{url:"categories/annals/2024/11/29/萤石云app接入.html",revision:"c032457a232e59d8b88831644a35b767"},{url:"categories/annals/2024/12/01/默认路由.html",revision:"750cccb30a2ce306dda100833b2ca856"},{url:"categories/annals/2024/12/02/加班处理考勤掉线.html",revision:"3bfa780ec44a967919d17cd260baffda"},{url:"categories/annals/2024/12/04/局域网路由.html",revision:"cc0d04a71c2a244047105ce25dbd3beb"},{url:"categories/annals/2024/12/12/最近日常.html",revision:"7b0a6f9837893c3ccf4bec57273d3596"},{url:"categories/annals/2024/index.html",revision:"14d64068e4c027d15293a5a7b9b3ef4f"},{url:"categories/annals/2025/01/01/云贵之旅.html",revision:"39c0d385a9db8c19e0cf9d321d90a955"},{url:"categories/annals/2025/01/02/新一年，新篇章.html",revision:"afe99539df999ec98e0542264c192aa3"},{url:"categories/annals/2025/01/05/第八版博客发布.html",revision:"bf37d3780f43177821a9ce8b66f15552"},{url:"categories/annals/2025/01/12/双栏布局.html",revision:"d5c9536897aadd172cd7005184a086b4"},{url:"categories/annals/2025/01/16/工作日常.html",revision:"7c0546f02d62d9e5d3c399f9fa0826f8"},{url:"categories/annals/2025/index.html",revision:"4d18f4fc7d1d048e0d585f55ae9fde93"},{url:"categories/annals/index.html",revision:"c03ee2de357eab0d5967ad279bcf9fc9"},{url:"courses/java/01-Java语法入门/01-开发环境搭建.html",revision:"f85603cc785b0662961622a049b9748d"},{url:"courses/java/01-Java语法入门/test.html",revision:"c8a344b0b3de8aa018a9aa24ffba438a"},{url:"courses/java/index.html",revision:"6ee3e5b64de69ec4acff7cf78f778d8b"},{url:"docs/index.html",revision:"53762b80d44a47c167bb60ddb7ebe87d"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"2eccb8521c39244ff257848037f464dd"},{url:"img/svg/about-repos-header.svg",revision:"7993542574165fd3323f476d048ce4fb"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"index.html",revision:"4339c9d86db65bf05c159603c84c3335"},{url:"logo.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav/index.html",revision:"4bdfcd5ad3b53437333428b39748a4da"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"tags.html",revision:"287187b77c74b57933a5fc93d57a8313"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
