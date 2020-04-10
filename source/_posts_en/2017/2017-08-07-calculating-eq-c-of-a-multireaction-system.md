---
author: Tim Bernhard
comments: true
date: 2017-08-07 17:00:00+00:00
layout: post
link: http://genieblog.ch/calculating-eq-c-of-a-multireaction-system
slug: calculating-eq-c-of-a-multireaction-system
title: Calculating equilibrium concentrations of a multi-reaction-system
wordpress_id: 396
categories:
  - Chemistry
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: en
cover_image: false
translations: false
---

If you have given the energies of the states as well as the transition states, or already the equilibrium constants, you can calculate the equilibrium concentrations. The way to go is to use the general formulas for the equilibrium constant <inline-math>K=exp(-E_A/(R \cdot T))</inline-math> (with <inline-math>E_A=E_{Educt} - E_{TransitionState}</inline-math>) and <inline-math>K=C_{Product}/C_{Educt}</inline-math> and apply them.

If you have a system with more than just one reaction, this can become a tedious task very fast to calculate the corresponding equilibrium concentrations. That's when you want another way to go. 
To be precise, you need a program which does it for you. What is has to do in general is to solve a system of equations, with the same number of equations as reactions. 
This can generally be done by using a matrix; here, the matrix will have as many rows as reactions and as many columns as substances which are involved in the reaction stochiometry. 
Apart from the valus in the matrix, this is equivalent to a stochiometric matrix. For the following calculations, we will start with a stochiometric matrix.

The most important step now is to determine the values of the matrix cells. 
You should assert on a piece of paper if the following statements apply to you too. 
<inline-math>m_{ij}</inline-math> is the value of the new, non-stochiometric matrix, wheras <inline-math>n_{ij}</inline-math> is the value of the sotchiometric matrix. <inline-math>K_i</inline-math> is the equilibrium constant for reaction <inline-math>i</inline-math>.

<math>m_{ij} = -1 \cdot  n_{ij} \cdot K_i^{(n_{ij}+1)/2}</math>

<div class="alert">
This only works for stochiometry 1/-1/0 as I did not find a possibility yet to square the concentration. New columns would have to be introduced but the context of e.g. [A] to [A]<sup>2</sup> could no be given :/.

Also, this post was a draft for 3 years, no idea about the context anymore. 
But hey, maybe it helps someone else.
</div>
