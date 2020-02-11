---
author: Tim Bernhard
comments: true
date: 2018-01-12 13:00:49+00:00
layout: post
link: http://genieblog.ch/apple-superdrive-mit-windows-verwenden/
slug: apple-superdrive-mit-windows-verwenden
title: Use Apple Superdrive with Windows
wordpress_id: 173
categories:
  - Any
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

The Apple Superdrive drive is easy to use on Windows. However, the appropriate driver must be installed for this.

Here's how to do it: Download the [ Apple Boot Camp Support Software ](https://support.apple.com/kb/DL1837?viewlocale=en_US&locale=en_CH). The file is a zip file, a "zip-compressed folder", as Windows calls it. Unpack the file and then open the unzipped folder. Go to subfolder / BootCamp / Drivers / Apple. There you will find a file called "AppleODDInstaller64.exe" (you may not see the extension ".exe"). Use this file to install the driver by double-clicking it and following the installation wizard. That's it! The next time you attach the Apple SuperDrive drive, your Windows should be able to recognize and work with it.
