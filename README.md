# genieblog.ch

<!-- markdown-link-check-disable -->
[![Staging Current](https://github.com/GenieTim/genieblog.ch/workflows/Publish%20Staging/badge.svg)](https://github.com/GenieTim/genieblog.ch/actions?query=workflow%3A%22Publish+Staging%22)
[![Webmentions Updated](https://github.com/GenieTim/genieblog.ch/workflows/Fetch%20Webmentions/badge.svg)](https://github.com/GenieTim/genieblog.ch/actions?query=workflow%3A%22Fetch+Webmentions%22)
[![Broken Links](https://github.com/GenieTim/genieblog.ch/workflows/Check%20Markdown%20links/badge.svg)](https://github.com/GenieTim/genieblog.ch/actions?query=workflow%3A%22Check+Markdown+links%22)
[![Lighthouse Budget](https://github.com/GenieTim/genieblog.ch/workflows/Lighthouse%20Budget%20Check/badge.svg)](https://github.com/GenieTim/genieblog.ch/actions?query=workflow%3A%22Lighthouse+Budget+Check%22)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGenieTim%2Fgenieblog.ch.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FGenieTim%2Fgenieblog.ch?ref=badge_shield)
<!-- markdown-link-check-enable -->

This is my personal blog.
Just because I can.
And because the domain was available, you know.

[View this blog on its homepage.](https://genieblog.ch/)

## Installation

After downloading/cloning this repository, run the following commands from your project directory:

```bash
composer install
yarn
```

### Adding Content

You can write your content using a [variety of file types](http://jigsaw.tighten.co/docs/content-other-file-types/). 
By default, genieblog.ch expects new posts to be located in the `source/_posts_lan/` folder, where lan is the language shortcut. 
Currently, I support this blog in german (de) as well as english (en).

The top of each content page contains a YAML header that specifies how it should be rendered. 
The `title` attribute is used to dynamically generate HTML `title` and OpenGraph tags for each page. 
The `extends` attribute defines which parent Blade layout this content file will render with 
(e.g. `_layouts.post` will render with `source/_layouts/post.blade.php`), 
and the `section` attribute defines the Blade "section" that expects this content to be placed into it.

Example:

```yaml
---
extends: _layouts.post
section: content
title: Getting Started
date: 2018-12-25
description: Getting started with the Jigsaw blog starter template
cover_image: /assets/img/post-cover-image-2.png
featured: true
---
```

Additional features of the content include mathemathics (powered by [MathJax](http://docs.mathjax.org/en/latest/index.html)), 
which is injected upon finding `<math>` or `<inline-math>`. 
Note that inside these tags, you should use LaTeX.

### Adding Assets

Any assets that need to be compiled (such as JavaScript, Less, or Sass files) can be added to the `source/_assets/` directory, 
and Laravel Mix will process them when running `npm run local` or `npm run production`. 
The processed assets will be stored in `/source/assets/build/` (note there is no underscore on this second `assets` directory).

Then, when Jigsaw builds your site, the entire `/source/assets/` directory containing your built files 
(and any other directories containing static assets, such as images or fonts, that you choose to store there) 
will be copied to the destination build folders (`build_local`, on your local machine).

Files that don't require processing (such as images and fonts) can be added directly to `/source/assets/`.
With my setup though, the images are preprocessed too: they are scaled and compressed.

[Read more about compiling assets in Jigsaw using Laravel Mix.](http://jigsaw.tighten.co/docs/compiling-assets/)

## Building Your Site

Now that you’ve edited your configuration variables and know how to customize your styles and content, let’s build the site.

```bash
# build static files with Jigsaw
./vendor/bin/jigsaw build

# compile assets with Laravel Mix
# options: dev, staging, production
npm run dev
```


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGenieTim%2Fgenieblog.ch.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FGenieTim%2Fgenieblog.ch?ref=badge_large)