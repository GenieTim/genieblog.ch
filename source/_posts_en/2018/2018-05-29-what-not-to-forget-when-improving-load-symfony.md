---
author: Tim Bernhard
comments: true
date: 2018-05-18 19:51:11+00:00
layout: post
slug: what-not-to-forget-when-improving-load-performance-symfony
title: What not to Forget when Improving Load Performance of Your Symfony Website
wordpress_id: 410
categories:
  - PHP
  - Symfony
  - Performance
draft: true
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
---



* Do not compress HTML, only JS & CSS
* As your application is PHP anyway, add the 'defer' atrribute to all JavaScripts possible
* Even though you are using Doctrine, you have to remember to add indices to your database columns
