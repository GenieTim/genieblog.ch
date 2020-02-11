let mix = require('laravel-mix');
let build = require('./tasks/build.js');
let tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');
require('laravel-mix-imagemin');
const { GenerateSW } = require('workbox-webpack-plugin');


mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build/');
mix.webpackConfig({
    plugins: [
        build.jigsaw,
        build.browserSync(),
        build.watch([
            'config.php',
            'source/**/*.md',
            'source/**/*.php',
            'source/**/*.scss',
        ]),
        new GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            swDest: '../../service-worker.js', //Need to move the service-worker to the root
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(jpe?g|png)$/i,
                loader: 'responsive-loader',
                options: {
                    adapter: require('responsive-loader/sharp'),
                    sizes: [150, 300, 600, 900, 1200],
                    name: "[path][name]-[width].[ext]"
                },
            }
        ]
    }
});

mix.js('source/_assets/js/main.js', 'js')
    .imagemin('source/assets/images/**/*.*',
        {
            from: "**/*",
            to: "[name].[ext]"
        }, {}
    )
    .sourceMaps()
    .sass('source/_assets/sass/main.scss', 'css/main.css')
    .sourceMaps()
    .options({
        processCssUrls: false,
        postCss: [tailwindcss()],
    })
    .purgeCss({
        extensions: ['html', 'md', 'js', 'php', 'vue'],
        folders: ['source'],
        whitelistPatterns: [/language/, /hljs/, /mce/],
    })
    .version();
