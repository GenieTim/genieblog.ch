---
author: adminTim
comments: true
date: 2015-01-07 13:00:28+00:00
excerpt: Nach dem aufsetzen von <a title="Lubuntu als Standardbetriebssystem auf dem
  Cubietruck – per Mac" href="http://genieblog.ch/lubuntu-als-standardbetriebssystem-auf-dem-cubietruck-per-mac/">Lubuntu</a>
  auf dem Cubietruck fällt auf, dass man nie nach dem Tastaturlayout gefragt wird.
  Da es mühsam ist, immer die richtigen Tasten zu suchen, ist es naheliegend, dass
  man das Tastaturlayout wechseln möchte. Nur wie?
layout: post
link: http://genieblog.ch/cubietruck-lubuntu-tastaturlayout/
slug: cubietruck-lubuntu-tastaturlayout
title: 'Cubietruck mit Lubuntu: Tastaturlayout anpassen'
wordpress_id: 60
category: Cubietruck
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
---

Nach dem Aufsetzen von [Lubuntu auf dem Cubietruck](http://genieblog.ch/lubuntu-als-standardbetriebssystem-auf-dem-cubietruck-per-mac/) fällt auf, dass man nie nach dem Tastaturlayout gefragt wurde. Da es mühsam ist, immer die passenden Tasten zu suchen, ist es naheliegend, dass man das Tastaturlayout wechseln möchte. Nur wie?

Der Cubie sollte mit dem internet verbunden sein für die nächsten Schritte. 
Starten Sie zunächst das Terminal / die Konsole.

Suchen Sie nach möglichen Sprach-Paketen mit folgenden Befehlen:
`$ apt-cache search xfonts-intl
$ apt-cache search language-pack
`
Wenn Sie ein Paket sehen, das Sie installieren möchten, können Sie es mit `$ sudo apt-get install xfonts-intl-european
$ sudo apt-get install language-pack-de language-pack-gnome-de` installieren, wobei `de` durch die von Ihnen verwendete Sprache ersetzt werden muss (z. B. en für Englisch). 

Nach der Installation der Sprachpakete können Sie das Tastaturlayout auf zwei verschiedene Arten anpassen.


## Anpassen des Tastaturlayouts für die momentane Session


Wenn Sie das Tastaturlayout nur für die Momentane Session ändern möchten, verwenden Sie `$ setxkbmap -layout ch` wobei `ch` der Ländercode ist. Ersetzen Sie ihn z. B. durch `de` für Deutschland.


## Anpassen des Standardtastaturlayouts


Um das Standardtastaturlayout zu ändern, verwenden Sie folgende Befehle:
`$ sudo nano /etc/default/keyboard`
um die Datei /etc/default/keyboard zu bearbeiten. Ändern Sie hier `XKBLAYOUT="us"` zu z. B. `XKBLAYOUT="ch"` wobei ch wiederum der Ländercode ist.
Nun müssen Sie bloss noch mit `sudo reboot` Ihren Cubietruck neu starten und schon verwenden Sie das gewünschte Tastaturlayout.
