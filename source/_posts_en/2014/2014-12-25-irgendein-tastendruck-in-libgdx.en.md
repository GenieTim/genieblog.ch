---
author: Tim Bernhard
comments: true
date: 2014-12-25 09:37:10+00:00
excerpt: >-
  How to intercept pressing any key with the libGDX Java framework.
  libGDX is a framework, ideal for programming games and games, and that is platform-independent.
  The projects can be exported for iOs, Android, PCs and Macs and even for the web!
layout: post
link: http://genieblog.ch/irgendein-tastendruck-in-libgdx/
slug: irgendein-tastendruck-in-libgdx
title: Intercept any keyboard press in libGDX
wordpress_id: 40
categories:
  - Java
  - Java
  - libGDX
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: logo-libgdx.png
---

In a current project for a game in the Java programming language, which I create using the libGDX framework, I wanted to ask the user at one point whether they are ready to continue playing.
For the sake of the gaming experience, this should never be done via a yes / no dialog.

Since with libGDX the game would be designed for desktop PCs as well as for Android and iOs mobile devices, a sole click on the screen is pleasant for the mobile devices, but not for the desktop user, because they use the mouse for the actual control of the game not needed.

So there is a two-lane solution: it should be enough for the mobile devices to tap the screen, while the PC user should press a button to start the game.
But which ones?

## Keyboard input in libGDX

In general, keyboard input in libGDX can be received in two ways: On the one hand, I can always ask "Hey, keyboard, was _Enter_ pressed?". Or I say to the keyboard: "Hey, boy, get in touch when _Enter_ has been pressed!". I prefer the first solution because the _render () _ function is called again and again anyway, and this way is chosen in most example projects.

How does this way work now? The keyboard input is provided by the method com.badlogic.gdx.Gdx.input.isKeyPressed (int key). The following is then checked, for example:

		// import com.badlogic.gdx.Gdx;
		// import com.badlogic.gdx.Gdx;
		// import com.badlogic.gdx.Input;
		// import com.badlogic.gdx.Input.Keys;
		if (Gdx.input.isKeyPressed(Input.Keys.ENTER)) {
					// do what you want – enter was pressed
		}

So we are pretty close to the goal - we need Input.Keys.??? adjust so that the keyboard asks for the key we selected. 
A list with the different Input.Keys.* can be found here: [https://libgdx.badlogicgames.com/ci/nightlies/docs/api/com/badlogic/gdx/Input.Keys.html](http://web.archive.org/web/20210506154912/https://libgdx.badlogicgames.com/ci/nightlies/docs/api/com/badlogic/gdx/Input.Keys.html)

### The solution

But which key do we want to use now? Exactly, everyone! It doesn't matter which key the user presses, they just want to start the game.
Luckily, since we definitely don't want to have an eternally long switch à la `if (right or left or bla or bla ...)`, there is the **Any Key**! ;)

This looks as follows and solves our problem extremely elegantly:

`if (Gdx.input.isKeyPressed(Input.Keys.ANY_KEY)) {
			// YAY, a key was pressed
}`

And accordingly with the query for input of mobile devices:

`if (Gdx.input.justTouched() || Gdx.input.isKeyPressed(Input.Keys.ANY_KEY)) {
			// Wohoo, start the game!
}`
