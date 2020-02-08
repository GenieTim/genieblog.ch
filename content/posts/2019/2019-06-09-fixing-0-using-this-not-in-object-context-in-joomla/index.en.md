---
author: adminTim
comments: true
date: 2019-06-09 17:20:52+00:00
layout: post
link: http://genieblog.ch/fixing-0-using-this-not-in-object-context-in-joomla/
slug: fixing-0-using-this-not-in-object-context-in-joomla
title: My fix to`0 - Using $this not in object context` in Joomla!
wordpress_id: 445
category: Any
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
---




After migrating, the Joomla! page would not show up. Instead, only the error "_0 - Using $this not in object context_" was showing up. In my case, I was able to fix the issue by replacing – in the code of the template – all `JFactory::getMenu()` with `$application->getMenu()`, where `$application` came from `$application = JFactory::getApplication()`.







Note that this may not be the only possible fix for this error. It highly depends on the code you have. Generally, the errormessage indicates the underlying problem: somewhere in Joomla!s code, there is a `$this` inside a class which – in your code – is used, without the class being instantiated properly. In the case mentioned above, the class is initialized statically. This, because that was valid apparently in elder Joomla! versions. 







To find the source of your problem, I recommend to enable [Joomla! debugging](https://docs.joomla.org/How_to_debug_your_code#Joomla_Logging) as well as [PHP logging](https://stackoverflow.com/questions/845021/how-can-i-get-useful-error-messages-in-php) in order to get the full stack trace and find the origin of the wrongly instantiated class. 



