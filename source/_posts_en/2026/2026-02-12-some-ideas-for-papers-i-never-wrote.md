---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2026/some-ideas-for-papers-i-never-wrote
date: 2026-02-12 15:15:06
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: some-ideas-for-papers-i-never-wrote
social_image: false
template: post
title: "Some ideas for papers I never wrote"
translations:
  en: some-ideas-for-papers-i-never-wrote
  de: einige-ideen-fur-arbeiten-die-ich-nie-geschrieben-habe
---

I fear my academic career is over, now that I have finished my Ph.D. and am no longer in a research environment.

Nonetheless, there were many ideas that are worth investigating, or, for which I now have the tools but not the time to do so.
In the following, I will list some of those ideas, which could be interesting for other researchers in the field of polymer physics and materials science.

1. **Entanglement detection**: I "invented" my own approach to detect entanglements in polymer networks. I started to implement it, you can find traces of it in [pylimer-tools](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.609), but I never finished it. I am curious how it compares to the Z1 code and the TEPPP software, and whether it could be a useful alternative to the random entanglement sampling method I used for the MEHP Force Balance procedure and the Normal Mode Analysis.
2. **Relevance of entanglement detection**: Given that there are already existing entanglement detection methods, it would be interesting to investigate how they do when their entanglements are applied to the MEHP Force Balance procedure and the Normal Mode Analysis. Do they perform better than the random entanglement sampling method I used? Do they perform better than each other? Are they computationally efficient enough to be applied to large systems?
3. **Difference between MD and MC structures**: In all my results, it has become clear that even for phantom methods, the results from the structures obtained from molecular dynamics (MD) simulations differ from those obtained from Monte Carlo (MC) simulations. It would be interesting to investigate the origin of these differences, understand what it is exactly, and their implications for the properties of polymer networks, and/or how to prevent these differences, e.g., by adjusting the probability distribution used in the MC sampling.
4. **Cross-linking cut-off in MD simulations**: When generating polymer networks in MD simulations, one starts with a melt of linear chains and then cross-links them by forming bonds between reactive groups that are within a certain cut-off distance. This cut-off distance is often chosen consistently with previous publications, but it is not clear to me why, and how it affects the resulting network structure and properties. It would be interesting to systematically investigate the effect of the cut-off distance on the network structure, such as the loop fraction, dangling and free fractions, strand-length distribution, and topological properties. I generated a few melt structures, intending to investigate this, but I never got around to it.
5. **Polydispersity and equilibrium shear modulus**: In the MEHP Force Balance procedure, I used monodisperse strand-length distributions. It would be interesting to investigate how polydispersity affects the equilibrium shear modulus. The codes exist, even as examples in the [pylimer-tools](https://github.com/GenieTim/pylimer-tools) [documentation](https://genietim.github.io/pylimer-tools/), but I never put the pieces together to do this investigation. Admittedly also because I expect that the effect of polydispersity on the equilibrium shear modulus is not very large and thus not very interesting, but it could still be worth investigating for completeness (and because it is such a low-hanging fruit).

and more. I am sure there are many more ideas that I had during my Ph.D. that I did not have the time to investigate, and that I will not remember now or don't want to share.
I might update this post in the future if I remember more ideas, or if I find the time to investigate some of these ideas myself.
