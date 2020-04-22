---
author: Tim Bernhard
comments: true
date: 2015-08-20 11:00:46+00:00
layout: post
link: http://genieblog.ch/ist-ein-objekt-mit-einer-eigenschaft-in-meinem-array/
slug: ist-ein-objekt-mit-einer-eigenschaft-in-meinem-array
title: Is an Object with a Property in my Array?
wordpress_id: 211
categories:
  - JavaScript
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
---

The following code can be used to test whether an object in an 'array' array has a 'property' property with the value 'value':

```javascript
// test if a object located in 'arrray' has a 'property' which equals 'value'
var isInArray = function (array, property, value) {
        for (var i=0; i < array.length; i++) {
                if (array[i][property] === value) return true; 
            }
            return false;
};
```
