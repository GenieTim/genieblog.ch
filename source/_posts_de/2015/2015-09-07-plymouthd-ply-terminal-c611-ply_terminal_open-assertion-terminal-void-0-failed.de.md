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
language: de
cover_image: 2015/cubietruck.jpg
---

`plymouthd: ply-terminal.c:611: ply_terminal_open: Assertion 'terminal != ((void *)0)' failed`

Eine Fehlermeldung, die den Cubietruck praktisch zum erliegen bringt.
Irres auf-der-Tastatur-herumschlagen nützt au nichts mehr.
Da gibt es aber noch eine Lösung: `Ctrl + Alt + F1`

Das Problem ist bloss, dass die Lubuntu Benutzeroberfläche nicht gestartet werden konnte.
Mit dem magischen Tastaturbefehl kommt man zur ursprünglichen Ubuntu Befehlszeile.
Von hier aus kann man nun mögliche Ursachen suchen und selbige beheben.

In meinem Fall verhinderte eine unvollständige Installation von Java das starten der UI.
Die Installation konnte ich, nachdem ich ein wenig mehr Platz geschaffen habe auf der Festplatte, mit `sudo apt-get -f install` vollenden.
Danach kann man entweder die Benutzeroberfläche per Befehl starten, oder mit `sudo reboot` den Computer neu starten, so dass die Benutzeroberfläche wie üblich beim Aufstarten aktiviert wird.
