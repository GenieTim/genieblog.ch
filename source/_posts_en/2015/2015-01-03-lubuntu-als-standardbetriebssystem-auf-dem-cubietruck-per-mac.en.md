---
author: Tim Bernhard
comments: true
date: 2015-01-03 12:32:26+00:00
layout: post
link: http://genieblog.ch/lubuntu-als-standardbetriebssystem-auf-dem-cubietruck-per-mac/
slug: lubuntu-als-standardbetriebssystem-auf-dem-cubietruck-per-mac
title: Lubuntu as default OS on the Cubietruck - using a Mac
wordpress_id: 55
categories:
  - Cubietruck
  - OS 
  - Computer 
  - Cubietruck 
  - Lubuntu 
  - NAND
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: 2015/cubietruck.jpg
---

When you first connect the Cubietruck (v / o Cubieboard 3), the Android operating system starts automatically.
Fortunately, since this does not exhaust the full potential of the Cubies, it can be replaced by Lubuntu.
This can be done, for example, as follows:

Preparations

You should have the following things ready:

  * Cubietruck with associated cables

  * the Mac

  * the program [Live Suit] (http://linux-sunxi.org/LiveSuit)

  * an image of the operating system ([Lubuntu] (https://lubuntu.net/downloads/))

Note: If you do not know which Lubuntu version you should choose, pay attention to the name of the file.
If you connect your Cubietruck via Hdmi to the screen, you need the file on -hdmi, correspondingly with -vga if your screen is connected via VGA.

## main actions

Start the Live Suit program and select the downloaded * .img file by clicking on "Image" in the top left corner.
If the * .gz file is still available in your download folder, you must unzip it first.
This should happen automatically by double clicking on the file.

If you have not already done so, power up your Cubietruck and connect it to a screen.
If any of the lights on the Cubie come on, press the "Power on" button for a while until the lights go out and the Cubie is switched off.
Now connect the MiniUSB cable to the Mac (but not yet to the Cubietruck). Press the switch labeled "FEL" on the Cubie.
After holding it down for approx. 10 seconds, plug the MiniUSB cable into the Cubie.
Keep the "FEL" switch pressed.
After a few seconds, Live Suit should ask a question.
If so, you can let go of "FEL". Answer the question from Live Suit with "YES". The magic would then be over - after a few minutes the image file will be installed on the Cuband NAND and start!

I wish you much success in copying!
