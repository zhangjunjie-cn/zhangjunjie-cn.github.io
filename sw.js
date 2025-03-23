/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-0a0f1cd3'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "713126e82db95490e924c527a03ce6f1"
  }, {
    "url": "about/index.html",
    "revision": "72b021e9ba2fd49271e3a58cfb643421"
  }, {
    "url": "about/me.html",
    "revision": "cf73810c0d62228af07f08e268a5016a"
  }, {
    "url": "archives.html",
    "revision": "bb50080f9a0364f37c389acdfe71de1d"
  }, {
    "url": "assets/about_index.md.BSN7tIBv.js",
    "revision": null
  }, {
    "url": "assets/about_index.md.BSN7tIBv.lean.js",
    "revision": null
  }, {
    "url": "assets/about_me.md.DM973pnv.js",
    "revision": null
  }, {
    "url": "assets/about_me.md.DM973pnv.lean.js",
    "revision": null
  }, {
    "url": "assets/app.Da1LMSt5.js",
    "revision": null
  }, {
    "url": "assets/archives.md.DRpVt3bw.js",
    "revision": null
  }, {
    "url": "assets/archives.md.DRpVt3bw.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_10_第二版博客搭建完成.md.BSz0yiok.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_10_第二版博客搭建完成.md.BSz0yiok.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_11_新年快乐.md.CdTHGXTL.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_11_新年快乐.md.CdTHGXTL.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_05_第三版博客搭建完成.md.DDbZe56B.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_05_第三版博客搭建完成.md.DDbZe56B.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_11_第四版博客新题性.md.DTGncyg_.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_11_第四版博客新题性.md.DTGncyg_.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_23_第五版博客发布完成.md.DYJj8IqW.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_23_第五版博客发布完成.md.DYJj8IqW.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_26_HA综合布线.md.BiEle7mg.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_26_HA综合布线.md.BiEle7mg.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_29_打印机共享.md.BnqVrbFX.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_29_打印机共享.md.BnqVrbFX.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_02_性能优化.md.C-Slrlym.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_02_性能优化.md.C-Slrlym.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_03_Excel大小优化.md.izj1A1kT.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_03_Excel大小优化.md.izj1A1kT.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_10_更好的svg集成.md.Dk2UhD9E.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_10_更好的svg集成.md.Dk2UhD9E.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_17_商业报告模板.md.DpLFfg6F.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_17_商业报告模板.md.DpLFfg6F.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_08_18_第六版博客发布.md.BHlsAmGy.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_08_18_第六版博客发布.md.BHlsAmGy.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_23_第七版博客发布.md.DwW6SNha.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_23_第七版博客发布.md.DwW6SNha.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_25_开始记录生活.md.BLcliUPJ.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_25_开始记录生活.md.BLcliUPJ.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_26_周二的一天.md.DlL5O9lP.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_26_周二的一天.md.DlL5O9lP.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_27_Daily Notes.md.ggvQf5WB.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_27_Daily Notes.md.ggvQf5WB.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_28_防火墙学习.md.BZWM4Spf.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_28_防火墙学习.md.BZWM4Spf.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_29_萤石云app接入.md.a9KzilYc.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_29_萤石云app接入.md.a9KzilYc.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_01_默认路由.md.Dlok2bRs.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_01_默认路由.md.Dlok2bRs.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_02_加班处理考勤掉线.md.Bz6JxSCy.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_02_加班处理考勤掉线.md.Bz6JxSCy.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_04_局域网路由.md.CLkQVRrL.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_04_局域网路由.md.CLkQVRrL.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_12_最近日常.md.HDirHrvE.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_12_最近日常.md.HDirHrvE.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_index.md.BrmfFAPV.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_index.md.BrmfFAPV.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_01_云贵之旅.md.BKqRpAtE.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_01_云贵之旅.md.BKqRpAtE.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_02_新一年，新篇章.md.DYmyYKs9.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_02_新一年，新篇章.md.DYmyYKs9.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_05_第八版博客发布.md.IBK8QNsq.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_05_第八版博客发布.md.IBK8QNsq.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_12_双栏布局.md.B7dK9-EB.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_12_双栏布局.md.B7dK9-EB.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_16_工作日常.md.BNDz5U01.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_16_工作日常.md.BNDz5U01.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_17_交换机教程.md.qTmni9iZ.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_17_交换机教程.md.qTmni9iZ.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机初始化教程.md.Ds4oqLd9.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机初始化教程.md.Ds4oqLd9.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机选型避坑.md.D8QIl_FW.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机选型避坑.md.D8QIl_FW.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机错误排查.md.D1KbgnQS.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机错误排查.md.D1KbgnQS.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_21_windows文件服务器.md.DnZnyOPx.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_21_windows文件服务器.md.DnZnyOPx.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_index.md.DP0iDFUh.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_index.md.DP0iDFUh.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_index.md.CEN12hqU.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_index.md.CEN12hqU.lean.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.BqfUpQ72.js",
    "revision": null
  }, {
    "url": "assets/chunks/about-footer.H0rUUxsb.js",
    "revision": null
  }, {
    "url": "assets/chunks/article.data.BxE8HTA9.js",
    "revision": null
  }, {
    "url": "assets/chunks/ArticleGPT.ByEMT2lZ.js",
    "revision": null
  }, {
    "url": "assets/chunks/ArticleMetadata.B6Ef1EeK.js",
    "revision": null
  }, {
    "url": "assets/chunks/cubic.CyCMrKS8.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.CqMsGXHl.js",
    "revision": null
  }, {
    "url": "assets/chunks/home.Bj9Ap0_H.js",
    "revision": null
  }, {
    "url": "assets/chunks/index.Dtz925Qm.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.CWvd1q1l.js",
    "revision": null
  }, {
    "url": "assets/chunks/Timeline.DVrXOlEy.js",
    "revision": null
  }, {
    "url": "assets/chunks/virtual_pwa-register.BpNFG0jz.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.Dahwd2QY.js",
    "revision": null
  }, {
    "url": "assets/chunks/workbox-window.prod.es5.Cr_0OO2S.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_01-开发环境搭建.md.CSa4TqHD.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_01-开发环境搭建.md.CSa4TqHD.lean.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_test.md.CxJA03ov.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_test.md.CxJA03ov.lean.js",
    "revision": null
  }, {
    "url": "assets/courses_java_index.md.CTs9KGPN.js",
    "revision": null
  }, {
    "url": "assets/courses_java_index.md.CTs9KGPN.lean.js",
    "revision": null
  }, {
    "url": "assets/docs_index.md.BWyr0bv2.js",
    "revision": null
  }, {
    "url": "assets/docs_index.md.BWyr0bv2.lean.js",
    "revision": null
  }, {
    "url": "assets/fa-brands-400.BU4mH_I_.woff2",
    "revision": null
  }, {
    "url": "assets/fa-regular-400.Cy4iLbxs.woff2",
    "revision": null
  }, {
    "url": "assets/fa-solid-900.CcrrL0x0.woff2",
    "revision": null
  }, {
    "url": "assets/fa-v4compatibility.B9t6EWrS.woff2",
    "revision": null
  }, {
    "url": "assets/index.md.LVF8x76P.js",
    "revision": null
  }, {
    "url": "assets/index.md.LVF8x76P.lean.js",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic-ext.r48I6akx.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-cyrillic.By2_1cv3.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek-ext.1u6EdAuj.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-greek.DJ8dCoTZ.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin-ext.CN1xVJS-.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-latin.C2AdPX0b.woff2",
    "revision": null
  }, {
    "url": "assets/inter-italic-vietnamese.BSbpV94h.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-cyrillic.C5lxZ8CY.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek-ext.CqjqNYQ-.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-greek.BBVDIX6e.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin-ext.4ZJIpNVo.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-latin.Di8DUHzh.woff2",
    "revision": null
  }, {
    "url": "assets/inter-roman-vietnamese.BjW4sHH5.woff2",
    "revision": null
  }, {
    "url": "assets/nav_index.md.Bg00Yfob.js",
    "revision": null
  }, {
    "url": "assets/nav_index.md.Bg00Yfob.lean.js",
    "revision": null
  }, {
    "url": "assets/style.QT8dkP10.css",
    "revision": null
  }, {
    "url": "assets/tags.md.B2qMvUhy.js",
    "revision": null
  }, {
    "url": "assets/tags.md.B2qMvUhy.lean.js",
    "revision": null
  }, {
    "url": "author.png",
    "revision": "a400a82a2bb636b6f1888827611cbc1d"
  }, {
    "url": "categories/annals/2024/02/10/第二版博客搭建完成.html",
    "revision": "273e756a2afc81ac3cfe396ee52b4cb2"
  }, {
    "url": "categories/annals/2024/02/11/新年快乐.html",
    "revision": "f58667205873207ad17312b3de88af8d"
  }, {
    "url": "categories/annals/2024/05/05/第三版博客搭建完成.html",
    "revision": "674b364ee170c2d1fcd71e15cbd15aa3"
  }, {
    "url": "categories/annals/2024/05/11/第四版博客新题性.html",
    "revision": "74c6245e927f53eaa7e876cc7c3b9df3"
  }, {
    "url": "categories/annals/2024/05/23/第五版博客发布完成.html",
    "revision": "1b491c93a4b420e2023b03e3a2012172"
  }, {
    "url": "categories/annals/2024/05/26/HA综合布线.html",
    "revision": "a213bf226779b0740920b85dc2dd8a58"
  }, {
    "url": "categories/annals/2024/05/29/打印机共享.html",
    "revision": "ae71d60a3e3e12e80aa71fa67856c732"
  }, {
    "url": "categories/annals/2024/06/02/性能优化.html",
    "revision": "4ea92d76772d61f68b685c94d55cbd1d"
  }, {
    "url": "categories/annals/2024/06/03/Excel大小优化.html",
    "revision": "bd41e4ae93af5cf5bdf168cc92f61e1a"
  }, {
    "url": "categories/annals/2024/06/10/更好的svg集成.html",
    "revision": "c40909d4e80ec04615ded08d46c1a1ac"
  }, {
    "url": "categories/annals/2024/06/17/商业报告模板.html",
    "revision": "417200ca1fee56466945de8e2ee0bc0a"
  }, {
    "url": "categories/annals/2024/08/18/第六版博客发布.html",
    "revision": "9b554c90442953659e7712566d921957"
  }, {
    "url": "categories/annals/2024/11/23/第七版博客发布.html",
    "revision": "7ee7b61bfdde9a1a101b94abe93f6fa3"
  }, {
    "url": "categories/annals/2024/11/25/开始记录生活.html",
    "revision": "69044f8a4ed33dd75cefd607d881ab7b"
  }, {
    "url": "categories/annals/2024/11/26/周二的一天.html",
    "revision": "9c83af1d4669a3a131bac4370593ba30"
  }, {
    "url": "categories/annals/2024/11/27/Daily Notes.html",
    "revision": "92908fc3dc3f3ca00a5efac261c56722"
  }, {
    "url": "categories/annals/2024/11/28/防火墙学习.html",
    "revision": "16031cd6e4e11d6e276c3e8a01b73176"
  }, {
    "url": "categories/annals/2024/11/29/萤石云app接入.html",
    "revision": "5bf289b1dcd4b4bff2d2ad30fbc9905f"
  }, {
    "url": "categories/annals/2024/12/01/默认路由.html",
    "revision": "6f01317906833305f8a7c36da29dee94"
  }, {
    "url": "categories/annals/2024/12/02/加班处理考勤掉线.html",
    "revision": "75b4b50119df4063784b654cf91733ec"
  }, {
    "url": "categories/annals/2024/12/04/局域网路由.html",
    "revision": "8affcfc91bae3cb52d883baaea821e41"
  }, {
    "url": "categories/annals/2024/12/12/最近日常.html",
    "revision": "3e2a2d7207a4e88e55107b836000556d"
  }, {
    "url": "categories/annals/2024/index.html",
    "revision": "04fbe7278141e020d951382441524dc6"
  }, {
    "url": "categories/annals/2025/01/01/云贵之旅.html",
    "revision": "944e24c33430e5c988c0a5d3af4eeec4"
  }, {
    "url": "categories/annals/2025/01/02/新一年，新篇章.html",
    "revision": "8ed3c8ef5598c663e49aa8ae9a54536e"
  }, {
    "url": "categories/annals/2025/01/05/第八版博客发布.html",
    "revision": "3b07fc763ab9c7a3f1c0a441441fd19d"
  }, {
    "url": "categories/annals/2025/01/12/双栏布局.html",
    "revision": "4a83c63397818dc27d0e357cc6912958"
  }, {
    "url": "categories/annals/2025/01/16/工作日常.html",
    "revision": "7b69510ef6be04202f30dddcd4bb5b35"
  }, {
    "url": "categories/annals/2025/03/17/交换机教程.html",
    "revision": "d3c0c08f98224c1634f597c9b64e4b9d"
  }, {
    "url": "categories/annals/2025/03/18/交换机初始化教程.html",
    "revision": "5da349299680487b474ce68e461deeb3"
  }, {
    "url": "categories/annals/2025/03/18/交换机选型避坑.html",
    "revision": "de30152f824afedb98522a592751523e"
  }, {
    "url": "categories/annals/2025/03/18/交换机错误排查.html",
    "revision": "7e8573c35264f700a831f1a942e5a6fa"
  }, {
    "url": "categories/annals/2025/03/21/windows文件服务器.html",
    "revision": "0ccb45a3a4d3c45b6bc6c0ba667d911d"
  }, {
    "url": "categories/annals/2025/index.html",
    "revision": "eccc724deb089ae7ef3fa88378e741ac"
  }, {
    "url": "categories/annals/index.html",
    "revision": "3e2e04eae0dd63793bcc2cae3b4f5770"
  }, {
    "url": "courses/java/01-Java语法入门/01-开发环境搭建.html",
    "revision": "7d737f50e43e1e9bb2dae7cfbae9084f"
  }, {
    "url": "courses/java/01-Java语法入门/test.html",
    "revision": "907f81c6e20dc56576f126b7efa7e262"
  }, {
    "url": "courses/java/index.html",
    "revision": "986604f4d1ecd0f2683a9aa5f6a12d4e"
  }, {
    "url": "docs/index.html",
    "revision": "aa50218890a0db0dc0543ac73ce4da7f"
  }, {
    "url": "favicon.ico",
    "revision": "1786f94c4ded09536352e6d4593a250c"
  }, {
    "url": "favicon1.ico",
    "revision": "d5b32211da730deb16993b42a2f53f2c"
  }, {
    "url": "icons/2024-1.png",
    "revision": "cef68213709b2aaf990f47242bc46c14"
  }, {
    "url": "icons/2024-2.png",
    "revision": "0c3486d1c7e99cc3b821b7cd8d5aa4bc"
  }, {
    "url": "icons/chatgpt.png",
    "revision": "d52a7c4a482f1f35612241396c01d8d8"
  }, {
    "url": "icons/cnblogs.svg",
    "revision": "9cf1175f8413d681d95c7cc02bc07828"
  }, {
    "url": "icons/es6.svg",
    "revision": "a8c0674b51460d0e001c0d094cbf4c6a"
  }, {
    "url": "icons/jquery.svg",
    "revision": "d363aa3485f2c5969ec35f5244bc5baa"
  }, {
    "url": "icons/json-cn.ico",
    "revision": "73abdbe6f011f89cfa85447d8810c99e"
  }, {
    "url": "icons/koa.svg",
    "revision": "0a55e7b8b060858ad9a2c6d0eff2b6f8"
  }, {
    "url": "icons/nodejs.svg",
    "revision": "44a234015b8737a059c50901835a213a"
  }, {
    "url": "icons/pixiv.png",
    "revision": "ca406e28983076988e9c0306881fe212"
  }, {
    "url": "icons/taro.svg",
    "revision": "f418f25c1eb2c64ac59338aa6c6f22f8"
  }, {
    "url": "icons/twitter.svg",
    "revision": "1be47a681202ef9b91ee0278dbd163ac"
  }, {
    "url": "images/pwa-120x120.png",
    "revision": "d768ed45466e7c58cfef0dd946ce13e9"
  }, {
    "url": "images/pwa-192x192.png",
    "revision": "2c6d9f5c1a5d9297e334101762859b1b"
  }, {
    "url": "images/pwa-512x512.png",
    "revision": "2148f599081176f72cc315d04b9c7cb8"
  }, {
    "url": "img/svg/about-footer.svg",
    "revision": "f82fca1076119ca03becae14445948f8"
  }, {
    "url": "img/svg/about-me-header.svg",
    "revision": "2eccb8521c39244ff257848037f464dd"
  }, {
    "url": "img/svg/about-repos-header.svg",
    "revision": "7993542574165fd3323f476d048ce4fb"
  }, {
    "url": "img/svg/chinese-zodiac/dog.svg",
    "revision": "41a6c465348f1e5268d8b1dd3fcecf1a"
  }, {
    "url": "img/svg/chinese-zodiac/dragon.svg",
    "revision": "6705225ffac271a5e28ea8d6a02e6a0c"
  }, {
    "url": "img/svg/chinese-zodiac/goat.svg",
    "revision": "631444a4782fca46fe10a03d47db1c9e"
  }, {
    "url": "img/svg/chinese-zodiac/horse.svg",
    "revision": "186fdfc3c99764e31a574742eedd73cc"
  }, {
    "url": "img/svg/chinese-zodiac/monkey.svg",
    "revision": "975f8b94b1514a55d802278f68d7d175"
  }, {
    "url": "img/svg/chinese-zodiac/ox.svg",
    "revision": "d30d075427efbe68bddd19d98c3ebd06"
  }, {
    "url": "img/svg/chinese-zodiac/pig.svg",
    "revision": "1943d88ca3815fb8eac30038bb0afef8"
  }, {
    "url": "img/svg/chinese-zodiac/rabbit.svg",
    "revision": "ffcf5b59305a24fe5e66b93c400ea3db"
  }, {
    "url": "img/svg/chinese-zodiac/rat.svg",
    "revision": "b1245af465eb1cd8e8331d8c07d3b74c"
  }, {
    "url": "img/svg/chinese-zodiac/rooster.svg",
    "revision": "3b52ca7ad11aee0c6a6a4495c6f42df8"
  }, {
    "url": "img/svg/chinese-zodiac/snake.svg",
    "revision": "9b83c6219c83641898cab0e2a063649d"
  }, {
    "url": "img/svg/chinese-zodiac/tiger.svg",
    "revision": "8cbe6637dda1711e406f808871f508af"
  }, {
    "url": "img/svg/focus.svg",
    "revision": "3b8e4c96b13c301cc278ead0182e6db9"
  }, {
    "url": "img/svg/insight.svg",
    "revision": "99ee0060a3feb14dc9d00e3adf63ad78"
  }, {
    "url": "img/svg/knowledge.svg",
    "revision": "2ad9f33fa450aa657cca1e391deb8b7c"
  }, {
    "url": "img/svg/number/1.svg",
    "revision": "6f130f43d0fcb530fb38f52ab55a030c"
  }, {
    "url": "img/svg/number/2.svg",
    "revision": "fa2643a1f8be40d7c9810f4157856167"
  }, {
    "url": "index.html",
    "revision": "bf4d5d8cd25d4c958a5e99e9e2d0b3a3"
  }, {
    "url": "logo.png",
    "revision": "b56057d80e74ab95f2f32f0b9f0efb6f"
  }, {
    "url": "mouse/nomouse.css",
    "revision": "44ccaf2010691f28de1029973eb05fd2"
  }, {
    "url": "mouse/pointer.js",
    "revision": "d7f2b94ab8de7f804ed47284d734ad6d"
  }, {
    "url": "nav/index.html",
    "revision": "db45dd3f7653bfd234ec86d17e7bca93"
  }, {
    "url": "static.png",
    "revision": "560a842f29b7a8946b8afa75ad8f71c5"
  }, {
    "url": "tags.html",
    "revision": "69a64bf1102dd5f344bfd558f1f5ffae"
  }, {
    "url": "未标题-14.png",
    "revision": "58e6fcba55e68af18dc56f2e18ba55d4"
  }, {
    "url": "未标题-15.png",
    "revision": "cdd4ed3494056b724444e791557f1a45"
  }, {
    "url": "未标题-5.png",
    "revision": "9fb013948cdbd9bd717e531f11425011"
  }, {
    "url": "manifest.webmanifest",
    "revision": "53770b3706f69cec0e8a38fa5ab89711"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    allowlist: [/^\/about\/index(\.html)?$/, /^\/about\/me(\.html)?$/, /^\/archives(\.html)?$/, /^\/categories\/annals\/2024\/02\/10\/第二版博客搭建完成(\.html)?$/, /^\/categories\/annals\/2024\/02\/11\/新年快乐(\.html)?$/, /^\/categories\/annals\/2024\/05\/05\/第三版博客搭建完成(\.html)?$/, /^\/categories\/annals\/2024\/05\/11\/第四版博客新题性(\.html)?$/, /^\/categories\/annals\/2024\/05\/23\/第五版博客发布完成(\.html)?$/, /^\/categories\/annals\/2024\/05\/26\/HA综合布线(\.html)?$/, /^\/categories\/annals\/2024\/05\/29\/打印机共享(\.html)?$/, /^\/categories\/annals\/2024\/06\/02\/性能优化(\.html)?$/, /^\/categories\/annals\/2024\/06\/03\/Excel大小优化(\.html)?$/, /^\/categories\/annals\/2024\/06\/10\/更好的svg集成(\.html)?$/, /^\/categories\/annals\/2024\/06\/17\/商业报告模板(\.html)?$/, /^\/categories\/annals\/2024\/08\/18\/第六版博客发布(\.html)?$/, /^\/categories\/annals\/2024\/11\/23\/第七版博客发布(\.html)?$/, /^\/categories\/annals\/2024\/11\/25\/开始记录生活(\.html)?$/, /^\/categories\/annals\/2024\/11\/26\/周二的一天(\.html)?$/, /^\/categories\/annals\/2024\/11\/27\/Daily Notes(\.html)?$/, /^\/categories\/annals\/2024\/11\/28\/防火墙学习(\.html)?$/, /^\/categories\/annals\/2024\/11\/29\/萤石云app接入(\.html)?$/, /^\/categories\/annals\/2024\/12\/01\/默认路由(\.html)?$/, /^\/categories\/annals\/2024\/12\/02\/加班处理考勤掉线(\.html)?$/, /^\/categories\/annals\/2024\/12\/04\/局域网路由(\.html)?$/, /^\/categories\/annals\/2024\/12\/12\/最近日常(\.html)?$/, /^\/categories\/annals\/2024\/index(\.html)?$/, /^\/categories\/annals\/2025\/01\/01\/云贵之旅(\.html)?$/, /^\/categories\/annals\/2025\/01\/02\/新一年，新篇章(\.html)?$/, /^\/categories\/annals\/2025\/01\/05\/第八版博客发布(\.html)?$/, /^\/categories\/annals\/2025\/01\/12\/双栏布局(\.html)?$/, /^\/categories\/annals\/2025\/01\/16\/工作日常(\.html)?$/, /^\/categories\/annals\/2025\/03\/17\/交换机教程(\.html)?$/, /^\/categories\/annals\/2025\/03\/18\/交换机初始化教程(\.html)?$/, /^\/categories\/annals\/2025\/03\/18\/交换机选型避坑(\.html)?$/, /^\/categories\/annals\/2025\/03\/18\/交换机错误排查(\.html)?$/, /^\/categories\/annals\/2025\/03\/21\/windows文件服务器(\.html)?$/, /^\/categories\/annals\/2025\/index(\.html)?$/, /^\/categories\/annals\/index(\.html)?$/, /^\/courses\/java\/01\x2dJava语法入门\/01\x2d开发环境搭建(\.html)?$/, /^\/courses\/java\/01\x2dJava语法入门\/test(\.html)?$/, /^\/courses\/java\/index(\.html)?$/, /^\/docs\/index(\.html)?$/, /^\/(\.html)?$/, /^\/nav\/index(\.html)?$/, /^\/tags(\.html)?$/]
  }));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i, new workbox.NetworkFirst({
    "cacheName": "jsdelivr-images-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 604800
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(({
    request,
    sameOrigin
  }) => {
    return sameOrigin && request.mode === "navigate";
  }, new workbox.NetworkOnly({
    plugins: [{
      handlerDidError: async () => Response.redirect("404", 302),
      cacheWillUpdate: async () => null
    }]
  }), 'GET');

}));
