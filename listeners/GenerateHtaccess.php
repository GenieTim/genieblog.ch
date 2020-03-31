<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class GenerateHtaccess
{
    public function handle(Jigsaw $jigsaw)
    {
        // create a htaccess to still serve the old (worpress) URLs
        $data = collect($jigsaw->getCollection('posts_de')->map(function ($page) use ($jigsaw) {
            if ($page->link) {
                $urlParsed = parse_url($page->link, PHP_URL_PATH);
                return 'Redirect ' . $urlParsed . ' ' . $page->getUrl();
            }
        })->values());

        $targetFile = $jigsaw->getDestinationPath() . '/.htaccess';

        // handle possibility to already have a htaccess for something else
        $prefix = "";
        if (file_exists($targetFile)) {
            $prefix = file_get_contents($targetFile);
        }

        file_put_contents(
            $targetFile,
            $prefix . "\n" . implode("\n", $data->filter()->toArray())
        );
    }
}
