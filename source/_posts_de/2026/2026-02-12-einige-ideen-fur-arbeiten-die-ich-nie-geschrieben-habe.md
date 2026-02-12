---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2026/einige-ideen-fur-arbeiten-die-ich-nie-geschrieben-habe
date: 2026-02-12 15:15:06
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: einige-ideen-fur-arbeiten-die-ich-nie-geschrieben-habe
social_image: false
template: post
title: "Einige Ideen für Arbeiten, die ich nie geschrieben habe"
translations:
  en: some-ideas-for-papers-i-never-wrote
  de: einige-ideen-fur-arbeiten-die-ich-nie-geschrieben-habe
---

Ich fürchte, meine akademische Laufbahn ist vorbei, jetzt, wo ich meine Promotion abgeschlossen habe und nicht mehr in einer Forschungsumgebung arbeite.

Dennoch gab es viele Ideen, die es wert sind, untersucht zu werden, oder für die ich jetzt die Werkzeuge, aber nicht die Zeit dafür habe.
Im Folgenden werde ich einige dieser Ideen auflisten, die für andere Forscher im Bereich der Polymerphysik und Materialwissenschaft interessant sein könnten.

1.  **Verschränkungserkennung**: Ich habe meinen eigenen Ansatz zur Erkennung von Verschränkungen in Polymernetzwerken "erfunden". Ich habe angefangen, ihn umzusetzen; Spuren davon findet man in [pylimer-tools](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.609), aber ich habe es nie fertiggestellt. Ich bin neugierig, wie es im Vergleich zum Z1-Code und der TEPPP-Software abschneidet und ob es eine nützliche Alternative zur zufälligen Entanglement-Sampling-Methode sein könnte, die ich für das MEHP Force Balance-Verfahren und die Normal Mode Analysis verwendet habe.
2.  **Relevanz der Verschränkungserkennung**: Da es bereits bestehende Methoden zur Verschränkungserkennung gibt, wäre es interessant zu untersuchen, wie sie sich verhalten, wenn ihre Verschränkungen auf das MEHP-Kraftausgleichverfahren und die Normalmodusanalyse angewendet werden. Schneiden sie besser ab als die von mir verwendete Methode mit zufälliger Verschränkung? Schneiden sie besser ab als die anderen? Sind sie rechnerisch effizient genug, um auf große Systeme angewendet zu werden?
3.  **Unterschied zwischen MD- und MC-Strukturen**: In all meinen Ergebnissen ist klar geworden, dass selbst bei Phantommethoden die Ergebnisse der Strukturen, die aus molekulardynamischen (MD)-Simulationen gewonnen werden, von denen aus Monte-Carlo-(MC)-Simulationen abweichen. Es wäre interessant, den Ursprung dieser Unterschiede zu untersuchen, genau zu verstehen, was sie sind und welche Auswirkungen sie auf die Eigenschaften von Polymernetzwerken haben und/oder wie man diese Unterschiede verhindern kann, z. B. durch Anpassung der Wahrscheinlichkeitsverteilung in der MC-Stichprobe.
4.  **Quervernetzungs-Cut-off in MD-Simulationen**: Beim Erzeugen von Polymernetzwerken in MD-Simulationen beginnt man mit einer Schmelze linearer Ketten und vernetzt sie dann, indem Bindungen zwischen reaktiven Gruppen gebildet werden, die sich innerhalb eines bestimmten Grenzabstands befinden. Diese Grenzdistanz wird oft konsistent mit früheren Veröffentlichungen gewählt, aber mir ist nicht klar, warum und wie sie die resultierende Netzwerkstruktur und -eigenschaften beeinflusst. Es wäre interessant, systematisch den Einfluss des Cut-off-Abstands auf die Netzwerkstruktur zu untersuchen, wie etwa den Schleifenbruch, die hängenden und freien Fraktionen, die Stränglängenverteilung und topologische Eigenschaften. Ich habe ein paar Schmelzstrukturen erzeugt, um das zu untersuchen, aber ich bin nie dazu gekommen.
5.  **Polydispersität und Gleichgewichtsschermodul**: Im MEHP Force Balance-Verfahren habe ich monodisperse Stränglängenverteilungen verwendet. Es wäre interessant zu untersuchen, wie Polydispersität den Gleichgewichtsschermodul beeinflusst. Die Codes existieren, sogar als Beispiele in der [pylimer-tools](https://github.com/GenieTim/pylimer-tools) [Dokumentation](https://genietim.github.io/pylimer-tools/), aber ich habe nie die Puzzleteile für diese Untersuchung zusammengesetzt. Zugegeben, auch weil ich erwarte, dass der Einfluss der Polydispersität auf den Gleichgewichtsschermodul nicht sehr groß und daher nicht besonders interessant ist, aber es könnte dennoch sinnvoll sein, es zur Vollständigkeit zu untersuchen (und weil es eine so leicht hängende Frucht ist).

Und mehr. Ich bin sicher, dass es noch viele weitere Ideen gibt, die ich während meiner Promotion hatte, für die ich keine Zeit hatte und die ich jetzt nicht mehr erinnern werde oder die ich nicht teilen möchte.
Vielleicht aktualisiere ich diesen Beitrag in Zukunft, falls mir noch mehr Ideen einfallen oder ich Zeit finde, einige dieser Ideen selbst zu untersuchen.
