if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,i)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let r={};const o=s=>a(s,l),c={module:{uri:l},exports:r,require:o};e[l]=Promise.all(n.map((s=>c[s]||o(s)))).then((s=>(i(...s),r)))}}define(["./workbox-8a682eb8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"9c078f2514f3693bbf37b14aec10e9b5"},{url:"about/index.html",revision:"ab9c84722070cc11de0f72392a593805"},{url:"about/me.html",revision:"18ba90d06ee0973ac389c753e31abd32"},{url:"archives.html",revision:"45ab61ca0afcfe119618b30620fb7c31"},{url:"assets/about_index.md.BSN7tIBv.js",revision:null},{url:"assets/about_index.md.BSN7tIBv.lean.js",revision:null},{url:"assets/about_me.md.DM973pnv.js",revision:null},{url:"assets/about_me.md.DM973pnv.lean.js",revision:null},{url:"assets/app.yleKGCbO.js",revision:null},{url:"assets/archives.md.inZpIJfr.js",revision:null},{url:"assets/archives.md.inZpIJfr.lean.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.MxsKeFwM.js",revision:null},{url:"assets/categories_annals_2024_02_10_第二版博客搭建完成.md.MxsKeFwM.lean.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.lcnWc2-l.js",revision:null},{url:"assets/categories_annals_2024_02_11_新年快乐.md.lcnWc2-l.lean.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.CyOPGd_H.js",revision:null},{url:"assets/categories_annals_2024_05_05_第三版博客搭建完成.md.CyOPGd_H.lean.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.B4fkZ7Uw.js",revision:null},{url:"assets/categories_annals_2024_05_11_第四版博客新题性.md.B4fkZ7Uw.lean.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.DDxk-Yrm.js",revision:null},{url:"assets/categories_annals_2024_05_23_第五版博客发布完成.md.DDxk-Yrm.lean.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.CfdQNtq8.js",revision:null},{url:"assets/categories_annals_2024_05_26_HA综合布线.md.CfdQNtq8.lean.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.G-pOb4H4.js",revision:null},{url:"assets/categories_annals_2024_05_29_打印机共享.md.G-pOb4H4.lean.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.CuZOCA4n.js",revision:null},{url:"assets/categories_annals_2024_06_02_性能优化.md.CuZOCA4n.lean.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.CW8bAzl0.js",revision:null},{url:"assets/categories_annals_2024_06_03_Excel大小优化.md.CW8bAzl0.lean.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.euLskR4S.js",revision:null},{url:"assets/categories_annals_2024_06_10_更好的svg集成.md.euLskR4S.lean.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.D6USgOhW.js",revision:null},{url:"assets/categories_annals_2024_06_17_商业报告模板.md.D6USgOhW.lean.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.DWgk2gxt.js",revision:null},{url:"assets/categories_annals_2024_08_18_第六版博客发布.md.DWgk2gxt.lean.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.CzxOrrsq.js",revision:null},{url:"assets/categories_annals_2024_11_23_第七版博客发布.md.CzxOrrsq.lean.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.AK6Dbxrn.js",revision:null},{url:"assets/categories_annals_2024_11_25_开始记录生活.md.AK6Dbxrn.lean.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.Dmv0HKh7.js",revision:null},{url:"assets/categories_annals_2024_11_26_周二的一天.md.Dmv0HKh7.lean.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.CzOMr5Tf.js",revision:null},{url:"assets/categories_annals_2024_11_27_Daily Notes.md.CzOMr5Tf.lean.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.Ds8C1gez.js",revision:null},{url:"assets/categories_annals_2024_11_28_防火墙学习.md.Ds8C1gez.lean.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.C7rh_OV3.js",revision:null},{url:"assets/categories_annals_2024_11_29_萤石云app接入.md.C7rh_OV3.lean.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.DWdwtmM1.js",revision:null},{url:"assets/categories_annals_2024_12_01_默认路由.md.DWdwtmM1.lean.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.BfwHUfCp.js",revision:null},{url:"assets/categories_annals_2024_12_02_加班处理考勤掉线.md.BfwHUfCp.lean.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.BaO18JDX.js",revision:null},{url:"assets/categories_annals_2024_12_04_局域网路由.md.BaO18JDX.lean.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.DUl9AQ_-.js",revision:null},{url:"assets/categories_annals_2024_12_12_最近日常.md.DUl9AQ_-.lean.js",revision:null},{url:"assets/categories_annals_2024_index.md.fTITxUWA.js",revision:null},{url:"assets/categories_annals_2024_index.md.fTITxUWA.lean.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.sKjigTf1.js",revision:null},{url:"assets/categories_annals_2025_01_01_云贵之旅.md.sKjigTf1.lean.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.9KbzND5I.js",revision:null},{url:"assets/categories_annals_2025_01_02_新一年，新篇章.md.9KbzND5I.lean.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.CFpMYtXk.js",revision:null},{url:"assets/categories_annals_2025_01_05_第八版博客发布.md.CFpMYtXk.lean.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.DIq-G3qr.js",revision:null},{url:"assets/categories_annals_2025_01_12_双栏布局.md.DIq-G3qr.lean.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.DdMvUGMm.js",revision:null},{url:"assets/categories_annals_2025_01_16_工作日常.md.DdMvUGMm.lean.js",revision:null},{url:"assets/categories_annals_2025_index.md.M8dMm345.js",revision:null},{url:"assets/categories_annals_2025_index.md.M8dMm345.lean.js",revision:null},{url:"assets/categories_annals_index.md.DjwORbxK.js",revision:null},{url:"assets/categories_annals_index.md.DjwORbxK.lean.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.D3HEaUVB.js",revision:null},{url:"assets/chunks/about-footer.H0rUUxsb.js",revision:null},{url:"assets/chunks/article.data.DeNfr3FY.js",revision:null},{url:"assets/chunks/ArticleMetadata.Ba2SLkeC.js",revision:null},{url:"assets/chunks/cubic.Cma6XTLX.js",revision:null},{url:"assets/chunks/framework.CqMsGXHl.js",revision:null},{url:"assets/chunks/home.CMAEcmT7.js",revision:null},{url:"assets/chunks/index.kUoKscUs.js",revision:null},{url:"assets/chunks/theme.DF-xqnh1.js",revision:null},{url:"assets/chunks/Timeline.DVrXOlEy.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.C-wB4CyR.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.BSXsxh5L.js",revision:null},{url:"assets/courses_java_01-Java语法入门_01-开发环境搭建.md.BSXsxh5L.lean.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.C8zOJmwk.js",revision:null},{url:"assets/courses_java_01-Java语法入门_test.md.C8zOJmwk.lean.js",revision:null},{url:"assets/courses_java_index.md.COrVnhql.js",revision:null},{url:"assets/courses_java_index.md.COrVnhql.lean.js",revision:null},{url:"assets/docs_index.md.DbnjInS3.js",revision:null},{url:"assets/docs_index.md.DbnjInS3.lean.js",revision:null},{url:"assets/fa-brands-400.BU4mH_I_.woff2",revision:null},{url:"assets/fa-regular-400.Cy4iLbxs.woff2",revision:null},{url:"assets/fa-solid-900.CcrrL0x0.woff2",revision:null},{url:"assets/fa-v4compatibility.B9t6EWrS.woff2",revision:null},{url:"assets/index.md.Bj3-DPBL.js",revision:null},{url:"assets/index.md.Bj3-DPBL.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/nav_index.md.DPRcYfIB.js",revision:null},{url:"assets/nav_index.md.DPRcYfIB.lean.js",revision:null},{url:"assets/style.B19irmnV.css",revision:null},{url:"assets/tags.md.CmFktO08.js",revision:null},{url:"assets/tags.md.CmFktO08.lean.js",revision:null},{url:"author.png",revision:"a400a82a2bb636b6f1888827611cbc1d"},{url:"categories/annals/2024/02/10/第二版博客搭建完成.html",revision:"9a72b7faabb215c945165d4a79436ee8"},{url:"categories/annals/2024/02/11/新年快乐.html",revision:"d97f98dbbe56f1fbe60642f7e058ddd5"},{url:"categories/annals/2024/05/05/第三版博客搭建完成.html",revision:"1791508df08d2ec2f366618493ddf5ed"},{url:"categories/annals/2024/05/11/第四版博客新题性.html",revision:"1e550f010c59c99e1133803cc405b613"},{url:"categories/annals/2024/05/23/第五版博客发布完成.html",revision:"3deac5d3d853fad37ef7c72f5c6471bd"},{url:"categories/annals/2024/05/26/HA综合布线.html",revision:"b5072011fea1cd6ed877d23653d1180e"},{url:"categories/annals/2024/05/29/打印机共享.html",revision:"aa90822aeeb2cdfbd4a14f1d5d6e8fd9"},{url:"categories/annals/2024/06/02/性能优化.html",revision:"345d3c208589950f9b8d0f9546209aa8"},{url:"categories/annals/2024/06/03/Excel大小优化.html",revision:"8f37d3826e6f84ac993ba506ef4435ec"},{url:"categories/annals/2024/06/10/更好的svg集成.html",revision:"33e332caff81de51eb19a93716db3a1b"},{url:"categories/annals/2024/06/17/商业报告模板.html",revision:"7e6510c225eb07a145a0c02ade97cfeb"},{url:"categories/annals/2024/08/18/第六版博客发布.html",revision:"588f5508484e22f7cac08d948401c54c"},{url:"categories/annals/2024/11/23/第七版博客发布.html",revision:"53175478c876f0e7097bbd556cd46dd5"},{url:"categories/annals/2024/11/25/开始记录生活.html",revision:"275e7d48069d79710898b6f491ae0332"},{url:"categories/annals/2024/11/26/周二的一天.html",revision:"4de60e14bfa1ca8c5aef261988291eb1"},{url:"categories/annals/2024/11/27/Daily Notes.html",revision:"e065fc71dbca19f4e56b38fd7a9fcc01"},{url:"categories/annals/2024/11/28/防火墙学习.html",revision:"891ffce7b2925bb507abf580ae665d13"},{url:"categories/annals/2024/11/29/萤石云app接入.html",revision:"adc15015ebffc98df08b36043b30d88e"},{url:"categories/annals/2024/12/01/默认路由.html",revision:"b7c49563c9f3b7d8bb0529f3efac0f05"},{url:"categories/annals/2024/12/02/加班处理考勤掉线.html",revision:"dd7b18b4cd164635f6f6c36e36ebdc18"},{url:"categories/annals/2024/12/04/局域网路由.html",revision:"61e2dfffb083225810b4783257caa259"},{url:"categories/annals/2024/12/12/最近日常.html",revision:"f0d29ec607f676180fdb4fbbab050fc2"},{url:"categories/annals/2024/index.html",revision:"e0afba2f7ffddfe31246455e6502e1fb"},{url:"categories/annals/2025/01/01/云贵之旅.html",revision:"ef16824e2d8682a93ed27ce053ac5aed"},{url:"categories/annals/2025/01/02/新一年，新篇章.html",revision:"4f3f8ad7cc5457ae78e8028ebecb21f2"},{url:"categories/annals/2025/01/05/第八版博客发布.html",revision:"f3b05061f0e6c0a7ec5cd6bdd9c89292"},{url:"categories/annals/2025/01/12/双栏布局.html",revision:"93ef07e876890c7623c40c66b911e20f"},{url:"categories/annals/2025/01/16/工作日常.html",revision:"b313459645ac5e2c45d8690b600cdfe8"},{url:"categories/annals/2025/index.html",revision:"f5daeff5758517af8f7b22ab35322447"},{url:"categories/annals/index.html",revision:"62699870f8012e21f274a8d6bb7822da"},{url:"courses/java/01-Java语法入门/01-开发环境搭建.html",revision:"40c29381e2386296d73655f660b90836"},{url:"courses/java/01-Java语法入门/test.html",revision:"cbad66b356ad870d2a03457e525fcff6"},{url:"courses/java/index.html",revision:"1242159651e9dd42dd48af18e9ba0b9a"},{url:"docs/index.html",revision:"8ed4e78d483595e27c3f94f732e9689e"},{url:"favicon.ico",revision:"1786f94c4ded09536352e6d4593a250c"},{url:"favicon1.ico",revision:"d5b32211da730deb16993b42a2f53f2c"},{url:"icons/2024-1.png",revision:"cef68213709b2aaf990f47242bc46c14"},{url:"icons/2024-2.png",revision:"0c3486d1c7e99cc3b821b7cd8d5aa4bc"},{url:"icons/chatgpt.png",revision:"d52a7c4a482f1f35612241396c01d8d8"},{url:"icons/cnblogs.svg",revision:"9cf1175f8413d681d95c7cc02bc07828"},{url:"icons/es6.svg",revision:"a8c0674b51460d0e001c0d094cbf4c6a"},{url:"icons/jquery.svg",revision:"d363aa3485f2c5969ec35f5244bc5baa"},{url:"icons/json-cn.ico",revision:"73abdbe6f011f89cfa85447d8810c99e"},{url:"icons/koa.svg",revision:"0a55e7b8b060858ad9a2c6d0eff2b6f8"},{url:"icons/nodejs.svg",revision:"44a234015b8737a059c50901835a213a"},{url:"icons/pixiv.png",revision:"ca406e28983076988e9c0306881fe212"},{url:"icons/taro.svg",revision:"f418f25c1eb2c64ac59338aa6c6f22f8"},{url:"icons/twitter.svg",revision:"1be47a681202ef9b91ee0278dbd163ac"},{url:"images/pwa-120x120.png",revision:"d768ed45466e7c58cfef0dd946ce13e9"},{url:"images/pwa-192x192.png",revision:"2c6d9f5c1a5d9297e334101762859b1b"},{url:"images/pwa-512x512.png",revision:"2148f599081176f72cc315d04b9c7cb8"},{url:"img/svg/about-footer.svg",revision:"f82fca1076119ca03becae14445948f8"},{url:"img/svg/about-me-header.svg",revision:"2eccb8521c39244ff257848037f464dd"},{url:"img/svg/about-repos-header.svg",revision:"7993542574165fd3323f476d048ce4fb"},{url:"img/svg/chinese-zodiac/dog.svg",revision:"41a6c465348f1e5268d8b1dd3fcecf1a"},{url:"img/svg/chinese-zodiac/dragon.svg",revision:"6705225ffac271a5e28ea8d6a02e6a0c"},{url:"img/svg/chinese-zodiac/goat.svg",revision:"631444a4782fca46fe10a03d47db1c9e"},{url:"img/svg/chinese-zodiac/horse.svg",revision:"186fdfc3c99764e31a574742eedd73cc"},{url:"img/svg/chinese-zodiac/monkey.svg",revision:"975f8b94b1514a55d802278f68d7d175"},{url:"img/svg/chinese-zodiac/ox.svg",revision:"d30d075427efbe68bddd19d98c3ebd06"},{url:"img/svg/chinese-zodiac/pig.svg",revision:"1943d88ca3815fb8eac30038bb0afef8"},{url:"img/svg/chinese-zodiac/rabbit.svg",revision:"ffcf5b59305a24fe5e66b93c400ea3db"},{url:"img/svg/chinese-zodiac/rat.svg",revision:"b1245af465eb1cd8e8331d8c07d3b74c"},{url:"img/svg/chinese-zodiac/rooster.svg",revision:"3b52ca7ad11aee0c6a6a4495c6f42df8"},{url:"img/svg/chinese-zodiac/snake.svg",revision:"9b83c6219c83641898cab0e2a063649d"},{url:"img/svg/chinese-zodiac/tiger.svg",revision:"8cbe6637dda1711e406f808871f508af"},{url:"img/svg/focus.svg",revision:"3b8e4c96b13c301cc278ead0182e6db9"},{url:"img/svg/insight.svg",revision:"99ee0060a3feb14dc9d00e3adf63ad78"},{url:"img/svg/knowledge.svg",revision:"2ad9f33fa450aa657cca1e391deb8b7c"},{url:"img/svg/number/1.svg",revision:"6f130f43d0fcb530fb38f52ab55a030c"},{url:"img/svg/number/2.svg",revision:"fa2643a1f8be40d7c9810f4157856167"},{url:"index.html",revision:"c85a27b2e6f791dac528dff9703496cd"},{url:"logo.png",revision:"b56057d80e74ab95f2f32f0b9f0efb6f"},{url:"mouse/nomouse.css",revision:"44ccaf2010691f28de1029973eb05fd2"},{url:"mouse/pointer.js",revision:"d7f2b94ab8de7f804ed47284d734ad6d"},{url:"nav/index.html",revision:"b22a39520c0e1d8e712ffe82f8bea3af"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"static.png",revision:"560a842f29b7a8946b8afa75ad8f71c5"},{url:"tags.html",revision:"2a35adcacbdcbdbd2bce93dea7716f34"},{url:"未标题-14.png",revision:"58e6fcba55e68af18dc56f2e18ba55d4"},{url:"未标题-15.png",revision:"cdd4ed3494056b724444e791557f1a45"},{url:"未标题-5.png",revision:"9fb013948cdbd9bd717e531f11425011"},{url:"manifest.webmanifest",revision:"53770b3706f69cec0e8a38fa5ab89711"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
