---
author: adminTim
comments: true
date: 2019-08-02 16:00:30+00:00
layout: post
link: http://genieblog.ch/four-ways-to-align-two-elements-next-to-each-other-in-latex/
slug: four-ways-to-align-two-elements-next-to-each-other-in-latex
title: Four ways to align two elements next to each other in LaTeX
wordpress_id: 451
categories:
  - Allgemein
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---




Natürlich gibt es mehr als nur vier Möglichkeiten, Elemente nebeneinander auszurichten. In diesem Beitrag möchte ich nur die vier Möglichkeiten zusammenfassen, die ich normalerweise nutze:







  * Flowfram
  * Tabelle
  * Spalten
  * Minipage






Beachten Sie, dass der gesamte Code auf das wesentliche reduziert wurde, um die Länge dieses Beitrags zu verringern.







## Flowfram







[Flowfram](https://ctan.org/pkg/flowfram?lang=en) ist ein package, das geladen und konfiguriert werden muss. Im Folgenden werde ich nur die Art und Weise auflisten, wie zwei einfache Bildelemente nebeneinander ausgerichtet werden, obwohl dieses Paket viel mehr Möglichkeiten bietet. Weitere Informationen finden Sie in der [Dokumentation](http://mirrors.ctan.org/macros/latex/contrib/flowfram/flowfram.pdf).






    
    % ...
    usepackage{flowfram}
    
    newflowframe{0.49textwidth}{textheight}{0pt}{0pt}[columnone]
    newflowframe{0.49textwidth}{textheight}{dimexpr2blockwidth+3columnsep}{0pt}[columntwo]
    
    begin{document}
    
    begin{figure}[!h]
        centering includegraphics[width=.25textwidth]{test-white.png}
        caption{Caption}
        label{fig:my_label1}
    end{figure}
    
    pagebreak
    
    begin{figure}[!h]
        centering includegraphics[width=.25textwidth]{test-white.png}
        caption{Caption}
        label{fig:my_label2}
    end{figure}
    
    % ...







## Tabelle







Die gute alte Tabelle ist auch eine Methode, Elemente nebeneinander zu positionieren! Beachten Sie, dass es nicht der Zweck einer Tabellenzelle ist, viel mehr als nur Text zu enthalten. Es könnte also sein, dass Sie zusätzliche [Schwierigkeiten](https://tex.stackexchange.com/questions/53061/insert-image-and-list-inside-a-table) haben, beispielsweise ein Bild oder eine Liste in eine Tabelle einzufügen. Wichtig für die Verwendung als Layout-Tool ist einfach, dass sie die Ränder der Tabellenzellen und Reihen nicht hinzufügen. Das bedeutet einfach, keine "`|`" zwischen den "Float Specifiers" sowie keine `hline` oder ähnliches in der Tabelle platzieren.







Im folgenden Beispiel verwende ich `usepackage{[tabularx](https://ctan.org/pkg/tabularx?lang=de)}`, um beiden Elementen den gleichen horizontalen Raum zu geben.






    
    begin{table}[!h]
        centering
        begin{tabularx}{textwidth}{XX}
            {
               Test links
            } &  {
               Test rechts
            }
        end{tabularx}
    end{table}







## Spalten







Spalten sind der Weg, um längere Teile des Dokuments zu bearbeiten, oder um das gesamte Dokument in zwei Elemente nebeneinander aufzuteilen. Sie können das [multicol](https://ctan.org/pkg/multicol?lang=de)-Paket für eine einfache Lösung verwenden:






    
    usepackage{multicol}
     
    begin{document}
    begin{multicols}{2}
        This text will be split into two columns. 
    end{multicols}







## Minipage







[Minipage](http://www.sascha-frank.com/latex-minipage.html) ist kein separates Paket und sollte automatisch von Ihrer LaTeX-Distribution bereitgestellt sein. Eine minipage ist das, was der Name sagt: eine neue Float-Umgebung, eine neue Seite, aber Mini. Sie können fast alles in eine Miniseite packen und die Größe so anpassen, wie Sie möchten. Folgendermassen richten Sie zwei Miniseiten nebeneinander aus:






    
    begin{figure}[htbp]
    	% minipage mit Text
    	begin{minipage}{0.45textwidth} 
    	Linke Seite
    	end{minipage}
    	% Platz dazwischen füllen
    	hfill
    	% minipage mit Bild
    	begin{minipage}{0.45textwidth}
    	% textwidth bezieht sich in der minipage auf die minipage includegraphics[width=textwidth]{test.png}
    	caption{Ein Bild}
    	label{image} 
    	end{minipage}
    caption{Caption für beide Seiten. Optional.}
    end{figure}







## Was brauche ich wann?







Beantworten Sie die folgenden Fragen, um eine Antwort zu erhalten. Beachten Sie, dass diese Auswahl nur auf meiner aktuellen Meinung und meinem Wissen basiert und daher Änderungen ausgesetzt ist.







Benötigen Sie ein sehr konfigurierbares Spalten-Setup und sind Sie bereit, lange Dokumentationen zu lesen und die Interna eines LaTeX-Pakets kennenzulernen, um dafür die größtmöglichen Möglichkeiten zu erhalten? Verwenden Sie Flowfram.







Müssen die Elemente nicht unbedingt nebeneinander sein, sondern von einem ins andere überlaufen? Verwenden Sie Spalten.







Sind die Elemente, die nebeneinander platziert werden sollen, gleich hoch, benötigen zusammen keine bestimmte Platzierung und sind keine neue Float-Umgebungen? Verwenden Sie eine Tabelle (oder eine `longtable`, wenn ihre Elemente zusammen länger als eine Seite sind).







Wenn Sie all diese Fragen mit Nein beantwortet haben, versuchen Sie es mit einer `minipage`.



