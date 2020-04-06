---
author: Tim Bernhard
comments: true
date: 2020-02-12 14:20:01+00:00
layout: post
slug: onennote-to-latex
title: Export von OneNote Daten in das LaTeX Format
wordpress_id: 445
categories:
  - LaTeX
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Es dauerte ein paar Versuche und Schritte, aber es gelang mir schließlich, einige meiner Vorlesungsnotizen nach LaTeX zu exportieren.
Ich habe sie in OneNote auf meinem Surface-Gerät aufgenommen, da dies der einfachste und schnellste Weg ist, die Notizen zu "prototypisieren". Aufgrund meiner Erfahrung und aller Verknüpfungsmöglichkeiten schreibe ich die Gleichungen schneller als
schreiben sie tatsächlich von Hand aus.
Um meine Notizen anderen Personen zur Bearbeitung zur Verfügung zu stellen, kann ich die bereitgestellten Exportoptionen verwenden
in der OneNote-Windows-App: docx, pdf oder erneut onnenote. Die ersten beiden bieten keinen sinnvollen Export, da sie auch nicht das Editieren von Gleichungen ermöglichen, wie es möglich sein sollte.

Jetzt wollte ich sie nach LaTeX exportieren, da laTeX fantastische Gleichungs- und Rechenfunktionen bietet.
Leider ist diese Option nicht standardmäßig verfügbar.
Und obwohl das OneNote-Format geöffnet ist,
Ich habe keine Möglichkeit gefunden, die aktuelle OneNote-Datei zu dekomprimieren, um auf die XML-Datei zuzugreifen.

Bei einem anderen Projekt habe ich bereits mit der OneNote-API gearbeitet, also habe ich versucht, sie mit dieser zu exportieren.
Kein Glück, da die Gleichungen einfach nicht drin sind.
Eine Möglichkeit, programmgesteuert auf die OneNote-Gleichungen zuzugreifen, ist die Verwendung von [OneNote online] (https://onenote.com): Dort finden Sie die Gleichungen als MathML in der HTML-Quelle.
Um den Code von der OneNote-Webseite zu extrahieren, habe ich ein kleines Skript um [puppeteer] (https://pptr.dev/) geschrieben: [check it out] (https://github.com/GenieTim/OneNoteExporter)!

Dieser HTML-Code könnte dann mithilfe von [pandoc] (https://github.com/jgm/pandoc), das tatsächlich MathML unterstützt, in LaTeX konvertiert werden.
Das Problem ist, dass der exportierte Code schrecklich aussieht.
Was wir also tun müssen, ist aufzuräumen: sowohl das HTML zuerst als auch das LaTeX danach.

Im HTML-Code möchten Sie die folgenden RegEx-Ersetzungen vornehmen:

    <script[\s\n]*type="math\/mml"[\s\n]*(id="[a-zA-Z0-9\-]*")>(([\s\S](?!script))*)<\/script> => $2
    <script[\s\n]*type="math\/mml"[\s\n]*>(([\s\S](?!script))*)<\/script> => $1
    <span[\s\n]*class="EquationPlaceholderText"[\s\n]*style="display: none;">\[Equation\][\s\n]*</span>[\n\s]*<span[\n\s]*class="RawEquation"[\n\s]*data-length="[0-9]*"[\n\s]*style="display: none;">[^<]*</span>

Anschließend können Sie die Konvertierung ausführen.

Der Code zum Konvertieren aller HTML-Dateien in einem Verzeichnis (das Exportverzeichnis) könnte folgendermaßen aussehen:

    #!/bin/bash

    for f in *.html 
    do
      pandoc -f html -t latex -s --mathjax -o "out/$f.tex" "$f"
    done

Schließlich sind die folgenden RegExs ein paar Lösch- und Ersetzungsschritte (beachten Sie das `=>`), die ich gefunden habe, um die Ausgabe weiter zu verbessern:

    \\textenglish\[variant=[a-z]*\]\{\{\}\}\{~\}
    \\textenglish\[variant=[a-z]*\]\{\}\{~\}
    \\textenglish\[variant=[a-z]*\]\{\{([\S ]*[\n]*[\S ]*)\}\}\{~\} => \n$1
    \\textenglish\[variant=[a-z]*\]\{\{([\S ]*[\n]*[\S ]*)\}\} => \n$1
    \\textenglish\[variant=[a-z]\]\n\n
    \{\}\{\{\{\[\}Equation\{\]\}\}\{[\S\\ ]*\}\{\{\} \}\}
    \{\{\{\[\}Equation\{\]\}\}\{[\S\\ ]*\}\{\{\} \}\}
    \{\{\{\[\}Equation\{\]\}\}\{[\S\\ ]*\n[\S\\ ]*\}\{\{\} \}\}
    \{\}\{\{\{\[\}Equation\{\]\}\}\{[\S\\ ]*\}\{\{\}[\s\n]*\}\}
    \}\}\{\{\{\[\}Equation\{\]\}\}\{[\S ]*\}\{\{\}
    \{\}\{\{\{\[\}Equation\{\]\}\}\{[\S ]*\n*[\S ]\}\{\{\}[ \n]*\}\}
    ^[\s]*\{[\s\{\}~]+$
    \{\}\{~\}
    ^[\s]*\{\}[\s]*$
    ^[\{\}\s]*$
    ^\n\n*$ => \n
    \\protect\\hypertarget\{MathJax-Element-[0-9]*-Frame\}\{\}\{\n\\protect\\hypertarget\{[\S]*\n\}
      \\protect\\hypertarget\{MathJax-Element-[0-9]*-Frame\}\{\}\{\n  \\protect\\hypertarget\{[\S ]*\n  \}
