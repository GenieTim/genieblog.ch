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
    "revision": "3dc20273a95f99b7fa42cbb578dcb0eb"
  }, {
    "url": "/css/main.css",
    "revision": "8e0b2135ca6894d37bf13a1121440969"
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
  }], {});

});
//# sourceMappingURL=service-worker.js.map
