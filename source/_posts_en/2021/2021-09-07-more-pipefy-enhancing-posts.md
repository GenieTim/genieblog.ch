---
author: Tim Bernhard
categories:
  - Pipefy
cover_image: false
canonical_url: "https://www.genieblog.ch/blog/en/2021/more-pipefy-enhancing-posts"
date: 2021-09-07 09:34:02
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: more-pipefy-enhancing-posts
social_image: false
template: post
title: "More Pipefy Enhancing Posts"
translations:
  en: more-pipefy-enhancing-posts
  de: weitere-pipefy-enhancing-posts
---As known from other posts, I use [Pipefy](https://app.pipefy.com/) for one of my clients workflows.
Pipefy is a [powerful no-code tool](https://www.g2.com/products/pipefy/reviews/pipefy-review-4774554), that enables the client to easily have an overview over his processes, projects and clients.

Unfortunately, as is the case with all these tools, there are limitations.
Thanks to Pipefy's GraphQL API and the custom apps, it is possibly to mitigate these limitations somewhat.
In the [Pipefy Community](https://community.pipefy.com/), these workarounds can be shared with one another.

I posted earlier posts on there also here, on this blog, but at some point, the posts were not an ideal match anymore.
Therefore, I use this post here to link them.

These posts were:

- [How to change the Pipefy card's labels using automations](https://community.pipefy.com/tips-and-inspiration-45/how-to-change-labels-using-automations-1114)
- [What the limits are of the GraphQL API](https://community.pipefy.com/customs-apps-integrations-75/what-are-the-graphql-api-limits-958)
- [How to send E-Mails with Attachments using the GraphQL API](https://community.pipefy.com/ask-a-question-78/how-do-i-use-an-api-uploaded-file-as-an-e-mail-attachment-using-the-api-983)
- [How to edit your HTML email templates in your favourite HTML Editor](https://community.pipefy.com/tips-and-inspiration-45/how-to-edit-your-html-email-templates-in-your-favourite-html-editor-929)
- [Adding a Field to Multiple Phases at once](https://community.pipefy.com/tips-and-inspiration-45/adding-a-field-to-multiple-phases-at-once-939)

The latter two list features of my Node-Project, [pipefy-enhancer](https://github.com/GenieTim/PipefyEnhancer).

This project (a command line application) has already quite a number of features:

- Add a value to all cards in a phases
- Add a field to every phase in a pipe
- Add a field to every pipe in a phase with a specified name
- Edit E-Mail templates in your favourite HTML editor
- Automatically generate a sort-of documentation of your pipes
- Remove duplicate entries from a Pipefy database
