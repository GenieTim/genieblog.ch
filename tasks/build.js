const argv = require('yargs').argv;
const bin = require('./bin');
const BrowserSync = require('browser-sync');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const command = require('node-cmd');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const fs = require("fs");
const glob = require("glob");
const Jimp = require('jimp');
const path = require("path");

let browserSyncInstance;
let env = argv.e || argv.env || 'local';
let port = argv.p || argv.port || 3000;

module.exports = {
    images: {
        apply(compiler) {
            compiler.hooks.beforeCompile.tapPromise('MyImagePlugin', compilationParams => {
                // sooo... this might be called "hacky", but let's not care too much.
                const imageSourceDir = __dirname + "/../source/assets/images";
                const imageDestDir = __dirname + "/../source/assets/build/images";
                let sizes = [150, 300, 600, 900, 1200];
                let promises = [];
                glob(imageSourceDir + "/**/*@(jpeg|jpg|png)", {}, function (er, files) {
                    // loop all image files
                    for (let i = 0; i < files.length; ++i) {
                        let relativeFilePath = path.relative(imageSourceDir, path.dirname(files[i]));
                        let fileName = path.parse(path.basename(files[i]));
                        promises.push(new Promise(async (resolve, reject) => {
                            const image = await Jimp.read(files[i]);
                            for (const size of sizes) {
                                let sizedImage = image;
                                let targetFileName = fileName.name + "-" + size + fileName.ext;
                                const targetFile = path.join(imageDestDir, relativeFilePath, targetFileName);
                                if (fs.existsSync(targetFile)) {
                                    // check mtime
                                    let statsOld = fs.statSync(files[i]);
                                    let statsNew = fs.statSync(targetFile);
                                    if (statsNew.mtime > statsOld.mtime) {
                                        // do not recompile if already exits & current
                                        return;
                                    }
                                }
                                await sizedImage.resize(size, Jimp.AUTO);
                                await sizedImage.quality(68);
                                await sizedImage.writeAsync(targetFile);
                                console.log("Output " + targetFile + " from " + files[i]);
                                resolve();
                            }
                        }));
                    }
                });
                return new Promise((resolve) => {
                    Promise.all(promises).then(resolve());
                });
            });
        }
    },

    jigsaw: {
        apply(compiler) {
            compiler.hooks.done.tap('DonePlugin', (compilation) => {
                command.get(bin.path() + ' build -q ' + env, (error, stdout, stderr) => {
                    console.log(error ? stderr : stdout);

                    if (browserSyncInstance) {
                        browserSyncInstance.reload();
                    }
                });
            });
        }
    },

    watch: function (paths) {
        return new ExtraWatchWebpackPlugin({
            files: paths,
        });
    },

    browserSync: function (proxy) {
        return new BrowserSyncPlugin({
            notify: false,
            port: port,
            proxy: proxy,
            server: proxy ? null : { baseDir: 'build_' + env + '/' },
        },
            {
                reload: false,
                callback: function () {
                    browserSyncInstance = BrowserSync.get('bs-webpack-plugin');
                },
            })
    },
};
