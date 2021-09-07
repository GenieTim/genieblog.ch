const glob = require("glob");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const YAML = require("yaml");

/**
 * use this webpack plugin to generate an up-to-date category file for each category
 */
module.exports = {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise(
      "CategoryGenerator",
      (compilationParams) => {
        return new Promise((resolve) => {
          // console.log("Generating categories");
          // check all source posts for new categories
          glob(__dirname + "/../source/**/*.md", {}, function (er, files) {
            for (let i = 0; i < files.length; ++i) {
              // console.info("Checking for categories in file: " + files[i]);
              let fileContent = fs.readFileSync(files[i], { encoding: "utf8" });
              let fieldsRegex = new RegExp(
                "^\\-\\-\\-$([\\s\\S]*)^\\-\\-\\-$",
                "m"
              );
              let fieldsM = fileContent.match(fieldsRegex);
              let fileName = path.basename(files[i]);
              let directoryName = path.dirname(files[i]);
              let lang = fileName.match(new RegExp("\\.(en|de)\\.")) || directoryName.match(new RegExp("\\_(en|de)"));
              if (lang) {
                lang = lang[1];
              } else {
                console.log("Not detected lang for file " + fileName)
                continue;
              }
              if (fieldsM == null) {
                console.log("Not detected fields in file " + fileName)
                continue;
              }
              let fields = fieldsM[1];
              let newFields;
              try {
                newFields = YAML.parse(fields);
              } catch (exception) {
                console.error("Error parsing YAML in file " + files[i]);
                throw exception;
              }
              // newFields += "draft: false\n";
              // newFields += "template: post\n";
              // newFields += "description: \n";
              if (
                "categories" in newFields &&
                newFields.categories &&
                newFields.categories.length > 0
              ) {
                newFields.categories.forEach((category) => {
                  if (typeof category.replaceAll === "undefined") {
                    console.warn(
                      "replaceAll is not a function on category " + category
                    );
                    return;
                  }
                  const escapedCategory = category
                    .replaceAll(" ", "_")
                    .replaceAll("-", "_");
                  const categoryFile =
                    __dirname +
                    "/../source/_categories_" +
                    lang +
                    "/" +
                    escapedCategory +
                    ".md";
                  if (!fs.existsSync(categoryFile)) {
                    let newFileContent;
                    if (lang == "de") {
                      newFileContent = `---
extends: _layouts.category
title: ${category}
description: Alle Pfosten über "${category}".
---
          
Diese Beiträge sind über "${category}", wer hätte es gedacht.
          `;
                    } else {
                      newFileContent = `---
extends: _layouts.category
title: ${category}
description: All posts that are about "${category}".
---
          
These posts are about "${category}", who knew.
          `;
                    }

                    fs.writeFileSync(categoryFile, newFileContent, {
                      encoding: "utf8",
                    });
                    console.info(
                      "Wrote category: '" +
                      category +
                      "' to file: " +
                      categoryFile
                    );
                  }
                });
              }
            }
          });
          resolve();
        });
      }
    );
  },
};
