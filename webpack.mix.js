const WebpackBar = require("webpackbar");
Object.defineProperty(WebpackBar.prototype, "options", {
  get() {
    return this._wb_options;
  },
  set(options) {
    if (options && typeof options === "object") {
      const safeOptions = { activeModules: true };
      for (const [key, val] of Object.entries(options)) {
        if (key === "activeModules" || key === "profile") {
          safeOptions[key] = val;
        } else {
          Object.defineProperty(safeOptions, key, {
            value: val,
            writable: true,
            configurable: true,
            enumerable: false,
          });
        }
      }
      this._wb_options = safeOptions;
    } else {
      this._wb_options = options;
    }
  },
  configurable: true,
});
const mix = require("laravel-mix");
require("laravel-mix-purgecss");
require("laravel-mix-jigsaw");
const { GenerateSW } = require("workbox-webpack-plugin");
const categoryGenerator = require("./tasks/generateCategories.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageBuildPlugin = require("./tasks/ImageBuildPlugin");

mix.disableSuccessNotifications();
mix.setPublicPath("source/assets/build/");
mix.options({
  production: process.env.WEBPACK_ENV === "production",
  cssNano: false,
});
mix.webpackConfig({
  plugins: [
    new ImageBuildPlugin({
      inject: false,
    }),
    categoryGenerator,
    new CopyWebpackPlugin({
      patterns: [{ from: "source/assets/build/images", to: "images" }],
    }),
    new GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      swDest: "../../service-worker.js", //Need to move the service-worker to the root
    }),
  ],
});

mix
  .jigsaw()
  .js("source/_assets/js/main.js", "js")
  .sass("source/_assets/sass/main.scss", "css/main.css", {}, [
    require("@tailwindcss/postcss"),
  ])
  .options({
    processCssUrls: false,
  })
  .purgeCss({
    content: [
      "source/**/*.html",
      "source/**/*.md",
      "source/**/*.js",
      "source/**/*.php",
      "source/**/*.vue",
    ],
    safelist: { deep: [/language/, /hljs/, /mce/, /^hljs-.*/] },
  })
  .browserSync({
    server: "build_local",
    files: ["build_local/**"],
  })
  .sourceMaps()
  .version();
