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
socialImage: /media/socialImage.jpg
extends: _layouts.post
language: de
cover_image: false
---

Bei der Integration von [Elasticsearch](https://www.elastic.co) mit [Symfony](http://symfony.com) kann es für Neulinge einige Probleme geben.

Der einfachste Weg, um eine Integration zu erreichen, besteht darin, den Installationsanweisungen des [FOSElasticaBundle](https://github.com/FriendsOfSymfony/FOSElasticaBundle/blob/master/doc/index.md) zu folgen, falls Sie bereits eine Elasticsearch-Instanz ausführen mindestens. Für dieses Bundle ist Symfony 3.1 oder höher erforderlich. Wenn Sie die Installationsanweisungen befolgen, gibt es ein paar Einschränkungen, die sich von meinen Erwartungen unterscheiden. Im folgenden Beitrag versuche ich, einige der Probleme bzw. Lösungen zu skizzieren.


  * FOSElasticaBundle erkennt die Eigenschaften eines Objekts nicht automatisch, auch wenn der Serializer und das Persistenzmodell definiert sind. Die Eigenschaften, die zugeordnet werden sollen, müssen in der Konfigurationsdatei aufgeführt sein.


  * Um Relationen wie ManyToOne, ManyToMany oder OneToOne zuzuordnen, erhält die Eigenschaft einen Unterschlüssel "type" mit dem Wert "nested". Anschließend wird ein neuer Schlüssel "properties" gefolgt von den Eigenschaften der zugehörigen Entität benötigt


  * Um eine Entwicklungsumgebung unabhängig vom Produktionsindex zu erstellen, setzen Sie einfach das Attribut index_name des entsprechenden Index auf einen umgebungsabhängigen Wert, z. B. "app_% kernel.environment%".


Wenn Sie die Konfiguration abgeschlossen haben, müssen Sie `./bin/console-dev fos: elastica: populate` ausführen. Dies zeigt Ihnen Fehler in der Konfiguration an, falls Sie welche haben, bzw. synchronisieren Sie Ihre Datenbank mit der elasticsearch-Instanz.
Der nächste Schritt, den Sie unternehmen möchten, besteht darin, mit Elasticsearch zu suchen. Dies kann zunächst schwierig werden, wenn Sie an SQL-Suchabfragen gewöhnt sind, zumal die relevanten Abfrageklassen noch nicht so gut [dokumentiert](http://elastica.io/api/latest/) sind wie erwartet. Der beste Weg für mich war, das Wissen darüber, welche Klassen existieren, mit der [elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) selbst zu kombinieren.

Beachten Sie beim Übersetzen von einer SQL-Abfrage in eine Elastica-Abfrage Folgendes:


  * should bedeutet OR


  * must bedeutet AND


  * mustNot bedeutet XOR


  * Um diese Bedingungen zusammenzufassen, verwenden Sie die `ElasticaQueryBoolQuery`


  * Joins können mit dem `ElasticaQueryNested` simuliert werden


  * Verwenden Sie "ElasticaQueryRange", um Vergleiche mit Datumsangaben oder Zahlen anzustellen


Mit diesem Wissen eine Abfrage wie `(...) WHERE (post.title LIKE %$search% OR creator.firstName LIKE %$search% OR creator.lastName LIKE %$search%) AND post.stte` übersetzt in (erweitert beispielsweise in einer benutzerdefinierten Such-Repository-Klasse `FOSElasticaBundleRepository`):

    
    setQuery ($search)->setFields ('firstName', 'lastName');
                    $creatorQuery->setPath ('creator')->setQuery ($ nameQuery);
              $textQuery->addShould ($creatorQuery);
                    $titleQuery = new Match ('title', $search);
              $textQuery->addShould ($titleQuery);
    $overallQuery->addMust ($textQuery);
              $dateQuery = new Range ('start', array ('lt' => $date->format (ELASTICA_DATE_FORMAT));
    $overallQuery->addMust ($dateQuery);
    
    / ** ... ** /
    


Diese Abfrage kann wie im Finder / Repository ausgeführt werden und liefert Ergebnisse. Aber. Es funktioniert nicht mit einem Paginator und stattdessen wird eine Standardanzahl von 10 Ergebnissen zurückgegeben. Um den PaginatorAdabter erfolgreich zu erhalten, muss die gesamte BoolQuery in ein "ElasticaQuery" -Objekt eingeschlossen werden.
Dies könnte z.B. folgendermassen gehen:

    
    $query = new Query();
    // Code von oben
    $query->setQuery ($overallQuery);


Und um die Paginierung zum Laufen zu bringen:

`$elasticaFinder->createPaginatorAdapter($query);`
