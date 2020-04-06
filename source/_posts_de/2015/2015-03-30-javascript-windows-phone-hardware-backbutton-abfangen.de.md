---
author: Tim Bernhard
comments: true
date: 2015-03-30 02:33:06+00:00
excerpt: Bei der Programmierung einer Windows Phone Applikation mit JavaScript kann der
  "zurück"-Button unten links am Smartphone natürlich auch abgefangen werden, um
  eine alternative Tätigkeit als zum Beispiel das Beenden der Applikation
  herbeizuführen. Im folgenden möchte ich die Vorgehensweise erklären.
layout: post
link: http://genieblog.ch/javascript-windows-phone-hardware-backbutton-abfangen/
slug: javascript-windows-phone-hardware-backbutton-abfangen
title: "JavaScript: Windows Phone Hardware Backbutton abfangen"
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
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Bei der Programmierung einer Windows Phone Applikation mit JavaScript kann der "zurück"-Button unten links am Smartphone natürlich auch abgefangen werden, um eine alternative Tätigkeit als zum Beispiel das Beenden der Applikation herbeizuführen. Im folgenden möchte ich die Vorgehensweise erklären.

In der entscheidenden HTML-Seite muss ein _WinJS Application Control_ Element mit den Parameter `onbackclick : meineFunktion` erstellt werden, wobei _meineFunktion_ der Funktion entspricht, die aufgerufen wird, wenn der Backbutton angeklickt wird. Dies sollte ungefähr folgendermassen aussehen:

    <div data-win-control="WinJS.Application." data-win-options="{onbackclick : meineFunktion}" />

Anschliessed kann der EventHandler "backclick" verwendet werden. Zum Beispiel so:

    document.addEventListener("backclick", meineFunktion);

Um jedoch das Standardverhalten, das Beenden der Applikation, zu unterdrücken, muss `true` zurückgegeben werden. Eine empfehlenswerte Verwendung ist folgende, in der Datei `default.js`:

    app.onbackclick = function (evt) {
       meineFunktion();
       return true;
    }
