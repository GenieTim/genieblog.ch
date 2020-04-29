const fs = require("fs");
const path = require("path");
const translate = require('@vitalets/google-translate-api');
var inquirer = require('inquirer');
var formatDate = require('dateformat');
const yaml = require('js-yaml');

(async () => {
  const languages = getLanguages();
  inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Which language will you write in?",
      choices: languages
    }, {
      type: "input",
      name: "title",
      message: "What is the title of the post?"
    },
    {
      type: "editor",
      name: "content",
      message: "Enter the content of the post in the editor"
    }
  ]).then(async answers => {
    // potential improvement: read from e.g. git config in case I get an extra author one day
    const author = "Tim Bernhard";
    const date = new Date();
    // build associative array of all posts
    // associationg: language
    let posts = {};
    posts[answers.language] = {
      title: answers.title,
      content: answers.content,
      slug: string_to_slug(answers.title)
    };

    // add contents for all other languages
    languages.forEach(language => {
      if (language != answers.language) {
        let translatedTitle = await translate(answers.title, {
          from: answers.language,
          to: language
        });
        // TODO: split things up (at [, (, and `)
        let translatedContent = await translate(answers.content, {
          from: answers.language, to: language
        });
        posts[language] = {
          title: translatedTitle.text,
          content: translatedContent.text,
          slug: string_to_slug(translatedTitle.text)
        }
      }
    });
    // finally, save results
    for (language in posts) {
      fs.writeFileSync(getFileName(language, date, posts[language].slug), getFileContent(author, date, language, posts), { encoding: "utf8" });
    }
  }).catch(error => {
    // on error, log everything to prevent work loss
    console.error(error);
    console.log(posts);
    console.log(answers);
  });
})()

// -- MARK: Helper functions
function getLanguages() {
  let fileContents = fs.readFileSync(__dirname + '/../global-config.yaml', 'utf8');
  let data = yaml.safeLoad(fileContents);
  return data.languages;
}

function getFileName(language, date, slug) {
  return __dirname + '/../source/_posts_' + language + "/" + date.getFullYear() + "/" + formatDate(date, 'yyyy-mm-dd') + "-" + slug + ".md"
}

function getFileContent(author, date, language, posts) {
  let fileContent = `
---
author: ${author}
categories:
cover_image: false
date: ${date.toUTCString()}
description: false
draft: false
extends: _layouts.post
language: ${language}
layout: post
slug: ${posts[language].slug}
social_image: false
template: post
title: ${title}
translations:
`;

  for (var otherLanguage in posts) {
    fileContent += "  " + otherLanguage + ": " + posts[otherLanguage].slug + "\n";
  }

  fileContent += `
---

${content}
`;

  return fileContent;
}

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}