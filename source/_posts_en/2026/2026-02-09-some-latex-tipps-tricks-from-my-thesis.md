---
author: Tim Bernhard
categories:
  - Studies
  - LaTeX
  - Python
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2026/some-latex-tipps-tricks-from-my-thesis
date: 2026-02-09 14:37:23
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: some-latex-tipps-tricks-from-my-thesis
social_image: false
template: post
title: "Some LaTeX Tips & Tricks from my thesis"
translations:
  en: some-latex-tipps-tricks-from-my-thesis
  de: einige-latex-tipps-und-tricks-aus-meiner-dissertation
---

In the following, I will discuss some LaTeX tips and tools that I found useful while writing my Ph.D. thesis. Most of these are small quality-of-life improvements that add up over the course of a long project.

1. **Use version control early**: I used Git to track changes to my LaTeX files. This allowed me to revert experiments, diff structural edits, and keep a clean history of the writing process. For a thesis, the ability to branch (e.g., major restructuring versus proofreading) was invaluable.

2. **Generate figures in multiple sizes (margin/text/wide)**: Most figures were generated with Python/Matplotlib and exported to PGF. I produced each plot in three sizes: margin width, text width, and full width (text plus margin). In the manuscript I then switched between sizes with a single command. This made it easy to balance layout without regenerating figures by hand. PGF also ensures that fonts match the document and math typesetting stays consistent. For this, I used a Python utility package (`pylimer-doctorate-utils`) with a function `saveFigure` that, depending on environment variables, would either save a PNG in one size (for quick iteration) or a PGF in three sizes (for final builds).

3. **Enable TikZ externalization to speed up compilation**: For TikZ-heavy documents, externalization is a requirement. Compiled TikZ figures are cached into a dedicated folder to avoid recompiling them on every build. This dramatically reduces compile time for iterative writing.

4. **Automate glossary, index, and nomenclature builds**: I wired these tools into my build system so they ran automatically. That kept acronyms, symbols, and indexes up-to-date without manual steps. This is especially helpful when you add a new acronym in the middle of a chapter and need to ensure it appears in the glossary consistently.

5. **Use `siunitx` for consistent units and numbers**: I used `siunitx` to standardize units and number formatting. It keeps spacing and font consistent across the document and supports aligned numeric columns in tables. Example: `\SI{10}{\meter\per\second}` renders as “10 m/s”, and the `S` column type aligns decimals in tabular data. I even defined custom units for LAMMPS simulations to keep those consistent (e.g. `\DeclareSIUnit{\taurlx}{\ensuremath{\glssymbol{taurlx}}}` and `\DeclareSIUnit{\ljLength}{\ensuremath{\sigma}}`). Note the use of `\ensuremath` to ensure proper math mode formatting and `\glssymbol` to reference glossary symbols in the first example).

6. **Tables: `booktabs` + `tabularx` (and sometimes CSV import)**: `booktabs` makes tables look professional, while `tabularx` automatically balances column widths. I also imported some tables from CSV files for reproducibility, which avoids hand-copying values and reduces errors, but also speeds up iterations for frequently changing values (e.g. during the final days of writing, new results arrived every few days).

7. **Cross-references with `cleveref`**: `cleveref` simplifies references to figures, tables, and equations and handles pluralization automatically. `\cref{fig:example}` becomes “Figure 1”, and `\cref{fig:a,fig:b}` becomes “Figures 1 and 2”. That consistency is difficult to maintain manually in large documents.

8. **Glossaries for acronyms and symbols**: I used `glossaries` to manage acronyms and symbol lists from a single place. This helped avoid the “did I already define this acronym?” problem and kept symbol definitions consistent across chapters.

9. **Custom LaTeX validation scripts**: I wrote a small validator to enforce consistent spelling and style across the manuscript. It catches issues like inconsistent hyphenation or US/UK spelling, citation placement relative to punctuation, and title casing for sections. This was a low-effort way to prevent subtle inconsistencies from creeping in late in the project.

10. **Equation punctuation and spacing checks**: I added scripts to catch equation punctuation mistakes (e.g., missing commas or periods at the end of display equations) and to flag awkward blank lines around equations. These issues are easy to miss during a fast proofreading pass.

11. **Unicode math and consistent math fonts**: Using a Unicode math font avoids mismatched symbols and ensures that Greek letters and operators are stylistically consistent with the main text. This matters in long documents where subtle font differences become distracting.

12. **Language and hyphenation tuning**: For long technical terms (especially in polymer science), I added custom hyphenation points. This prevents ugly line breaks and improves justification in narrow columns or margin notes.

13. **Better chemical structures**: `chemfig` and `chemformula` made chemical drawings and equations readable and consistent with the thesis typography. I configured global `chemfig` settings (bond widths, spacing, arrow styles) so that all structures share a consistent style instead of being tweaked one by one.

14. **Lightweight document statistics**: I generated chapter- and section-level statistics (word counts, floats, etc.) to track progress and spot unusually dense sections. Automating this was surprisingly motivating during the late stages of writing.
