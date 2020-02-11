---
author: Tim Bernhard
comments: true
date: 2014-12-29 18:07:03+00:00
layout: post
link: http://genieblog.ch/fenstergroessenaenderung-unterdruecken-in-libgdx/
slug: fenstergroessenaenderung-unterdruecken-in-libgdx
title: Fenstergrössenänderung unterdrücken in libGDX
wordpress_id: 39
categories:
  - libGDX
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Ein weiteres Game-Projekt im Java-Framework libGDX. Ein weiteres Problem, das einen kurzen Blogbeitrag wert ist: die Änderung der Fenstergrösse.




Wann auch immer ich etwas programmiere, bin ich unendlich froh über den Umstand dass es nicht von Anfang an perfekt sein muss. Da ich leider kein Mozart der Informatik bin, mache ich Fehler - ich bin ja auch nur ein Mensch. Um diese Fehler zu finden, ist es von Vorteil, wenn man das Programm ab und zu ausprobieren kann, um die Änderungen zu testen. In libGDX geht das logischerweise auch. Da der build-Prozess für die Android bzw. iOs Applikation einigermassen lange dauert, und die jeweilige virtuelle Maschine sehr Ressourcenlastig ist, teste ich meine kleinen Änderungen als Desktopapplikation. Das _Spiel-feeling_ ist bis auf die von Gyro-sensoren abhängigen Elementen identisch. Doch: man kann vom Standard her die Grösse des Fensters ändern! Sowas ist auf Mobilgeräten nicht möglich, weshalb diese Funktion doch eher störend ist, wenn man zum Beispiel mit der Maus eine Wischbewegung des Fingers imitiert und so aus Versehen die Fenstergrösse ändert. Die Grafiken verschieben und verzerren sich, man kann nicht weiter testen... Was also dagegen tun?




Um in der Desktopapplikation die Änderung der Fenstergrösse zu verhindern, ist es bloss nötig, dass man im Desktopprojekt die Datei _DesktopLauncher.java_ bearbeitet. Zur Definition von config muss die boolessche Variable resizable auf false gesetzt werden, und schon lässt sich die Fenstergrösse nicht mehr ändern!




Der Code von DesktopLauncher.java sähe dann etwa folgendermassen aus:


`package ch.genieblog.yourpackage;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import ch.genieblog.yourgame;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
		config.title = "yourGameTitle"; // Der Titel der Applikation
		config.width = 480; // Die Breite der Applikation; entspricht der Breite 
                                    // eines durchschnittlichen Android-Smartphones
		config.height = 800; // Die Höhe der Applikation; entspricht der Höhe
                                    // eines durchschnittlichen Android-Smartphones
		config.resizable = false; // und hier verhindern wir die Fenstergrössenänderung
		new LwjglApplication(new spaceMaster(), config);
	}
}`
