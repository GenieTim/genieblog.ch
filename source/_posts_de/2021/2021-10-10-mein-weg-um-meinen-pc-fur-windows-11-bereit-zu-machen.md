---
author: Tim Bernhard
categories:
  - Windows
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2021/mein-weg-um-meinen-pc-fur-windows-11-bereit-zu-machen
date: 2021-10-10 13:10:40
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: mein-weg-um-meinen-pc-fur-windows-11-bereit-zu-machen
social_image: false
template: post
title: "Mein Weg, um meinen PC für Windows 11 bereit zu machen"
translations:
  en: my-path-to-making-my-pc-ready-for-windows-11
  de: mein-weg-um-meinen-pc-fur-windows-11-bereit-zu-machen
---

Während mein selbstgebaute PC (meine Belohnung für mich selbst für das Bestehen der Basisprüfungen an der ETHZ) über recht leistungsfähige Komponenten verfügt, war er laut PC Integrity Checking Tool noch nicht bereit für Windows 11.
Was fehlte, war (a) die Aktivierung von TPM 2.0 und (b) die Aktivierung von Secure Boot.
Im Folgenden liste ich die erfolgreichen Schritte auf, die ich unternommen habe, um diese Fehler zu beheben, lasse aber die meisten Fehlschritte aus, die ich auf dem Weg gemacht habe.

Die Aktivierung von TPM 2.0 wurde leicht erreicht, indem man in einem [Online-Tutorial](https://www.youtube.com/watch?v=U1KRdkVYVhc).
Im Wesentlichen musste ich für mein Gigabyte-Motherboard und meine Intel-CPU in die Firmware-Einstellungen gehen, zu "Peripheriegeräte" gehen und "Intel Platform Trust Technology (PTT)" aktivieren.

Secure Boot erforderte noch ein paar Schritte: Der BIOS-Modus war noch legacy, die Festplatte verwendete einen Master Boot Record (MBR) anstelle einer GUID-Partitionstabelle (GPT).
Es gibt Tutorails online, wie man [MBR in GPT konvertieren](;myself-builtPChasquitepowerfulcomponents,itwasnotyetreadyforWindows11accordingtothePCIntegrityCheckingTool.WhatwasmissingwastheactivationofTPM2.0,andtheactivationofsecureboot.Inthefollowing,IlistthesuccessfullstepsItookwhileomittingmostofthemiss-stepsItookalongtheway.Theformerwaseasilyachievedfollowinginanonlinetutorialhttpshttps://www.youtube.com/watch?v=sT6YEOgGuBc), hauptsächlich läuft nur der Befehl `mbr2gpt /convert` in einer Admin-Eingabeaufforderung, aber ich bin auf ein paar Hindernisse gestoßen.
Relevant für Sie kann der Fehler "Disk layout validation failed for disk" sein.
Betrachten Sie den verblicheren Fehler in `%windir%/setuperr` und `%windir%/setupact` hat mir nicht geholfen.
Mehr zufällig bemerkte ich, dass meine Systemfestplatte im Diskmanager einen Kontextmenüpunkt "Als aktiv markieren" hatte.
Auf diese Weise wurde die `mbr2pgt.exe` -Tool, um wie gewünscht auszuführen.
Zu diesem Zeitpunkt wird das BIOS jedoch noch ein Vermächtnis sein.
Dies muss wiederum in den Firmware-Einstellungen des Mainboards geändert werden.
Bei meinem Gigabyte X299 Aorus Gaming 7 war der Weg zum Erfolg "BIOS", "CSM Support" -> deaktivieren.
Auf diese Weise wird das BIOS im Nicht-Legacy-Modus gestartet.
Wenn Sie diese CSM-Einstellungen ändern, wird eine neue Option in den Firmware-Einstellungen sichtbar: "Secure Boot".
Aktivieren Sie es bei einem anschließenden Neustart, um endlich alle Anforderungen von Windows 11 zu erfüllen.
Wenn Sie die Option für den sicheren Start nicht aktivieren können, weil der Eingabemodus auf System statt Benutzer eingestellt ist, stellen Sie sicher, dass Sie zuerst die Firmware-Sicherheitsschlüssel auf die Werkseinstellungen zurücksetzen.

Während diese Änderungen erfolgreich waren, deaktivierten sie auch jede Möglichkeit, in mein zweites Betriebssystem, Kubuntu, zu booten.
Ich hatte [EasyBCD](;https://neosmart.net/EasyBCD/) verwendet, um den Dual-Boot zu erreichen, als die Systemfestplatte noch einen MBR verwendete.
Ich habe versucht, den Dual-Boot wieder zum Laufen zu bringen, aber stattdessen hat es dazu geführt, dass der PC überhaupt nicht mehr booten konnte (Fehler: Boot Configuration Data File enthält keine gültigen Informationen).
Der Fix hierfür war die Verwendung eines bootfähigen Windows-USB-Sticks, wie z. [hier](;https://www.cnet.com/tech/computing/how-to-create-a-windows-10-bootable-usb-its-easier-than-you-think/) beschrieben.
Anstatt jedoch den Schritten in all den Online-Lösungen zu diesem Problem zu folgen (z. [1](https://neosmart.net/wiki/recovering-windows-bootloader/), [2](https://www.kapilarya.com/fix-the-boot-configuration-data-file-is-missing-some-required-information), [3](https://appuals.com/how-to-fix-failure-when-attempting-to-copy-boot-files/)), die bei der Suche nach dem Fehler auftauchen, musste ich meine eigene Lösung finden, da die gelisteten Wege alle nur für MBR-Festplatten gelten.
Wenn Sie diese anwenden, können Fehler wie "bootrec /fixboot — Zugriff verweigert" oder "bootrec.exe /rebuildbcd — das System kann den angegebenen Pfad nicht finden" auftreten.
Die Lösung, die schließlich funktionierte, um Windows wieder normal zum Booten zu bringen, waren die folgenden Befehle in der Eingabeaufforderung vom Wiederherstellungs-USB:

- `diskmgr`
- `list disk`
- `list vol`
- `exit`
- `bcdboot E:\windows`, wobei `E` der Buchstabe ist derjenigen Festplatte, von der ich weiß, dass Windows sich darauf befindet, gesehen dank dem zweiten und dritten Befehl

Hinweis: Ich habe jedoch leider noch keine Lösung für den Dual-Boot.
Außerdem ist mein Prozessor eigentlich zu alt (Intel Gen 7) für Windows 11, obwohl er leistungsfähiger ist als viele der derzeit verkauften Prozessoren.
Aber nun, das kann leicht umgangen werden durch [Bearbeiten der Windows-Registrierung](;https://www.theverge.com/22715331/how-to-install-windows-11-unsupported-cpu-intel-amd-registry-regedit).
Ich hoffe trotz der relativen Kürze, dass meine Lösungen Ihnen helfen, Ihre Probleme zu beheben, wenn Sie durch eine Suche nach der Fehlermeldung hierher gekommen sind.
