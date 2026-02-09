---
author: Tim Bernhard
categories: Studium, LaTeX, Python
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2026/einige-latex-tipps-und-tricks-aus-meiner-dissertation
date: 2026-02-09 14:37:23
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: einige-latex-tipps-und-tricks-aus-meiner-dissertation
social_image: false
template: post
title: "Einige LaTeX-Tipps und Tricks aus meiner Dissertation"
translations:
  en: some-latex-tipps-tricks-from-my-thesis
  de: einige-latex-tipps-und-tricks-aus-meiner-dissertation
---

Im Folgenden werde ich einige LaTeX-Tipps und Werkzeuge besprechen, die ich beim Schreiben meiner Doktorarbeit nützlich fand. Die meisten davon sind kleine Verbesserungen der Lebensqualität, die sich im Laufe eines langen Projekts summieren.

1.  **Versionskontrolle frühzeitig verwenden**: Ich habe Git verwendet, um Änderungen an meinen LaTeX-Dateien zu verfolgen. Das ermöglichte mir, Experimente rückgängig zu machen, strukturelle Bearbeitungen zu unterscheiden und eine saubere Schreibgeschichte zu führen. Für eine Dissertation war die Möglichkeit zur Verzweigung (z. B. größere Umstrukturierung versus Korrekturlesung) von unschätzbarem Wert.

2.  **Erzeugen Sie Figuren in mehreren Größen (Rand/Text/Breite)**: Die meisten Figuren wurden mit Python/Matplotlib generiert und nach PGF exportiert. Ich habe jedes Diagramm in drei Größen erstellt: Randbreite, Textbreite und volle Breite (Text plus Rand). Im Manuskript habe ich dann mit einem einzigen Befehl zwischen den Größen gewechselt. Dadurch konnte man das Layout einfach ausbalancieren, ohne die Figuren von Hand neu zu regenerieren. PGF stellt außerdem sicher, dass die Schriftarten dem Dokument entsprechen und die mathematische Schriftsetzung konsistent bleibt. Dafür habe ich ein Python-Tool-Paket verwendet (`pylimer-doctorate-utils`) mit einer Funktion `saveFigure`, die je nach Umgebungsvariablen entweder eine PNG in einer Größe (für schnelle Iteration) oder eine PGF in drei Größen (für End-Builds) speichern würden.

3.  **Aktivieren Sie die TikZ-Externalisierung, um die Kompilierung zu beschleunigen**: Für TikZ-lastige Dokumente ist Externalisierung Voraussetzung. Komplizierte TikZ-Figuren werden in einem eigenen Ordner zwischengespeichert, um zu vermeiden, dass sie bei jedem Build neu kompiliert werden. Dies verkürzt die Kompilierungszeit für iteratives Schreiben erheblich.

4.  **Automatisierung von Glossar-, Index- und Nomenklatur-Aufbauten**Ich habe diese Werkzeuge in mein Bausystem eingebaut, damit sie automatisch liefen. Das hielt Akronyme, Symbole und Indizes ohne manuelle Schritte auf dem neuesten Stand. Das ist besonders hilfreich, wenn Sie ein neues Akronym in der Mitte eines Kapitels hinzufügen und sicherstellen müssen, dass es konsequent im Glossar erscheint.

5.  **Verwendung `siunitx` für konsistente Einheiten und Zahlen**: Ich habe benutzt `siunitx` um Einheiten und Zahlenformatierung zu standardisieren. Es hält Abstand und Schriftart im gesamten Dokument konsistent und unterstützt ausgerichtete numerische Spalten in Tabellen. Beispiel: `\SI{10}{\meter\per\second}` rendert als "10 m/s", und die `S` Der Spaltentyp gleicht die Dezimale in tabellarischen Daten aus. Ich habe sogar benutzerdefinierte Einheiten für LAMMPS-Simulationen definiert, um diese konsistent zu halten (z. B. `\DeclareSIUnit{\taurlx}{\ensuremath{\glssymbol{taurlx}}}` und `\DeclareSIUnit{\ljLength}{\ensuremath{\sigma}}`. Beachten Sie die Verwendung von `\ensuremath` um eine korrekte mathematische Formatierung sicherzustellen und `\glssymbol` um im ersten Beispiel auf Glossarsymbole zu verweisen).

6.  **Tabellen: `booktabs` + `tabularx` (und manchmal CSV-Import)**: `booktabs` Tische professionell wirken lassen, während `tabularx` Gleicht automatisch die Spaltenbreiten aus. Ich habe außerdem einige Tabellen aus CSV-Dateien importiert, um reproduzierbar zu sein, was das manuelle Kopieren von Werten vermeidet und Fehler reduziert, aber auch die Iterationen bei häufig ändernden Werten beschleunigt (z. B. wurden in den letzten Tagen des Autorenprojekts alle paar Tage neue Ergebnisse aktualisiert).

7.  **Querverweise mit `cleveref`**: `cleveref` vereinfacht Verweise auf Abbildungen, Tabellen und Gleichungen und übernimmt die Pluralisierung automatisch. `\cref{fig:example}` wird zu "Abbildung 1", und `\cref{fig:a,fig:b}` wird zu "Abbildungen 1 und 2". Diese Konsistenz ist in großen Dokumenten schwer manuell aufrechtzuerhalten.

8.  **Glossare für Akronyme und Symbole**: Ich habe benutzt `glossaries` um Akronyme und Symbollisten von einem einzigen Ort aus zu verwalten. Das half, das Problem "Habe ich dieses Akronym schon definiert?" zu vermeiden und die Symboldefinitionen über die Kapitel hinweg konsistent zu halten.

9.  **Benutzerdefinierte LaTeX-Validierungsskripte**: Ich habe einen kleinen Validator geschrieben, um eine einheitliche Rechtschreibung und einen einheitlichen Stil im Manuskript durchzusetzen. Es erkennt Probleme wie inkonsistente Bindestrich oder US/UK-Rechtschreibung, Zitationsplatzierung in Bezug auf Zeichensetzung und Großbuchstaben der Abschnitte. Dies war eine mühelose Methode, um zu verhindern, dass subtile Inkonsistenzen spät im Projekt auftauchten.

10. **Gleichungs-, Zeichensetzungs- und Abstandskontrollen**: Ich habe Skripte hinzugefügt, um Fehler bei Gleichungspunktion zu erkennen (z. B. fehlende Kommas oder Punkte am Ende von Gleichungen) und um umständliche leere Zeilen um Gleichungen zu markieren. Diese Probleme sind bei einem schnellen Korrekturdurchgang leicht zu übersehen.

11. **Unicode-Mathematik und konsistente Mathematikschriften**: Die Verwendung einer Unicode-Mathematikschrift vermeidet nicht übereinstimmende Symbole und stellt sicher, dass griechische Buchstaben und Operatoren stilistisch mit dem Haupttext übereinstimmen. Das ist bei langen Dokumenten wichtig, in denen subtile Schriftunterschiede störend wirken.

12. **Sprach- und Bindestrich-Abstimmung**: Für lange technische Termine (insbesondere in der Polymerwissenschaft) habe ich benutzerdefinierte Bindestrichpunkte hinzugefügt. Dies verhindert hässliche Zeilenumbrüche und verbessert die Rechtfertigung in schmalen Spalten oder Randnotizen.

13. **Bessere chemische Strukturen**: `chemfig` und `chemformula` er machte chemische Zeichnungen und Gleichungen lesbar und konsistent mit der Typografie der Abschlussarbeit. Ich habe global konfiguriert `chemfig` Einstellungen (Bond-Breiten, Abstand, Pfeilstile), sodass alle Strukturen einen einheitlichen Stil teilen, anstatt einzeln angepasst zu werden.

14. **Statistiken von leichtgewichtigen Dokumenten**: Ich habe Statistiken auf Kapitel- und Abschnittsebene generiert (Wortanzahl, Floats usw.), um den Fortschritt zu verfolgen und ungewöhnlich dichte Abschnitte zu erkennen. Diese Automatisierung war in den späten Schreibphasen überraschend motivierend.
