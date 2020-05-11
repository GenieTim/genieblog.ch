---
author: Tim Bernhard
categories:
  - Ueberschlagsrechnung
cover_image: 2020/annie-spratt-5TfCI4nj6B4-unsplash.jpg
date: 2020-05-06 17:35:39+00:00
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: abkuhlung-durch-trocknen-nasser-wasche
social_image: false
template: post
title: Abkühlung durch Trocknen nasser Wäsche
translations:
  de: abkuhlung-durch-trocknen-nasser-wasche
  en: cooling-by-dry-wet-laundry
---

In dieser Überschlagsrechnung soll berechnet werden, wie sehr 
das trocknen nasser Wäsche im Haus zu einer Abkühlung führen kann.
Die Motivation für diese Berechnung ist, dass ein Familienmitglied 
der Meinung war, dass die Wohnung sich signifikant kälter anfühle, 
wenn Wäsche getrocknet werde.

Folgende Annahmen werden hierfür getroffen:

 * 2 L = 2 kg Wasser aus der Wäsche [[1]](#src-1)
 * Anfangstemperatur: 20 °C
 * Wohnungsgrösse: 100 m<sup>3</sup>
 * Erwärmung Wasser, Luftfeuchtigkeit, Änderung Eigenschaften durch Änderung Temperatur vernachlässigt: Alle Eigenschaften konstant bei Anfangsbedingungen
 * Verdampfungswärme Wasser: 2257 kJ/kg bzw. 40,8 kJ/mol [[2]](#src-2)
 * Wärmekapazität Luft: 1005 kJ/(kg * K) [[3]](#src-3)
 * Dichte Luft: 1.25 kg/m<sup>3</sup> [[3]](#src-3)
	
Damit ergeben sich entsprechend 
2 kg * 2257 kJ/kg = 4'514 kJ 
Energie, die benötigt werden um die Wäsche zu trocknen und dafür der Luft entzogen werden und für Abkühlung sorgen.
Für die Abkühlung von 100 m<sup>3</sup> * 1.25 kg/m<sup>3</sup> = 125 kg Luft 
macht das einen Temperaturunterschied von 4514 kJ / (125 kg * 1005 kJ/(kg * K)) = 0.0359 K pro Kubikmeter Luft.

Damit lässt sich abschätzen, dass die Abkühlung mit dieser 
Wohnungsgrösse und gleichmässiger Wärmeverteilung nicht merklich wäre.
Ohne Wärmeverteilung, also bei Abkühlung eines einzelnen Kubikmeters hingegen 
wären die 3.6 K Abkühlung vermutlich sehr gut spürbar.

## Quellen

1. <span id="src-1"></span>[https://www.welt.de/kmpkt/article158861840/Das-ist-der-schlimmste-Fehler-beim-Waeschetrocknen.html](https://www.welt.de/kmpkt/article158861840/Das-ist-der-schlimmste-Fehler-beim-Waeschetrocknen.html)
2. <span id="src-2"></span>[https://de.wikipedia.org/wiki/Eigenschaften_des_Wassers](https://de.wikipedia.org/wiki/Eigenschaften_des_Wassers)
3. <span id="src-3"></span>[https://de.wikipedia.org/wiki/Luft](https://de.wikipedia.org/wiki/Luft)

Foto von [Annie Spratt](https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=credit) auf [Unsplash](https://unsplash.com/s/photos/laundry?utm_source=unsplash&utm_medium=referral&utm_content=credit)
