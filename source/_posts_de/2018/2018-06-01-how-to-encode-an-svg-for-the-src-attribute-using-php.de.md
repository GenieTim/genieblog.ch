---
author: Tim Bernhard
comments: true
date: 2018-06-01 19:44:24+00:00
layout: post
link: http://genieblog.ch/how-to-encode-an-svg-for-the-src-attribute-using-php/
slug: how-to-encode-an-svg-for-the-src-attribute-using-php
title: Encodieren einer SVG Datei für das `src`-Attribut mit PHP
wordpress_id: 412
categories:
  - PHP
  - Tutorial 
  - image 
  - SVG
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: de
cover_image: false
---

Weil SVGs [besser nicht](https://css-tricks.com/probably-dont-base64-svg/) base64 encodiert sein soll wenn Sie als `<img />`-tag `src`-attribute gesetzt werden sollen, ist die vorgeschlagene Alternative die URL-Codierung.
Die Standard [PHP `urlencode`](https://php.net/manual/de/function.urlencode.php) Leider ist es nicht für diese Aufgabe geeignet, da der resultierende Wert von keinem Browser als gültiges SVG-Bild interpretiert wird.
Stattdessen muss die Funktion [`rawurlencode`](https://secure.php.net/manual/de/function.rawurlencode.php) verwendet werden.
Ich habe einige Zeit gebraucht, um das zu realisieren.
Sobald Sie dies verstanden haben, können Sie auch einige andere Optimierungen übernehmen.
<!-- codepen does not like being checked for availability -->
<!-- markdown-link-check-disable-next-line -->
Vielleicht lassen sie sich inspirieren von [Taylor Hunt](https://codepen.io/tigt/post/optimizing-svgs-in-data-uris)s 
[mini-svg-uri](https://github.com/tigt/mini-svg-data-uri) um einige Zeichen manuell zu dekodieren, um die Gesamtgröße zu verbessern.

Eine abschließende Funktion könnte beispielsweise so aussehen:

```php
function svgUrlEncode($svgPath) {
    // einlesen der Datei
    $data = \file_get_contents($svgPath);
    // encodieren von ersten Charakteren
    $data = \preg_replace('/\v(?:[\v\h]+)/', ' ', $data);
    $data = \str_replace('"', "'", $data);
    $data = \rawurlencode($data);
    // zurück-decodieren gewisser Charakter, die von Browsern verstanden werden, 
    // um die Kompressierung zu verbessern
    $data = \str_replace('%20', ' ', $data);
    $data = \str_replace('%3D', '=', $data);
    $data = \str_replace('%3A', ':', $data);
    $data = \str_replace('%2F', '/', $data);
    return $data;
}
```
