---
author: Tim Bernhard
categories:
- bash
- Office
- Excel
- Note
cover_image: 2021/excel_recent_list.png
canonical_url: https://www.genieblog.ch/blog/en/2021/reset-microsoft-excels-recent-documents-list-on-macos
date: 2021-09-07 09:47:56
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: reset-microsoft-excels-recent-documents-list-on-macos
social_image: false
template: post
title: "Reset Microsoft Excel's Recent Documents List on MacOS "
translations:
  en: reset-microsoft-excels-recent-documents-list-on-macos
  de: reset-der-liste-der-letzten-dokumente-von-microsoft-excel-unter-macos

---

This is going to be a short one. 
In essence, my problem was, that Excel listed a file that I deleted long ago in the "Recent Documents" list, together with an alert symbol (⚠️).
The alert symbol was clickable, but the two suggested options, open or delete, would not do anything (again, the file was already deleted, so nothing to to open or delete there, except for the entry in the list, which did not seem to be possible).

So, to keep it short: the recent documents list can be reset using the following command:

```bash
rm -rf ~/Library/Containers/com.microsoft.Excel
```

