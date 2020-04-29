const glob = require("glob")
const path = require("path")
const fs = require("fs")
const fse = require("fs-extra")

glob("**/*.md", {}, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.

  for (let i = 0; i < files.length; ++i) {
    let file = files[i];
    console.log("handling file: " + file);
    // move file to new folder, rename to index.md
    let fileName = path.basename(file);
    let lan = fileName.match(new RegExp("\\.(en|de)\\."));
    console.log(lan);
    let newPath = path.dirname(file) + "/" + fileName.replace(/\.(?:en|de)\.[^/.]+$/, "") + "/index." + lan[1] + ".md";
    fse.moveSync(file, newPath);
  }
})
