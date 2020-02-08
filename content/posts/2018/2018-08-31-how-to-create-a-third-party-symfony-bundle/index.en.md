---
author: adminTim
comments: true
date: 2018-08-31 12:40:39+00:00
layout: post
link: http://genieblog.ch/how-to-create-a-third-party-symfony-bundle/
slug: how-to-create-a-third-party-symfony-bundle
title: How to Create a Third-Party Symfony Bundle
wordpress_id: 418
category: PHP
draft: false
template: post
description: false
socialImage: /media/socialImage.jpg
---

Have an awesome library you want to integrate in your [Symfony](https://symfony.com) application? Share your code between different Symfony instances? Share your code with other people? Create your bundle standalone and distribute it via [Composer](https://getcomposer.org)! Here is a short overview on how to do it.

To get started, you want to have a [Composer](https://getcomposer.org) & a [git](https://git-scm.com) instance (if you follow the general practice to publish your bundle on a git-based central repository, such as [GitHub](https://github.com/bernhardWebstudio/) or [GitLab](https://gitlab.com)) running. All a Symfony third-party bundle has to be is a composer package. Everything else is bonus. To make your project a composer package, you add the `composer.json` file if you did not already. In it, you specify the name, properties and dependencies of your bundle. Comparsion with other bundles helps to get an impression of what to put in there.
Basically, it could look like mine for my [PlaceholderBundle](https://github.com/BernhardWebstudio/PlaceholderBundle/blob/master/composer.json):


    
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



After adding the boni, you will want to publish your bundle so other people can benefit from your bundle. There are various tutorials for [this](https://blog.jgrossi.com/2013/creating-your-first-composer-packagist-package/) already so I will not write on. 



## Boni



To give the Symfony character to your package, you will want to integrate e.g. [dependency injection](https://symfony.com/doc/current/components/dependency_injection.html), expose a class as a service or use the general Symfony [configuration](https://symfony.com/doc/current/components/config/definition.html) for your services. This can easily be achieved by adding the relevant Symfony components as dependencies via composer, e.g. use command `composer require symfony/dependency-injection`. Afterwards, you can use them the same way you are using them in your Symfony application. Pay attention not to limit the dependency versions too much, otherwise you may prevent a user from upgrading Symfony.

There are may boni you can add to your repository, if it is published on e.g. GitHub: to give users and contributors a chance to better understand the state of your repository, integrate some of the [apps](https://github.com/marketplace) and add [badges](https://shields.io/#/) to your README file.

Finally, let's talk [testing](https://symfony.com/doc/current/testing.html): as your package should not ship with a Kernel oder similar, you have nothing to simply run. There are workarounds: either you let your bundle live in a complete application, e.g. as a submodule, and test the application as a whole. Or you use [unit-testing](https://symfony.com/doc/current/create_framework/unit_testing.html). If your choice falls on the latter, I can recommend using [ConfigTest](https://github.com/SymfonyTest/SymfonyConfigTest) if your bundle uses the configuration component. Also, at one point, you may have to have an AppKernel to test the execution of a command or the availability of a route. Depending on the actual need, you can either mock the Kernel or create a TestKernel. For latter are many examples online in other bundles, e.g. in [mine](https://github.com/BernhardWebstudio/PlaceholderBundle/blob/master/Tests/AppKernel.php).
