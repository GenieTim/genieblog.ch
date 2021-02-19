---
author: Tim Bernhard
categories:
  - LAMMPS
  - Chemistry
  - C++
cover_image: 2021/front_cover_extending_lammps.jpg
canonical_url: https://www.genieblog.ch/blog/en/2021/review-of-extending-lammps
date: 2021-02-19 10:02:06
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: review-of-extending-lammps
social_image: false
template: post
title: "Review: Extending and Modifying LAMMPS"
translations:
  en: review-of-extending-lammps
  de: false
---

The full title is quite a mouthfull: "Extending and Modifying LAMMPS —
Writing Your Own Source Code —
A pragmatic guide to extending LAMMPS as per custom simulation requirements",
a book by 
Dr. Shafat Mubin and Jichen Li, published by Packt, with a
Foreword by Dr. Steven Plimpton, lead developer of LAMMPS.
ISBN: 978-1-80056-226-4.

As I myself only looked into the LAMMPS source code to know where errors come from 
([my contribution to LAMMPS](https://github.com/lammps/lammps/pull/2474), some typo-fixes in the documentation, do not count), 
I was indeed curious and hopeful to learn much new things about the innerworkings of LAMMPS. 

I was not disappointed: even though I did not yet have time to verify and apply my new knowledge,
I feel like there were quite a few significant brainstorms.
The book clearly and on a pleasant level explains important bits from the theory to the actual implementation in LAMMPS.
The structure is sensible and helpful if you already know what you want more details for.
When reading the book, you will encounter your favorite LAMMPS commands, be it pair styles, computes or fixes. 
You will get an overview of the chemistry as well as the computational concepts.
The general view into the implementations of LAMMPS are highly valuable and prepare quite well for your own contributions.
Basics of C++ programming are explained as well as some short introductions into concepts of parallel computing. 

The book is not a five-star one though (hard to get to, in my view).
To also add some critisism:
There are a few peculiarities about the book. 
For example the screenshots of code in Notepad++.
Personally, I do not like screenshoted code, especially in an ebook:
not only is it neither searchable nor copy-pasteable, it also does not scale well (you can see pixels! in a book!) and simply does not look all too professional.
There are even tables that are just images, further undermining the seriousness of this book.

On the other hand, the book introduces these complicated topics in just a few pages without much references.
I expect the few pages for some topics to not be sufficient if you are not yet familiar with the concepts.
For a book targeting (and being written by) scientists, I would have expected more references, 
not only as a basis for the presented knowledge, but also as recommendations on where to continue if I want to learn more.

Feel free to pass these critics as high level, as both are not very critical for the book.
Also, to be fair, it is entirely possibly that certain things changed in the meantime, as I got the copy that was handed to me before the actual release.

Finally, to conclude, the book is clearly a good introduction into the LAMMPS source code and architecture.
I would not call it a must-have as it is not detailed enough to be a reference nor basic enough to be a good starting point for developing, 
but with my C++ and high-performance computing background, I certainly learned a lot about the innerworkings of LAMMPS, a tool I use daily for some months now, and am thankful to have encountered this book.

The book can be found e.g. on Amazon here: [https://smile.amazon.com/Extending-Modifying-LAMMPS-Writing-Source-ebook/dp/B08MQ56ZNK/](https://smile.amazon.com/Extending-Modifying-LAMMPS-Writing-Source-ebook/dp/B08MQ56ZNK/)
(not an affiliate link, but a link to Amazon Smile).

## Disclaimer
I was asked to write a review by Packt in exchange for a free copy of the e-book. 
No constraints, changes or other influence on this text were imposed by Packt, 
I had total freedom to write what I considered appropriate.
