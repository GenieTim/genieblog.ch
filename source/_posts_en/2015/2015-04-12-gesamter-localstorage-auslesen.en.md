---
author: Tim Bernhard
comments: true
date: 2015-04-12 11:00:34+00:00
layout: post
link: http://genieblog.ch/gesamter-localstorage-auslesen/
slug: gesamter-localstorage-auslesen
title: "Brainstorm: read the whole localStorage"
wordpress_id: 160
categories:
  - idea
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

For an HTML5 application, I had the idea of ​​just renaming some elements in localStorage instead of deleting them.
Since this would happen several times, the renaming had to be done clearly so that the other elements are not overwritten.
And what is more suitable for unambiguous identification than the current time with date, milliseconds and everything?

Well; the idea may sound good, but how can you get the element out of memory one day? How can I call an element with an almost random key?

Yes, dear reader, that's exactly the question I asked myself.
You probably already thought of the title "Pah, I know that ...". And of course you are right, but since no solutions could be found on my part after a short internet search, I would like to introduce two of them here.

One solution is probably the more elegant one: every time you write a new "random element" in the storage, write the corresponding key in an array, which is also written in the localStorage.

The other solution is the one that led to the title "Brainstorm". Although the idea is very obvious and I should have thought of it earlier, it just came to me as a flash of inspiration.
The key thought is this: `localStorage` is an object like any other.
So you can go through it with a simple `for` loop.
For example, you can do this if you want to list all of the items below each other:

```javascript
function listItems () {
		var string = "";
		for (var key in localStorage) {
			string += key + ": " + localStorage.getItem(key);
			string += "<br />";
		}
		document.getElementById("target").innerHTML = string;
}
```    
