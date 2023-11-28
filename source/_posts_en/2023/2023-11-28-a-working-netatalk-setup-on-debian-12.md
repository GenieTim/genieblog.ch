---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2023/a-working-netatalk-setup-on-debian-12
date: 2023-11-28 07:12:24
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: a-working-netatalk-setup-on-debian-12
social_image: false
template: post
title: "A working Netatalk Setup on Debian 12"
translations:
  en: a-working-netatalk-setup-on-debian-12
  de: ein-funktionierendes-netatalk-setup-unter-debian-12
---

This is one more of the "notes for my future self" posts.

This weekend, I invested time (apart from baking christmas cookies) to migrate my backup server away from Samba to Netatalk. I had particular problems with the setup of the configuration such that the login would work from the Mac.

In the end, I found the following two key incredients:

- Install a (on Debian) testing version of libcrypt: `sudo apt-get install libgcrypt20-dev/testing` (make sure to have the testing repositories added to apt)
- Use a working configuration (`/etc/netatalk/afp.conf`):

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

