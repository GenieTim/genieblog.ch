# genieblog.ch

This is my personal blog. Just because I can. And because the domain was available, you know.

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
