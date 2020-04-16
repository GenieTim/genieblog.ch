---
author: Tim Bernhard
comments: true
date: 2019-06-19 16:00:49+00:00
layout: post
link: http://genieblog.ch/estimating-electricity-composition-for-valuability-of-electric-cars/
slug: estimating-electricity-composition-for-valuability-of-electric-cars
title: Estimating Electricity Cleanliness for Valuability of Electric Cars
wordpress_id: 462
categories:
  
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
---

The purpose of this post is to calculate the viable "dirtiness" of electricity for electric cars in order for them to be the better alternative to conventional diesel or petrol powered cars.
It is a justification of my own information bubble as well as an answer to the rightly controversial and refuted article by Buchal, Karl and Sinn ​[[1]](#src-1)​.

Let us note down the assumptions that will be made, respectively what we will neglect:

  * Neglect the construction, transport and sell of the car
  * Start at the point of "customer buys car" with the estimations
  * Neglect CO2 of fracking, refinery, storage and the transport of the fossil fuels
  * Assume electricity is composed of coal and water
  * Assume water energy has zero CO2 emissions
  * Neglect electricity grid construction

As for the data, we will calculate with the car models chosen in said paper: a Tesla Model 3 and a Mercedes C 220 d.
The reference value for the Mercedes is a minimum of 0.134 kg CO2 per Kilometer ​[[2]](#src-2)​. This is the value we will want to maximize the coal proportion to.

As for the Tesla Model 3, we calculate with a reported efficiency of 0.148 kWh per Kilometer ​[[3]](#src-3)​. With a Li-ion battery efficiency of 99 % ​[[4]](#src-4)​, we can safely neglect charge & discharge losses.
Taking the global average of power loss by the power grid of 12 % ​[[5]](#src-5)​, we require 0.168 kWh of produced power per Kilometer.

As for the CO2 production by coal power generation, we assume the worst case, the highest emissions, being by anthracite coal, of 0.354 kg CO2 per kWh (units [converted](https://www.google.com/search?q=0.0002286+Pounds%2FBtu+in+kg%2FkWh)) ​[[6]](#src-6)​. With a proportion of 100 % coal power, our Tesla would be responsible for 0.059 kg CO2 per Kilometer.
This is less than half of the emissions of the Mercedes, for the far-from-true assumption of 100 % of electricity coming from coal.

To summarize, a short calculation over the thumb supports the general impression that electric cars do indeed produce less emissions.
It has to be noted though that quite a few assumptions were made, although most of them seem to cancel out in the direct comparsion.
Also, only the carbon dioxide emissions were regarded, even though this is by no means the only nor a sufficient indicator of the environmental friendliness of an object.
The only thing I might consider in a futher revision of these calculations is the production of the battery of the Tesla, as this is the major difference in the manufacture of the two cars.

Finally, if you find any mistakes in my calculations or have any doubts about my assumptions, do not hesitate to write me an e-mail or leave a comment.

### References

  1. <span id="src-1"></span>C.
Buchal, H.-D.
Karl, and H.-W.
Sinn, “Kohlemotoren, Windmotoren und Dieselmotoren: Was zeigt die CO2-Bilanz?” p. 15.

  2. <span id="src-2"></span>“C-Klasse: T-Modell, Preisliste gültig ab 1. Februar 2019.” Mercedes-Benz Schweiz AG.

  3. <span id="src-3"></span>“Tesla Model 3 Standard Range,” _Electric Vehicle Database_.  [Online]. Available: [https://ev-database.org/car/1060/Tesla-Model-3-Standard-Range](https://ev-database.org/car/1060/Tesla-Model-3-Standard-Range). [Accessed: 19-Jun-2019]

  4. <span id="src-4"></span>“Battery University,” _ BU-104a: Comparing the Battery with Other Power Sources_, 28-Mar-2019.  [Online]. Available: [https://batteryuniversity.com/learn/article/comparing_the_battery_with_other_power_sources](https://batteryuniversity.com/learn/article/comparing_the_battery_with_other_power_sources). [Accessed: 19-Jun-2019]

  5. <span id="src-5"></span>“6. Efficiency and Power Grids,” _Global CCS Institute_.  [Online]. Available: [https://hub.globalccsinstitute.com/publications/energy-efficiency-technologies-overview-report/6-efficiency-and-power-grids](https://hub.globalccsinstitute.com/publications/energy-efficiency-technologies-overview-report/6-efficiency-and-power-grids). [Accessed: 16-Jun-2019]

  6. <span id="src-6"></span>“How much carbon dioxide is produced when different fuels are burned?,” _U.S.
Energy Information Administration_, 04-Jun-2019.  [Online]. Available: [https://www.eia.gov/tools/faqs/faq.php?id=73&t;=11](https://www.eia.gov/tools/faqs/faq.php?id=73&t=11). [Accessed: 19-Jun-2019]
