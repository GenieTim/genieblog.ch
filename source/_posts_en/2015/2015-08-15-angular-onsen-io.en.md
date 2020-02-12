---
author: Tim Bernhard
comments: true
date: 2015-08-15 13:00:55+00:00
layout: post
link: http://genieblog.ch/angular-onsen-io/
slug: angular-onsen-io
title: Angular & Onsen.io
wordpress_id: 207
categories:
  - JavaScript
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

For almost three days I simply couldn't get my Angular application to do what it should with onsen.io. `ng-repeat` were commented out in the DOM tree, `ng-click` did not respond.
Now I finally noticed and became aware of the problem. The `ng-controller` must not be used on a `<ons-template> </ons-template>`, but may only be set as an attribute on the `<ons-page> </ons-page>` at the earliest. I hope with this observation I can prevent others from having such a serious headache.
