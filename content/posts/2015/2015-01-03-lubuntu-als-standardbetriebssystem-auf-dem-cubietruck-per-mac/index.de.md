---
author: adminTim
comments: true
date: 2015-01-03 12:32:26+00:00
layout: post
link: http://genieblog.ch/lubuntu-als-standardbetriebssystem-auf-dem-cubietruck-per-mac/
slug: lubuntu-als-standardbetriebssystem-auf-dem-cubietruck-per-mac
title: Lubuntu als Standardbetriebssystem auf dem Cubietruck - per Mac
wordpress_id: 55
category: Cubietruck
tags:
- Betriebssystem
- Computer
- Cubietruck
- Lubuntu
- NAND
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
---


Beim ersten Anschliessen vom Cubietruck (v/o Cubieboard 3) startet automatisch das Betriebsystem Android. Da dieses nicht das gesamte Potential des Cubies ausschöpft, kann man es zum Glück auf ganz einfache Weise durch Lubuntu austauschen. Das geht zum Beispiel folgendermassen:





## Vorbereitungen





Folgende Dinge sollten Sie bereitgelegt haben:




  * Cubietruck mit zugehörigen Kabeln


  * den Mac


  * das Programm [Live Suit](http://linux-sunxi.org/LiveSuit)


  * ein Image des Betriebssystems ([Lubuntu](http://dl.cubieboard.org/software/a20-cubietruck/lubuntu/ct-lubuntu-nand-v1.02/))


Hinweis: Wenn Sie nicht wissen welche Lubuntu Version Sie wählen sollten, achten Sie auf den Namen der Datei. Wenn Sie Ihren Cubietruck per Hdmi an den Bildschirm anschliessen benötigen Sie die Datei auf -hdmi, entsprechend bei -vga wenn Ihr Bildschirm per VGA angeschlossen ist. 





## Haupthandlungen





Starten Sie das Programm Live Suit und wählen Sie indem Sie oben links auf "Image" klicken die heruntergeladene *.img Datei aus. Falls in Ihrem Download-Ordner noch immer die *.gz Datei vorhanden ist, müssen Sie diese zuerst entpacken. Dies sollte durch einen Doppelklick auf die Datei automatisch passieren.






Wenn Sie das nicht bereits gemacht haben, versorgen Sie Ihren Cubietruck mit Strom und hängen Ihn an Ihren Bildschirm. Wenn irgendwelche Lämpchen am Cubie angehen, so drücken Sie ein Weilchen auf den "Power on" Schalter, bis die Lämpchen abgehen und der Cubie ausgeschaltet ist. Verbinden Sie nun das MiniUSB-Kabel mit dem Mac (aber noch nicht mit dem Cubietruck). Drücken Sie den mit "FEL" beschrifteten Schalter auf dem Cubie. Nach ca. 10 Sekunden gedrückt halten stecken Sie das MiniUSB-Kabel in den Cubie. Halten Sie den "FEL"-Schalter dabei immer noch gedrückt. Nach wenigen Sekunden sollte nun Live Suit eine Frage stellen. Ist das der Fall, können Sie "FEL" loslassen. Beantworten Sie die Frage von Live Suit mit "YES". Damit wäre der Zauber schon vorbei - nach wenigen Minuten wird die Imagedatei auf dem NAND vom Cubie installiert sein und starten!






Ich wünsche viel Erfolg beim Nachmachen!

