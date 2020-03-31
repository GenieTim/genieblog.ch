<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class GenerateIndex
{
    public function handle(Jigsaw $jigsaw)
    {
        foreach (['en', 'de'] as $lang) {
            $data = collect($jigsaw->getCollection('posts_' . $lang)->map(function ($page) use ($jigsaw) {
                if ($page->findable) {
                    return [
                        'title' => $page->title,
                        'categories' => $page->categories,
                        'link' => rightTrimPath($jigsaw->getConfig('baseUrl')) . $page->getPath(),
                        'snippet' => $page->getExcerpt(),
                    ];
                }
            })->values());

            file_put_contents(
                $jigsaw->getDestinationPath() . '/index_' . $lang . '.json',
                json_encode(
                    $data->filter()
                )
            );
        }
    }
}
