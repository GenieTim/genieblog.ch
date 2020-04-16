---
author: Tim Bernhard
comments: true
date: 2018-03-20 14:00:33+00:00
layout: post
link: http://genieblog.ch/sv-fail-runit-not-running/
slug: sv-fail-runit-not-running
title: "sv: fail: runit not running"
wordpress_id: 349
categories:
  
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

To fix this error, all I had to do is install `runit-systemd`. This error appeared after the upgrade from Debian wheezy over jezzie to stretch when trying to get the status respectively start or stop, or just do anything with the command `sv`. The installation may happen e.g.
with _apt_: 

    
    sudo apt-get install runit-systemd

