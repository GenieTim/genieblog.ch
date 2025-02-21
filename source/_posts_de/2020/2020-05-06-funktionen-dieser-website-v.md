---
author: Tim Bernhard
categories:
  - Genieblog
cover_image: 2020/christian-englmeier-J7EUjSlNQtg-unsplash.jpg
date: 2020-05-06 20:42:12+02:00
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: funktionen-dieser-website-v
social_image: false
template: post
title: "Funktionen dieser Website: Geschwindigkeit"
translations:
  en: features-of-this-website-speed
  de: funktionen-dieser-website-v
---

Diese Seite wurde von kurzem (also relativ zum Datum 6.5.2020) neu gestaltet.
Um genauer zu sein, nicht nur neu gestaltet, sondern von Grund auf neu entwickelt.
Alles, was übrig geblieben ist, ist der Inhalt, den ich erfolgreich migriert habe.
Früher wurde diese Seite mit [Wordpress](https://wordpress.org/) betrieben, jetzt wird sie durch [JigSaw](https://jigsaw.tighten.co/) generiert.
Ich entschied mich für wechseln, da ich gerne etwas mit static site generators herumspielen wollte.
Man kann mehr über den Wechsel und ihre Vor- und Nachteile in einem [anderen Beitrag](https://genieblog.ch/blog/de/2020/migration-von-wordpress-jigsaw) lesen.

In diesem Beitrag werde ich einen der Vorteile präsentieren:
wie ich die Website signifikant schneller machen konnte, ohne dubiose WordPress-plugins.

## Geschwindigkeit. Pure Geschwindigkeit.

Diese Seite ist statisch bedient, dh der gesamte Inhalt ist bereits in der endgültigen Form: HTML.
Keine [PHP](https://www.php.net/) Skripte in zwischen holen oder den Inhalt zu manipulieren.
Ich begann aus der [Jigsaw Blog-Vorlage](https://github.com/tightenco/jigsaw-blog-template/), aber ich fand einige Verbesserungsmöglichkeiten.
Sie werden im Folgenden aufgeführt.

### Compile-Zeit-Code-Formatierung

Da die Seite statisch kompiliert wird, halte ich es für wichtig, wenn möglich schon bei der Kompilierung der Seite so viel Arbeit zu erledigen wie möglich.
Ein Beispiel für eine Arbeit, die nicht clientseitig ausgeführt werden muss, ist beispielsweise die Code-Formatierung.
Das Template kommt standardmässig mit [highlight.js](https://highlightjs.org/usage/) installiert.
Der Ersatz zu Kompilierzeit für diese Funktion ist [highlight.php](https://github.com/scrivo/highlight.php) zusammen mit einem passenden [Jigsaw-Listener](https://github.com/GenieTim/genieblog.ch/blob/e99a8e5544c00819f00b5c374db9bf2db5cc3888/listeners/HighlightCodeSyntax.php).
Auf diese Weise müssen weniger Berechnungen clientseitige wiederholt werden und weniger JavaScript muss über das Netzwerk übertragen werden.
Als kleiner Nachteil ist die resultierende HTML-Datei etwas größer, wenn es Code zu formatieren gab.

### HTML Minifizierung

Eine weitere Verbesserung gegenüber der Vorlage ist die Verkleinerung des resultierenden HTML-Code:
Eine zusätzliche blade directive wird verwendet, um alle unnötigen Leerzeichen aus dem post-kompilierte HTML zu entfernen.
Auf diese Weise werden wertvolle Bytes gespart.

```php
// blade.php
<?php

return [
  'spaceless' => function () {
    return '<?php ob_start() ?>';
  },
  'endspaceless' => function () {
    return "<?php echo preg_replace('/>\\s+</', '><', ob_get_clean()); ?>";
  }
];
```

### Bildkomprimierung und Ändern der Größe

Um die Bilder in den Beiträgen zu erhalten, die schnell laden, ist es sinnvoll, sie auf die kleinstnötige Grösse zuzuschneiden, sowie die Datei zu komprimieren.
Da ich nach Möglichkeit keine serverseitigen Skripts verwenden wollte, kann ich nicht einen dynamischen Resizer verwenden, der das Bild in der Pixel perfekte Größe zurückgeben könnte.
Stattdessen muss ich mich auf das [srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) img Attribut verlassen.

Um die Bilder zu den gewünschten Größen zuzuscheinen und zu komprimieren verwende ich ein [eigenes Webpack Plugin](https://github.com/GenieTim/genieblog.ch/blob/9fe1f6ab78b91e5500b9f7d69d53986734ed9237/tasks/ImageBuildPlugin.js#L1).

Auf der anderen Seite, dass das srcset Attribut entsprechend gesetzt wird, habe ich ein [blade template](https://github.com/GenieTim/genieblog.ch/blob/2dbcbd6369bceaafd2d4e1743d730c5e1d8e1bdd/source/_components/img.blade.php#L8), das die nötige Arbeit übernimmt.

### Client-Side Caching

Ein Service Worker, der von Googles [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) generiert wird, versorgt den clientseitigen Cache dieser Website mit Inhalt.
In der Datei `webpack.mix.js` sind geringfügige Konfigurationsänderungen erforderlich, damit Workbox funktioniert:

```js
(...)
mix.webpackConfig({
    plugins: [
        build.images,
        build.jigsaw,
        build.watch([
            (...)
        ]),
        new CopyWebpackPlugin([
            { from: 'source/assets/build/images', to: 'images' }
        ]),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            swDest: '../../service-worker.js', // Need to move the service-worker to the root
        }),
    ]
});
(...)
```

### InstantClick

Schliesslich wird [InstantClick](http://instantclick.io/) verwendet, um dem Client eine zusätzliche wahrgenommene Leistungssteigerung vorzutäuschen.
Dies durch verfrühtes Laden der Ziele jeglicher Links: noch bevor Besuchende dieser Website fertig geklickt haben, beginnt das Skript, die Ziel-Seite zu laden, und schiebt sie danach unter.

## Quellen

Inspiration für die serverseitige Code-Formatierung kam von [Stefan Zweifel](https://stefanzweifel.dev/posts/2019/03/10/server-side-syntax-highlighting-with-jigsaw/).

Foto von [Christian Englmeier](https://unsplash.com/@christianem?utm_source=unsplash&utm_medium=referral&utm_content=credit) auf [Unsplash](https://unsplash.com/s/photos/speed?utm_source=unsplash&utm_medium=referral&utm_content=credit).
