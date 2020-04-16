---
author: Tim Bernhard
comments: true
date: 2018-01-12 13:00:49+00:00
layout: post
link: http://genieblog.ch/apple-superdrive-mit-windows-verwenden/
slug: apple-superdrive-mit-windows-verwenden
title: Apple Superdrive mit Windows verwenden
wordpress_id: 173
categories:
  - Windows
  - Apple
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: de
cover_image: false
---

Das Apple Superdrive Laufwerk lässt sich problemlos unter Windows verwenden.
Allerdings muss dafür der entsprechende Treiber installiert werden.

Das geht folgendermassen: Laden Sie sich die [Apple Boot Camp-Support-Software](https://support.apple.com/kb/DL1837?viewlocale=de_DE&locale=de_CH) herunter.
Die Datei ist eine Zip-Datei, also um einen «Zip-komprimierten Ordner», wie Windows das nennt.
Entpacken Sie die Datei und öffnen anschliessend den entpackten Ordner.
Gehen Sie darin zum Unterordner /BootCamp/Drivers/Apple.
Dort finden Sie eine Datei namens «AppleODDInstaller64.exe» (eventuell ist die Endung «.exe» nicht zu sehen). Installieren Sie mithilfe dieser Datei den Treiber, indem Sie auf sie doppelklicken und dem Installationsassistenten folgen.
Das war es schon! Beim nächsten Anhängen des Apple-SuperDrive Laufwerks sollte Ihr Windows dieses nun erkennen und damit arbeiten können.
