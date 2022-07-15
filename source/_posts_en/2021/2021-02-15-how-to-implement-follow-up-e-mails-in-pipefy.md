---
author: Tim Bernhard
categories:
  - Pipefy
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2021/how-to-implement-follow-up-e-mails-in-pipefy
date: 2021-02-15 19:34:39
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: how-to-implement-follow-up-e-mails-in-pipefy
social_image: false
template: post
title: "How to Implement Follow-Up E-Mails in Pipefy"
translations:
  en: how-to-implement-follow-up-e-mails-in-pipefy
  de: implementieren-von-follow-up-e-mails-in-pipefy
---

[Pipefy](https://www.pipefy.com/) is an awesome tool to manage your workflows and projects.

I had the opportunity to implement a few workflows for a client of [Bernhard Webstudio](https://www.bernhard-webstudio.ch/?utm_source=genieblog.ch&utm_campaign=Pipefy-follow-up-post).
One request was to have Follow-Up E-Mails, meaning E-Mails that are sent to the client a year or later after a succesfull project to ask the clients whether they are still satisfied and whether there is something else to help with.

Of course, thanks to Pipefy's excellent API it would have been easy case to implement this feature externally. To reduce the height of the used stack, I decided against it and implemented it in Pipefy alone.

This is not a problem at all. There is actually more than one way to do so.  
The main trick is to use an automation triggered by a card becoming late or expired.  
This is how you can schedule the sending of E-Mails in order for them to be sent when you want them to be.

The way to trigger a card to become _expired_ is to **set a due date**. As soon as the due date is reached (and the card has not yet reached a final phase), the alert will be triggered.

The disadvantage is that you cannot use the due date field for something else. Another disadvantage is, that the metric of when the card finished is rendered useless.  
Both of these disadvantages can be eliminated by using a by-me-called proxy-pipe for the follow-ups. With proxy-pipe, I mean a connected pipe e.g. called “Follow-Up”, which has nothing else to do then managing follow-ups. There, you (automatically?) create a card for each follow-up you want to send, equipped with a due-date [or have an initial phase with an SLA, as seen next], an E-Mail [the recipient] and possibly a text field [the content or a field to decide in a condition which E-Mail to send, in case you have multiple Follow-Up templates].

The way to trigger a card to become _late_ is to **[add a SLA](https://help.pipefy.com/en/articles/625596-set-up-alerts-in-cards#h_a70efccdb4)** to a phase.  
This has the benefit, that the due date is not used by something else.

The disadvantage is, that each card has to reach the phase (and may not leave it) untill the alert is triggered, as otherwise, the countdown is stopped. This means, also hear the metrics of when a card is finished are not very useful. This disadvantage too can be mitigated thanks to the proxy-pipe.

Finally, if you know what trigger to use, the automation can be implemented as seen above.  
The action upon the trigger will be the sending of the E-Mail template.

### Multiple Follow-Ups

If you want to implement multiple follow-ups, the possibilities are:

- using the proxy-pipe again as mentioned above: just create more than one connected card in the follow-up pipe
- using a counter: you can have a counter field (you do not need that one if you want to send the same E-Mail again) which you update with the same trigger that triggers the first E-Mail.

Update the due date (if you chose the path of the expired card) or move the card back and forth (if you used the late alert) in order to have the trigger go off again.  
Use the counter with conditionals in the follow-up sending automation to decide which E-Mail to send.

**NOTE**: the "counter field" mentioned above is not yet a real possibility as formula fields are not yet available in Pipefy.  
Instead, you can either (a) use one automation for each increment, or (b) use string concatenation  
In other words, have an automation that fills the field with its own value plus another letter, e.g. "+".

This way, the field will have value "+" after the first run, "++" after the second, and so on.  
Use this in the automation as an "equal to" condition. E.g. for the fifth E-Mail, the condition would be: {{counter_field}} "equal to" "++++".

Note: this post was also published in the Pipefy Community (with some bonus images!), to be found in:
[https://community.pipefy.com/tips-and-inspiration-45/product-hacks-implement-follow-up-e-mails-with-pipefy-819](https://community.pipefy.com/tips-and-inspiration-45/product-hacks-implement-follow-up-e-mails-with-pipefy-819)
