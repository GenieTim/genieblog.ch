<?php

namespace App\Listeners;

use samdark\sitemap\Sitemap;
use TightenCo\Jigsaw\Jigsaw;
use Illuminate\Support\Str;

class GenerateSitemap
{
    protected $exclude = [
        '/assets/*',
        'service-worker.js',
        'service-worker.js.map',
        'workbox-*.js',
        'workbox-*.js.map',
        '*/favicon.ico',
        '*/404*'
    ];

    public function handle(Jigsaw $jigsaw)
    {
        $baseUrl = $jigsaw->getConfig('baseUrl');

        if (!$baseUrl) {
            echo ("\nTo generate a sitemap.xml file, please specify a 'baseUrl' in config.php.\n\n");

            return;
        }

        $sitemap = new Sitemap($jigsaw->getDestinationPath() . '/sitemap.xml');

        $pages = $jigsaw->getPages();
        foreach ($pages as $path => $page) {
            if ($page->findable && !$this->isExcluded($path)) {
                $sitemap->addItem(rtrim($baseUrl, '/') . $path, time(), Sitemap::DAILY);
            }
        }

        $sitemap->write();
    }

    public function isExcluded($path)
    {
        return Str::is($this->exclude, $path);
    }
}
