---
author: Tim Bernhard
categories: LaTeX, Python
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2026/citeauthors-of-multiple-publications-in-latex
date: 2026-02-09 14:45:20
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: citeauthors-of-multiple-publications-in-latex
social_image: false
template: post
title: "Citeauthors of Multiple Publications in LaTeX"
translations:
  en: citeauthors-of-multiple-publications-in-latex
  de: zitatautoren-mehrerer-publications-in-latex
---

Here's a code snippet from my Ph.D. thesis LaTeX document.
It's intention is to use `\citeauthor{}` but with multiple publications, which `\citeauthor{}` does not support.
Additionally, if one author was part of multiple publications, it should not be repeated multiple times.
To achieve this, I wrote a custom command `\citeauthors` that takes a list of citation keys, extracts the unique authors, and formats them in a readable way.

This is the implementation of the `\citeauthors` command (requires `python` and `lualatex`):

```latex
% Create a new citation command that calls a Python script to get deduplicated authors
\usepackage{luacode}
\begin{luacode*}
function citeauthors(keys)
  local pycmd = string.format('python3 citeauthors.py "%s" 2>/dev/null', keys)
  local handle = io.popen(pycmd)
  local result = handle:read("*a")
  local status = handle:close()

  -- Strip trailing whitespace and newlines
  result = result:gsub("^%s+", ""):gsub("%s+$", "")

  -- Only print if result is not empty and command succeeded
  if result ~= "" then
    -- Use catcode -1 to print verbatim (no special char interpretation)
    tex.print(-1, result)
  end
end
\end{luacode*}

\newcommand{\citeauthors}[1]{%
  \directlua{citeauthors("\luaescapestring{#1}")}%
}
```

And the corresponding `citeauthors.py` script that processes the citation keys and extracts unique authors:

```python
#!/usr/bin/env python

import contextlib
import hashlib
import io
import os
import pickle
import sys

import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import author as parse_authors


def get_cache_path(bibfile):
    """Generate cache file path based on bibfile path and modification time."""
    cache_dir = os.path.join(os.path.dirname(bibfile), ".cache")
    os.makedirs(cache_dir, exist_ok=True)

    # Create a unique cache filename based on bibfile path and mtime
    mtime = os.path.getmtime(bibfile)
    cache_key = f"{bibfile}_{mtime}".encode("utf-8")
    cache_hash = hashlib.md5(cache_key).hexdigest()
    return os.path.join(cache_dir, f"bibcache_{cache_hash}.pkl")


def load_bib_database(bibfile):
    """Load bibliography database with caching."""
    cache_path = get_cache_path(bibfile)

    # Try to load from cache
    if os.path.exists(cache_path):
        try:
            with open(cache_path, "rb") as f:
                return pickle.load(f)
        except (pickle.PickleError, EOFError):
            pass  # Cache corrupted, will regenerate

    # Parse the bibfile
    with contextlib.redirect_stderr(io.StringIO()):
        with open(bibfile, encoding="utf-8") as bibtex_file:
            parser = BibTexParser(common_strings=True)
            parser.ignore_nonstandard_types = True
            parser.customization = parse_authors
            bib_database = bibtexparser.load(bibtex_file, parser=parser)

    # Save to cache
    try:
        with open(cache_path, "wb") as f:
            pickle.dump(bib_database, f)
    except (IOError, pickle.PickleError):
        pass  # Failed to cache, but continue

    return bib_database


def get_authors(keys, bibfile):
    """Extract author last names from bibliography entries."""
    bib_database = load_bib_database(bibfile)
    seen = set()
    lastnames = []
    for key in keys:
        entry = next((e for e in bib_database.entries if e.get("ID") == key), None)
        if entry and "author" in entry:
            for a in entry["author"]:
                # Extract last name (assume format: 'Lastname, Firstname' or 'Firstname Lastname')
                if "," in a:
                    lastname = a.split(",")[0].strip()
                else:
                    lastname = a.split()[-1].strip()
                if lastname not in seen:
                    lastnames.append(lastname)
                    seen.add(lastname)
    return lastnames


def format_authors(authors):
    n = len(authors)
    if n == 0:
        return ""
    elif n == 1:
        return authors[0]
    elif n == 2:
        return f"{authors[0]} and {authors[1]}"
    else:
        return f"{', '.join(authors[:-1])}, and {authors[-1]}"


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("")
        sys.exit(0)
    keys = [k.strip() for k in sys.argv[1].split(",") if k.strip()]
    bibfile = os.path.join(os.path.dirname(__file__), "references.bib") # Adjust path as needed
    authors = get_authors(keys, bibfile)
    print(format_authors(authors))

```

Note that the `citeauthors.py` script expects a `references.bib` file in the same directory, which should contain the bibliography entries (modify as needed).
The script uses caching to speed up repeated calls with the same bibliography file.
The package `bibtexparser` is required to parse the `.bib` file, which can be installed via pip (`pip install bibtexparser`).
