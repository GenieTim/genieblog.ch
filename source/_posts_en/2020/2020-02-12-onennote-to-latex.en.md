---
author: Tim Bernhard
comments: true
date: 2020-02-12 14:20:01+00:00
layout: post
slug: onennote-to-latex
title: Exporting OneNote data to LaTeX format
wordpress_id: 445
categories:
  - LaTeX
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

So, it took a few attempts & steps, but I finally succeeded in exporting some of my lecture notes to LaTeX.
I took them on my Surface device, in OneNote, as that is the easiest & quickest way to "prototype" the notes. Given my experience and all shortcut possibilities, I am faster typing the equations than 
actually writing them out by hand. 
In order to provide my notes to other people for them to edit them, I can use the provided export options 
in the OneNote Windows app: docx, pdf or onnenote again. The first two do not provide a sensible export, since neither allow the editing of equations as it should be possible.

Now, I wanted to export them to LaTeX, as laTeX does provide awesome equation & math capabilities.
Unfortunately, this is not an option available by default. 
And even though the OneNote format is open, 
I did not find a way to decompress the actual OneNote file to access the xml. 

For another project, I already worked with the OneNote API, so I tried to export it with that one. 
No luck either, as the equations are simply not in there.
Finally, one way I found to programatically access the OneNote equations is to use [OneNote online](https://onenote.com): There, you can find the equations as MathML in the HTML source. 
To extract the code from the OneNote webpage, I wrote a small script around [puppeteer](https://pptr.dev/): [check it out](https://github.com/GenieTim/OneNoteExporter)!

This HTML code could then be converted to LaTeX using [pandoc](https://github.com/jgm/pandoc), which actually does support MathML.
Problem is, the exported code looks horrible.
So, what we have to do is clean it up: both the HTML first and the LaTeX afterwards.

In the HTML, you will want to do the following RegEx replacements:

    <script[\s\n]*type="math\/mml"[\s\n]*(id="[a-zA-Z0-9\-]*")>(([\s\S](?!script))*)<\/script> => $2
    <script[\s\n]*type="math\/mml"[\s\n]*>(([\s\S](?!script))*)<\/script> => $1
    <span[\s\n]*class="EquationPlaceholderText"[\s\n]*style="display: none;">\[Equation\][\s\n]*</span>[\n\s]*<span[\n\s]*class="RawEquation"[\n\s]*data-length="[0-9]*"[\n\s]*style="display: none;">[^<]*</span>

Then, you may run the conversion.

The code to convert all html files in a directory (the export dir) could look like this:

    #!/bin/bash

    for f in *.html 
    do
      pandoc -f html -t latex -s --mathjax -o "out/$f.tex" "$f"
    done

Finally, the following RegExs are a few deletions & replacements (notice the `=>`) I found I needed to further improve the output:


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
