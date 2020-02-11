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
language: de
cover_image: false
---

Um diesen Fehler zu beheben, musste ich nur `runit-systemd` installieren. Dieser Fehler trat nach dem Upgrade von Debian Wheezy über Jezzie zu Stretch auf, wenn versucht wurde, den Status zu erhalten bzw. zu starten oder zu stoppen, oder einfach irgendetwas mit dem Befehl `sv` zu tun hatte. Die Installation kann z.B. mit _apt_ vonstatten gehen: 

`sudo apt-get install runit-systemd`
