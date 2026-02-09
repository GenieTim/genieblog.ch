---
author: Tim Bernhard
categories: Studies, Tools, Idea
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2026/tools-i-wanted-to-investigate-during-my-phd-but-did-not
date: 2026-02-09 13:39:45
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: tools-i-wanted-to-investigate-during-my-phd-but-did-not
social_image: false
template: post
title: "Tools I wanted to investigate during my PhD (but did not)"
translations:
  en: tools-i-wanted-to-investigate-during-my-phd-but-did-not
  de: werkzeuge-die-ich-wahrend-meiner-promotion-untersuchen-wollte-aber-nicht-getan-habe
---

I recently finished my Ph.D. in the Materials Department at ETH Zürich.
My research focused on predicting macroscopic polymer properties from network structure and synthesis procedures.
Most of my time was spent on

- molecular dynamics (MD) simulations (such as [these](https://doi.org/10.1021/acs.macromol.3c02544)) to investigate the structure and dynamics of polymer networks,
- and developing new methods to predict macroscopic properties, including [Normal Mode Analysis](https://doi.org/10.1021/acs.macromol.4c01429) for viscoelasticity and the [MEHP Force Balance](https://doi.org/10.1021/acspolymersau.5c00036) procedure for the equilibrium shear modulus,
  as well as writing the [codes](https://doi.org/10.5334/jors.609) to implement these methods and analyze the data.

I had the opportunity to explore many different tools and techniques, including machine learning, to analyze data and make predictions.
However, there were also some that I encountered but did not have the chance to explore in depth. Those are discussed in this post.

Software I never investigated but was interested in

- [Topoly](https://academic.oup.com/bib/article/22/3/bbaa196/5906197): Topoly is a Python package to analyze polymer topology. While I analyzed loop fractions, dangling and free fractions, and strand-length distributions, I did not really explore the topological properties of the networks, which could have been interesting.
- [SWIG](https://www.swig.org/tutorial.html): For the interface between C++ and Python, I used pybind11. Later I heard about SWIG, which seems more general. It could be useful for wrapping my C++ code for other languages as well, such as Java and R, which could broaden the use of the codes I developed.
- [`treedifferencing`](https://github.com/FAU-Inf2/treedifferencing): For papers I wrote myself, I used LaTeX. During revisions, I had to manually specify whether a change was a deletion, an addition, or a modification, which was time-consuming and error-prone. I tried to extend `latexdiff`, then vibe-coded a new tool, but both had limitations. Later I found `treedifferencing`, which could have been a key puzzle piece, and I wish I had discovered it earlier.
- [TEPPP](https://www.elenipanagiotou.com/about-4): I encountered the Topological Entanglement in Polymers, Proteins and Periodic systems (TEPPP) software early in my Ph.D. I was very interested in it as a tool to analyze entanglement in polymer networks, a key factor affecting their properties. I did not explore it in depth and am still curious about its capabilities and applications—especially whether its detected entanglements are as useful as those detected by the Z1 code, and whether both could be applied as alternatives to the random entanglement sampling method I used for the MEHP Force Balance procedure and the Normal Mode Analysis.
- [Custodian](https://materialsproject.github.io/custodian/): When running jobs such as MD simulations on Euler, I had to write scripts to generate inputs, check job status manually, and resubmit failures. I heard about Custodian, which seems like a more robust and user-friendly tool for this purpose.
- [Ginkgo](https://github.com/ginkgo-project/ginkgo): Both the Normal Mode Analysis and the MEHP Force Balance procedure use sparse matrices to represent polymer networks. While I already apply sparse solvers where appropriate, I have not explored Ginkgo, a high-performance library for sparse linear algebra. It could improve performance for large systems.
- Next to Ginkgo, there are many other linear algebra libraries, such as [Armadillo](http://arma.sourceforge.net/), [Eigen](https://eigen.tuxfamily.org/), or a project from [Trilinos](https://trilinos.github.io/index.html). Eigen is what I used for [pylimer-tools](https://github.com/GenieTim/pylimer-tools/). I have not explored the others in depth, but they could also be worth investigating for potential performance improvements in my codes.

