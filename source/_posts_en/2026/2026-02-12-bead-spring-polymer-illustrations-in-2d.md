---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2026/bead-spring-polymer-illustrations-in-2d
date: 2026-02-12 15:01:03
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: bead-spring-polymer-illustrations-in-2d
social_image: false
template: post
title: "Bead-Spring Polymer Illustrations in 2D"
translations:
  en: bead-spring-polymer-illustrations-in-2d
  de: perlenfeder-polymer-illustrationen-in-2d
---

During my Ph.D., I frequently used a bead-spring model for polymer networks, which is a coarse-grained representation that captures the essential physics while being computationally efficient.

Over time, we invented new methods to analyze the structure and dynamics of these networks, such as the Normal Mode Analysis for viscoelasticity and the MEHP Force Balance procedure for the equilibrium shear modulus.
In particular, we also came up with a modified MC sampling method to bootstrap a (phantom) polymer network microstructure, as described in the [MEHP Force Balance paper](https://doi.org/10.1021/acspolymersau.5c00036).

To illustrate these methods, and bead-spring models in general, I initially used Adobe Illustrator, Inkscape, Amadine, and/or PowerPoint to create schematic illustrations of polymer network microstructures.
However, when I needed to modify the microstructure, for example because it was too dense or too sparse, or needed space for labels, I had to manually adjust the positions of the beads and springs, which was time-consuming and not very precise. In particular, the springs and their alignment with the beads were difficult and tedious to adjust.

That's why I developed the [polymer-graph-sketcher](https://genietim.github.io/polymer-graph-sketcher/), which is a tool to illustrate bead-spring polymer network microstructures in a more intuitive and efficient way.
Open-source and available as a web app, it allows users to easily create and modify polymer network illustrations by simply dragging and dropping beads and springs, while automatically maintaining the correct alignment.

It is absolutely possible that it feels more comfortable to use for me than for others, and that it is not the best tool for everyone.
However, I found it to be a useful tool for my own work, and I hope it can be helpful for others as well.
In particular, I suggest looking at the [keyboard shortcuts](https://genietim.github.io/polymer-graph-sketcher/documentation.html#keyboard-shortcuts), which can speed up the workflow significantly.
I can generate a new microstructure, modify it, and export it as an SVG file in a few minutes, which is much faster than the manual adjustment process I had before, where it might have taken at least half an hour to create a single illustration, and even more if I needed to modify it later on.

A key feature is the handling of periodic boundary conditions (PBC), which are common in polymer simulations.
The tool allows users to easily visualize and modify microstructures with periodic boundaries, which can be challenging to do manually in traditional illustration software.
If you move a bead across the boundary, it will automatically appear on the other side, and the springs will adjust accordingly, maintaining the correct connectivity and alignment.
This makes it much easier to create accurate illustrations of polymer networks that reflect the periodic nature of the simulations.

For the presentation of my thesis, I even implemented features to create movies of the microstructure, which I used to illustrate the [MC bootstrapping](assets/movies/mc-chain-sampling.mp4), the [MD structure generation](/assets/movies/stop-motion-md-generation.mp4), the [entanglement sampling method](/assets/movies/entanglement-spring-addition.mp4), the [MEHP Force Balance procedure](/assets/movies/force-balance-phantom.mp4) and more.
