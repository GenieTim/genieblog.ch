---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2026/werkzeuge-die-ich-wahrend-meiner-promotion-untersuchen-wollte-aber-nicht-getan-habe
date: 2026-02-09 13:39:45
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: werkzeuge-die-ich-wahrend-meiner-promotion-untersuchen-wollte-aber-nicht-getan-habe
social_image: false
template: post
title: "Werkzeuge, die ich während meiner Promotion untersuchen wollte (aber nicht getan habe)"
translations:
  en: tools-i-wanted-to-investigate-during-my-phd-but-did-not
  de: werkzeuge-die-ich-wahrend-meiner-promotion-untersuchen-wollte-aber-nicht-getan-habe
---

Ich habe kürzlich meine Promotion im Fachbereich Materialwesen an der ETH Zürich abgeschlossen.
Meine Forschung konzentrierte sich auf die Vorhersage makroskopischer Polymereigenschaften anhand von Netzwerkstrukturen und Syntheseverfahren.
Die meiste Zeit habe ich damit verbracht

*   Molekulardynamik-(MD)-Simulationen (wie [diese](https://doi.org/10.1021/acs.macromol.3c02544)) um die Struktur und Dynamik von Polymernetzwerken zu untersuchen,
*   und die Entwicklung neuer Methoden zur Vorhersage makroskopischer Eigenschaften, darunter [Normalmodusanalyse](https://doi.org/10.1021/acs.macromol.4c01429) für Viskoelastizität und die [MEHP-Kraftausgleich](https://doi.org/10.1021/acspolymersau.5c00036) Verfahren für den Gleichgewichtsschermodul,
    sowie das Schreiben der [Codes](https://doi.org/10.5334/jors.609) um diese Methoden umzusetzen und die Daten zu analysieren.

Ich hatte die Gelegenheit, viele verschiedene Werkzeuge und Techniken zu erkunden, darunter maschinelles Lernen, um Daten zu analysieren und Vorhersagen zu treffen.
Allerdings gab es auch einige, denen ich begegnet bin, die ich aber nicht ausführlich erkunden konnte. Diese werden in diesem Beitrag besprochen.

Software, die ich nie untersucht habe, aber interessiert war

*   [Topoly](https://academic.oup.com/bib/article/22/3/bbaa196/5906197): Topoly ist ein Python-Paket zur Analyse der Polymertopologie. Obwohl ich Schleifenbrüche, hängende und freie Fraktionen sowie Stränglängenverteilungen analysierte, habe ich die topologischen Eigenschaften der Netzwerke nicht wirklich untersucht, was interessant gewesen wäre.
*   [SWIG](https://www.swig.org/tutorial.html): Für die Schnittstelle zwischen C++ und Python habe ich pybind11 verwendet. Später hörte ich von SWIG, das scheint allgemeiner zu sein. Es könnte auch nützlich sein, um meinen C++-Code für andere Sprachen wie Java und R zu wrappen, was die Nutzung der von mir entwickelten Codes erweitern könnte.
*   [`treedifferencing`](https://github.com/FAU-Inf2/treedifferencing): Für Arbeiten, die ich selbst geschrieben habe, habe ich LaTeX verwendet. Während der Überarbeitungen musste ich manuell angeben, ob eine Änderung eine Löschung, eine Ergänzung oder eine Änderung war, was zeitaufwendig und fehleranfällig war. Ich habe versucht, zu verlängern `latexdiff`, dann ein neues Tool mit Vibe programmiert, aber beide hatten Einschränkungen. Später fand ich `treedifferencing`, was ein entscheidendes Puzzlestück hätte sein können, und ich wünschte, ich hätte es früher entdeckt.
*   [TEPPP](https://www.elenipanagiotou.com/about-4): Ich bin früh in meiner Promotion auf die Topological Entanglement in Polymers, Proteins and Periodic Systems (TEPPP)-Software gestoßen. Ich war sehr daran interessiert als Werkzeug zur Analyse von Verschränkungen in Polymernetzwerken, ein entscheidender Faktor für deren Eigenschaften. Ich habe sie nicht ausführlich untersucht und bin weiterhin neugierig auf ihre Fähigkeiten und Anwendungen – insbesondere, ob die erkannten Verschränkungen genauso nützlich sind wie die vom Z1-Code erkannten und ob beides als Alternative zur zufälligen Verschränkungsprobenmethode angewendet werden kann, die ich für das MEHP Force Balance-Verfahren und die Normalmodusanalyse verwendet habe.
*   [Vormund](https://materialsproject.github.io/custodian/): Beim Ausführen von Jobs wie MD-Simulationen auf Euler musste ich Skripte schreiben, um Eingaben zu generieren, den Jobstatus manuell zu überprüfen und Fehler erneut einzureichen. Ich habe von Custodian gehört, das scheint ein robusteres und benutzerfreundlicheres Tool für diesen Zweck zu sein.
*   [Ginkgo](https://github.com/ginkgo-project/ginkgo): Sowohl die Normalmodusanalyse als auch das MEHP-Kraftausgleichverfahren verwenden spärliche Matrizen, um Polymernetzwerke darzustellen. Obwohl ich dort bereits Sparse-Solver anwende, habe ich Ginkgo, eine Hochleistungsbibliothek für spärliche lineare Algebra, noch nicht erkundet. Es könnte die Leistung großer Systeme verbessern.
*   Neben Ginkgo gibt es viele weitere spärliche Bibliotheken für lineare Algebra, wie zum Beispiel [Trilinos](https://trilinos.github.io/index.html) und [Eigen](https://eigen.tuxfamily.org/). Eigen, das habe ich für genutzt [Pylimerwerkzeuge](https://github.com/GenieTim/pylimer-tools/). Die anderen habe ich noch nicht ausführlich untersucht, aber sie könnten sich auch lohnen, sie für mögliche Leistungsverbesserungen in meinen Codes zu untersuchen.
