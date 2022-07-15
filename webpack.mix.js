const mix = require("laravel-mix");
require("laravel-mix-purgecss");
require("laravel-mix-jigsaw");
const { GenerateSW } = require("workbox-webpack-plugin");
const categoryGenerator = require("./tasks/generateCategories.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageBuildPlugin = require("./tasks/ImageBuildPlugin");

mix.disableSuccessNotifications();
mix.setPublicPath("source/assets/build/");
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

mix.extend("set_jigsaw_env", () => {
  if (process.env.JIGSAW_ENV) {
    process.env.NODE_ENV_TMP = process.env.NODE_ENV;
    process.env.NODE_ENV = process.env.JIGSAW_ENV;
  }
});

mix.extend("reset_node_env", () => {
  if (process.env.NODE_ENV_TMP) {
    process.env.NODE_ENV = process.env.NODE_ENV_TMP;
  }
});

mix
  .js("source/_assets/js/main.js", "js")
  .vue()
  .sass("source/_assets/sass/main.scss", "css/main.css")
  .set_jigsaw_env()
  .jigsaw({
    watch: [
      "config.php",
      "source/**/*.md",
      "source/**/*.php",
      "source/**/*.scss",
    ],
  })
  .reset_node_env()
  .options({
    processCssUrls: false,
    postCss: [
      require("tailwindcss"),
      // require('postcss-css-variables')({
      //     preserve: true
      // })
    ],
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
  .sourceMaps()
  .version();
