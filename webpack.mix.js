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
    production: process.env.WEBPACK_ENV === "production"
})
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
  .js("source/_assets/js/main.js", "js")
  .vue()
  .sass("source/_assets/sass/main.scss", "css/main.css")
  .jigsaw({
    watch: [
      "config.php",
      "source/**/*.md",
      "source/**/*.php",
      "source/**/*.scss",
    ],
  })
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
