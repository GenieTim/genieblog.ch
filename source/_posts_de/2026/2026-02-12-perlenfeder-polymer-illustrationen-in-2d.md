---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2026/perlenfeder-polymer-illustrationen-in-2d
date: 2026-02-12 15:01:03
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: perlenfeder-polymer-illustrationen-in-2d
social_image: false
template: post
title: "Perlenfeder-Polymer-Illustrationen in 2D"
translations:
  en: bead-spring-polymer-illustrations-in-2d
  de: perlenfeder-polymer-illustrationen-in-2d
---

Während meiner Promotion habe ich häufig ein Perlenfedermodell für Polymernetzwerke verwendet, eine grobkörnige Darstellung, die die wesentliche Physik erfasst und gleichzeitig rechnerisch effizient ist.

Im Laufe der Zeit erfanden wir neue Methoden zur Analyse der Struktur und Dynamik dieser Netzwerke, wie die Normalmodusanalyse für Viskoelastizität und das MEHP-Kraftbilanzverfahren für den Gleichgewichtsschermodul.
Insbesondere entwickelten wir auch eine modifizierte MC-Stichprobenmethode, um eine (Phantom-)Polymer-Netzwerkmikrostruktur zu bootstrappen, wie in der [MEHP Force Balance Papier](https://doi.org/10.1021/acspolymersau.5c00036).

Um diese Methoden und Perlenfedermodelle im Allgemeinen zu veranschaulichen, habe ich zunächst Adobe Illustrator, Inkscape, Amadine und/oder PowerPoint verwendet, um schematische Darstellungen von Mikrostrukturen in Polymernetzwerken zu erstellen.
Wenn ich jedoch die Mikrostruktur verändern musste, zum Beispiel weil sie zu dicht oder zu spärlich war oder Platz für Etiketten benötigte, musste ich die Position der Perlen und Federn manuell anpassen, was zeitaufwendig und nicht sehr präzise war. Insbesondere die Federn und ihre Ausrichtung mit den Perlen waren schwierig und mühsam einzustellen.

Deshalb habe ich den [Polymer-Graph-Sketcher](https://genietim.github.io/polymer-graph-sketcher/) entwickelt, ein Werkzeug zur Illustration von Mikrostrukturen des Perlen-Feder-Polymernetzwerks auf eine intuitivere und effizientere Weise.
Open-Source und als Web-App verfügbar, ermöglicht es Nutzern, Polymer-Netzwerkillustrationen einfach zu erstellen und zu verändern, indem sie Perlen und Federn ziehen und absetzen, während die korrekte Ausrichtung automatisch beibehalten wird.

Es ist absolut möglich, dass es sich für mich angenehmer anfühlt als für andere, und dass es nicht das beste Werkzeug für jeden ist.
Dennoch fand ich es ein nützliches Werkzeug für meine eigene Arbeit und hoffe, dass es auch anderen helfen kann.
Insbesondere würde ich empfehlen, dir die [Tastenkürzel](https://genietim.github.io/polymer-graph-sketcher/documentation.html#keyboard-shortcuts) anzusehen, die den Arbeitsablauf erheblich beschleunigen können.
Ich kann eine neue Mikrostruktur generieren, verändern und in wenigen Minuten als SVG-Datei exportieren. Das ist viel schneller als der manuelle Anpassungsprozess, den ich vorher hatte, bei dem es mindestens eine halbe Stunde gedauert hätte, eine einzelne Illustration zu erstellen, und noch länger, wenn ich sie später noch anpassen musste.

Ein zentrales Merkmal ist auch der Umgang mit periodischen Randbedingungen (PBC), die in Polymersimulationen häufig vorkommen.
Das Tool ermöglicht es Nutzern, Mikrostrukturen mit periodischen Grenzen einfach zu visualisieren und zu verändern, was in herkömmlicher Illustrationssoftware manuell schwierig sein kann.
Wenn Sie eine Perle über die Grenze bewegen, erscheint sie automatisch auf der anderen Seite, und die Federn passen sich entsprechend an, sodass die korrekte Verbindung und Ausrichtung erhalten bleiben.
Dies erleichtert die Erstellung genauer Illustrationen von Polymernetzwerken, die die periodische Natur der Simulationen widerspiegeln.

Für die Präsentation meiner Dissertation habe ich sogar Features implementiert, um Filme der Mikrostruktur zu erstellen, die ich zur Illustration des [MC-Bootstrapping](assets/movies/mc-chain-sampling.mp4), der [MD-Strukturgenerierung](/assets/movies/stop-motion-md-generation.mp4), der [Entanglement-Sampling-Methode](/assets/movies/entanglement-spring-addition.mp4), des [MEHP-Kraftausgleichsverfahrens](/assets/movies/force-balance-phantom.mp4) und mehr genutzt habe.
