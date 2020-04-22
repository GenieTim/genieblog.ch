---
author: Tim Bernhard
comments: true
date: 2015-03-30 02:33:06+00:00
excerpt: >-
  Bei der Programmierung einer Windows Phone Applikation mit JavaScript kann der
  "zurück"-Button unten links am Smartphone natürlich auch abgefangen werden, um
  eine alternative Tätigkeit als zum Beispiel das Beenden der Applikation
  herbeizuführen.
  Im folgenden möchte ich die Vorgehensweise erklären.
layout: post
link: http://genieblog.ch/javascript-windows-phone-hardware-backbutton-abfangen/
slug: javascript-windows-phone-hardware-backbutton-abfangen
title: "JavaScript: Catch Windows Phone Hardware Backbutton"
wordpress_id: 155
categories:
  - JavaScript
  - App 
  - HTML5 
  - Programmierung 
  - Windows Phone
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
---

When programming a Windows Phone application with JavaScript, the "back" button at the bottom left of the smartphone can of course also be intercepted in order to carry out an alternative activity, for example, ending the application.
In the following I would like to explain the procedure.

In the crucial HTML page, a _WinJS Application Control_ element must be created with the parameter `onbackclick: myFunction`, where _myFunction_ corresponds to the function that is called when the back button is clicked.
This should look something like this:

    <div data-win-control="WinJS.Application." data-win-options="{onbackclick : meineFunktion}" />

The EventHandler "backclick" can then be used.
For example like this:
    
    document.addEventListener("backclick", meineFunktion);

However, to suppress the default behavior, the termination of the application, `true` must be returned.
A recommended use is in the file `default.js`:

    app.onbackclick = function (evt) {
       meineFunktion();
       return true;
    }
