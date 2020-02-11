const glob = require("glob");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const YAML = require("yaml");

/**
 * Utitlity function on object
 */
Object.prototype.renameProperty = function (oldName, newName) {
  // Do nothing if the names are the same
  if (oldName === newName) {
    return this;
  }
  // Check for the old property name to avoid a ReferenceError in strict mode.
  if (this.hasOwnProperty(oldName)) {
    this[newName] = this[oldName];
    delete this[oldName];
  }
  return this;
};

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
    let newFields = YAML.parse(fields);
    // newFields += "draft: false\n";
    // newFields += "template: post\n";
    // newFields += "description: \n";
    if ('tags' in newFields) {
      if ('categories' in newFields) {
        newFields.categories = newFields.categories.concat(newFields.tags);
        delete newFields['tags']
      } else {
        newFields.renameProperty('tags', 'categories');
      }
    }

    let newFileContent = fileContent.replace(fields, YAML.stringify(newFields));
    fs.writeFileSync(files[i], newFileContent, { encoding: "utf8" })
  }
});
