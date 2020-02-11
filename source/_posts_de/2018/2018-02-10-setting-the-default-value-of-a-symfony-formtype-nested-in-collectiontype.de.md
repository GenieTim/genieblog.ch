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

There are a few proposed ways to hack a default value to form fields. The problen gets bigger when handling [`CollectionType`](https://symfony.com/doc/current/reference/forms/types/collection.html)s, as the underlying objects don't get constructed automatically. Workarounds are numerous, e.g. simply setting [`prototype_data`](https://symfony.com/doc/current/reference/forms/types/collection.html#prototype-data) on the `CollectionType` to an instantiated object. Unfortunately, for me, not one of these worked out when working with _nested_ CollectionTypes. 

The only way that worked out for me was adding a [`DataTransformer`](https://symfony.com/doc/current/form/data_transformers.html) which checks in the `reverseTransform` function whether the object to transform is `null`, and if, set it to a new instance instead. The default values are than set in the constructor of the underlying object or in the reverseTransform function too, depending on your (performance) needs. 

I sure hope this gets improved one day, but for now, this workaround is very comprehensible so I would not think about submitting an issue or pull request or even ask why this is necessary. This way, I even have more control over the new objects.
