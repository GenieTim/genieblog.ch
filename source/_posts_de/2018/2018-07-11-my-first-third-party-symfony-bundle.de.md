---
author: Tim Bernhard
comments: true
date: 2018-07-11 13:45:36+00:00
layout: post
link: http://genieblog.ch/my-first-third-party-symfony-bundle/
slug: my-first-third-party-symfony-bundle
title: Mein erstes Symfony-Bundle als Drittanbietern
wordpress_id: 416
categories:
  - PHP
  - Symfony
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Ich habe mein erstes Open-Source-Symfony-Bundle erstellt: [PlaceholderBundle](https://github.com/BernhardWebstudio/PlaceholderBundle). Es ist eine Abstraktion von [Primitive](https://github.com/fogleman/primitive) und / oder [SQIP](https://github.com/technopagan/sqip/blob/master/README.md) zur Verwendung in einer PHP- bzw.
Symfony-Anwendung.
Auf diese Weise können Sie automatisch nette und anpassungsfähige Platzhalter für Bilder in dem von Ihnen gewünschten Format in Ihrer PHP-Anwendung oder Ihrer Twig-Vorlage generieren.
Informationen zur Verwendung des PlaceholderBundle finden Sie in der [Dokumentation](https://github.com/BernhardWebstudio/PlaceholderBundle/blob/master/README.md). Derzeit müssen die zugrunde liegenden nodejs-Pakete noch separat installiert werden, je nachdem, welche Sie verwenden möchten.
Die Konfiguration ermöglicht die Personalisierung der Platzhalter, soweit die zugrunde liegenden Anwendungen dies zulassen.

Ich werde ein Follow-up darüber schreiben, wie man mit der Entwicklung eines dritten Bundles beginnt, da die Ressourcen dafür meiner Meinung nach eher begrenzt sind.
Ein allgemeiner Tipp ist, vorhandene Bundles zu überprüfen, wie es geht.

