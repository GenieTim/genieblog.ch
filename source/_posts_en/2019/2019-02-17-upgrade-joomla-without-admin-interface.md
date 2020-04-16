---
author: Tim Bernhard
comments: true
date: 2019-02-27 17:20:00+00:00
layout: post
slug: upgrade-joomla-without-admin-interface
title: How to upgrade Joomla! without a working user interface
wordpress_id: 443
categories:
  - Joomla
draft: true
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
translations: false
---

I recently had the case that a hosting provider which shall not be named here upgraded the PHP version from 5.4 to 7.2 without me knowing it.
Joomla! 2.8.5 stopped working thereafter, meaning I did not habe access to the administrator panel to follow these instructions. 

What I had to do instead, was to make a new installation of the current Joomla! version, and then migrate the database contents and templates manually.
Do not forget to go to the extension manager -> discover to install the templates and styles.
