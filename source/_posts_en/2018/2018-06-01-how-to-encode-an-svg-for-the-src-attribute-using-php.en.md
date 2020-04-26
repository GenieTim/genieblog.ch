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
social_image: false
extends: _layouts.post
language: en
cover_image: false
---

As SVGs [should preferably](https://css-tricks.com/probably-dont-base64-svg/) not be base64 encoded when setting them on an ``-tag `src`-attribute, the suggested alternative is to URL-encode them.
The standard [PHP `urlencode`](https://php.net/manual/de/function.urlencode.php) function unfortunately is not suitable for this task, as the resulting value is not interpreted by any browser as a valid SVG image.
Instead, the function [`rawurlencode`](https://secure.php.net/manual/de/function.rawurlencode.php) has to be used.
Took me some time to realize.
<!-- codepen does not like being checked for availability -->
<!-- markdown-link-check-disable-next-line -->
As soon as you get this, you can also take over some other optimizations; maybe get inspired by [Taylor Hunt](https://codepen.io/tigt/post/optimizing-svgs-in-data-uris)s 
[mini-svg-uri](https://github.com/tigt/mini-svg-data-uri) to decode some characters manually to improve the overall size.
A final function could possibly look like this:

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
