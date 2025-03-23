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
define(['./workbox-526d9e75'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404.html",
    "revision": "1df7e13daf06b68bfe1eed401be7db19"
  }, {
    "url": "about/index.html",
    "revision": "70a30e7907e7552686f0eb6cee8ca443"
  }, {
    "url": "about/me.html",
    "revision": "3e7e5a09535e04700798abe7548d6360"
  }, {
    "url": "archives.html",
    "revision": "1161f7ce5d2a3398a45446031b34b22a"
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
    "url": "assets/app.DPTROia3.js",
    "revision": null
  }, {
    "url": "assets/archives.md.y7qNaxuG.js",
    "revision": null
  }, {
    "url": "assets/archives.md.y7qNaxuG.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_10_第二版博客搭建完成.md.BYkCSP2Q.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_10_第二版博客搭建完成.md.BYkCSP2Q.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_11_新年快乐.md.CmADntSi.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_02_11_新年快乐.md.CmADntSi.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_05_第三版博客搭建完成.md.BIes4DXc.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_05_第三版博客搭建完成.md.BIes4DXc.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_11_第四版博客新题性.md.D8Rws9dv.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_11_第四版博客新题性.md.D8Rws9dv.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_23_第五版博客发布完成.md.DOU_97Vr.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_23_第五版博客发布完成.md.DOU_97Vr.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_26_HA综合布线.md.BdBgOo8L.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_26_HA综合布线.md.BdBgOo8L.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_29_打印机共享.md.D_r85bE3.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_05_29_打印机共享.md.D_r85bE3.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_02_性能优化.md.qVbsVd8i.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_02_性能优化.md.qVbsVd8i.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_03_Excel大小优化.md.B0ZFngS4.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_03_Excel大小优化.md.B0ZFngS4.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_10_更好的svg集成.md.D-WyyCrs.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_10_更好的svg集成.md.D-WyyCrs.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_17_商业报告模板.md.CLnjpO2Q.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_06_17_商业报告模板.md.CLnjpO2Q.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_08_18_第六版博客发布.md.Cddazmc6.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_08_18_第六版博客发布.md.Cddazmc6.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_23_第七版博客发布.md.GIgN8r60.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_23_第七版博客发布.md.GIgN8r60.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_25_开始记录生活.md.DUJK8tQ0.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_25_开始记录生活.md.DUJK8tQ0.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_26_周二的一天.md.DaiaglNC.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_26_周二的一天.md.DaiaglNC.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_27_Daily Notes.md.xcr--CZB.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_27_Daily Notes.md.xcr--CZB.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_28_防火墙学习.md.CCAHsqVq.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_28_防火墙学习.md.CCAHsqVq.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_29_萤石云app接入.md.BVV7sok1.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_11_29_萤石云app接入.md.BVV7sok1.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_01_默认路由.md.nPzoELPs.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_01_默认路由.md.nPzoELPs.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_02_加班处理考勤掉线.md.ByUMCtAz.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_02_加班处理考勤掉线.md.ByUMCtAz.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_04_局域网路由.md.DsCCQAGS.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_04_局域网路由.md.DsCCQAGS.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_12_最近日常.md.QliIrHw_.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_12_12_最近日常.md.QliIrHw_.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_index.md.BdF05GjG.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2024_index.md.BdF05GjG.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_01_云贵之旅.md.Sjc6fs14.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_01_云贵之旅.md.Sjc6fs14.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_02_新一年，新篇章.md.CYc51rcf.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_02_新一年，新篇章.md.CYc51rcf.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_05_第八版博客发布.md.BAiDlygB.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_05_第八版博客发布.md.BAiDlygB.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_12_双栏布局.md.D-TnrAm0.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_12_双栏布局.md.D-TnrAm0.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_16_工作日常.md.Ck0JQhlC.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_01_16_工作日常.md.Ck0JQhlC.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_17_交换机教程.md.9mpl8ldY.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_17_交换机教程.md.9mpl8ldY.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机初始化教程.md.C0b__xW1.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机初始化教程.md.C0b__xW1.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机选型避坑.md.B3q0bS0f.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机选型避坑.md.B3q0bS0f.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机错误排查.md.DniT-iRy.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_18_交换机错误排查.md.DniT-iRy.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_21_windows文件服务器.md.D6ne1gmU.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_03_21_windows文件服务器.md.D6ne1gmU.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_index.md.DytHUcui.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_2025_index.md.DytHUcui.lean.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_index.md.CqIO7rLA.js",
    "revision": null
  }, {
    "url": "assets/categories_annals_index.md.CqIO7rLA.lean.js",
    "revision": null
  }, {
    "url": "assets/chunks/@localSearchIndexroot.BuO1hNRp.js",
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
    "url": "assets/chunks/ArticleMetadata.YcB0Aaje.js",
    "revision": null
  }, {
    "url": "assets/chunks/cubic.4jnTG2Yk.js",
    "revision": null
  }, {
    "url": "assets/chunks/framework.CqMsGXHl.js",
    "revision": null
  }, {
    "url": "assets/chunks/home.BXM437lT.js",
    "revision": null
  }, {
    "url": "assets/chunks/index.aOOTPMMM.js",
    "revision": null
  }, {
    "url": "assets/chunks/theme.DILbj-l6.js",
    "revision": null
  }, {
    "url": "assets/chunks/Timeline.DVrXOlEy.js",
    "revision": null
  }, {
    "url": "assets/chunks/virtual_pwa-register.BpNFG0jz.js",
    "revision": null
  }, {
    "url": "assets/chunks/VPLocalSearchBox.DR_DN478.js",
    "revision": null
  }, {
    "url": "assets/chunks/workbox-window.prod.es5.Cr_0OO2S.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_01-开发环境搭建.md.B0vfmcSi.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_01-开发环境搭建.md.B0vfmcSi.lean.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_test.md.CFapor-a.js",
    "revision": null
  }, {
    "url": "assets/courses_java_01-Java语法入门_test.md.CFapor-a.lean.js",
    "revision": null
  }, {
    "url": "assets/courses_java_index.md.BAb4ASfS.js",
    "revision": null
  }, {
    "url": "assets/courses_java_index.md.BAb4ASfS.lean.js",
    "revision": null
  }, {
    "url": "assets/docs_index.md.BhIPYbA4.js",
    "revision": null
  }, {
    "url": "assets/docs_index.md.BhIPYbA4.lean.js",
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
    "url": "assets/index.md.BGLgHxK7.js",
    "revision": null
  }, {
    "url": "assets/index.md.BGLgHxK7.lean.js",
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
    "url": "assets/nav_index.md.D6X7Urkk.js",
    "revision": null
  }, {
    "url": "assets/nav_index.md.D6X7Urkk.lean.js",
    "revision": null
  }, {
    "url": "assets/style.QT8dkP10.css",
    "revision": null
  }, {
    "url": "assets/tags.md.BH9G87V-.js",
    "revision": null
  }, {
    "url": "assets/tags.md.BH9G87V-.lean.js",
    "revision": null
  }, {
    "url": "author.png",
    "revision": "a400a82a2bb636b6f1888827611cbc1d"
  }, {
    "url": "categories/annals/2024/02/10/第二版博客搭建完成.html",
    "revision": "3b63add4f4f652c99da1cb0e05d431a9"
  }, {
    "url": "categories/annals/2024/02/11/新年快乐.html",
    "revision": "12c3fadc6cc8f21333bb7a017c7a1ccc"
  }, {
    "url": "categories/annals/2024/05/05/第三版博客搭建完成.html",
    "revision": "d28d19d00511ba2e6e366899f4b7b18a"
  }, {
    "url": "categories/annals/2024/05/11/第四版博客新题性.html",
    "revision": "2e68d7bc8977c77ded53581c47bc1555"
  }, {
    "url": "categories/annals/2024/05/23/第五版博客发布完成.html",
    "revision": "9eff264707ac8307a18e7885c68a2a58"
  }, {
    "url": "categories/annals/2024/05/26/HA综合布线.html",
    "revision": "fe59a6f83951a40fbe8940b6aa961f48"
  }, {
    "url": "categories/annals/2024/05/29/打印机共享.html",
    "revision": "b4510e16be739e7998ff4de30e373d3b"
  }, {
    "url": "categories/annals/2024/06/02/性能优化.html",
    "revision": "9e99b38f1972dd35556e95c32fd9d16b"
  }, {
    "url": "categories/annals/2024/06/03/Excel大小优化.html",
    "revision": "371e478af323a066281c7738a97e07a3"
  }, {
    "url": "categories/annals/2024/06/10/更好的svg集成.html",
    "revision": "738e98b8e5a657b26543f1331600c360"
  }, {
    "url": "categories/annals/2024/06/17/商业报告模板.html",
    "revision": "ccf8af959bb6f614472cc46357da0a7c"
  }, {
    "url": "categories/annals/2024/08/18/第六版博客发布.html",
    "revision": "4706eafa395de563ee081c3d47b3f6c3"
  }, {
    "url": "categories/annals/2024/11/23/第七版博客发布.html",
    "revision": "6c10c84a47fdbaaa7c0212b101579308"
  }, {
    "url": "categories/annals/2024/11/25/开始记录生活.html",
    "revision": "40a23d759a859f1d54e00c39282884e4"
  }, {
    "url": "categories/annals/2024/11/26/周二的一天.html",
    "revision": "b4a023652623fc5b929e1b14d7758a64"
  }, {
    "url": "categories/annals/2024/11/27/Daily Notes.html",
    "revision": "cda2e53091dc8bd3859d36e9ce780351"
  }, {
    "url": "categories/annals/2024/11/28/防火墙学习.html",
    "revision": "c5076a36b52dc73fbf1d6d370ec8ee0f"
  }, {
    "url": "categories/annals/2024/11/29/萤石云app接入.html",
    "revision": "2f8ac935abe26107bd57c031a563aadf"
  }, {
    "url": "categories/annals/2024/12/01/默认路由.html",
    "revision": "ae07b0a684896e4457b709a9b04177f3"
  }, {
    "url": "categories/annals/2024/12/02/加班处理考勤掉线.html",
    "revision": "0a732012ee14713bbf4aee5061d560cd"
  }, {
    "url": "categories/annals/2024/12/04/局域网路由.html",
    "revision": "22966e9b703b512dbcbf6a7ae516b8f8"
  }, {
    "url": "categories/annals/2024/12/12/最近日常.html",
    "revision": "7ef3dcb553b74a03da2f36d5b811007c"
  }, {
    "url": "categories/annals/2024/index.html",
    "revision": "93092b04830f5f7faad5ca9316bf96fe"
  }, {
    "url": "categories/annals/2025/01/01/云贵之旅.html",
    "revision": "afcdc5d1ae01c2b72b20d8722840bee8"
  }, {
    "url": "categories/annals/2025/01/02/新一年，新篇章.html",
    "revision": "b82f275d895e2ba4048e984e527b928a"
  }, {
    "url": "categories/annals/2025/01/05/第八版博客发布.html",
    "revision": "adbec121c45f559549676032e388236d"
  }, {
    "url": "categories/annals/2025/01/12/双栏布局.html",
    "revision": "77236dcdfc19e9303241b9633c1ff941"
  }, {
    "url": "categories/annals/2025/01/16/工作日常.html",
    "revision": "a86d44f4612ddbcf9a35d55eb0ef0e8c"
  }, {
    "url": "categories/annals/2025/03/17/交换机教程.html",
    "revision": "b36ce5a8df4326d61da14234e5c5c178"
  }, {
    "url": "categories/annals/2025/03/18/交换机初始化教程.html",
    "revision": "8094d4d5240cac92cf957507173d04e0"
  }, {
    "url": "categories/annals/2025/03/18/交换机选型避坑.html",
    "revision": "4828a5f87c58d24de43c5c90ef8a3c91"
  }, {
    "url": "categories/annals/2025/03/18/交换机错误排查.html",
    "revision": "0d07cbedb959080ee58909f1c7ee44e3"
  }, {
    "url": "categories/annals/2025/03/21/windows文件服务器.html",
    "revision": "bc3c666c2bc45897ce20d10cfe9125ac"
  }, {
    "url": "categories/annals/2025/index.html",
    "revision": "0b87a1036ec5b8c2bce2be6e7b63fd10"
  }, {
    "url": "categories/annals/index.html",
    "revision": "5a783216771456426c24cd8a63d143ca"
  }, {
    "url": "courses/java/01-Java语法入门/01-开发环境搭建.html",
    "revision": "925b57006468e8d923127f1a612f8431"
  }, {
    "url": "courses/java/01-Java语法入门/test.html",
    "revision": "209b34bedaf87f4fbd3ac775208ba426"
  }, {
    "url": "courses/java/index.html",
    "revision": "fb6dcc6ba97a75683fd5996674de757c"
  }, {
    "url": "docs/index.html",
    "revision": "e95ef5227956e1736a03561e94cb38b8"
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
    "revision": "4dc68cbb9377fbf8574fbfc31dbb5389"
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
    "revision": "111c072bac096bf7ff18fb0dc093f62c"
  }, {
    "url": "static.png",
    "revision": "560a842f29b7a8946b8afa75ad8f71c5"
  }, {
    "url": "tags.html",
    "revision": "c8dae0a859a1686df3defc95066803c9"
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
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/posts.+\.js$/, new workbox.StaleWhileRevalidate({
    "cacheName": "article-content",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 604800
    })]
  }), 'GET');

}));
