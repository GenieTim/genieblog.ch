---
author: Tim Bernhard
comments: true
date: 2019-06-19 16:00:49+00:00
layout: post
link: http://genieblog.ch/estimating-electricity-composition-for-valuability-of-electric-cars/
slug: estimating-electricity-composition-for-valuability-of-electric-cars
title: Einschätzung der notwendingen Stromsauberkeit für den sinnvollen Einsatz von E-Autos
wordpress_id: 462
categories:
  - Ueberschlagsrechnung
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Der Zweck dieses Posts ist es, die maximale "Dreckigkeit" von Elektrizität für Elektroautos zu berechnen, damit diese die bessere Alternative zu konventionellen diesel- oder benzinbetriebenen Autos darstellen.
Der Post ist einerseits eine Bestätigung meiner Informations-Bubble und andererseits eine Antwort auf den zu Recht kontroversen und widerlegten Artikel von Buchal, Karl und Sinn ​[[1]](#src-1)​.

Folgende Annahmen werden wir treffen:

  * wir vernachlässigen den Bau, den Transport und den Verkauf des Autos,
  * und starten beim Punkt "Kunde kauft Auto".
  * Wir vernachlässigen den CO2 Beitrag von Fracking, Raffinerie, Lagerung und Transport der fossilen Brennstoffe,
  * nehmen an dass der Strom nur durch Wasser & Kohlestrom besteht,
  * vernachlässigen jegliche CO2-Emissionen des Wasser-Stroms
  * und vernachlässigen den Bau jeglicher Verteilungsnetze.

Was die Daten angeht, werden wir mit den in jenem Artikel gewählten Automodellen rechnen: einem Tesla Model 3 und einem Mercedes C 220 d.
Der Referenzwert für den Mercedes beträgt mindestens 0.134 kg CO2 per Kilometer ​[[2]](#src-2)​. Dies ist der Wert, auf den wir den Kohleanteil maximieren wollen.

Für das Tesla-Modell 3 wird ein Wirkungsgrad von 0,148 kWh pro Kilometer angegeben ​[[3]](#src-3)​. Mit einer Li-ion Batterie Effizienz von 99 % ​[[4]](#src-4)​, können wir Lade- und Entladeverluste vernachlässigen.
Nehmen wir den globalen Durchschnitt des Stromausfalls durch das Stromnetz von 12% ​[[5]](#src-5)​ an, brauchen wir 0.168 kWh produzierten Strom per Kilometer.

Für die CO2-Erzeugung durch Kohlestrom gehen wir vom schlimmsten Fall aus.
Das entspricht der höchsten Emissionen durch Anthrazitkohle von 0.354 kg CO2 per kWh (Einheiten [umgerechnet](https://www.google.com/search?q=0.0002286+Pounds%2FBtu+in+kg%2FkWh)) ​[[6]](#src-6)​ liegen.
Bei einem Anteil von 100% Kohle wäre unser Tesla somit verantwortlich für 0.059 kg CO2 per Kilometer.
Dies ist weniger als die Hälfte der Emissionen des Mercedes, für die unrealistische Annahme von 100% des Stroms aus Kohle.

Zusammenfassend lässt sich also sagen, dass eine kurze Berechnung den allgemeinen Eindruck unterstützt, dass Elektroautos tatsächlich weniger Emissionen verursachen.
Es muss jedoch angemerkt werden, dass für dieses Resultat einige Annahmen getroffen wurden.
Die meisten davon scheinen sich im direkten Vergleich jedoch aufzuheben.
Auch wurden nur die Kohlendioxidemissionen berücksichtigt, obwohl dies keineswegs weder der einzige noch ein ausreichender Indikator für Umweltverträglichkeit ist.
Was ich in einer weiteren Überarbeitung dieser Berechnungen ausserdem berücksichtigen würde, ist die Herstellung der Batterie des Tesla, da dies der Hauptunterschied in der Herstellung der beiden Autos ist.

Wenn Sie Fehler in meinen Berechnungen finden oder Zweifel an meinen Annahmen haben, zögern Sie nicht, mir eine E-Mail zu schreiben oder einen Kommentar zu hinterlassen.

### Referenzen

  1. <span id="src-1"></span>C.
Buchal, H.-D.
Karl, and H.-W.
Sinn, “Kohlemotoren, Windmotoren und Dieselmotoren: Was zeigt die CO2-Bilanz?” p. 15.

  2. <span id="src-2"></span>“C-Klasse: T-Modell, Preisliste gültig ab 1. Februar 2019.” Mercedes-Benz Schweiz AG.

  3. <span id="src-3"></span>“Tesla Model 3 Standard Range,” _Electric Vehicle Database_.  [Online]. Available: [https://ev-database.org/car/1060/Tesla-Model-3-Standard-Range](https://ev-database.org/car/1060/Tesla-Model-3-Standard-Range). [Accessed: 19-Jun-2019]

  4. <span id="src-4"></span>“Battery University,” _ BU-104a: Comparing the Battery with Other Power Sources_, 28-Mar-2019.  [Online]. Available: [https://batteryuniversity.com/learn/article/comparing_the_battery_with_other_power_sources](https://batteryuniversity.com/learn/article/comparing_the_battery_with_other_power_sources). [Accessed: 19-Jun-2019]

  5. <span id="src-5"></span>“6. Efficiency and Power Grids,” _Global CCS Institute_.  [Online]. Available: [https://hub.globalccsinstitute.com/publications/energy-efficiency-technologies-overview-report/6-efficiency-and-power-grids](https://hub.globalccsinstitute.com/publications/energy-efficiency-technologies-overview-report/6-efficiency-and-power-grids). [Accessed: 16-Jun-2019]

  6. <span id="src-6"></span>“How much carbon dioxide is produced when different fuels are burned?,” _U.S.
Energy Information Administration_, 04-Jun-2019.  [Online]. Available: [https://www.eia.gov/tools/faqs/faq.php?id=73&t;=11](https://www.eia.gov/tools/faqs/faq.php?id=73&t=11). [Accessed: 19-Jun-2019]

