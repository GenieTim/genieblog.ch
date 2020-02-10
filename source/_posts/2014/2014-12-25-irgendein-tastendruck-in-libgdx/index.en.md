---
author: adminTim
comments: true
date: 2014-12-25 09:37:10+00:00
excerpt: "Wie man mit dem Java-Framework libGDX das Drücken irgendeiner Taste abfängt.\
  \ \nlibGDX ist ein Framework, optimal für die Programmierung von Games und Spielen,\
  \ und zwar plattformunabhängig. Die Projekte lassen sich für iOs, Android, PCs und\
  \ Macs und sogar fürs Web exportieren!"
layout: post
link: http://genieblog.ch/irgendein-tastendruck-in-libgdx/
slug: irgendein-tastendruck-in-libgdx
title: Irgendein Tastendruck in libGDX
wordpress_id: 40
categories:
  - Java
draft: false
template: post
description: false
tags: 
  - Java
  - libGDX
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

Bei einem aktuellen Projekt eines Games in der Programmiersprache Java, das ich mithilfe des Frameworks libGDX erstelle, wollte ich an einem Punkt den Nutzer fragen, ob er bereit ist, weiterzuspielen. Dem Spielerlebnis zuliebe sollte dies auf keinen Fall über einen Ja/Nein Dialog geschehen.





Da mit libGDX das Spiel sowohl für Desktop-PCs wie auch für Android und iOs Mobilgeräte konzipiert sein würde, ist ein einfacher Klick auf den Bildschirm zwar für die Mobilgeräte angenehm, nicht jedoch für den Desktop-Nutzer, da dieser die Maus für die eigentliche Steuerung des Spiels nicht benötigt.





Es liegt also eine zweispurige Lösung nahe: für die Mobilgeräte sollte es reichen, wenn sie auf den Bildschirm tippen, der PC-Nutzer dagegen sollte eine Taste drücken, um das Spiel zu beginnen. Doch welche?





## Tastatureingabe in libGDX




Generell kann eine Tastatureingabe in libGDX  auf zwei Arten entgegengenommen werden: Einerseits kann ich immer wieder fragen "Hey, Tastatur, wurde gerade _Enter_ gedrückt?". Oder ich sage der Tastatur: "Hey, Junge, melde Dich doch wenn _Enter_ gedrückt wurde!". Ich bevorzuge die erste Lösung, da die _render()_-Funktion sowieso immer wieder aufgerufen wird, und dieser Weg in den meisten Beispielprojekten gewählt wird.




Wie funktioniert denn nun dieser Weg? Die Tastatureingabe wird bereitgestellt durch die Methode com.badlogic.gdx.Gdx.input.isKeyPressed(int key). Geprüft wird dann zum Beispiel folgendermassen:


`// import com.badlogic.gdx.Gdx;
// import com.badlogic.gdx.Gdx;
// import com.badlogic.gdx.Input;
// import com.badlogic.gdx.Input.Keys;
if (Gdx.input.isKeyPressed(Input.Keys.ENTER)) {
			// tu was du willst - Enter wurde gedrückt
		}`


Damit sind wir schon ziemlich nah am Ziel - wir müssen nur Input.Keys.??? anpassen, so dass die Tastatur nach der von uns gewählte Taste gefragt wird. Eine Liste mit den verschiedenen Input.Keys.* findest Du hier: [http://libgdx.badlogicgames.com/nightlies/docs/api/com/badlogic/gdx/Input.Keys.html](http://libgdx.badlogicgames.com/nightlies/docs/api/com/badlogic/gdx/Input.Keys.html)




### Die Lösung





Doch nur welche Taste wollen wir denn nun verwenden? Genau, alle! Es soll nicht darauf ankommen, welche Taste der Nutzer drückt, er will doch einfach das Spiel starten. Da wir bestimmt keinen ewig langen Schalter à la `if (rechts oder links oder bla oder bla...)` haben möchten, gibt es zum Glück den **Any Key**! ;)




Dieser sieht folgendermassen aus, und löst unser Problem ausserordentlich elegant:


`if (Gdx.input.isKeyPressed(Input.Keys.ANY_KEY)) {
			// YAY, eine Taste wurde gedrückt
		}`



Und entsprechend mit der Abfrage nach Eingabe von Mobilgeräten:



`if (Gdx.input.justTouched() || Gdx.input.isKeyPressed(Input.Keys.ANY_KEY)) {
			// Wohoo, das Spiel kann starten!
		}`
