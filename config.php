<?php

use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Translation\FileLoader;
use Illuminate\Translation\Translator;

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
            'path' => 'blog/' . $lang . '/{date|Y}/{slug}',
            'filter' => function ($post) {
                return !$post->draft;
            },
            'webmentions' => function ($post) {
                $path = $post->getUrl();
                $path = str_replace(['https://', 'www.genieblog.ch', 'index.html'], "", $path);
                $path = trim($path, '/');
                $commentsFile = __DIR__ . '/source/data/webmentions/' . $path . '.json';
                if (file_exists($commentsFile)) {
                    return json_decode(file_get_contents($commentsFile));
                }
                return [];
            }
        ];

        // categories
        $collections['categories_' . $lang] = [
            'path' => 'blog/' . $lang . '/categories/{_filename}',
            'language' => $lang,
            'translations' => false, // by default, we do not translate categories
            'posts' => function ($page, $allPosts) use ($lang) {
                if (!$allPosts) {
                    // echo "AllPosts = " + $allPosts;
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
    'baseUrl' => '',
    'production' => false,
    'siteName' => 'genieblog.ch',
    'siteDescription' => 'A genius for a genius',
    'siteAuthor' => 'Tim Bernhard',
    'languages' => LANGUAGES,
    'language' => 'en', // default language, if undefined for some reason
    // might be bool or array: if array, have keys the languages, as values the path to the other language
    // TODO: don't rely on URL/path, as it might be different for different environments
    'translations' => true,
    // a pseudo-mechanism to hide certain posts from search & sitemap.
    // currently, they are still listed in the blog pagination though
    'findable' => true,

    // collections
    'collections' => getMultilangCollections(),

    // helpers
    'translateUrl' => function ($page, $targetLanguage) {
        $url = $page->getUrl();
        if ($page->language === $targetLanguage) {
            return $url;
        }
        if (is_array($page->translations)) {
            return $page->basUrl . $page->tranlations[$targetLanguage];
        }
        for ($i = 0; $i < count(LANGUAGES); ++$i) {
            $tryLanguage = LANGUAGES[$i];
            if (strpos($url, "$tryLanguage") !== false) {
                // replace all possible occurences of the language in the file name/path
                $rep1 = str_replace("/$tryLanguage/", "/$targetLanguage/", $url);
                $rep2 = str_replace(".$tryLanguage.", ".$targetLanguage.", $rep1);
                return str_replace(".$tryLanguage/", ".$targetLanguage/", $rep2);
            }
        }
    },
    'hasTranslation' => function ($page, $targetLanguage) {
        // check whether a certain translation is existing/available/accessible
        if ($page->language == $targetLanguage) {
            return true;
        }
        if ($page->translations === false) {
            return false;
        }
        if (is_array($page->translations)) {
            return array_key_exists($targetLanguage, $page->translations);
        }
        return true;
    },
    'translate' => function ($page, $key, $locale = null) {
        if (is_null($locale)) {
            $locale = $page->language;
        }
        // Prepare the FileLoader
        $loader = new FileLoader(new Filesystem(), './source/_assets/translations');

        // Register the Translator
        $translator = new Translator($loader, $locale);
        return $translator->get($key);
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
    'getShortTitle' => function ($page, $limit = 32, $break = " ", $pad = "...") {
        $string = $page->title;
        // return with no change if string is shorter than $limit
        if (strlen($string) <= $limit) {
            return $string;
        }

        $string = substr($string, 0, $limit);
        if (false !== ($breakpoint = strrpos($string, $break))) {
            $string = substr($string, 0, $breakpoint);
        }

        return $string . $pad;
    },
    'isActive' => function ($page, $path) {
        return Str::endsWith(trimPath($page->getPath()), trimPath($path));
    },
];
