---
author: Tim Bernhard
categories:
  - Windows
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2021/my-path-to-making-my-pc-ready-for-windows-11
date: 2021-10-10 13:10:40
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: my-path-to-making-my-pc-ready-for-windows-11
social_image: false
template: post
title: "My Path to Making My PC Ready for Windows 11"
translations:
  en: my-path-to-making-my-pc-ready-for-windows-11
  de: mein-weg-um-meinen-pc-fur-windows-11-bereit-zu-machen
---

While my self-built PC (my self-reward after passing the basis exams at ETHZ) has quite powerful components, it was not yet ready for Windows 11 according to the PC Integrity Checking Tool.
What was missing was (a) the activation of TPM 2.0, and (b) the activation of secure boot.
In the following, I list the successfull steps I took while omitting most of the miss-steps I took along the way.

The former was easily achieved following in an [online tutorial](https://www.youtube.com/watch?v=U1KRdkVYVhc).
In essence, for my Gigabyte motherboard and Intel CPU, I had to go into the firmware settings, go to "Peripherals" and enable "Intel Platform Trust Technology (PTT)".

The latter required a few more steps: the BIOS mode was yet legacy, the disk used a master boot record (MBR) instead of a GUID Partition Table (GPT).
There are tutorails online on how to [convert mbr to gpt](https://www.youtube.com/watch?v=sT6YEOgGuBc), mainly it is just running the command `mbr2gpt /convert` in an admin command prompt, but I encountered a few roadblocks.
Relevant for you may be the error "Disk layout validation failed for disk".
Looking at the more verbous error in `%windir%/setuperr` and `%windir%/setupact` did not help me.
More by accident I noticed that my System disk in the Diskmanager had a context menu option "Mark as active".
Doing so enabled the `mbr2pgt.exe` tool to run as desired.
At this point though, the BIOS will still be legacy.
This again has to be changed in the firmware settings of the motherboard.
In case of my Gigabyte X299 Aorus Gaming 7, the path to success was "BIOS", "CSM Support" -> disable.
That way, the BIOS will start in the non-legacy mode.
Changing these CSM settings will lead to a new option in the firmware settings to become visible: "Secure Boot".
Enable it in a subsequent restart to finally follow all the requirements of Windows 11.
If you cannot enable the secure boot option because of the entry mode being set to system instead of User, make sure to first reset the firmware security keys to factory defaults.

While these changes were successfull, they also disabled any possiblitiy to boot into my second OS, Kubuntu.
I had used [EasyBCD](https://neosmart.net/EasyBCD/) to achieve the dual boot when the system disk was still using a MBR.
I tried to get the dual boot working again, but instead, I bricked the PC, as it could not boot at all anymore (Error: Boot Configuration Data file does not contain valid information).
The fix herefore was to use a bootable Windows USB stick, as is described e.g. [here](https://www.cnet.com/tech/computing/how-to-create-a-windows-10-bootable-usb-its-easier-than-you-think/).
But, instead of following the steps in all those solutions (e.g. [1](https://neosmart.net/wiki/recovering-windows-bootloader/), [2](https://www.kapilarya.com/fix-the-boot-configuration-data-file-is-missing-some-required-information), [3](https://appuals.com/how-to-fix-failure-when-attempting-to-copy-boot-files/)) that pop up when searching for the error, I had to find my own solution, as those all only apply to MBR devices.
If you do apply those, you might encounter errors like "bootrec /fixboot — access is denied" or "bootrec.exe /rebuildbcd — the system cannot find the path specified".
The solution that finally worked to get Windows to boot again normally was the following commands in the command prompt from the recovery USB:

- `diskmgr`
- `list disk`
- `list vol`
- `exit`
- `bcdboot E:\windows`, where `E` is the letter of the disk I know to have Windows on, observed from the second and third command

Note: I do not yet have a solution for the dual-boot yet.
Also, my processor is actually too old (Intel Gen 7) for Windows 11, even though it is more powerfull than many of the currently sold processors.
But well, this can be easily bypassed by [editing the Windows registry](https://www.theverge.com/22715331/how-to-install-windows-11-unsupported-cpu-intel-amd-registry-regedit).
I hope despite the relative shortness that my solutions help you fix your problems if you came here through a search for the error message.
