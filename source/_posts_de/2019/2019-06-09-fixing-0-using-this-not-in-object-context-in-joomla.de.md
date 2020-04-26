---
author: Tim Bernhard
comments: true
date: 2019-06-09 17:20:52+00:00
layout: post
link: http://genieblog.ch/fixing-0-using-this-not-in-object-context-in-joomla/
slug: fixing-0-using-this-not-in-object-context-in-joomla
title: Meine Lösung für `0 - Using $this not in object context` in Joomla!
wordpress_id: 445
categories:
  - Joomla
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: de
cover_image: false
---

Nach der Migration wurde die Joomla! Seite schlichtweg nicht angezeigt.
Stattdessen wurde nur der Fehler "`0 - Using $this not in object context`" angezeigt.
In meinem Fall konnte ich das Problem beheben, indem ich - im Code des Templates - alle `JFactory::getMenu()` durch `$ application->getMenu()` ersetzte, wobei `$application` gesetzt wurde als `$application = JFactory::getApplication()`.

Beachten Sie, dass dies möglicherweise nicht die einzig mögliche Lösung  für diesen Fehler ist.
Es hängt stark von Ihrem Code ab.
Im  Allgemeinen weist die Fehlermeldung auf das zugrunde liegende Problem hin: Irgendwo in Joomla!s (oder Ihrem) Code befindet sich ein `$this` in einer Klasse, die – wohl in Ihrem Code – verwendet wird, ohne dass die Klasse ordnungsgemäss instanziiert wurde.
In dem oben erwähnten Fall zum Beispiel wurde die Klasse statisch initialisiert.
Dies, weil das anscheinend im älteren Joomla! Versionen eine gängige und mögliche Art war.

Um die Ursache Ihres Problems zu finden, empfehle ich, [Joomla!   Debugging](https://docs.joomla.org/How_to_debug_your_code#Joomla_Logging) sowie [PHP-Protokollierung](https://stackoverflow.com/questions/845021/how-can-i-get-useful-error-messages-in-php) zu aktivieren, um den vollständigen Stack-Trace abzurufen und damit den Ursprung der falsch instanziierten Klasse zu ermitteln.

