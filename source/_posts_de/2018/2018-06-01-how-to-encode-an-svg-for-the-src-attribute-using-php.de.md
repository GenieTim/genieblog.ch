---
author: Tim Bernhard
comments: true
date: 2018-06-01 19:44:24+00:00
layout: post
link: http://genieblog.ch/how-to-encode-an-svg-for-the-src-attribute-using-php/
slug: how-to-encode-an-svg-for-the-src-attribute-using-php
title: How to Encode an SVG for the `src`-Attribute using PHP
wordpress_id: 412
categories:
  - PHP
  - Tutorial 
  - image 
  - SVG
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Weil SVGs [besser nicht](https://css-tricks.com/probably-dont-base64-svg/) base64 encodiert sein soll wenn Sie als `<img />`-tag `src`-attribute gesetzt werden sollen, ist die vorgeschlagene Alternative die URL-Codierung. Die Standard [PHP `urlencode`](https://php.net/manual/de/function.urlencode.php) Leider ist es nicht für diese Aufgabe geeignet, da der resultierende Wert von keinem Browser als gültiges SVG-Bild interpretiert wird. Stattdessen muss die Funktion [`rawurlencode`](https://secure.php.net/manual/de/function.rawurlencode.php) verwendet werden. Ich habe einige Zeit gebraucht, um das zu realisieren. Sobald Sie dies verstanden haben, können Sie auch einige andere Optimierungen übernehmen. Vielleicht lassen sie sich inspirieren von [Taylor Hunt](https://codepen.io/tigt/post/optimizing-svgs-in-data-uris)s [mini-svg-uri](https://github.com/tigt/mini-svg-data-uri) um einige Zeichen manuell zu dekodieren, um die Gesamtgröße zu verbessern. Eine abschließende Funktion könnte möglicherweise so aussehen:

```php
function svgUrlEncode($svgPath) {
    $data = \file_get_contents($svgPath);
    $data = \preg_replace('/\v(?:[\v\h]+)/', ' ', $data);
    $data = \str_replace('"', "'", $data);
    $data = \rawurlencode($data);
    // re-decode a few characters understood by browsers to improve compression
    $data = \str_replace('%20', ' ', $data);
    $data = \str_replace('%3D', '=', $data);
    $data = \str_replace('%3A', ':', $data);
    $data = \str_replace('%2F', '/', $data);
    return $data;
}
```
