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
define(['./workbox-e0760f90'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "3ca0b8505b4bec776b69afdba2768812"
  }, {
    "url": "suppress-warnings.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }, {
    "url": "pwa-192x192.png",
    "revision": "2c6d9f5c1a5d9297e334101762859b1b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "2148f599081176f72cc315d04b9c7cb8"
  }, {
    "url": "manifest.webmanifest",
    "revision": "95fee77bc714dc6d4d3ba8a83667d5b8"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    allowlist: [/^\/docs\/index(\.html)?$/, /^\/(\.html)?$/, /^\/nav(\.html)?$/, /^\/nav\/计算机网络\/index(\.html)?$/, /^\/nav\/运维\/index(\.html)?$/, /^\/博客\/2024\/02\/10第二版博客搭建完成(\.html)?$/, /^\/博客\/2024\/02\/11新年快乐(\.html)?$/, /^\/博客\/2024\/05\/05第三版博客搭建完成(\.html)?$/, /^\/博客\/2024\/05\/11第四版博客新题性(\.html)?$/, /^\/博客\/2024\/05\/12(\.html)?$/, /^\/博客\/2024\/05\/13(\.html)?$/, /^\/博客\/2024\/05\/23第五版博客发布完成(\.html)?$/, /^\/博客\/2024\/05\/26HA综合布线(\.html)?$/, /^\/博客\/2024\/05\/29打印机共享(\.html)?$/, /^\/博客\/2024\/06\/02性能优化(\.html)?$/, /^\/博客\/2024\/06\/03Excel大小优化(\.html)?$/, /^\/博客\/2024\/06\/08(\.html)?$/, /^\/博客\/index(\.html)?$/, /^\/笔记\/C\+\+进阶\/Linux系统编程(\.html)?$/, /^\/笔记\/C\+\+进阶\/Linux系统编程2(\.html)?$/, /^\/笔记\/C\+\+进阶\/多进程(\.html)?$/, /^\/笔记\/C\+\+进阶\/线程(\.html)?$/, /^\/笔记\/CPP基础\/CPP基础\x2d1(\.html)?$/, /^\/笔记\/CPP基础\/CPP基础\x2d2(\.html)?$/, /^\/笔记\/EnergyPlus\/入门(\.html)?$/, /^\/笔记\/EnergyPlus\/安装EnergyPlus环境(\.html)?$/, /^\/笔记\/Python\/Python入门(\.html)?$/, /^\/笔记\/Python\/Python基础(\.html)?$/, /^\/笔记\/Python\/Python基础2(\.html)?$/, /^\/笔记\/Sinergym项目\/gym互联网相关资料(\.html)?$/, /^\/笔记\/Sinergym项目\/sinergym学习(\.html)?$/, /^\/笔记\/Sinergym项目\/sinergym论文(\.html)?$/, /^\/笔记\/Sinergym项目\/强化学习bilibili\/强化学习1(\.html)?$/, /^\/笔记\/UE4虚幻\/UE4CPP\x2d1(\.html)?$/, /^\/笔记\/UE4虚幻\/UE4CPP\x2d2(\.html)?$/, /^\/笔记\/VitePress进阶\/vitepress进阶教程(\.html)?$/, /^\/笔记\/index(\.html)?$/, /^\/笔记\/入门\/01起步(\.html)?$/, /^\/笔记\/大型园区网络实战设计（路由交换\+无线网络\+安全\+优化）\/1\.园区网概述（园区网纵向网广域网）(\.html)?$/, /^\/笔记\/大型园区网络实战设计（路由交换\+无线网络\+安全\+优化）\/2\.路由交换设计(\.html)?$/, /^\/笔记\/杂项\/mima(\.html)?$/, /^\/笔记\/杂项\/snapd软件(\.html)?$/, /^\/笔记\/杂项\/ubuntu安装软件教程(\.html)?$/, /^\/笔记\/杂项\/如何用Python绘制焓湿图(\.html)?$/, /^\/笔记\/杂项\/安装linux 的 nodejs需要注意的问题(\.html)?$/, /^\/笔记\/杂项\/安装ubuntu版本的idea教程(\.html)?$/, /^\/笔记\/杂项\/解压软件(\.html)?$/, /^\/笔记\/计算机网络\/index(\.html)?$/, /^\/笔记\/计算机网络\/网工(\.html)?$/]
  }));
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
