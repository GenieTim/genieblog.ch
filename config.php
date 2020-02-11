<?php

use Illuminate\Support\Str;

/**
 * Get all collections in the desired languages
 *
 * @return array
 */
function getMultilangCollections()
{
    $collections = [];
    $langs = ["en", "de"];
    foreach ($langs as $langKey => $lang) {
        // posts
        $collections['posts_' . $lang] = [
            'author' => 'Tim Bernhard', // Default author, if not provided in a post
            'sort' => '-date',
            'extends' => '_layout.post',
            'path' => 'posts/' . $lang . '/{date|Y}/{slug}'
        ];
        // categories
        $collections['categories'] = [
            'path' => 'posts/' . $lang . '/categories/{filename}',
            'posts' => function ($page, $allPosts) use ($lang) {
                var_dump($allPosts);
                var_dump($page);
                die();
                return $allPosts->filter(function ($post) use ($page, $lang) {
                    if ($post->categories) {
                        return in_array($page->getFilename(), $post->categories, true) && $post->language === $lang;
                    }
                    return false;
                });
            },
        ];

        // pages
        $collections['pages_' . $lang] = [
            'author' => 'Tim Bernhard',
            'sort' => '-filename',
            'extends' => '_layout.page',
            'path' => 'pages/' . $lang . '/{slug}'
            // 'path' => 'attempt/' . $lang . '/{filename}'
        ];

        // tags
        // $collections['tags_' . $lang] = [
        //     'path' => 'posts/' . $lang . '/tags/{filename}',
        //     'posts' => function ($page, $allPosts) use ($lang) {
        //         return $allPosts->filter(function ($post) use ($page, $lang) {
        //             if ($post->tags) {
        //                 return in_array($page->getFilename(), $post->tags, true) && $post->language === $lang;
        //             }
        //             return false;
        //         });
        //     },
        // ];
    }
    // $collections['posts'] = $collections['posts_en'];
    return $collections;
}

return [
    'baseUrl' => 'file:///Users/timbernhard/Privat/Programming/OpenSource-Contributions/genieblog.ch/build_local/',
    'production' => false,
    'siteName' => 'genieblog.ch',
    'siteDescription' => 'A genius for a genius',
    'siteAuthor' => 'Tim Bernhard',

    // collections
    'collections' => getMultilangCollections(),

    // helpers
    'getDate' => function ($page) {
        return Datetime::createFromFormat('U', $page->date);
    },
    'getExcerpt' => function ($page, $length = 255) {
        if ($page->excerpt) {
            return $page->excerpt;
        }

        $content = preg_split('/<!-- more -->/m', $page->getContent(), 2);
        $cleaned = trim(
            strip_tags(
                preg_replace(['/<pre>[\w\W]*?<\/pre>/', '/<h\d>[\w\W]*?<\/h\d>/'], '', $content[0]),
                '<code>'
            )
        );

        if (count($content) > 1) {
            return $content[0];
        }

        $truncated = substr($cleaned, 0, $length);

        if (substr_count($truncated, '<code>') > substr_count($truncated, '</code>')) {
            $truncated .= '</code>';
        }

        return strlen($cleaned) > $length
            ? preg_replace('/\s+?(\S+)?$/', '', $truncated) . '...'
            : $cleaned;
    },
    'isActive' => function ($page, $path) {
        return Str::endsWith(trimPath($page->getPath()), trimPath($path));
    },
];
