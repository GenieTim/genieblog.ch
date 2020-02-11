---
author: Tim Bernhard
comments: true
date: 2018-07-11 13:45:36+00:00
layout: post
link: http://genieblog.ch/my-first-third-party-symfony-bundle/
slug: my-first-third-party-symfony-bundle
title: My first third-party Symfony Bundle
wordpress_id: 416
categories:
  - PHP
tags:
  -PHP
  -Symfony
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---




I created my first open-source Symfony bundle: [PlaceholderBundle](https://github.com/BernhardWebstudio/PlaceholderBundle). It is an abstraction of [Primitive ](https://github.com/fogleman/primitive) and/or [SQIP](https://github.com/technopagan/sqip/blob/master/README.md) for use in a PHP respectively Symfony application. This way, you can automatically generate nice & adaptive placeholders for images in the format you like, all in your PHP application or your Twig template. Refer to the [documentation](https://github.com/BernhardWebstudio/PlaceholderBundle/blob/master/README.md) on how to use the PlaceholderBundle. For now, the underlying nodejs packages still have to be installed separately, depending on which you want to use. The configuration allows to personalise the placeholders as much as the underlying applications allow it.







I will write a follow-up on how to begin with developing a third-pary bundle, as I think the resources for it are rather limited. A general tip is to checkout existing bundles on how to do it.



