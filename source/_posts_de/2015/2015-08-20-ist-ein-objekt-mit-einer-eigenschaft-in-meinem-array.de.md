---
author: Tim Bernhard
comments: true
date: 2015-08-20 11:00:46+00:00
layout: post
link: http://genieblog.ch/ist-ein-objekt-mit-einer-eigenschaft-in-meinem-array/
slug: ist-ein-objekt-mit-einer-eigenschaft-in-meinem-array
title: Ist ein Objekt mit einer Eigenschaft in meinem Array?
wordpress_id: 211
categories:
  - JavaScript
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Mit folgendem Code können Sie testen, ob ein Objekt in einem Array 'array' eine Eigenschaft 'property' mit dem Wert 'value' hat.
    
    // test if a object located in 'arrray' has a 'property' which equals 'value'
    var isInArray = function (array, property, value) {
           for (var i=0; i < array.length; i++) {
                    if (array[i][property] === value) return true; 
                }
                return false;
    };
