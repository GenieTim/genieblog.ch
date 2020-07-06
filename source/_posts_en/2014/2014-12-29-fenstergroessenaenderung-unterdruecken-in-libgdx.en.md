---
author: Tim Bernhard
comments: true
date: 2014-12-29 18:07:03+00:00
layout: post
link: http://genieblog.ch/fenstergroessenaenderung-unterdruecken-in-libgdx/
slug: fenstergroessenaenderung-unterdruecken-in-libgdx
title: Suppress window size changes in libGDX
wordpress_id: 39
categories:
  - libGDX
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: 2014/logo-libgdx.png
---

Another game project in the Java framework libGDX.
Another problem that is worth a short blog post: changing the window size.

Whenever I program something, I am infinitely glad that it doesn't have to be perfect from the start.
Since I'm unfortunately not a Mozart of computer science, I make mistakes - I'm only human. 
In order to find these errors, it is advantageous if you can try the program every now and then to test the changes.
In logGDX this is logically also possible. 
Since the build process for the Android or iOs application takes a long time, and the respective virtual machine is very resource-intensive, I test my small changes as a desktop application. 
The _game-feeling_ is identical except for the elements dependent on gyro sensors.
But: you can change the size of the window by default! 
This is not possible on mobile devices, which is why this function is rather annoying if, for example, you imitate a wiping motion of your finger with the mouse and accidentally change the window size. 
The graphics shift and distort, you can no longer test ... So what to do about it?

To prevent the window size from being changed in the desktop application, it is only necessary to edit the _DesktopLauncher.java_ file in the desktop project. 
To define config, the Boolean variable resizable must be set to false, and the window size can no longer be changed!

The code from DesktopLauncher.java would then look something like this:

`package ch.genieblog.yourpackage;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import ch.genieblog.yourgame;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
		config.title = "yourGameTitle"; // The title of the application
		config.width = 480; // The width of the application; corresponds to the width
                                    // of an average smartphone
		config.height = 800; //The amount of the application; corresponds to the height
                                    // of an average smartphone
		config.resizable = false; // and here we prevent the window size from changing
		new LwjglApplication(new spaceMaster(), config);
	}
}`
