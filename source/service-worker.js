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
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-5e0a84ee'], function (workbox) { 'use strict';

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

  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "//js/main.js",
    "revision": "96df004cd0fd9071101367c677011377"
  }, {
    "url": "/css/main.css",
    "revision": "550cbb782e732a24b19b4c4ab220848b"
  }, {
    "url": "/images/2014/DSC_5126-1200.jpg",
    "revision": "c61007a475b1fea99b1245e60229734c"
  }, {
    "url": "/images/2014/DSC_5126-150.jpg",
    "revision": "c75d8145a6b084980389908524ecf91d"
  }, {
    "url": "/images/2014/DSC_5126-350.jpg",
    "revision": "3d9e19b1934078c38739c06d45d1f8e0"
  }, {
    "url": "/images/2014/DSC_5126-500.jpg",
    "revision": "79cb218f70f47d002ddb9a38624a5d69"
  }, {
    "url": "/images/2014/DSC_5126-700.jpg",
    "revision": "55ccabec4059f2d1e2664957afd04624"
  }, {
    "url": "/images/2014/DSC_5126-900.jpg",
    "revision": "14904d1eee87ab2d1505757db81769be"
  }, {
    "url": "/images/2014/log-1200.png",
    "revision": "8a2b274fb7da70d637f84066d67de516"
  }, {
    "url": "/images/2014/log-150.png",
    "revision": "997079aac5ea5e7b7645c5718ac330b0"
  }, {
    "url": "/images/2014/log-350.png",
    "revision": "d1952832f4bf1ea9c2c81fdc9ec2bc11"
  }, {
    "url": "/images/2014/log-500.png",
    "revision": "cc0a4d3032c6601df5d03379df31b160"
  }, {
    "url": "/images/2014/log-700.png",
    "revision": "da6fa3dcc1db841df2408b8a5493e59e"
  }, {
    "url": "/images/2014/log-900.png",
    "revision": "2568501c8cb0e8494b5e77dc865eaddd"
  }, {
    "url": "/images/2014/logo-libgdx-1200.png",
    "revision": "b97d4b711b7ed3e7457f50e9343c075e"
  }, {
    "url": "/images/2014/logo-libgdx-150.png",
    "revision": "884c5aa36105de4b8c0ed4bdb3329b47"
  }, {
    "url": "/images/2014/logo-libgdx-350.png",
    "revision": "f03c2cdb4fadfed6c5daa7934a3352c8"
  }, {
    "url": "/images/2014/logo-libgdx-500.png",
    "revision": "9b018df87aab6e8e8355345be5d45d8f"
  }, {
    "url": "/images/2014/logo-libgdx-700.png",
    "revision": "e6913caf09ab7c9c9bd6ce95d6bd456b"
  }, {
    "url": "/images/2014/logo-libgdx-900.png",
    "revision": "0f8ee30028f7bfb585f335a34948b304"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-1200.jpg",
    "revision": "fcf4360d12adf05e0604676f4384b1e8"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-150.jpg",
    "revision": "623c88303abc23261389f801d4f7ef7e"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-350.jpg",
    "revision": "c4736680dd14fd8958a50e6395d71a31"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-500.jpg",
    "revision": "b93b6bc22e02f8e574d84c12b2894d2f"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-700.jpg",
    "revision": "371171e9ff8258a8446d3252e98d3003"
  }, {
    "url": "/images/2015/20170523_135327664_iOS-900.jpg",
    "revision": "dac900d1ebb4ae3e84c773c16b7878e9"
  }, {
    "url": "/images/2015/Unbenannt-1-1200.png",
    "revision": "873ddcf032e36738b2288415f6616d6f"
  }, {
    "url": "/images/2015/Unbenannt-1-150.png",
    "revision": "29443398f5bc2d20c85544165c257e86"
  }, {
    "url": "/images/2015/Unbenannt-1-350.png",
    "revision": "7c8d63e2dc058bcc3e597607fa0907e3"
  }, {
    "url": "/images/2015/Unbenannt-1-500.png",
    "revision": "b354db38e925f0998f8d47c410431188"
  }, {
    "url": "/images/2015/Unbenannt-1-700.png",
    "revision": "bfaf76b138a034b46d77c8a492ef6104"
  }, {
    "url": "/images/2015/Unbenannt-1-900.png",
    "revision": "2c65a8468ff032704c5ace479947a6ed"
  }, {
    "url": "/images/2015/Unbenannt-1200.png",
    "revision": "442ec183e0e1a33b78b2ed5b56484601"
  }, {
    "url": "/images/2015/Unbenannt-150.png",
    "revision": "6bbb766a50d2afca2bb468b6762ccab9"
  }, {
    "url": "/images/2015/Unbenannt-350.png",
    "revision": "652993be9c12ac69f3e8cd3457554ea3"
  }, {
    "url": "/images/2015/Unbenannt-500.png",
    "revision": "c44b57bedf20e26d4ba38345b2bc14d5"
  }, {
    "url": "/images/2015/Unbenannt-700.png",
    "revision": "43e37f7b1dd85fcddd61fd350c4f5d53"
  }, {
    "url": "/images/2015/Unbenannt-900.png",
    "revision": "1b4c531dc241ef57ebd2074e1f2ea775"
  }, {
    "url": "/images/2015/cubietruck-1200.jpg",
    "revision": "e31861fd8724d315b731504d24c63363"
  }, {
    "url": "/images/2015/cubietruck-150.jpg",
    "revision": "543e959922f36cef405965e8d6e3b70d"
  }, {
    "url": "/images/2015/cubietruck-350.jpg",
    "revision": "036abe034c8e4387232a4c9c14f086aa"
  }, {
    "url": "/images/2015/cubietruck-500.jpg",
    "revision": "6def192c5da76f715350837e9301a9f7"
  }, {
    "url": "/images/2015/cubietruck-700.jpg",
    "revision": "d2b4c3e2e59091f891088b3d6d9378b1"
  }, {
    "url": "/images/2015/cubietruck-900.jpg",
    "revision": "6278df6b797ffdea116d73810607ac8b"
  }, {
    "url": "/images/2015/spaceMasterIcon-1200.png",
    "revision": "97972888ee8fbfc275f3c9b9e1092c67"
  }, {
    "url": "/images/2015/spaceMasterIcon-150.png",
    "revision": "4277e6b353974edf2e107a83a8678357"
  }, {
    "url": "/images/2015/spaceMasterIcon-350.png",
    "revision": "e7b6219182e156a707c228f7887bf3f2"
  }, {
    "url": "/images/2015/spaceMasterIcon-500.png",
    "revision": "d814084da812b159256fc881ffd9c0e9"
  }, {
    "url": "/images/2015/spaceMasterIcon-700.png",
    "revision": "abc39d839ad8c77fddb231da4581e2fa"
  }, {
    "url": "/images/2015/spaceMasterIcon-900.png",
    "revision": "7199087950d6a0889f27fe199bd93054"
  }, {
    "url": "/images/2016/hermitage-1200.jpg",
    "revision": "720697d22e2744d75fbb82140d8caa51"
  }, {
    "url": "/images/2016/hermitage-150.jpg",
    "revision": "7df77c6f6f1ca224c44b83904a3e4929"
  }, {
    "url": "/images/2016/hermitage-350.jpg",
    "revision": "dc9f5c0e9b8e10ea2d8a84bab6ea9a33"
  }, {
    "url": "/images/2016/hermitage-500.jpg",
    "revision": "0304daa26e4b4786ce5e28118e0be122"
  }, {
    "url": "/images/2016/hermitage-700.jpg",
    "revision": "3c73d9aa15b195356af1ac5cb4ed3e94"
  }, {
    "url": "/images/2016/hermitage-900.jpg",
    "revision": "9ddc4f8a00866875bdcd5c40e4504e3a"
  }, {
    "url": "/images/2016/kommunikationfail-1200.jpg",
    "revision": "1f35c402e748a298de97e36092915171"
  }, {
    "url": "/images/2016/kommunikationfail-150.jpg",
    "revision": "8778d2401045fce49377eb0259782732"
  }, {
    "url": "/images/2016/kommunikationfail-350.jpg",
    "revision": "ff1d29c68a8b39d527d55906b054b36b"
  }, {
    "url": "/images/2016/kommunikationfail-500.jpg",
    "revision": "20065305fd43a282f20f35ca9f77dd19"
  }, {
    "url": "/images/2016/kommunikationfail-700.jpg",
    "revision": "0b064a0eb134e72a872d1fe023aa5144"
  }, {
    "url": "/images/2016/kommunikationfail-900.jpg",
    "revision": "705c7a3a5a59b38b9553cbfb6a6551f5"
  }, {
    "url": "/images/2016/moscow_summer-1200.jpg",
    "revision": "c4fcf0a8624a828d4946a4fafa64311b"
  }, {
    "url": "/images/2016/moscow_summer-150.jpg",
    "revision": "e8f2707f7abf4a613fdc14b1e163ec08"
  }, {
    "url": "/images/2016/moscow_summer-350.jpg",
    "revision": "7823411643f93296e24785519b332de7"
  }, {
    "url": "/images/2016/moscow_summer-500.jpg",
    "revision": "c44c9ca8fbe9d4af81ed56a71142336f"
  }, {
    "url": "/images/2016/moscow_summer-700.jpg",
    "revision": "a8363b74719dd247b517ade4d5145101"
  }, {
    "url": "/images/2016/moscow_summer-900.jpg",
    "revision": "259e4e8d6fccf03f1a18dfa6fb803c33"
  }, {
    "url": "/images/Screen-Shot-2015-02-10-at-14.51.55-1200.png",
    "revision": "5a761fb4eb2495fab885ce76d2690de2"
  }, {
    "url": "/images/Screen-Shot-2015-02-10-at-14.51.55-150.png",
    "revision": "b10e495036832fd131f1676ae6f35aff"
  }, {
    "url": "/images/Screen-Shot-2015-02-10-at-14.51.55-350.png",
    "revision": "dd162d5e874de625357914f329d54c51"
  }, {
    "url": "/images/Screen-Shot-2015-02-10-at-14.51.55-500.png",
    "revision": "0aa0940e3e0351fbf656eb57087c85ed"
  }, {
    "url": "/images/Screen-Shot-2015-02-10-at-14.51.55-700.png",
    "revision": "92e27d535bf161a9b9853d022e14fe07"
  }, {
    "url": "/images/Screen-Shot-2015-02-10-at-14.51.55-900.png",
    "revision": "4facbfd165ac9fe2acd81a69753d34d1"
  }, {
    "url": "/images/favicon/android-chrome-192x192-1200.png",
    "revision": "77341c07788b7daf3a55fb639eb67307"
  }, {
    "url": "/images/favicon/android-chrome-192x192-150.png",
    "revision": "998b28919d4b1807258ad7daf2b7846d"
  }, {
    "url": "/images/favicon/android-chrome-192x192-300.png",
    "revision": "a9b14935f09b059945fb38f774430fb3"
  }, {
    "url": "/images/favicon/android-chrome-192x192-600.png",
    "revision": "90b0af57e4fc4028db8342988557c96d"
  }, {
    "url": "/images/favicon/android-chrome-192x192-900.png",
    "revision": "1f7b361de879f757fd13568098021566"
  }, {
    "url": "/images/favicon/android-chrome-512x512-1200.png",
    "revision": "44162170a18e140f750360e4364230cf"
  }, {
    "url": "/images/favicon/android-chrome-512x512-150.png",
    "revision": "6cfc6b10aad6bd3385b600ed9828192c"
  }, {
    "url": "/images/favicon/android-chrome-512x512-300.png",
    "revision": "17c8df45ddafd7fd78066e5098f42222"
  }, {
    "url": "/images/favicon/android-chrome-512x512-600.png",
    "revision": "704a9423cc2442d886226e5408db0439"
  }, {
    "url": "/images/favicon/android-chrome-512x512-900.png",
    "revision": "a297a46c98db6184cf22abedaf62ffc4"
  }, {
    "url": "/images/favicon/apple-touch-icon-1200.png",
    "revision": "0f60777e5f327944e3d9346ac91a3641"
  }, {
    "url": "/images/favicon/apple-touch-icon-150.png",
    "revision": "84dafa4c047108cce3bfd6f2ecd57cb6"
  }, {
    "url": "/images/favicon/apple-touch-icon-300.png",
    "revision": "9336ae3672071a0668d5a5db4ad64ce7"
  }, {
    "url": "/images/favicon/apple-touch-icon-600.png",
    "revision": "03b67ba3c234173eb3c703da69a01577"
  }, {
    "url": "/images/favicon/apple-touch-icon-900.png",
    "revision": "f5b06a2791399f8bd42a2dbb87d780d2"
  }, {
    "url": "/images/favicon/favicon-16x16-1200.png",
    "revision": "c0a0a0389add5d955d5a6e7f780b911f"
  }, {
    "url": "/images/favicon/favicon-16x16-150.png",
    "revision": "f0238c10e578a9020db6cb5e0cd1bd02"
  }, {
    "url": "/images/favicon/favicon-16x16-300.png",
    "revision": "cdf1434145606923d5f6173943722679"
  }, {
    "url": "/images/favicon/favicon-16x16-600.png",
    "revision": "e98a560af647b688b176010b0631d3ea"
  }, {
    "url": "/images/favicon/favicon-16x16-900.png",
    "revision": "785877b8184dfb7c1f4c23a8b0a1030f"
  }, {
    "url": "/images/favicon/favicon-32x32-1200.png",
    "revision": "7446b02bb3047f8885838f2aca784788"
  }, {
    "url": "/images/favicon/favicon-32x32-150.png",
    "revision": "a417c03fd54899cb939b4fa063d2f34a"
  }, {
    "url": "/images/favicon/favicon-32x32-300.png",
    "revision": "e6c06079fb9c1ceeafb4fe6f443e7cee"
  }, {
    "url": "/images/favicon/favicon-32x32-600.png",
    "revision": "23a36424eedec30ca4764ad05e3f6c6f"
  }, {
    "url": "/images/favicon/favicon-32x32-900.png",
    "revision": "e32d4f77d2a01377f71472319d712e27"
  }, {
    "url": "/images/favicon/mstile-144x144-1200.png",
    "revision": "d06ab032b78a0704541e53d293c4f47e"
  }, {
    "url": "/images/favicon/mstile-144x144-150.png",
    "revision": "bf2f504a07513cdbda7e578996038eb6"
  }, {
    "url": "/images/favicon/mstile-144x144-300.png",
    "revision": "fdcde8e4721e2a069a42a117f36029ae"
  }, {
    "url": "/images/favicon/mstile-144x144-600.png",
    "revision": "20d1bd8509f18f50a2176ed81a082825"
  }, {
    "url": "/images/favicon/mstile-144x144-900.png",
    "revision": "703a1cfb6915b3709670677c5d1e045b"
  }, {
    "url": "/images/favicon/mstile-150x150-1200.png",
    "revision": "3d3e661ec8880f323bc2dc88e1685576"
  }, {
    "url": "/images/favicon/mstile-150x150-150.png",
    "revision": "b7337245f35e779661d65fd73f8e00d2"
  }, {
    "url": "/images/favicon/mstile-150x150-300.png",
    "revision": "5c1bb4d9b108d3bed33e38c027b53463"
  }, {
    "url": "/images/favicon/mstile-150x150-600.png",
    "revision": "6e9f99f3cd756c6157fc9b59d677ad5c"
  }, {
    "url": "/images/favicon/mstile-150x150-900.png",
    "revision": "aadff2df1e3d97b6aa956bfd954b5767"
  }, {
    "url": "/images/favicon/mstile-310x150-1200.png",
    "revision": "8cedba4c5a2a825d0d3c3751dbcc711f"
  }, {
    "url": "/images/favicon/mstile-310x150-150.png",
    "revision": "d90d0dd7c6e1dc2f8f2148234a7d377e"
  }, {
    "url": "/images/favicon/mstile-310x150-300.png",
    "revision": "f20e045dfef1dc03eb617a31b6769e85"
  }, {
    "url": "/images/favicon/mstile-310x150-600.png",
    "revision": "062475ed6a71666c61d8737268b5aefc"
  }, {
    "url": "/images/favicon/mstile-310x150-900.png",
    "revision": "bcfccdd837516f08c21913596ef0b123"
  }, {
    "url": "/images/favicon/mstile-310x310-1200.png",
    "revision": "b2a469c24ef7d1362907406e48f1ad03"
  }, {
    "url": "/images/favicon/mstile-310x310-150.png",
    "revision": "fa7da8155cb054e61c0db2f0f31247ef"
  }, {
    "url": "/images/favicon/mstile-310x310-300.png",
    "revision": "2cbe9b0fe16ebe720b674a373b3c0209"
  }, {
    "url": "/images/favicon/mstile-310x310-600.png",
    "revision": "5e388a2187a9058dfc88e63a8d3812ef"
  }, {
    "url": "/images/favicon/mstile-310x310-900.png",
    "revision": "d489664a9805c6b4d325bf0b1668c7e0"
  }, {
    "url": "/images/favicon/mstile-70x70-1200.png",
    "revision": "567f6fcab1c2b26c4c701e5d61cac375"
  }, {
    "url": "/images/favicon/mstile-70x70-150.png",
    "revision": "81e6be20c05ffc82848c17d8308ef5a2"
  }, {
    "url": "/images/favicon/mstile-70x70-300.png",
    "revision": "25bc8dc8c7144728d219ac5c3b84ff5d"
  }, {
    "url": "/images/favicon/mstile-70x70-600.png",
    "revision": "f5121bedfbd80dee4786c4c929f4d3d9"
  }, {
    "url": "/images/favicon/mstile-70x70-900.png",
    "revision": "b337d5573a8e4c248373a1661d192fc1"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
