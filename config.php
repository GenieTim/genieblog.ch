<?php

use Illuminate\Support\Str;

const LANGUAGES = ["de", "en"];

/**
 * Get all collections in the desired languages
 *
 * @return array
 */
function getMultilangCollections()
{
    $collections = [];
    foreach (LANGUAGES as $langKey => $lang) {
        // posts
        $collections['posts_' . $lang] = [
            'author' => 'Tim Bernhard', // Default author, if not provided in a post
            'sort' => '-date',
            'language' => $lang,
            'extends' => '_layout.post',
            'path' => 'blog/' . $lang . '/{date|Y}/{slug}'
        ];
        // categories
        $collections['categories_' . $lang] = [
            'path' => 'blog/' . $lang . '/categories/{_filename}',
            'language' => $lang,
            'posts' => function ($page, $allPosts) use ($lang) {
                if (!$allPosts) {
                    echo "AllPosts = " + $allPosts;
                    return [];
                }
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
            'language' => $lang,
            'sort' => '-filename',
            'extends' => '_layout.page',
            'path' => 'pages/' . $lang . '/{slug}'
            // 'path' => 'attempt/' . $lang . '/{filename}'
        ];
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
    'languages' => LANGUAGES,
    'language' => 'en', // default language, if undefined for some reason

    // collections
    'collections' => getMultilangCollections(),

    // helpers
    'translateUrl' => function ($page, $targetLanguage) {
        $url = $page->getUrl();
        for ($i = 0; $i < count(LANGUAGES); ++$i) {
            $tryLanguage = LANGUAGES[$i];
            if (strpos($url, "/$tryLanguage/") !== false) {
                return str_replace("/$tryLanguage/", "/$targetLanguage/", $url);
            }
        }
    },
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
