#!/usr/bin/env node

const formatDate = require('dateformat');
const fs = require("fs");
const inquirer = require('inquirer');
const markdownTranslate = require('markdown-translator')
const path = require("path");
const tmp = require('tmp');
const yaml = require('js-yaml');
const subscriptionKey = getSubscriptionKey();

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

    // load/prepare/translate contents for all other languages
    for (let lan_idx = 0; lan_idx < languages.length; lan_idx++) {
      let language = languages[lan_idx];
      if (language != answers.language) {
        try {
          posts[language] = await translatePost(answers.language.toUpperCase(), language.toUpperCase(), posts[answers.language]);
        } catch (e) {
          console.error(e);
          console.log("Failed to translate post to " + language, posts);
        }
      }
    }

    // finally, save results
    for (language in posts) {
      let fileTarget = getFileName(language, date, posts[language].slug)
      try {
        fs.mkdirSync(path.dirname(fileTarget), { recursive: true });
      } catch (e) {
        console.warn(e)
      }
      fs.writeFileSync(fileTarget, getFileContent(author, date, language, posts), { encoding: "utf8" });
    }
  }).catch(error => {
    // on error, log everything to prevent work loss
    console.error(error);
    console.log(posts);
    console.log(answers);
  });
})()

// -- MARK: Helper functions
/**
 * Get the languages this blog is in
 */
function getLanguages() {
  let fileContents = fs.readFileSync(__dirname + '/../global-config.yaml', 'utf8');
  let data = yaml.load(fileContents);
  return data.languages;
}

/**
 * Get the secrete azure translation service subscription key
 */
function getSubscriptionKey() {
  let fileContents = fs.readFileSync(__dirname + '/../.env.yaml', 'utf8');
  let data = yaml.load(fileContents);
  return data.subscription_key;
}

/**
 * Helper function to assemble the filename & path of the post markdown file
 * 
 * @param {string} language The language of the post for which to get the file name
 * @param {Date} date The date of the post
 * @param {string} slug The slug of the post
 */
function getFileName(language, date, slug) {
  return __dirname + '/../source/_posts_' + language + "/" + date.getFullYear() + "/" + formatDate(date, 'yyyy-mm-dd') + "-" + slug + ".md"
}

/**
 * Translate a post
 * 
 * @param {string} sourceLanguage The language to translate from
 * @param {string} targetLanguage The language to translate to
 * @param {object} sourcePost The post object with properties: title, content, slug
 */
async function translatePost(sourceLanguage, targetLanguage, sourcePost) {
  console.log("Translating to " + targetLanguage);
  let translatedTitle = await translateMarkdownString(sourcePost.title, sourceLanguage, targetLanguage);
  let translatedContent = await translateMarkdownString(sourcePost.content, sourceLanguage, targetLanguage);

  return {
    title: translatedTitle,
    content: translatedContent,
    slug: string_to_slug(translatedTitle)
  }
}

/**
 * Translate a string of markdown
 * 
 * @param {string} text The markdonw-text to translate
 * @param {string} sourceLanguage The language to translate from
 * @param {string} targetLanguage The language to translate to
 */
async function translateMarkdownString(text, sourceLanguage, targetLanguage) {
  const tmpFile = tmp.fileSync();
  fs.writeSync(tmpFile.fd, text);
  const tmpFilePath = tmpFile.name;
  console.log("Tmp file: " + tmpFilePath);
  let translatedText = await markdownTranslate({
    src: tmpFilePath,
    from: sourceLanguage,
    to: targetLanguage,
    subscriptionKey: subscriptionKey,
    region: "westeurope"
  });
  return translatedText.trim();
}

/**
 * Get the string which matches the content of a post file
 * 
 * @param {string} author The author of the post
 * @param {Date} date The publishing date of the post
 * @param {string} language The (short) language of the post
 * @param {array} posts An array of post objects to access
 */
function getFileContent(author, date, language, posts) {
  let fileContent = `---
author: ${author}
categories:
cover_image: false
canonical_url: "https://www.genieblog.ch/blog/${language}/${formatDate(date, 'yyyy')}/${posts[language].slug}"
date: ${formatDate(date, 'yyyy-mm-dd HH:MM:ss')}
description: false
draft: false
extends: _layouts.post
language: ${language}
layout: post
slug: ${posts[language].slug}
social_image: false
template: post
title: "${posts[language].title}"
translations:
`;

  for (var otherLanguage in posts) {
    fileContent += "  " + otherLanguage + ": " + posts[otherLanguage].slug + "\n";
  }

  fileContent += `
---

${posts[language].content}
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
