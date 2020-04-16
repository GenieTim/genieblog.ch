---
author: Tim Bernhard
comments: true
date: 2015-01-07 13:00:28+00:00
excerpt: >
  After putting on [Lubuntu on the Cubietruck](http://genieblog.ch/lubuntu-als-standardbetriebssysteme-auf-dem-cubietruck-per-mac/) you notice that you were never asked for the keyboard layout.
  Since it is tedious to always find the right keys, it is obvious that you want to change the keyboard layout.
  But how?
layout: post
link: http://genieblog.ch/cubietruck-lubuntu-tastaturlayout/
slug: cubietruck-lubuntu-tastaturlayout
title: "Cubietruck mit Lubuntu: Tastaturlayout anpassen"
wordpress_id: 60
categories:
  - Cubietruck
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: 2015/cubietruck.jpg
---

After putting on [Lubuntu on the Cubietruck] (http://genieblog.ch/lubuntu-als-standardbetriebssysteme-auf-dem-cubietruck-per-mac/) you notice that you were never asked for the keyboard layout.
Since it is tedious to always find the right keys, it is obvious that you want to change the keyboard layout.
But how?

The Cubie should be connected to the internet for the next steps.
First start the terminal/console.

Look for possible language packs with the following commands:

  $ apt-cache search xfonts-intl
  $ apt-cache search language-pack

If you see a package you want to install, you can use `$ sudo apt-get install xfonts-intl-european`
Install `$ sudo apt-get install language-pack-de language-pack-gnome-de`, where `de` has to be replaced by the language you use (e.g. `en` for English).

After installing the language packs, you can customize the keyboard layout in two different ways.

## Adjust the keyboard layout for the current session

If you only want to change the keyboard layout for the current session, use `$ setxkbmap -layout ch` where `ch` is the country code.
Replace it e.g.
B. by `de` for Germany.

## Customize the default keyboard layout

To change the default keyboard layout, use the following commands:
`$ sudo nano /etc/default/keyboard`
to edit the /etc/default/keyboard file.
Change `XKBLAYOUT =" us "` to e.g.
B. `XKBLAYOUT =" ch "` where ch is the country code.
Now all you have to do is restart your Cubietruck with `sudo reboot` and you are ready to use the keyboard layout you want.
