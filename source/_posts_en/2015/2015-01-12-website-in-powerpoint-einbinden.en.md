---
author: Tim Bernhard
comments: true
date: 2015-01-12 11:00:30+00:00
excerpt: >-
  When you present a Microsoft PowerPoint presentation, you have
  already enjoyed the advantages of the reference tools.
  Whether the notes
  the laser pointer or the stopwatch - I also prefer this view
  present.
  PowerPoint changes when you connect the computer to a projector
  from "Duplicate the Ad" to "Extend the Ad",
  so that the beamer serves as a second display, just for the presentation.
  Due to this automatic change, you cannot simply switch to another program such as B.
  open a browser and display it on the projector.
  Unfortunately, this makes it difficult to display websites during a presentation.
  Fortunately, there are some solutions.
layout: post
link: http://genieblog.ch/website-in-powerpoint-einbinden/
slug: website-in-powerpoint-einbinden
title: Embed Website in PowerPoint
wordpress_id: 76
categories:
  - Office
  - Browser 
  - Computer
  - PowerPoint 
  - Presentation 
  - Tutorial 
  - Website
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
---

When you present a Microsoft PowerPoint presentation, you have probably already enjoyed the advantages of the reference tools.
Whether the notes, the laser pointer or the stopwatch - I also prefer this view to present.
When you have connected the computer to a projector, PowerPoint changes from "Duplicate the display" to "Extend the display", so that the projector serves as a second display, just for the presentation.

Due to this automatic change, you cannot simply switch to another program such as B.
open a browser and display it on the projector.
Unfortunately, this makes it difficult to display websites during a presentation.
Fortunately, there are some solutions.

## Solution # 1

Screenshots: let a program such as B. _Softmatic Weblayers_ (or the default tools provided by your OS or Browser) take a screenshot of a website and include it in the presentation like another picture.

## Solution # 2

If you can access your website via https, you can search for "Web Viewer" and install it under _Insert_ -> _Apps_ -> _Store_. The insertion works very intuitively as with any other element.

## Solution # 3

Activate the _Developer Tools_ under the _Options_ -> _ Adjust Ribbon_. After saving the settings, open this new area and click on _Other controls_. Select the element _Microsoft Web Browser_ and place it according to your needs.
Double-click the item to open the Code Editor.
Replace the code with the following lines:
`Private Sub WebBrowser1_DocumentComplete (ByVal pDisp As Object, URL As Variant)
If URL = "" Then WebBrowser1.Navigate "http://www.genieblog.ch/"
End Sub`
_http: //www.genieblog.ch/_ you must replace with the URL you selected.
This should make your frame work.
** Note **: If you get the following error message: "This ActiveX control cannot be inserted", consult the following support page: [http://support.microsoft.com/kb/2793374/de](http://support.microsoft.com/kb/2793374/de)
