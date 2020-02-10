---
author: adminTim
comments: true
date: 2017-02-22 17:29:16+00:00
layout: post
link: http://genieblog.ch/dynamic-mediaqueries-for-image-grid-using-sass/
slug: dynamic-mediaqueries-for-image-grid-using-sass
title: Dynamic grid from breakpoints
wordpress_id: 316
categories:
  - CSS
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

I dynamically generate [MediaQueries](https://wiki.selfhtml.org/wiki/CSS/Media_Queries) from [Zurb Foundation](http://foundation.zurb.com/sites/docs/media-queries.html) breakpoints for a grid with the following [Sass](http://sass-lang.com) code:

    
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


In my case, it generates the media queries for all breakpoints defined for the Zurb Foundation Framework in the Sass array `$breakpoints`. For each breakpoint, it increases the number of elements displayed in a row of the grid by adjusting its width, starting with two elements for the smallest screen width. Of course, for the .element, the `display` property must be set to `inline-block`.
