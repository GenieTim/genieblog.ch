---
author: Tim Bernhard
categories:
  - Genieblog
cover_image: 2020/christian-englmeier-J7EUjSlNQtg-unsplash.jpg
date: 2020-05-06 20:42:12+02:00
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: features-of-this-website-speed
social_image: false
template: post
title: "Features of this website: speed"
translations:
  en: features-of-this-website-speed
  de: funktionen-dieser-website-v

---

As of today, 6. May 2020, this site has been redesigned pretty recently. 
To be more accurate, not only redesigned, but redeveloped from scratch.
All that's left is the content, which I successfully migrated.
Before, this site was run by [WordPress](https://wordpress.org/).
I chose to switch since I wanted to get my hands on with static page generators.
One may read more about the switch and its pros and cons in [another post](https://genieblog.ch/blog/en/2020/migration-from-wordpress-to-jigsaw).

In this post, I will present one of the pros: how easy it was to make the website faster without any dubious WordPress plugins.

## I am Speed.

This site is served statically, meaning all the content is already available in the final form: HTML.
No [PHP](https://php.net) scripts in between to fetch or manipulate content.
I started from the [jigsaw blog template](https://github.com/tightenco/jigsaw-blog-template/), but I found quite a few places for improvements.
They are listed in the following.

### Compile-time Code Formatting

Since the page is compiled statically, I consider it important to do all the work if possible during the compilation time.
In this case, work that is not required to run client-side is for example the code formatting.
The template by default comes with [highlight.js](https://highlightjs.org/usage/) installed. 
The compile time replacement for this is [highlight.php](https://github.com/scrivo/highlight.php) together with a matching [Jigsaw-listener](https://github.com/GenieTim/genieblog.ch/blob/2dbcbd6369bceaafd2d4e1743d730c5e1d8e1bdd/listeners/HighlightCodeSyntax.php).
This way, less computations have to be repeated client-side and less JavaScript has to be transferred.
As a minor drawback, the HTML is slightly bigger if there was code to format.

### HTML Minification

Another improvement over the template is the minification of the resulting HTML code: 
An additional blade directive, spaceless, is used to remove all unnecessary spaces from the post-compiled HTML.
This way, valuable bytes are saved.

```php
// blade.php
<?php

return [
  'spaceless' => function () {
    return '<?php ob_start() ?>';
  },
  'endspaceless' => function () {
    return "<?php echo preg_replace('/>\\s+</', '><', ob_get_clean()); ?>";
  }
];

```

### Image Compression & Resizing

To get the images in the posts to load fast, it is sensible to resize them to what they need to be as well as compressing the file.
As I wanted to keep away from all server-side scripts, I cannot use a dynamic resizer, which could return the image in the pixel-perfect size.
Instead, I have to rely on the [srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) img attribute. 

To get the images to the desired sizes and compress them, I use a [custom script](https://github.com/GenieTim/genieblog.ch/blob/2dbcbd6369bceaafd2d4e1743d730c5e1d8e1bdd/tasks/build.js#L17).

On the other hand, to set the srcset attribute appropriately, I have a [blade template](https://github.com/GenieTim/genieblog.ch/blob/2dbcbd6369bceaafd2d4e1743d730c5e1d8e1bdd/source/_components/img.blade.php#L8) constructing the sources as appropriate. 

### Client-Side Caching

A Service Worker, powered by Google's [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin), is powering the client-side cache of this website. 
Minor configuration changes are necessary in the `webpack.mix.js` file to get it working:

```js
(...)
mix.webpackConfig({
    plugins: [
        build.images,
        build.jigsaw,
        build.watch([
            (...)
        ]),
        new CopyWebpackPlugin([
            { from: 'source/assets/build/images', to: 'images' }
        ]),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            swDest: '../../service-worker.js', // Need to move the service-worker to the root
        }),
    ]
});
(...)
```

### InstantClick

Finally, to get the client an additional perceived performance boost, [InstantClick](http://instantclick.io/) is used. 

This is due to the premature loading of the targets of any links: even before visitors have clicked on the link, the script begins to load the target page and then pushes it into view as soon as the visitor finished clicking or as soon as it is loaded.

## Sources

Inspiration for the serverside code-formatting was [Stefan Zweifel](https://stefanzweifel.io/posts/server-side-syntax-highlighting-with-jigsaw/).

Photo by [Christian Englmeier](https://unsplash.com/@christianem?utm_source=unsplash&utm_medium=referral&utm_content=credit) on [Unsplash](https://unsplash.com/s/photos/speed?utm_source=unsplash&utm_medium=referral&utm_content=credit)
