const { GenerateSW } = require('workbox-webpack-plugin');
const build = require('./tasks/build.js');
const categoryGenerator = require('./tasks/generateCategories.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build/');
mix.webpackConfig({
    plugins: [
        build.images,
        categoryGenerator,
        build.jigsaw,
        build.browserSync(),
        build.watch([
            'config.php',
            'source/**/*.md',
            'source/**/*.php',
            'source/**/*.scss',
        ]),
        new CopyWebpackPlugin([
            { from: 'source/assets/build/images', to: 'images' }
        ]),
        new GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            swDest: '../../service-worker.js', //Need to move the service-worker to the root
        }),
    ]
});

mix.js('source/_assets/js/main.js', 'js')
    .sourceMaps()
    .sass('source/_assets/sass/main.scss', 'css/main.css')
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss(),
            // require('postcss-css-variables')({
            //     preserve: true
            // })
        ],
    })
    .purgeCss({
        extensions: ['html', 'md', 'js', 'php', 'vue'],
        folders: ['source'],
        whitelistPatterns: [/language/, /hljs/, /mce/],
    })
    .sourceMaps()
    .version();
