if(!self.define){let s,e={};const n=(n,a)=>(n=new URL(n+".js",a).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(a,i)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let r={};const o=s=>n(s,l),_={module:{uri:l},exports:r,require:o};e[l]=Promise.all(a.map((s=>_[s]||o(s)))).then((s=>(i(...s),r)))}}define(["./workbox-8a682eb8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/about_index.md.BSN7tIBv.js",revision:null},{url:"assets/about_index.md.BSN7tIBv.lean.js",revision:null},{url:"assets/about_me.md.DM973pnv.js",revision:null},{url:"assets/about_me.md.DM973pnv.lean.js",revision:null},{url:"assets/app.Kk1J54Vn.js",revision:null},{url:"assets/archives.md.CkdGjIy5.js",revision:null},{url:"assets/archives.md.CkdGjIy5.lean.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.UAHKOsWx.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.UAHKOsWx.lean.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.D-oIukPy.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.D-oIukPy.lean.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.CZ-Zx2q8.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.CZ-Zx2q8.lean.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.C2bVEy1i.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.C2bVEy1i.lean.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.CadhhXIs.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.CadhhXIs.lean.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.B-ZtR6Ml.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.B-ZtR6Ml.lean.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.CbUEwR2N.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.CbUEwR2N.lean.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.Du2ck_zV.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.Du2ck_zV.lean.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.4TJ_Aqn0.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.4TJ_Aqn0.lean.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.VnonQGPg.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.VnonQGPg.lean.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.CXPkhTU0.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.CXPkhTU0.lean.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.DJomhy70.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.DJomhy70.lean.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.QzLHXBFC.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.QzLHXBFC.lean.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.BC5vCsFm.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.BC5vCsFm.lean.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.DXDaEFr2.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.DXDaEFr2.lean.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.DbTnDAdU.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.DbTnDAdU.lean.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.6wCCoWUL.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.6wCCoWUL.lean.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.B-y7o4Tr.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.B-y7o4Tr.lean.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.DuYsSESH.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.DuYsSESH.lean.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.B6elLfnR.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.B6elLfnR.lean.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.D8NK7uP3.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.D8NK7uP3.lean.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.60LCYIQj.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.60LCYIQj.lean.js",revision:null},{url:"assets/categories_annals_2024_index.md.CuyviQgj.js",revision:null},{url:"assets/categories_annals_2024_index.md.CuyviQgj.lean.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.S3k62aeP.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.S3k62aeP.lean.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.CkcUSNOL.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.CkcUSNOL.lean.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.CBmcCepp.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.CBmcCepp.lean.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.COj6pRGa.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.COj6pRGa.lean.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.DCadYmyY.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.DCadYmyY.lean.js",revision:null},{url:"assets/categories_annals_2025_03_17_交换机教程.md.DBKauQJw.js",revision:null},{url:"assets/categories_annals_2025_03_17_交换机教程.md.DBKauQJw.lean.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机初始化教程.md.BhMJdILS.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机初始化教程.md.BhMJdILS.lean.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机选型避坑.md.DwiwU4pS.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机选型避坑.md.DwiwU4pS.lean.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机错误排查.md.DFiGN2C9.js",revision:null},{url:"assets/categories_annals_2025_03_18_交换机错误排查.md.DFiGN2C9.lean.js",revision:null},{url:"assets/categories_annals_2025_03_21_windows文件服务器.md.D7wjrhjv.js",revision:null},{url:"assets/categories_annals_2025_03_21_windows文件服务器.md.D7wjrhjv.lean.js",revision:null},{url:"assets/categories_annals_2025_index.md.C0_vRh__.js",revision:null},{url:"assets/categories_annals_2025_index.md.C0_vRh__.lean.js",revision:null},{url:"assets/categories_annals_index.md.DkOOMCel.js",revision:null},{url:"assets/categories_annals_index.md.DkOOMCel.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.D5LQEE_c.js",revision:null},{url:"assets/chunks/about-footer.H0rUUxsb.js",revision:null},{url:"assets/chunks/article.data.BxE8HTA9.js",revision:null},{url:"assets/chunks/ArticleGPT.ByEMT2lZ.js",revision:null},{url:"assets/chunks/ArticleMetadata.6jJxjTXY.js",revision:null},{url:"assets/chunks/cubic.XV6FH0fC.js",revision:null},{url:"assets/chunks/framework.CqMsGXHl.js",revision:null},{url:"assets/chunks/home.IhUKCnjJ.js",revision:null},{url:"assets/chunks/index.DydEbXpg.js",revision:null},{url:"assets/chunks/theme.D6ntTN74.js",revision:null},{url:"assets/chunks/Timeline.DVrXOlEy.js",revision:null},{url:"assets/chunks/virtual_pwa-register.BpNFG0jz.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.DkKtjFSl.js",revision:null},{url:"assets/chunks/workbox-window.prod.es5.Cr_0OO2S.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.DskeRyck.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.DskeRyck.lean.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.BFwlcbby.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.BFwlcbby.lean.js",revision:null},{url:"assets/courses_java_index.md.BfDz3Nz4.js",revision:null},{url:"assets/courses_java_index.md.BfDz3Nz4.lean.js",revision:null},{url:"assets/docs_index.md.BcFzlKZl.js",revision:null},{url:"assets/docs_index.md.BcFzlKZl.lean.js",revision:null},{url:"assets/fa-brands-400.BU4mH_I_.woff2",revision:null},{url:"assets/fa-regular-400.Cy4iLbxs.woff2",revision:null},{url:"assets/fa-solid-900.CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility.B9t6EWrS.woff2",revision:null},{url:"assets/index.md.BfdzXE6x.js",revision:null},{url:"assets/index.md.BfdzXE6x.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_index.md.CQTfdxIu.js",revision:null},{url:"assets/nav_index.md.CQTfdxIu.lean.js",revision:null},{url:"assets/style.QT8dkP10.css",revision:null},{url:"assets/tags.md.BJr_YtLt.js",revision:null},{url:"assets/tags.md.BJr_YtLt.lean.js",revision:null},{url:"author.png",revision:"a400a82a2bb636b6f1888827611cbc1d"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"2eccb8521c39244ff257848037f464dd"},{url:"img/svg/about-repos-header.svg",revision:"7993542574165fd3323f476d048ce4fb"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"logo.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
