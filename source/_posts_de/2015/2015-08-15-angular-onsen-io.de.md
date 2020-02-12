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
language: de
cover_image: false
---

Nahezu drei Tage brachte ich es einfach nicht hin, dass meine Angular Applikation mit onsen.io macht, was sie sollte. `ng-repeat` waren im DOM-Baum auskommentiert, `ng-click` reagierten nicht. 
Nun endlich ist mir das Problem aufgefallen und bewusst geworden. Die `ng-controller` dürfen nicht auf einem `<ons-template></ons-template>` angewendet werden, sondern dürfen frühestens bei der `<ons-page></ons-page>` als Attribut gesetzt werden. Ich hoffe ich kann mit dieser Beobachtung anderen solch schweres Kopfzerbrechen verhindern.
