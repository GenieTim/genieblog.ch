<?php

use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Translation\FileLoader;
use Illuminate\Translation\Translator;
use TightenCo\Jigsaw\Collection\CollectionItem;
use Symfony\Component\Yaml\Yaml;

$LANGUAGES;

function getLanguages()
{
    global $LANGUAGES;
    if (is_null($LANGUAGES)) {
        $global_config = Yaml::parseFile("global-config.yaml");
        $LANGUAGES = $global_config['languages'];
    }
    return $LANGUAGES;
}
/**
 * Get all collections in the desired languages
 *
 * @return array
 */
function getMultilangCollections()
{
    $collections = [];
    $languages = getLanguages();
    foreach ($languages as $langKey => $lang) {
        // posts
        $collections['posts_' . $lang] = [
            'author' => 'Tim Bernhard', // Default author, if not provided in a post
            'comments' => true,
            'sort' => '-date',
            'language' => $lang,
            'extends' => '_layout.post',
            'path' => 'blog/' . $lang . '/{date|Y}/{slug}',
            'filter' => function ($post) {
                return !$post->draft;
            },
            'webmentions' => function (CollectionItem $post) {
                $path = $post->getUrl();
                $path = str_replace(['https://', 'www.genieblog.ch', 'index.html'], "", $path);
                $path = trim($path, '/');
                $commentsFile = __DIR__ . '/source/data/webmentions/' . $path . '.json';
                if (file_exists($commentsFile)) {
                    return json_decode(file_get_contents($commentsFile));
                }
                return [];
            },
            /**
             * Function to check whether a post is old. 
             */
            'isOld' => function (CollectionItem $post, $dayDiff = 730) {
                /**
                 * Check the date the post was updated:
                 * If its update date is declared, take that one
                 */
                if (property_exists($post, 'updated')) {
                    $postDate = $post->updated;
                } else {
                    /**
                     * If not though, check if we can use the files modification date.
                     * Fall back to the default date of the post
                     */
                    $sourceFile = $post->getSource() . '/' . $post->getFilename() . '.md';
                    if (file_exists($sourceFile)) {
                        $postDate = filemtime($sourceFile);
                    } else {
                        $postDate = $post->date;
                    }
                }

                /**
                 * Finally, convert the dates before checking the difference
                 */
                if (!$postDate instanceof \DateTime) {
                    if (is_int($postDate)) {
                        $timestamp = $postDate;
                        $postDate = new \DateTime();
                        $postDate->setTimestamp($timestamp);
                    } else {
                        $postDate = new \DateTime($postDate);
                    }
                }
                $now = new \DateTime();
                return $postDate->diff($now)->days > $dayDiff;
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
    'languages' => getLanguages(),
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
            // if there is a '/' in the translation, it is an URL/path
            if (Str::contains($page->translations[$targetLanguage], '/')) {
                return $page->baseUrl . $page->translations[$targetLanguage];
            }
            // otherwise, it is the translated slug
            // in which case we have to rebuild the URL.
            // For a blog post, e.g., according to the scheme defined above:
            // blog/' . $lang . '/{date|Y}/{slug}'
            // the replacement here is rather opinionated: 
            // expects /$lang/ as well as slug being last part of URL.
            // First, replace the language as needed,
            $rep1 = str_replace("/$page->language/", "/$targetLanguage/", $url);
            // then, make sure the URL ends in slug: replace some possibly distracting stuff
            $rep2 = preg_replace('/index.html$/', '', $rep1);
            $rep3 = rtrim($rep2, '/');
            // finally, assemble new
            return dirname($rep3) . '/' . $page->translations[$targetLanguage] . '/';
        }
        // replace all possible occurences of the language in the file name/path
        $rep1 = str_replace("/" . $page->language . "/", "/" . $targetLanguage . "/", $url);
        $rep2 = str_replace("." . $page->language . ".", "." . $targetLanguage . ".", $rep1);
        $rep3 = str_replace("index." . $page->language, "index." . $targetLanguage, $rep2);
        return str_replace("." . $page->language . "/", "." . $targetLanguage . "/", $rep3);
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
    'underscorify' => function ($page, $path) {
        return str_replace(" ", "_", strtolower($path));
    }
];
