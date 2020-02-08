---
author: adminTim
comments: true
date: 2015-01-12 11:00:30+00:00
excerpt: 'Wenn Sie eine Microsoft PowerPoint Präsentation vorzeigen, so haben Sie
  bestimmt auch schon die Vorteile der Referenztools genossen. Ob die Notizen, der
  Laserpointer oder die Stoppuhr - auch ich bevorzuge diese Ansicht zum präsentieren.
  PowerPoint wechselt dabei, wenn man den Computer an einen Beamer angeschlossen hat,
  von "Die Anzeige duplizieren" auf "Die Anzeige erweitern", so dass der Beamer als
  zweite Anzeige, eben für die Präsentation, dient.


  Durch diesen automatischen Wechsel kann man anschliessend nicht einfach so ein anderes
  Programm wie z. B. einen Browser öffnen und es auf dem Beamer anzeigen. Das verschwert
  bedauerlicherweise das anzeigen von Websites während einer Präsentation. Es gibt
  zum Glück einige Lösungen.'
layout: post
link: http://genieblog.ch/website-in-powerpoint-einbinden/
slug: website-in-powerpoint-einbinden
title: Website in PowerPoint einbinden
wordpress_id: 76
category: Office
tags:
- Browser
- Computer
- Office
- PowerPoint
- Präsentation
- Tutorial
- Website
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
---

Wenn Sie eine Microsoft PowerPoint Präsentation vorzeigen, so haben Sie bestimmt auch schon die Vorteile der Referenztools genossen. Ob die Notizen, der Laserpointer oder die Stoppuhr - auch ich bevorzuge diese Ansicht zum präsentieren. PowerPoint wechselt dabei, wenn man den Computer an einen Beamer angeschlossen hat, von "Die Anzeige duplizieren" auf "Die Anzeige erweitern", so dass der Beamer als zweite Anzeige, eben für die Präsentation, dient.

Durch diesen automatischen Wechsel kann man anschliessend nicht einfach so ein anderes Programm wie z. B. einen Browser öffnen und es auf dem Beamer anzeigen. Das verschwert bedauerlicherweise das anzeigen von Websites während einer Präsentation. Es gibt zum Glück einige Lösungen.



## Lösung #1


Screenshots: lassen Sie durch ein Programm wie z. B. _Softmatic Weblayers_ einen Screenshot einer Website machen und binden Sie diesen wie ein anderes Bild in die Präsentation ein.



## Lösung #2


Wenn sie Ihre Website über https aufrufen können, so können Sie unter _Einfügen_ ->_Apps_ ->_Store_ nach "Web Viewer" suchen und installieren. Das Einfügen funktioniert ganz intuitiv wie mit jedem anderen Element auch.



## Lösung #3


Aktivieren Sie unter den _Optionen_ ->_Menüband anpassen_ die _Entwicklertools_. Nach dem Speichern der Einstellungen öffnen Sie diesen neuen Bereich und klicken dort auf _Weitere Steuerelemente_. Wählen Sie das Element _Microsoft Web Browser_ und platzieren Sie es Ihren Bedürfnissen entsprechend. Doppelklicken Sie auf das Element, um den Code Editor aufzurufen. Ersetzen Sie den Code durch folgende Zeilen:
`Private Sub WebBrowser1_DocumentComplete(ByVal pDisp As Object, URL As Variant)
If URL = "" Then WebBrowser1.Navigate "http://www.genieblog.ch/"
End Sub`
_http://www.genieblog.ch/_ müssen Sie durch die von Ihnen gewählte URL ersetzen. Damit sollte Ihr Frame funktionieren.
**Hinweis**: Wenn folgende Fehlermeldung kommt: "Dieses ActiveX-Steuerelement kann nicht eingefügt werden", konsultieren Sie folgende Support-Seite: [http://support.microsoft.com/kb/2793374/de](http://support.microsoft.com/kb/2793374/de)
