<?php

use Illuminate\Support\Str;

function scanAllDir($dir)
{
    $result = [];
    foreach (scandir($dir) as $filename) {
        if ($filename[0] === '.') continue;
        $filePath = $dir . '/' . $filename;
        if (is_dir($filePath)) {
            foreach (scanAllDir($filePath) as $childFilename) {
                $result[] = $filename . '/' . $childFilename;
            }
        } else {
            $result[] = $filename;
        }
    }
    return $result;
}

/**
 * Collect all documents containing ".$lang." from a dir
 *
 * @param string $lang the language to filter for
 * @param string $dir the directory to search in
 * @return array
 */
function languageFilter(string $lang, string $dir)
{
    $posts = [];
    $files = scanAllDir($dir);
    foreach ($files as $fileKey => $file) {
        if (preg_match('/\.(en|de)\./', $file, $matches) === 1) {
            if ($matches[1] == $lang) {
                $posts[] = file_get_contents($dir . "/" . $file);
            }
        }
    }
    return $posts;
}

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
        var_dump("Setting posts_" . $lang);
        // posts
        $collections['posts_' . $lang] = [
            'author' => 'Tim Bernhard', // Default author, if not provided in a post
            'sort' => '-date',
            'path' => 'blog/' . $lang . '/{filename}',
            'posts' => [
                'items' => languageFilter($lang, './source/_posts'),
                'filter' => function ($item) {
                    return !$item->draft;
                }
            ]
        ];
        // categories
        $collections['categories_' . $lang] = [
            'path' => 'blog/' . $lang . '/categories/{filename}',
            'posts' => function ($page, $allPosts) use ($lang) {
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
            'sort' => 'name',
            'path' => $lang . '/{filename}',
            'items' => languageFilter($lang, './source/_pages')
        ];

        // tags
        $collections['tags_' . $lang] = [
            'path' => 'blog/' . $lang . '/tags/{filename}',
            'posts' => function ($page, $allPosts) use ($lang) {
                return $allPosts->filter(function ($post) use ($page, $lang) {
                    if ($post->tags) {
                        return in_array($page->getFilename(), $post->tags, true) && $post->language === $lang;
                    }
                    return false;
                });
            },
        ];
    }
    $collections['posts'] = $collections['posts_en'];
    // var_dump($collections);
    return $collections;
}

return [
    'baseUrl' => '',
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
