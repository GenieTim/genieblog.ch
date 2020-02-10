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
    let fileName = path.basename(file);
    // move file to new folder, rename to index.md
    let lan = fileName.match(new RegExp("\\.(en|de)\\."));
    let pathName = path.dirname(file);
    let pathParts = pathName.split("/");
    if (lan) {
      let newPath = path.dirname(pathName) + "/" + pathParts[pathParts.length - 1] + "." + lan[1] + ".md";
      console.log(newPath);
      fse.moveSync(file, newPath);
    }
  }
})
