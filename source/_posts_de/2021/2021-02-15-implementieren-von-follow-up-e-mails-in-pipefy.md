---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2021/implementieren-von-follow-up-e-mails-in-pipefy
date: 2021-02-15 19:34:39
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: implementieren-von-follow-up-e-mails-in-pipefy
social_image: false
template: post
title: "Implementieren von Follow-Up-E-Mails in Pipefy"
translations:
  en: how-to-implement-follow-up-e-mails-in-pipefy
  de: implementieren-von-follow-up-e-mails-in-pipefy

---

[Pipefy](https://www.pipefy.com/) ist ein großartiges Tool, um Ihre Workflows und Projekte zu verwalten.

Ich hatte die Möglichkeit, einige Workflows für einen Kunden von [Bernhard Webstudio](https://www.bernhard-webstudio.ch/?utm_source=genieblog.ch&utm_campaign=Pipefy-follow-up-post) zu implementieren.
Eine Anfrage war, Follow-Up-E-Mails zu haben, d. h. E-Mails, die ein Jahr oder später nach einem erfolgreichen Projekt an den Kunden gesendet werden, um die Kunden zu fragen, ob sie noch zufrieden sind und ob es noch etwas zu helfen gibt.

Natürlich wäre es dank der hervorragenden API von Pipefy einfach gewesen, diese Funktion extern zu implementieren.
Um die Höhe des verwendeten Stacks zu reduzieren, entschied ich mich dagegen und implementierte diese Funktionalität nur in Pipefy.

Das ist überhaupt kein Problem. Es gibt tatsächlich mehr als eine Möglichkeit, dies zu tun.
Der Haupttrick besteht darin, eine Automatisierung zu verwenden, die durch die Verspätetund oder das Ablaufen einer Karte ausgelöst wird. 
Damit können Sie das Versenden von E-Mails zeitlich regeln. 

Die Möglichkeit, eine Karte auszulösen, um abgelaufen zu werden, besteht darin, ein Fälligkeitsdatum festzulegen. 
Sobald das Fälligkeitsdatum erreicht ist (und die Karte noch keine Endphase erreicht hat),
wird die Warnung ausgelöst. 

Der Nachteil ist, dass Sie das Fälligkeitsdatumsfeld nicht für etwas anderes verwenden können und dass die Metrik, wann die Karte fertig ist, nutzlos wird. 
Beide Nachteile können durch die Verwendung einer Proxy-Pipe für die Folgemaßnahmen beseitigt werden (d.h. eine Pipe, in der Sie (automatisch?) eine Karte für jedes Follow-up erstellen, das Sie senden möchten, ausgestattet mit einem Fälligkeitsdatum, einer E-Mail-Adresse des Adressaten und möglicherweise einem Textfeld mit dem Inhalt des E-Mails). 

Der Weg, eine Karte auszulösen, um zu spät zu werden, ist das [Hinzufügen einer SLA](https://help.pipefy.com/en/articles/614604-late-alert) zu einer Phase.
Das hat den Vorteil, dass das Fälligkeitsdatum nicht von etwas anderem genutzt wird.
Der Nachteil ist, dass jede Karte die Phase erreichen muss (und sie möglicherweise nicht verlässt), bis die Warnung ausgelöst wird, da sonst der Countdown gestoppt wird.
Auch das lässt sich mit einer Proxy-Pipe vermeiden.

Wenn Sie schließlich wissen, welchen Trigger Sie verwenden wollen, kann die Automatisierung implementiert werden. 
Die Aktion auf dem Trigger ist das Senden der E-Mail-Vorlage.

Wenn Sie mehrere Follow-ups implementieren möchten, sind die Möglichkeiten:

-   Proxy-Pipe wieder verwenden, wie oben erwähnt: Erstellen Sie einfach mehr als eine angeschlossene Karte in der verbundenen Pipe
-   Mit einem Zähler: Sie können ein Zählerfeld haben (Sie brauchen dieses nicht, wenn Sie dieselbe E-Mail erneut senden möchten), das Sie mit demselben Trigger aktualisieren, der die erste E-Mail auslöst. 
Aktualisieren Sie das Fälligkeitsdatum (wenn Sie den Pfad der abgelaufenen Karte gewählt haben) oder verschieben Sie die Karte hin und her (wenn Sie die späte Warnung verwendet haben), damit der Trigger erneut ausgelöst wird.
Verwenden Sie den Zähler mit Conditionals in der Follow-Up-Versandautomatisierung, um zu entscheiden, welche E-Mail gesendet werden soll.

HINWEIS: Das oben erwähnte "Zählerfeld" ist (noch) keine reale Möglichkeit, da die Formelfelder in Pipefy (noch) nicht verfügbar sind. 
Stattdessen können Sie entweder (a) eine Automatisierung für jedes Inkrement oder (b) die Zeichenfolgenverkettung verwenden. 
Mit anderen Worten eine Automatisierung, die das Feld mit einem eigenen Wert plus einem weiteren Buchstaben, z. B. "+", füllt. 
Auf diese Weise hat das Feld nach dem ersten Durchlauf den Wert "+", nach dem zweiten "++" usw. 
Verwenden Sie dies in der Automatisierung als "gleich zu" Bedingung. Für die fünfte E-Mail wäre z.B. die Bedingung: "{{feld}}" "gleich" "++++".

Hinweis: Dieser Beitrag wurde auch in der Pipefy-Community veröffentlicht (mit einigen Screenshots!). Zu finden in:
[https://community.pipefy.com/tips-and-inspiration-45/product-hacks-implement-follow-up-e-mails-with-pipefy-819](https://community.pipefy.com/tips-and-inspiration-45/product-hacks-implement-follow-up-e-mails-with-pipefy-819)
