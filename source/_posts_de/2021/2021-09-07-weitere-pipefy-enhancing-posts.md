---
author: Tim Bernhard
categories:
  - Pipefy
cover_image: false
canonical_url: "https://www.genieblog.ch/blog/de/2021/weitere-pipefy-enhancing-posts"
date: 2021-09-07 09:34:02
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: weitere-pipefy-enhancing-posts
social_image: false
template: post
title: "Weitere Pipefy Enhancing Posts"
translations:
  en: more-pipefy-enhancing-posts
  de: weitere-pipefy-enhancing-posts
---Wie aus anderen Beiträgen bekannt, verwende ich [Pipefy](https://app.pipefy.com/) für die Workflows eines meiner Klienten.
Pipefy ist ein [Leistungsstarkes No-Code-Tool](https://www.g2.com/products/pipefy/reviews/pipefy-review-4774554), das es dem Kunden ermöglicht, einen Überblick über seine Prozesse, Projekte und Kunden zu haben.

Leider gibt es, wie bei all diesen Tools, Einschränkungen.
Dank der GraphQL-API von Pipefy und den benutzerdefinierten Apps ist es möglich, diese Einschränkungen etwas zu mildern.
In der [Pipefy Community](https://community.pipefy.com/) können diese Problemumgehungen dann mit anderen Nutzern geteilt werden.

Ich habe frühere Beiträge dort auch hier gepostet, auf diesem Blog, aber irgendwann waren die Beiträge keine ideale Übereinstimmung mehr.
Daher benutze ich diesen Beitrag hier, um sie doch wenigstens zu verlinken.

Diese Beiträge waren:

- [So ändern Sie die Etiketten der Pipefy-Karte mithilfe von Automatisierungen](https://community.pipefy.com/tips-and-inspiration-45/how-to-change-labels-using-automations-1114)
- [Was sind die Grenzen der GraphQL-API](https://community.pipefy.com/customs-apps-integrations-75/what-are-the-graphql-api-limits-958)
- [So versenden Sie E-Mails mit Anhängen mit der GraphQL-API](https://community.pipefy.com/ask-a-question-78/how-do-i-use-an-api-uploaded-file-as-an-e-mail-attachment-using-the-api-983)
- [So bearbeiten Sie Ihre HTML-E-Mail-Vorlagen in Ihrem bevorzugten HTML-Editor](https://community.pipefy.com/tips-and-inspiration-45/how-to-edit-your-html-email-templates-in-your-favourite-html-editor-929)
- [Hinzufügen eines Felds zu mehreren Phasen gleichzeitig](https://community.pipefy.com/tips-and-inspiration-45/adding-a-field-to-multiple-phases-at-once-939)

Die letzten beiden listen Funktionen meines NodeJS-Projekts auf, [Pipefy-Enhancer](https://github.com/GenieTim/PipefyEnhancer).

Dieses Projekt (eine Befehlszeilenanwendung) hat bereits eine ganze Reihe von Funktionen:

- Hinzufügen eines Werts zu allen Karten in einer Phase
- Hinzufügen eines Felds zu jeder Phase in einer Pipe
- Hinzufügen eines Felds zu jeder Pipe in einer Phase mit einem angegebenen Namen
- Bearbeiten Sie E-Mail-Vorlagen in Ihrem bevorzugten HTML-Editor
- Generieren Sie automatisch eine Art Dokumentation Ihrer Rohre
- Entfernen doppelter Einträge aus einer Pipefy-Datenbank
- Ver
