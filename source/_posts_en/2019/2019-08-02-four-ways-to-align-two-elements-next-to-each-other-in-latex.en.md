---
author: Tim Bernhard
comments: true
date: 2019-08-02 16:00:30+00:00
layout: post
link: http://genieblog.ch/four-ways-to-align-two-elements-next-to-each-other-in-latex/
slug: four-ways-to-align-two-elements-next-to-each-other-in-latex
title: Four ways to align two elements next to each other in LaTeX
wordpress_id: 451
categories:
  - LaTeX
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
---

Of course there are more than four ways to do layout like aligning elements next to each other.
In this post, I want to summarize the four ways I tend to use:

  * Flowfram
  * Table
  * Column
  * Minipage

Note that all code is stripped in order to reduce the length of this post. 

## Flowfram

[Flowfram](https://ctan.org/pkg/flowfram?lang=en) is a package which has to be included and configured.
In the following, I will only list the way how to align two simple image elements next to each other, even though this package provides much more possibilities.
Please refer to the [documentation](http://mirrors.ctan.org/macros/latex/contrib/flowfram/flowfram.pdf) for more informations.

```tex
% ...
\usepackage{flowfram}

\newflowframe{0.49textwidth}{textheight}{0pt}{0pt}[columnone]
\newflowframe{0.49textwidth}{textheight}{dimexpr2blockwidth+3columnsep}{0pt}[columntwo]

\begin{document}

\begin{figure}[!h]
    \centering \includegraphics[width=.25textwidth]{test-white.png}
    \caption{Caption}
    \label{fig:my_label1}
\end{figure}

\pagebreak

\begin{figure}[!h]
    \centering \includegraphics[width=.25textwidth]{test-white.png}
    \caption{Caption}
    \label{fig:my_label2}
\end{figure}

% ...
```

## Table

Good old Table is a method of aligning items too! Note that it is not the intended purpose of a table cell to contain much more than only text, so you might find additional [difficulties](https://tex.stackexchange.com/questions/53061/insert-image-and-list-inside-a-table) inserting an image or a list inside a table.
Important for use as a layout tool is not to add the borders of the table cells and rows.
That means no "|" between the float specifiers as well as no `\hline` or similar in the table.

In the following example, I `\usepackage{[tabularx](https://ctan.org/pkg/tabularx?lang=en)}` in order to get both items the same horizontal space.

```tex
\begin{table}[!h]
    \centering
    \begin{tabularx}{textwidth}{XX}
        {
            Test left
        } &  {
            Test right
        }
    \end{tabularx}
\end{table}
```

## Column

Columns are the way to go for longer parts of the document, or if you even want the whole document splitted into two elements next to each other.
You may use the [multicol](https://ctan.org/pkg/multicol?lang=en) package for a simple solution:

    
```tex
\usepackage{multicol}
    
\begin{document}
\begin{multicols}{2}
    This text will be split into two columns. 
\end{multicols}
```

## Minipage

[Minipage](http://www.sascha-frank.com/latex-minipage.html) is not a package and should be provided automatically by your LaTeX distribution.
A minipage is what its name says: a new float environment, a new page, but mini.
You can wrap nearly anything inside a minipage and size it the way you want.
To align two minipages next to each other, you could do so:


```tex
\begin{figure}[htbp]
    % minipage with text
    \begin{minipage}{0.45textwidth} 
    Left hand side
    \end{minipage}
    % Fill the space in between
    \hfill
    % minipage with image
    \begin{minipage}{0.45textwidth}
    % textwidth is defined by the minipage, inside here includegraphics[width=textwidth]{test.png}
    \caption{An image}
    \label{image} 
    \end{minipage}
\caption{Caption of both sides.
Optional.}
\end{figure}
```

## What to use when?

Answer the following questions to get to a result.
Note that this selection is only based on my current opinion and knowledge and therefore up for changes and challenges.

Do you need a rather configurable column setup and are you ready to read long documentations and learn about internals of a LaTeX package in order to get the most possibilities? Use Flowfram.

Do you need the elements not necessarily to be next to each other but to overflow from one to the other? Use columns.

Are the elements to be placed next to each other the same height, together do not need a specific placement and are not so much new float environments? Use a table (or longtable if longer than one page).

If you answered all these questions above with no, try minipage. 

