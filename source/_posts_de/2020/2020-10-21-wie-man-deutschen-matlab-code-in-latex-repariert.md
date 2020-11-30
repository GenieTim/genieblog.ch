---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2020/wie-man-deutschen-matlab-code-in-latex-repariert
date: 2020-10-21 10:02:06
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: wie-man-deutschen-matlab-code-in-latex-repariert
social_image: false
template: post
title: "Wie man deutschen MATLAB-Code in LaTeX repariert"
translations:
  en: how-to-fix-german-matlab-code-in-latex
  de: wie-man-deutschen-matlab-code-in-latex-repariert

---

Wenn z. B. ein Fehler auftritt (ersetzen Sie "B6 durch das Für dich fehlfallende Zeichenbyte, z. B. "93)

    \lst@eaten ->-

    Invalid UTF-8 byte sequence "B6

hier ist der Grund und die Lösung.

Grund: DIE UTF-8-Codierung wird nicht von Listings-Paket gelesen. 

Fix: Legen Sie die UTF-8-Zeichen explizit auf die von LaTeX lesbaren Werte fest, z.B.:

    \lstset{%
    		literate=%
    			{~}{{$\neg$}}1 %               \neg, logical not
    			{<=}{{\tiny$\leq$}}1 %         \leq
    			{>=}{{\tiny$\geq$}}1 %         \geq
    			{~=}{{\tiny$\neq$}}1 %         \neq, not equal
    			{delta}{{\tiny$\Delta$}}1 %    \Delta
    			{µ}{{$\mu$}}1 %                \mu
    			% Allow for German characters in lstlistings.
                {Ö}{{\"O}}1
                {Ä}{{\"A}}1
                {Ü}{{\"U}}1
                {ß}{{\ss}}2
                {ü}{{\"u}}1
                {ä}{{\"a}}1
                {ö}{{\"o}}1
                {–}{\textendash}2
                {—}{\textemdash}2
    			{(end)}{\lstbasicfont (end)}{5} % black ``end'' when indexing last vector element
    			{({ }end)}{\lstbasicfont ({ }end)}{6}
    			{(end{ })}{\lstbasicfont (end{ })}{6}
    			{({ }end{ })}{\lstbasicfont ({ }end{ })}{7}
    			{:end}{\lstbasicfont :end}{4}
    			{:{ }end}{\lstbasicfont :{ }end}{5}
    			{end:}{\lstbasicfont end:}{4}
    			{end{ }:}{\lstbasicfont end{ }:}{5}
    			{,end}{\lstbasicfont ,end}{4}
    			{,{ }end}{\lstbasicfont ,{ }end}{5}
    	}

Wenn Sie [mcode.sty](https://ch.mathworks.com/matlabcentral/fileexchange/8015-m-code-latex-package) können Sie diesen Code einfach hinzufügen. 
Zum Zeitpunkt heute sind die relevanten Zeilen, die geändert werden müssen, um die Zeilen-Nummer 239.
