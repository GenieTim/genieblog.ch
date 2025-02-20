const fs = require("fs");
const glob = require("glob");
const sharp = require("sharp");
const path = require("path");

class ImageBuildPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.beforeCompile.tapPromise(
      "ImageBuildPlugin",
      (compilationParams) => {
        // sooo... this might be called "hacky", but let's not care too much.
        const imageSourceDir = __dirname + "/../source/assets/images";
        const imageDestDir = __dirname + "/../source/assets/build/images";
        let sizes = [150, 350, 500, 700, 900, 1200];
        let promises = [];
        glob(imageSourceDir + "/**/*@(jpeg|jpg|png)", {}, function (er, files) {
          // loop all image files
          for (let i = 0; i < files.length; ++i) {
            let relativeFilePath = path.relative(
              imageSourceDir,
              path.dirname(files[i])
            );
            let fileName = path.parse(path.basename(files[i]));
            promises.push(
              new Promise(async (resolve, reject) => {
                for (const size of sizes) {
                  let targetFileName = fileName.name + "-" + size;
                  const targetFile = path.join(
                    imageDestDir,
                    relativeFilePath,
                    targetFileName
                  );
                  if (fs.existsSync(targetFile + ".jpg")) {
                    // check mtime
                    let statsOld = fs.statSync(files[i]);
                    let statsNew = fs.statSync(targetFile + ".jpg");
                    if (statsNew.mtime > statsOld.mtime) {
                      // do not recompile if already exits & is current
                      return resolve();
                    }
                  }
                  if (!fs.existsSync(path.dirname(targetFile))) {
                    fs.mkdirSync(path.dirname(targetFile), {
                      recursive: true,
                    });
                  }
                  const resizedImage = sharp(files[i]).resize(size);

                  const promises = [];

                  promises.push(
                    resizedImage.jpeg({ quality: 85 }).toFile(targetFile + ".jpg")
                  );
                  promises.push(
                    resizedImage.webp({ quality: 80 }).toFile(targetFile + ".webp")
                  );

                  Promise.all(promises)
                    .then(() => {
                      console.log(`Successfully resized and saved ${files[i]} to ${targetFile}.jpg and ${targetFile}.webp`);
                      resolve();
                    })
                    .catch((err) => {
                      console.error(`Error: ${err}`);
                      reject(err);
                    });
                }
              })
            );
          }
        });
        return new Promise((resolve) => {
          Promise.all(promises).then(resolve());
        });
      }
    );
  }
}

module.exports = ImageBuildPlugin;
