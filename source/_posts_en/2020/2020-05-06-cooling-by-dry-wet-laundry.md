---
author: Tim Bernhard
categories:
  - Back-of-the-envelope calculation
cover_image: 2020/annie-spratt-5TfCI4nj6B4-unsplash.jpg
date: 2020-05-06 17:35:39+00:00
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: cooling-by-dry-wet-laundry
social_image: false
template: post
title: Cooling by drying wet laundry
translations:
  de: abkuhlung-durch-trocknen-nasser-wasche
  en: cooling-by-dry-wet-laundry
---

In this rough calculation it is to be calculated how much
drying wet laundry can lead the house to cool down.
The motivation for the calculation is that a family member
thought that the apartment is feeling significantly colder,
whenever laundry was left for drying.

The following assumptions are made for this:

* 2 L = 2 kg of water from the laundry [[1]](#src-1)
* Initial temperature: 20° C
* Apartment size: 100 m<sup>3</sup>
* Heating water, humidity, change properties neglected by changing temperature: All properties constant at initial conditions
* Heat of vaporization of water 2257 kJ / kg and 40.8 kJ / mol [[2]](#src-2)
* Heat capacity of air: 1005 kJ / (kg * K) [[3]](#src-3)
* Density air: 1.25 kg / m<sup>3</sup>  [[3]](#src-3)

This results in correspondingly
2 kg * 2257 kJ / kg = 4'514 kJ
Energy needed to dry the laundry, providing cooling.
For the cooling of 100 m<sup>3</sup> * 1.25 kg / m<sup>3</sup> = 125 kg air
, this energy leads to an approximate temperature difference of 
4514 kJ / (125 kg * 1005 kJ / (kg * K)) = 0.0359 K per cubic meter of air.

Thus it can be estimated that the cooling with this
Apartment size and uniform heat distribution would not be noticeably.
Without heat distribution, meaning when cooling a single cubic meter, however,
the resulting 3.6 K cooling would probably be very noticeable.

## Sources

1. <span id="src-1"></span>[https://www.welt.de/kmpkt/article158861840/Das-ist-der-schlimmste-Fehler-beim-Waeschetrocknen.html](https://www.welt.de/kmpkt/article158861840/Das-ist-der-schlimmste-Fehler-beim-Waeschetrocknen.html)
2. <span id="src-2"></span>[https://en.wikipedia.org/wiki/Properties_of_water](https://en.wikipedia.org/wiki/Properties_of_water)
3. <span id="src-3"></span>[https://en.wikipedia.org/wiki/Properties_of_water](https://en.wikipedia.org/wiki/Properties_of_water)

Photo by [Annie Spratt](https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=credit) on [Unsplash](https://unsplash.com/s/photos/laundry?utm_source=unsplash&utm_medium=referral&utm_content=credit)
