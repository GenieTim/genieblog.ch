---
author: Tim Bernhard
categories:
- bash
- Office
- Excel
cover_image: 2021/excel_recent_list.png
canonical_url: "https://www.genieblog.ch/blog/de/2021/reset-der-liste-der-letzten-dokumente-von-microsoft-excel-unter-macos"
date: 2021-09-07 09:47:56
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: reset-der-liste-der-letzten-dokumente-von-microsoft-excel-unter-macos
social_image: false
template: post
title: "Reset der Liste der letzten Dokumente in Microsoft Excel unter MacOS"
translations:
  en: reset-microsoft-excels-recent-documents-list-on-macos
  de: reset-der-liste-der-letzten-dokumente-von-microsoft-excel-unter-macos

---

Dies wird ein kurzer Beitrag sein.
Im Wesentlichen bestand mein Problem darin, dass Excel eine Datei, die ich vor langer Zeit gelöscht habe, in der Liste "Zuletzt verwendete Dokumente" zusammen mit einem Warnsymbol (⚠️) auflistete.
Das Warnsymbol war anklickbar, aber die beiden vorgeschlagenen Optionen, Öffnen oder Löschen, würden nichts beeintigen (auch hier war die Datei bereits gelöscht, also nichts zu öffnen oder zu löschen, außer dem Eintrag in der Liste, der nicht möglich schien).

Also, um es kurz zu halten: Die Liste der zuletzt verwendeten Dokumente kann mit dem folgenden Befehl zurückgesetzt werden:

```bash
rm -rf ~/Library/Containers/com.microsoft.Excel
```
