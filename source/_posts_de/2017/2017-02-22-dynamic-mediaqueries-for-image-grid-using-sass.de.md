---
author: Tim Bernhard
comments: true
date: 2017-02-22 17:29:16+00:00
layout: post
link: http://genieblog.ch/dynamic-mediaqueries-for-image-grid-using-sass/
slug: dynamic-mediaqueries-for-image-grid-using-sass
title: Dynamischer grid generiert aus breakpoints
wordpress_id: 316
categories:
  - CSS
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Ich konnte [MediaQueries](https://wiki.selfhtml.org/wiki/CSS/Media_Queries) dynamisch aus [Zurb Foundations](http://foundation.zurb.com/sites/docs/media-queries.html)-Breakpoints für ein Raster mit folgendem [Sass](http://sass-lang.com)-Code generieren:

```scss
    $i: 2;
    @each $s,
    $breakpoint in $breakpoints {
        @media (min-width: $breakpoint) {
            div.grid {
                .element {
                    width: calc(100%/#{$i});
                }
            }
        }
        $i: $i+1;
    }
```

In meinem Fall generiert es die Medienabfragen für alle Breakpoints, die für das Zurb Foundation Framework in den Sass-Array `$breakpoints` definiert sind. Für jeden Haltepunkt erhöht er die Anzahl der in einer Reihe des Gitters angezeigten Elemente, indem er seine Breite einstellt, beginnend mit zwei Elementen für die kleinste Bildschirmbreite. Natürlich muss für das .element die `display` -Eigenschaft auf `inline-block` gesetzt sein.
