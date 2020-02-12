---
author: Tim Bernhard
comments: true
date: 2015-01-21 06:30:23+00:00
layout: post
link: http://genieblog.ch/element-mit-css-in-der-mitte-positionieren/
slug: element-mit-css-in-der-mitte-positionieren
title: Element mit CSS in der Mitte positionieren
wordpress_id: 78
categories:
  - CSS
  - Website
  - Browser 
  - HTML5
  - Programmierung
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
translations: false
cover_image: false
---

Um ein Element in der Mitte eines anderen Elements mit CSS zu positionieren muss man unter Umständen etwas improvisieren.

Für die horizontale Mitte ist es keine Schwierigkeiten. Folgendermassen mache ich es jeweils:

    
    .container {
      display: block;
      text-align: center;
      width: 100%;
    }
    
    .child {
      position: relative;
      margin: auto;
    }



Um aber die vertikale Mitte zu erreichen, ist es leider ein wenig schwieriger und vor allem kontextabhängig.

Wenn das Layout aus Tabellen besteht, so reicht `vertical-align : middle;`. Leider funktioniert dies nicht mit anderen Elementen wie zum Beispiel einem `p` in einem `div`.
Diese könnte man per CSS mit 

    
    .container {display: table;}
    
    .child {
        display: table-cell;
        vertical-align: middle;
    }


zu einer Tabelle machen.

Wenn bloss eine einzelne Zeile Text zentriert werden soll, so kann man dies mit `line-height: Irgendwieviele px;` erreichen.

Für block Elemente, die man nicht zu einer Tabelle machen möchte, gibt es noch die Möglichkeit von negativem margin und absoluter positionierung. Das sähe zum Beispiel folgendermassen aus:

    
    .container {
      position: relative;
    }
    
    .child {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 30%;
        width: 50%;
        margin: -15% 0 0 -25%;
    }



Diese Lösungen funktionieren in den meisten Browsern, jedoch leider nicht mit allen HTML Tags. 
Es gibt ausserdem noch weitere Lösungen, mit denen ich jedoch noch keine Erfahrungen gemacht habe. 
Was haben Sie für Erfahrungen gemacht? Welche Lösung bevorzugen Sie? 
Schreiben Sie Ihre Antwort in die Kommentare oder senden Sie sie mir per e-Mail.

Aktualisierung in etwas neueren Jahren: 
Der [Komplette Guide von CSS-Tricks](https://css-tricks.com/centering-css-complete-guide/) ist eine zu empfehlende aktualisierte Version der Antwort auf dieselbe Frage.
