---
author: Tim Bernhard
comments: true
date: 2014-11-25 11:00:38+00:00
layout: post
link: http://genieblog.ch/logarithmen-von-hand-ziehen/
slug: logarithmen-von-hand-ziehen
title: Logarithmen von Hand ziehen
wordpress_id: 14
categories:
  - HTML5
  - JavaScript
  - Computer
  - JavaScript
  - Logarithmus
  - Mathematik
  - Taschenrechner
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Wie zieht ein Taschenrechner den Logarithmus? Dieser Frage möchte ich in diesem Beitrag nachgehen und mit HTML und JavaScript den ersten Schritt eines entsprechenden Logarithmus-Zieher programmieren.


## Von logb() zu lg()


Zuerst lohnt es sich, die Umrechnungsformel zum Zehnerlogarithmus anzusehen: logb(x) = loga(x) / loga(b)
Somit gilt logb(x) = log10(x) / log10(b) und den einzigen Logarithmus, der noch zu ziehen ist, ist der dekadische, auch geschrieben als lg().

Was soll das denn bringen? Den Logarithmus von 10 zu ziehen ist um Welten einfacher, als von den meisten anderen Zahlen. Ausserdem muss man so nur eine Weise einprogrammieren, wie der Logarithmus gezogen werden soll, und nicht für jeden anderen Logarithmus wieder einen eigenen Weg.


## Den Logarithmus von 10 ziehen


Soweit so gut. Damit können wir uns ganz darauf konzentrieren, den Logarithmus von 10 zu ziehen. Beginnen wir zuerst mit dem einfachen Teil: wir erstellen ein Formular, in das der Nutzer seine Zahl eingibt, von der er den 10. Logarithmus gezogen haben will. Da wir nicht auf `Math.log()` oder ähnliches zurückgreifen möchten, werden wir auch auf `Math.pow()` und jQuery verzichten. Dass der Code dadurch nicht mehr so elegant wirkt ist Nebensache - er muss bloss den Zweck erfüllen.
Das könnte folgendermassen aussehen:


    
    <code class="language-markup"><form> 
    <-- Ein Input Feld fur die Zahl, --> 
    <input type="text" id="zahl" size="40" placeholder="Zehnerlogarithmus von..." /> 
    <-- ein Button um die Berechnung zu starten (der losHandler() wird gestartet) da wir das Programm ohne jQuery schreiben, ist es vertretbar, dass wir ein wenig Script im HTML Code verstecken (onclick) und die Trennung von Model, View und Controller missachten --> 
    <input type="button" id="los" value="Los!" onClick="losHandler(); return false;" /> 
    </form>
    <-- und ein Output Paragraph fur das Ergebnis. --> 
    <p id="ergebnis"></p>



Danach schreiben wir den losHandler(). Dieser soll die Nutzereingaben lesen und verwerten können, sowie die wahre Logarithmusfunktion starten.
So kann man das lösen:


    
    <code class="language-javascript">function ausweg(eingabe) {
    /* Wenn der Nutzer eine Zahl kleine als 1 eintippt, sind wir machtlos mit unserer Methode */
    return Math.log(eingabe) / Math.LN10;
    }
    function losHandler() {
    /* für mögliche spätere Versionen die Basis variabel halten */
    var basis = 10;
    /* die Eingabe auslesen */
    var eingabe = document.getElementById("zahl");
    /* den Output Paragraphen vorbereiten */
    var ergebnis = document.getElementById("ergebnis");
    ergebnis.innerHTML = "";
    eingabe = parseFloat(eingabe.value);
    /* Eingaben valieren */
    if (eingabe === null) {
    alert("Keine Eingabe erhalten!");
    }
    /* für verschiedene Browser... (und zur bestimmten Absicherung) */
    else if (eingabe === "") {
    alert("Keine Eingabe erhalten!");
    } else if (eingabe === undefined) {
    alert("Keine Eingabe erhalten!");
    } else if (isNaN(parseInt(eingabe))) {
    alert("Bitte geben Sie nur Zahlen ein!");
    } else if (eingabe < 0) {
    alert("Bitte geben Sie nur Zahlen grösser als Null ein!");
    /* und sonst Resultat ausgeben */
    } else if (eingabe < 1) {
    ergebnis.innerHTML = "log<sub>" + basis + "</sub>" + eingabe + " = " + ausweg(eingabe);
    } else {
    ergebnis.innerHTML = "log<sub>" + basis + "</sub>" + eingabe + " = " + log(eingabe, basis);
    }
    }


Der Ausweg ist nötig, da die von uns geschrieben werdende Funktion nicht imstande sein wird, Eingaben kleiner als 1 zu verarbeiten.
Kommen wir nun also zur Funktion log(), dem Herzstück unseres Kunstwerks, die den Logarithmus zur Basis zehn berechnet:


    
    function log(wert, basis) {
    var zahl = wert;
    var gesucht = "";
    /* eigentliche Rechnung. Gibt den Logarithmus mit 15 Stellen aus */
    for (var i = 0; i < 15; i++) {
    var a; c = 0;
    for (a = 0; zahl >= power(basis, a); a++) {
    c++;
    }
    c = c - 1;
    zahl = zahl / (power(basis, c));
    zahl = power(zahl, basis);
    gesucht += c;
    if (i === 0) {
    gesucht += ".";
    }
    }
    return gesucht.replace("0000000000", "0");
    }



Wir beschränken uns immer nur auf eine Ziffer, genauer: auf die _i-_te Ziffer. Wir zählen dann die temporäre Zahl c in Einerschritten rauf, bis sie grösser ist oder entspricht dem eingegebenen Wert beim ersten Mal, die anderen Male die Eingabe ohne die vordersten_ i_ Ziffern. Die hinteren Ziffern werden jeweils mit `zahl = power(zahl, basis)` nach vorne geschoben.

Und für was steht power()? Das ist unser Ersatz für `Math.pow()`. Ja, zugegeben, diese Namenswahl ist nicht sehr einfallsreich. Dafür zwecksmässig. Die Funktion power() ist nicht sehr schwer und ziemlich selbsterklärend:


    
    function power(basis, exponent) {
    /* damit Potenzgesetze eingehalten werden */
    if (exponent === 0) {
    return 1;
    }
    /* Potenzfunktion */
    else {
    var k = basis;
    for (var u = 1; u < exponent; u++) {
    k = k * basis;
    }
    return k;
    }
    }



Damit ist unser Code komplett. Wenn Unser Code nicht einleuchtend ist, so schreib Deine Frage in die Kommentare.

Teste den Code hier aus:

