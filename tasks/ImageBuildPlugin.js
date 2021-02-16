const fs = require("fs");
const glob = require("glob");
const Jimp = require('jimp');
const path = require("path");

class ImageBuildPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.beforeCompile.tapPromise('ImageBuildPlugin', compilationParams => {
      // sooo... this might be called "hacky", but let's not care too much.
      const imageSourceDir = __dirname + "/../source/assets/images";
      const imageDestDir = __dirname + "/../source/assets/build/images";
      let sizes = [150, 300, 600, 900, 1200];
      let promises = [];
      glob(imageSourceDir + "/**/*@(jpeg|jpg|png)", {}, function (er, files) {
        // loop all image files
        for (let i = 0; i < files.length; ++i) {
          let file = files[i];
          promises.push(new Promise(async (resolve, reject) => {
            let relativeFilePath = path.relative(imageSourceDir, path.dirname(file));
            let fileName = path.parse(path.basename(file));
            // check which sizes are needed at all based on the file mtime in order not read the file too eager
            let sizes_to_do = [];
            let target_file_paths = [];
            for (let size of sizes) {
              let targetFileName = fileName.name + "-" + size + fileName.ext;
              const targetFile = path.join(imageDestDir, relativeFilePath, targetFileName);
              if (fs.existsSync(targetFile)) {
                // check mtime
                let statsOld = fs.statSync(file);
                let statsNew = fs.statSync(targetFile);
                if (statsNew.mtime > statsOld.mtime) {
                  // do not recompile if already exits & current
                  continue;
                } else {
                  // console.info("Will generate again: " + file + " is newer then " + targetFile)
                }
              } else {
                // console.info("File " + targetFile + " not found.");
              }
              sizes_to_do.push(size);
              target_file_paths.push(targetFile);
            }

            // then, do the actual processing
            if (sizes_to_do.length > 0) {
              // we do the loop over the sizes twice in order to read only the files we really need to
              let image = null;
              try {
                image = await Jimp.read(file);
              } catch (e) {
                console.error("Failed to read image", e);
                resolve();
                return;
              }
              for (let size_i = 0; size_i < sizes_to_do.length; ++size_i) {
                // do not scale up, only down...
                // note that this leads to an overhead in time this script takes
                if (image.bitmap.height < sizes_to_do[size_i] || image.bitmap.width < sizes_to_do[size_i]) {
                  continue;
                }
                // clone
                let sizedImage = image;
                try {
                  await sizedImage.resize(sizes_to_do[size_i], Jimp.AUTO);
                  await sizedImage.quality(68);
                  await sizedImage.writeAsync(target_file_paths[size_i]);
                  console.info("Output " + target_file_paths[size_i] + " from " + file);
                } catch (e) {
                  console.error("Failed to save scaled image", e);
                }
              }
            }
            resolve();
          }));
        }
      });
      return new Promise((resolve, reject) => {
        Promise.all(promises).then(resolve()).catch((e) => {
          console.error(e);
        });
      });
    });
  }
}

module.exports = ImageBuildPlugin
