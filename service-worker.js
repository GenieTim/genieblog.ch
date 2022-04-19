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
define(['./workbox-36b4d269'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/css/main.css",
    "revision": "6f21be87d7f60e3f8003d6e4aad28efb"
  }, {
    "url": "/images/2014/DSC_5126-150.jpg",
    "revision": "46fc058cdd75e897069ac748fc16e077"
  }, {
    "url": "/images/2014/DSC_5126-300.jpg",
    "revision": "dfda66500146c0f93cea37156e8f3cee"
  }, {
    "url": "/images/2014/log-150.png",
    "revision": "997079aac5ea5e7b7645c5718ac330b0"
  }, {
    "url": "/images/2014/log-300.png",
    "revision": "f5a90e23fceae86897c799e89dd52217"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-150.jpg",
    "revision": "623c88303abc23261389f801d4f7ef7e"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-300.jpg",
    "revision": "d8638aa7a0c4c837b0116e2094081803"
  }, {
    "url": "/images/2015/Screen-Shot-2015-02-10-at-14.51.55-150.png",
    "revision": "b10e495036832fd131f1676ae6f35aff"
  }, {
    "url": "/images/2015/Screen-Shot-2015-02-10-at-14.51.55-300.png",
    "revision": "a55c2bc810a610a7b916b207efd075cd"
  }, {
    "url": "/images/2015/Unbenannt-1-150.png",
    "revision": "29443398f5bc2d20c85544165c257e86"
  }, {
    "url": "/images/2015/Unbenannt-1-300.png",
    "revision": "2eb40a39f4fdd86d16fb96c07474a1d9"
  }, {
    "url": "/images/2015/Unbenannt-150.png",
    "revision": "6bbb766a50d2afca2bb468b6762ccab9"
  }, {
    "url": "/images/2015/Unbenannt-300.png",
    "revision": "3d6b6e40c1c672a0ce1ae61ab8f96229"
  }, {
    "url": "/images/2015/cubietruck-150.jpg",
    "revision": "54e4df8728ea49bf84b6045865888cc5"
  }, {
    "url": "/images/2015/cubietruck-300.jpg",
    "revision": "0ae9d258e425874cac5d1cea6ecfe39c"
  }, {
    "url": "/images/2015/spaceMasterIcon-150.png",
    "revision": "4277e6b353974edf2e107a83a8678357"
  }, {
    "url": "/images/2015/spaceMasterIcon-300.png",
    "revision": "33a565573af5ebeba99ed6a6d7e0d235"
  }, {
    "url": "/images/2016/hermitage-150.jpg",
    "revision": "97212f7de5147e9496aad7bc0cec4157"
  }, {
    "url": "/images/2016/hermitage-300.jpg",
    "revision": "c9b344cadb02e9cd20958822152fa885"
  }, {
    "url": "/images/2016/kommunikationfail-150.jpg",
    "revision": "d311b9499725d01df4ce00e7ae050e2f"
  }, {
    "url": "/images/2016/kommunikationfail-300.jpg",
    "revision": "ec4c843625ae406da2791fa32f2adde1"
  }, {
    "url": "/images/2016/moscow_summer-150.jpg",
    "revision": "58303094aaecb7666bd6f29c2237dc11"
  }, {
    "url": "/images/2016/moscow_summer-300.jpg",
    "revision": "e81c7bbccbece301b649b07d18909741"
  }, {
    "url": "/images/2020/christian-englmeier-J7EUjSlNQtg-unsplash-150.jpg",
    "revision": "a34c2be3deb4f2eebce83ddd8a56d9d2"
  }, {
    "url": "/images/2020/christian-englmeier-J7EUjSlNQtg-unsplash-300.jpg",
    "revision": "95b9273cc9057ddde69dd41aa4871a88"
  }, {
    "url": "/images/2021/event_schedule-150.png",
    "revision": "47bc8c2f57b2d879418ca0f6f3d4dd53"
  }, {
    "url": "/images/2021/event_schedule-300.png",
    "revision": "830f967994fd5de476672e45952f778b"
  }, {
    "url": "/images/2021/excel_recent_list-150.png",
    "revision": "8d9f19b9191b3e870654f1a50aeb5e6a"
  }, {
    "url": "/images/2021/excel_recent_list-300.png",
    "revision": "49010391b75aeff403d3ea31a85e8475"
  }, {
    "url": "/images/2021/front_cover_extending_lammps-150.jpg",
    "revision": "2e10b8aeaeafd2a79d9289905d56ba95"
  }, {
    "url": "/images/2021/front_cover_extending_lammps-300.jpg",
    "revision": "199437f83150d4131a24191fe5e208a4"
  }, {
    "url": "/images/2021/mustard_balcony_pot-150.jpg",
    "revision": "6bc834ae8c7a3b786d8cf1f69e49e1f0"
  }, {
    "url": "/images/2021/mustard_balcony_pot-300.jpg",
    "revision": "ebc2593af27ae5093867df2157cc1269"
  }, {
    "url": "/images/favicon/android-chrome-192x192-150.png",
    "revision": "998b28919d4b1807258ad7daf2b7846d"
  }, {
    "url": "/images/favicon/android-chrome-512x512-150.png",
    "revision": "6cfc6b10aad6bd3385b600ed9828192c"
  }, {
    "url": "/images/favicon/android-chrome-512x512-300.png",
    "revision": "06792c68ef8c01eefebac6be6d9a67d5"
  }, {
    "url": "/images/favicon/apple-touch-icon-150.png",
    "revision": "84dafa4c047108cce3bfd6f2ecd57cb6"
  }, {
    "url": "/images/favicon/mstile-150x150-150.png",
    "revision": "b7337245f35e779661d65fd73f8e00d2"
  }, {
    "url": "/images/favicon/mstile-310x150-150.png",
    "revision": "d90d0dd7c6e1dc2f8f2148234a7d377e"
  }, {
    "url": "/images/favicon/mstile-310x310-150.png",
    "revision": "fa7da8155cb054e61c0db2f0f31247ef"
  }, {
    "url": "/images/favicon/mstile-310x310-300.png",
    "revision": "3b7622cada218f409e7845a710939467"
  }, {
    "url": "/images/portrait-tim-150.jpg",
    "revision": "c4add9a352f4703b4da3c20824c64742"
  }, {
    "url": "/images/portrait-tim-300.jpg",
    "revision": "7df05426d0e103b72a399353a24450a5"
  }], {});

}));
//# sourceMappingURL=service-worker.js.map
