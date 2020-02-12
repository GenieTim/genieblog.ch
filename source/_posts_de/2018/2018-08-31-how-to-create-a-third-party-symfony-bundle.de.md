---
author: Tim Bernhard
comments: true
date: 2018-08-31 12:40:39+00:00
layout: post
link: http://genieblog.ch/how-to-create-a-third-party-symfony-bundle/
slug: how-to-create-a-third-party-symfony-bundle
title: How to Create a Third-Party Symfony Bundle
wordpress_id: 418
categories:
  - PHP
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Haben Sie eine großartige Bibliothek, die Sie in Ihre Anwendung [Symfony](https://symfony.com) integrieren möchten? Teilen Sie Ihren Code zwischen verschiedenen Symfony-Instanzen? Teilen Sie Ihren Code mit anderen Menschen? Erstellen Sie ein eigenständiges Bundle und verteilen Sie es über [Composer](https://getcomposer.org)! Hier ist eine kurze Übersicht, wie es geht.

Zu Beginn benötigen Sie eine Instanz von [Composer](https://getcomposer.org) und eine Instanz von [git](https://git-scm.com) (sofern Sie die allgemeine Vorgehensweise zum Veröffentlichen Ihres Bundles auf befolgen ein git-basiertes zentrales Repository wie [GitHub](https://github.com/bernhardWebstudio/) oder [GitLab](https://gitlab.com)) ausgeführt wird. Alles, was ein Symfony-Bundle von Drittanbietern sein muss, ist ein Composer-Paket. Alles andere ist Bonus. Um aus Ihrem Projekt ein Composer-Paket zu machen, fügen Sie die Datei "composer.json" hinzu, sofern Sie dies nicht bereits getan haben. Darin geben Sie den Namen, die Eigenschaften und die Abhängigkeiten Ihres Bundles an. Der Vergleich mit anderen Bundles hilft dabei, einen Eindruck davon zu bekommen, was dort abgelegt werden soll.
Grundsätzlich könnte es für mein [PlaceholderBundle](https://github.com/BernhardWebstudio/PlaceholderBundle/blob/master/composer.json) so aussehen:


    
    {
        "name" : "bernhard-webstudio/placeholder-bundle",
        "type" : "symfony-bundle",
        "description" : "Symfony bundle to generate placeholders for images",
        "keywords" : ["Symfony", "Placeholder"],
        "homepage" : "https://github.com/BernhardWebstudio/PlaceholderBundle",
        "license" : "MIT",
        "authors" :
        [
            {
                "name" : "Tim Bernhard",
                "email" : "tim@bernhard-webstudio.ch",
                "homepage" : "http://genieblog.ch",
                "role" : "Developer"
            }
        ],


Nachdem Sie die Boni hinzugefügt haben, möchten Sie Ihr Bundle veröffentlichen, damit andere Personen von Ihrem Bundle profitieren können. Es gibt bereits verschiedene Tutorials für [dies](https://blog.jgrossi.com/2013/creating-your-first-composer-packagist-package/), sodass ich nicht weiter schreiben werde. 



## Boni



Um Ihrem Paket den Symfony-Charakter zu verleihen, möchten Sie z. [Dependency Injection](https://symfony.com/doc/current/components/dependency_injection.html), machen Sie eine Klasse als Service verfügbar, oder verwenden Sie die allgemeine Symfony-Konfiguration (https://symfony.com/doc/current) /components/config/definition.html) für Ihre Dienste. Dies kann leicht erreicht werden, indem die relevanten Symfony-Komponenten als Abhängigkeiten über Composer hinzugefügt werden, z. benutze den Befehl `composer require symfony / dependency-injection`. Anschließend können Sie sie genauso verwenden, wie Sie sie in Ihrer Symfony-Anwendung verwenden. Achten Sie darauf, die Abhängigkeitsversionen nicht zu stark einzuschränken, da Sie anderenfalls einen Benutzer daran hindern können, Symfony zu aktualisieren.

Es gibt möglicherweise Boni, die Sie Ihrem Repository hinzufügen können, wenn es z. GitHub: Um Benutzern und Mitwirkenden die Möglichkeit zu geben, den Status Ihres Repositorys besser zu verstehen, integrieren Sie einige der [Apps](https://github.com/marketplace) und fügen Sie [Badges](https://shields.io/) hinzu. # /) in Ihre README-Datei.

Lassen Sie uns abschließend über [testing] sprechen (https://symfony.com/doc/current/testing.html): Da Ihr Paket nicht mit einem Kernel oder ähnlichem ausgeliefert werden sollte, müssen Sie nichts einfach ausführen. Es gibt Problemumgehungen: Entweder lassen Sie Ihr Bundle in einer vollständigen Anwendung leben, z. als Submodul, und testen Sie die Anwendung als Ganzes. Oder Sie verwenden [Unit-Testing](https://symfony.com/doc/current/create_framework/unit_testing.html). Wenn Sie sich für Letzteres entscheiden, kann ich die Verwendung von [ConfigTest](https://github.com/SymfonyTest/SymfonyConfigTest) empfehlen, wenn Ihr Bundle die Konfigurationskomponente verwendet. Außerdem müssen Sie möglicherweise einen AppKernel haben, um die Ausführung eines Befehls oder die Verfügbarkeit einer Route zu testen. Je nach tatsächlichem Bedarf können Sie den Kernel verspotten oder einen TestKernel erstellen. Für letztere gibt es viele Beispiele online in anderen Bundles, z. in [mine](https://github.com/BernhardWebstudio/PlaceholderBundle/blob/master/Tests/AppKernel.php).
