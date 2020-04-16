const fs = require("fs");
const path = require("path");
const translate = require('@vitalets/google-translate-api');
var inquirer = require('inquirer');

inquirer.prompt([
  {
    type: "list",
    name: "language",
    message: "Which language will you write in?",
    choices: ['de', 'en']
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
]).then(answers => {
  // potential improvement: read from e.g. git config in case I get an extra author one day
  const author = "Tim Bernhard";
  const date = new Date();
  const slug = string_to_slug(answers.title);

  let fileContent = getFileContent(author, date, answers.language, slug, answers.title, answers.content);

  fs.writeFileSync(getFileName(answers.language, date, slug), fileContent, { encoding: "utf8" });

  let otherLanguage = answers.language == 'de' ? 'en' : 'de';
  let translatedTitle = await translate(answers.title,
    {
      from: answers.language, to: otherLanguage
    }
  );
  // TODO: split things up (at [, (, and `)
  let translatedContent = await translate(answers.content, {
    from: answers.language, to: otherLanguage
  });

  let translatedFileContent = getFileContent(author, date, otherLanguage, slug, translatedTitle, translatedContent);

  fs.writeFileSync(getFileName(otherLanguage, date, slug), translatedFileContent, { encoding: "utf8" });
}).catch(error => console.error(error));

// -- MARK: Helper functions

function getFileName(language, date, slug) {
  return __dirname + '/../source/_posts_' + language + "/" + date.getFullYear() + "/" + date.format('YY-mm-dd') + "-" + slug + ".md"
}

function getFileContent(author, date, language, slug, title, content) {
  return `
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
slug: ${slug}
social_image: false
template: post
title: ${title}
---

${content}
  `;
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
