---
author: Tim Bernhard
categories:
  - Genieblog
cover_image: false
date: 2020-05-06 21:37:06
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: migration-von-wordpress-jigsaw
social_image: false
template: post
title: "Migration von Wordpress Jigsaw"
translations:
  en: migration-from-wordpress-to-jigsaw
  de: migration-von-wordpress-jigsaw

---

Diese Seite wurde von kurzem (also relativ zum Datum 6.5.2020) neu gestaltet.
Um genauer zu sein, nicht nur neu gestaltet, sondern von Grund auf neu entwickelt.
Alles, was übrig geblieben ist, ist der Inhalt, den ich erfolgreich migriert habe.
Früher wurde diese Seite mit [Wordpress](https://wordpress.org/) betrieben, jetzt wird sie durch [JigSaw](https://jigsaw.tighten.co/) generiert.
Ich entschied mich für wechseln, da ich gerne etwas mit static site generators herumspielen wollte.

## Für und Wider

In Bezug auf die Vorteile der Migration habe ich Folgendes gefunden:

* Meine WordPress-Installation wurde chaotisch: viele Plugins, einige stören sich gegenseitig. Von vorne anfangen wäre eine alternative Lösung gewesen.
* Ich habe alles in der Hand: Ich muss kein langes Plugin schreiben oder lesen, sondern kann mich einfach weghacken. Ich habe mehr Kontrolle über meine Zeit, wenn ich Jigsaw einstelle.
* Ich kann Markdown mit jedem Editor, den ich mag, ohne Problemumgehungen verwenden.
* Ich habe die vollständige Kontrolle über die Leistung der Website. Ich habe [einen anderen Beitrag](https://www.genieblog.ch/blog/en/2020/features-of-this-website-speed) über meine Maßnahmen geschrieben.
* Kommende Migrationen zu anderen Technologien werden angesichts der Portabilität von Abschriften wahrscheinlich sehr einfach sein.
* Ich kann [GitHub](https://github.com/GenieTim/genieblog.ch) problemlos verwenden, um meinen Code freizugeben. Jeder kann meine Beiträge bearbeiten, um Tippfehler oder Übersetzungen zu korrigieren.

Es gibt aber auch einige Nachteile:

* Der Umgang mit mehreren Sprachen ist nicht so einfach, wie ich es mir erhofft hätte. Zugegeben, es ist für mich eh nicht sehr sinnvoll, meine Beiträge weiterhin in zwei Sprachen zu schreiben, doch noch habe ich mich dafür entschieden.
* Ich mag die von Jigsaw auferlegte [Verzeichnisstruktur](https://github.com/tightenco/jigsaw/issues/432) nicht sehr.

## How To Migrate
Es gibt zwei Schritte, die zur Vorbereitung ausgeführt werden können:

Einerseits ist ein Export der WordPress-Daten erforderlich.
Lesen Sie dazu einen der Beiträge, in denen die Migration nach Gatsby oder Hugo beschrieben wird, beispielsweise diesen von [Tania Rascia](https://www.taniarascia.com/migrating-from-wordpress-to-gatsby/). ).
Der wichtigste Schritt ist das Herunterladen des XML von WordPress im Abschnitt **Tools** → **Export**.
Dann kann man das Tool [ExitWP] https://github.com/thomasf/exitwp) verwenden, um das XML in Markdown zu konvertieren.
Abhängig von den in WordPress verwendeten Shortcodes können einige zusätzliche Anpassungen erforderlich sein.
Überprüfen Sie meine [Skriptsammlung](https://github.com/GenieTim/genieblog.ch/tree/master/bin/archive) auf Skripte und reguläre Ausdrücke, mit denen ich meine Blog-Beiträge gemäß den Sprachkürzeln von [WP MultiLang](https://github.com/VaLeXaR/wp-multilang) aufgeteilt habe. 

Auf der anderen Seite müssen Sie Ihre Jigsaw-Installation einrichten.
Informationen dazu finden Sie im [Handbuch](https://jigsaw.tighten.co/docs/installation/) mit der aktuellsten Version.

Schließlich bleibt nur noch die Kombination der beiden Schritte:
Die generierten Markdown-Dateien müssen in das Verzeichnis `source/posts` der Jigsaw-Installation kopiert werden.
