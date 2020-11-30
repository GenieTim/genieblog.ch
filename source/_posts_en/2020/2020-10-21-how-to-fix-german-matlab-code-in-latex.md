---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2020/how-to-fix-german-matlab-code-in-latex
date: 2020-10-21 10:02:06
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: how-to-fix-german-matlab-code-in-latex
social_image: false
template: post
title: "How to fix german MATLAB code in LaTeX"
translations:
  en: how-to-fix-german-matlab-code-in-latex
  de: wie-man-deutschen-matlab-code-in-latex-repariert

---

If you encounter an error such as, for example (replace "B6 with the character byte that fails for you, e.g. "93)

```
\lst@eaten ->-

Invalid UTF-8 byte sequence "B6
```

here is the reason and fix.

Reason: UTF-8 encoding is not read by listings package. 

Fix: explicitly set the UTF-8 characters to the values readable by LaTeX, such as:

```
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
```

If your are using [mcode.sty](https://ch.mathworks.com/matlabcentral/fileexchange/8015-m-code-latex-package), you can simply add this code. As of today, the relevant lines to change are around line number 239.

