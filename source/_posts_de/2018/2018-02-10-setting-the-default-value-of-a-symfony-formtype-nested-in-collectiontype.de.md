---
author: Tim Bernhard
comments: true
date: 2018-02-10 14:00:49+00:00
layout: post
link: http://genieblog.ch/setting-the-defualt-value-of-a-symfony-formtype-nested-in-collectiontype/
slug: setting-the-defualt-value-of-a-symfony-formtype-nested-in-collectiontype
title: Setting the default value of a Symfony FormType nested in CollectionType
wordpress_id: 328
categories:
  - PHP
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Es gibt einige Möglichkeiten, einen Standardwert zu hacken, um Felder zu bilden. Das Problem wird größer, wenn [`CollectionType`](https://symfony.com/doc/current/reference/forms/types/collection.html) behandelt wird, da die zugrunde liegenden Objekte nicht automatisch erstellt werden. Es gibt zahlreiche Problemumgehungen, z. Setzen Sie einfach [`prototype_data`](https://symfony.com/doc/current/reference/forms/types/collection.html#prototype-data) für den` CollectionType` auf ein instanziiertes Objekt. Leider hat für mich bei der Arbeit mit _nested_ CollectionTypes keines davon funktioniert.

Die einzige Möglichkeit für mich war das Hinzufügen eines [`DataTransformers`](https://symfony.com/doc/current/form/data_transformers.html), der in der Funktion `reverseTransform` prüft, ob das zu transformierende Objekt `is_null`, und setzen Sie es stattdessen auf eine neue Instanz. Die Standardwerte werden dann im Konstruktor des zugrunde liegenden Objekts oder auch in der reverseTransform-Funktion festgelegt, je nach Ihren (Leistungs-) Anforderungen.

Ich hoffe, dass dies eines Tages verbessert wird, aber im Moment ist diese Problemumgehung sehr verständlich, sodass ich nicht daran denken würde, ein Problem oder eine Pull-Anfrage einzureichen oder sogar zu fragen, warum dies notwendig ist. Auf diese Weise habe ich noch mehr Kontrolle über die neuen Objekte.
