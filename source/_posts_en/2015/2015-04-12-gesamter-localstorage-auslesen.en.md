---
author: Tim Bernhard
comments: true
date: 2015-04-12 11:00:34+00:00
layout: post
link: http://genieblog.ch/gesamter-localstorage-auslesen/
slug: gesamter-localstorage-auslesen
title: "Geistesblitz: gesamter localStorage auslesen"
wordpress_id: 160
categories:
  
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

Für eine HTML5 Applikation hatte ich die Idee, einige Elemente im localStorage anstatt zu löschen bloss umzubenennen. Da dies mehrfach geschiehen würde, musste die Umbenennung eindeutig erfolgen, damit die anderen Elemente nicht überschrieben werden. Und was eignet sich für die eindeutige Identifikation besser als die aktuelle Uhrzeit mit Datum, Millisekunden und allem?

Nun gut; die Idee mag zwar gut klingen, aber wie kriegt man das Element eines Tages wieder aus dem Speicher raus? Wie kann ich ein Element mit nahezu zufälligem Schlüssel aufrufen?

Ja, lieber Leser, genau diese Frage habe ich mir gestellt. Bestimmt haben Sie schon nach dem Titel gedacht "Pah, das weiss ich...". Und damit haben Sie natürlich Recht, doch da nach einer kurzen Internetrecherche meinerseits keine Lösungen auffindbar waren, möchte ich hier zwei vorstellen.

Die eine Lösung ist wohl die elegantere: jedes mal wenn man ein neues "Zufallselement" in den Storage schreibt, den entsprechenden Schlüssel in ein Array schreiben, das ebenfalls in den localStorage geschrieben wird. 

Die andere Lösung ist jene, die zum Titel "Geistesblitz" geführt hat. Obwohl die Idee sehr naheliegend ist und ich früher hätte auf die Idee kommen sollen, ist sie mir halt eben als Geistesblitz gekommen. Der entscheidende Gedanke ist dieser: `localStorage` ist ein Objekt wie jedes andere. Also kann man es mit einer einfachen `for`-Schlaufe durchlaufen. Das geht zum Beispiel so, wenn alle Elemente untereinander aufgelistet werden sollen:

    
    <code class="language-javascript">function listItems () {
    	var string = "";
    	for (var key in localStorage) {
    		string += key + ": " + localStorage.getItem(key);
    		string += "<br />";
    	}
    	document.getElementById("target").innerHTML = string;
    }
    
