---
author: Tim Bernhard
comments: true
date: 2015-09-07 13:15:36+00:00
layout: post
link: http://genieblog.ch/plymouthd-ply-terminal-c611-ply_terminal_open-assertion-terminal-void-0-failed/
slug: plymouthd-ply-terminal-c611-ply_terminal_open-assertion-terminal-void-0-failed
title: "plymouthd: ply-terminal.c:611: ply_terminal_open: Assertion 'terminal !=
  ((void *)0)' failed"
wordpress_id: 214
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

    
    plymouthd: ply-terminal.c:611: ply_terminal_open: Assertion 'terminal != ((void *)0)' failed

An error message that practically stops the Cubietruck.
Fooling around on the keyboard does not help anymore.
But there is another solution: `Ctrl + Alt + F1`

The only problem is that the Lubuntu user interface could not be started.
With the magic keyboard command you get to the original Ubuntu command line.
From here you can now search for possible causes and fix them.

In my case, an incomplete installation of Java prevented starting the UI.
I was able to complete the installation with `sudo apt-get -f install` after I created a little more space on the hard disk.
Then you can either start the user interface by command, or restart the computer with `sudo reboot`, so that the user interface is activated as usual at startup.
