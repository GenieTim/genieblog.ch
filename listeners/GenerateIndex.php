<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;
use Symfony\Component\Yaml\Yaml;

class GenerateIndex
{
    public function handle(Jigsaw $jigsaw)
    {
        $global_config = Yaml::parseFile(__DIR__ . "/../global-config.yaml");
        $LANGUAGES = $global_config->language;

        foreach ($LANGUAGES as $lang) {
            $data = collect($jigsaw->getCollection('posts_' . $lang)->map(function ($page) use ($jigsaw) {
                if ($page->findable) {
                    return [
                        'title' => $page->title,
                        'categories' => $page->categories,
                        'link' => rightTrimPath($jigsaw->getConfig('baseUrl')) . $page->getPath(),
                        'snippet' => $page->getExcerpt(),
                    ];
                }
            })->filter()->values());

            file_put_contents(
                $jigsaw->getDestinationPath() . '/index_' . $lang . '.json',
                json_encode(
                    $data
                )
            );
        }
    }
}
