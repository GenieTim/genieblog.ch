<?php

// @var $container \Illuminate\Container\Container
// @var $events \TightenCo\Jigsaw\Events\EventBus

/*
 * You can run custom code at different stages of the build process by
 * listening to the 'beforeBuild', 'afterCollections', and 'afterBuild' events.
 *
 * For example:
 *
 * $events->beforeBuild(function (Jigsaw $jigsaw) {
 *     // Your code here
 * });
 */

$events->afterBuild(App\Listeners\GenerateSitemap::class);
$events->afterBuild(App\Listeners\GenerateIndex::class);
$events->afterBuild(App\Listeners\GenerateHtaccess::class);
$events->afterBuild(App\Listeners\SetinMathjax::class);
$events->afterBuild(App\Listeners\HighlightCodeSyntax::class);

// use TightenCo\Jigsaw\Jigsaw;

/** @var $container \Illuminate\Container\Container */
/** @var $events \TightenCo\Jigsaw\Events\EventBus */

/**
 * You can run custom code at different stages of the build process by
 * listening to the 'beforeBuild', 'afterCollections', and 'afterBuild' events.
 *
 * For example:
 *
 * $events->beforeBuild(function (Jigsaw $jigsaw) {
 *     // Your code here
 * });
 */
// $events->afterCollections(function (Jigsaw $jigsaw) {
    
//   $posts = $jigsaw->getCollection('posts');

//   foreach($posts as $post) {

//       $dom = new DOMDocument();
//       $dom->loadHTML($post->getContent());

//       foreach ($dom->getElementsByTagName('img') as $img) {

//           $src = $img->getAttribute('src');

//           $tiny_src = str_replace('/assets/images/', '/images/tiny/', $src);

//           $medium_src = str_replace('/assets/images/', '/images/medium/', $src);

//           $img->setAttribute('src', $tiny_src);
//           $img->setAttribute('srcset', $medium_src);
//       }
//       dd($dom); // Outputs the html I want
//   }

// });
