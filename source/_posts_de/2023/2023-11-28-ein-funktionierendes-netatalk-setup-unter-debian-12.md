---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2023/ein-funktionierendes-netatalk-setup-unter-debian-12
date: 2023-11-28 07:12:24
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: ein-funktionierendes-netatalk-setup-unter-debian-12
social_image: false
template: post
title: "Ein funktionierendes Netatalk-Setup unter Debian 12"
translations:
  en: a-working-netatalk-setup-on-debian-12
  de: ein-funktionierendes-netatalk-setup-unter-debian-12
---

Dies ist ein weiterer der "Notizen für mein zukünftiges Ich"-Posts.

Dieses Wochenende habe ich (abgesehen vom Backen von Weihnachtsplätzchen) Zeit investiert, um meinen Backup-Server von Samba auf Netatalk zu migrieren. Ich hatte besondere Probleme mit der Einrichtung der Konfiguration, so dass die Anmeldung vom Mac aus funktionierte.

Am Ende habe ich die folgenden zwei Schlüsselzutaten gefunden:

*   Installieren Sie eine (unter Debian) Testversion von libcrypt: `sudo apt-get install libgcrypt20-dev/testing` (Stellen Sie sicher, dass die Test-Repositories zu apt hinzugefügt wurden)
*   Verwenden Sie eine funktionierende Konfiguration (`/etc/netatalk/afp.conf`):

```
;
; Netatalk 3.x configuration file
;

[Global]
; Global server settings
 log level = default:warn
 log file = /var/log/afpd.log
 uam list = uams_passwd.so,uams_dhx_passwd.so,uams_dhx2_passwd.so
;,uams_guest.so
; guest account = tim

; [Homes]
; basedir regex = /xxxx

; [My AFP Volume]
; path = /path/to/volume

[MacMini Time Machine Volume]
 path = /home/myuser/backup/netatalk-time-machine
 time machine = yes
 vol size limit = 2500000
 valid users = myuser

```
