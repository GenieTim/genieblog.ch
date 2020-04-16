---
author: Tim Bernhard
comments: true
date: 2018-04-06 20:08:11+00:00
layout: post
link: http://genieblog.ch/getting-started-with-elastica-queries-in-symfony/
slug: getting-started-with-elastica-queries-in-symfony
title: Getting started with elastica queries in Symfony
wordpress_id: 355
categories:
  - PHP
  - Elastica
  - Elasticsearch
  - Symfony
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: false
---

When integrating [Elasticsearch](https://www.elastic.co) with [Symfony](http://symfony.com), there can be a few troubles for newcomers.

The easiest way to achieve integration is by following the setup instructions of the [FOSElasticaBundle](https://github.com/FriendsOfSymfony/FOSElasticaBundle/blob/master/doc/index.md), in case you have a running Elasticsearch instance already at least.
Symfony 3.1 or higher is required for this bundle.
When following the setup instructions, there are a few caveats, which differed from what I expected.
In the following post, I try to sketch some of the problems respectively solutions.

  * FOSElasticaBundle will not automatically recognize properties of an objectf, even when the serializer and the persistence model is defined.
The properties you want to be mapped have to be listed in the configuration file.

  * To map relations such as ManyToOne, ManyToMany or OneToOne, the property gets a subkey "type" with value "nested", after which the a new "properties" key is necessary followed by the properties of the related Entity

  * To create a development environment separat from the production index, simply set the index_name attribute of the relevant index to a environment-dependent value, such as "app_%kernel.environment%"

When you finally have the configuration set up, you have to run `./bin/console-dev fos:elastica:populate`. This will show you errors in the configuration, if you have some, respectively sync your database with the elasticsearch instance.
The next step you will want to take is to use Elasticsearch to search, duh.
This can get tricky at first if you are used to SQL search queries, especially as the relevant query classes are not yet as good [documented](http://elastica.io/api/latest/) as expected.
The best way for me was to combine the knowledge of which classes exist with the [elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) itself.

To translate from an SQL query to an Elastica-Query, keep the following in mind:

  * should means OR

  * must means AND

  * mustNot means XOR

  * to wrap these conditions together, use the `Elastica\Query\BoolQuery`

  * joins can be simulated with the `Elastica\Query\Nested`

  * to make comparsions with dates or numbers, use `Elastica\Query\Range`

With this knowledge, a query such as `(...) WHERE (post.title LIKE %$search% OR creator.firstName LIKE %$search% OR creator.lastName LIKE %$search%) AND post.start < $date` translates to (for example, in a custom search repository class, extends `FOS\ElasticaBundle\Repository`) :

    
    setQuery($search)->setFields('firstName', 'lastName');
                    $creatorQuery->setPath('creator')->setQuery($nameQuery);
              $textQuery->addShould($creatorQuery);
                    $titleQuery = new Match('title', $search);
              $textQuery->addShould($titleQuery);
    $overallQuery->addMust($textQuery);
              $dateQuery = new Range('start', array('lt' => $date->format(ELASTICA_DATE_FORMAT)));
    $overallQuery->addMust($dateQuery);
    
    /** ... **/
    

This query can be executed like it is on the finder/repository yielding results.
But.
It will not work with a Paginator and a default number of 10 results will be returned instead.
To successfully get the PaginatorAdabter, the whole BoolQuery has to be wrapped in an `Elastica\Query` Object.
This could be achieved e.g.:

    
    $query = new Query();
    // code from above
    $query->setQuery($overallQuery);

And to get the Pagination working:

`$elasticaFinder->createPaginatorAdapter($query);`
