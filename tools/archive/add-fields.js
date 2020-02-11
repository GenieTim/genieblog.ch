const glob = require("glob");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");


glob("**/*.md", {}, function (er, files) {

  for (let i = 0; i < files.length; ++i) {
    console.log("handling file: " + files[i]);
    let fileContent = fs.readFileSync(files[i], { encoding: "utf8" });
    let fieldsRegex = new RegExp("^\\-\\-\\-$([\\s\\S]*)^\\-\\-\\-$", "m");
    let fieldsM = fileContent.match(fieldsRegex);
    let fileName = path.basename(files[i]);
    let lang = fileName.match(new RegExp("\\.(en|de)\\."));
    // console.log(fieldsM);
    let fields = fieldsM[1];
    let newFields = fields;
    // newFields += "draft: false\n";
    // newFields += "template: post\n";
    // newFields += "description: \n";
    if (lang) {
      newFields += "extends: _layouts.post\n";
      newFields += "language: " + lang[1] + "\n";
      newFields += "cover_image: false\n";
    }
    let newFileContent = fileContent.replace(fields, newFields);
    fs.writeFileSync(files[i], newFileContent, { encoding: "utf8" })
  }
});
