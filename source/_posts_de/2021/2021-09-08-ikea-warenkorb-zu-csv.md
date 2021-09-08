---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: "https://www.genieblog.ch/blog/de/2021/ikea-warenkorb-zu-csv"
date: 2021-09-08 17:22:48
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: ikea-warenkorb-zu-csv
social_image: false
template: post
title: "Ikea Warenkorb zu CSV"
translations:
  en: ikea-cart-to-csv
  de: ikea-warenkorb-zu-csv

---

Vor einiger Zeit habe ich online bei Ikea bestellt. 
Da einige der Sachen nicht von mir bezahlt werden sollten, wollte ich eine Liste von allem, was ich gekauft habe, vorzugsweise sofort in Excel verfügbar.
Dank etwas JavaScript und Developer-Console-Magie ist dies glücklicherweise leicht möglich.

Falls Sie dasselbe tun möchten und zu faul sind, den Code selbst einzutippen, hier ist er zum Kopieren und Einfügen:

```javascript
var products = document.querySelectorAll(".product")

var csv = "";
for (var i = 0; i < products.length; ++i) {
  try {
    let productName = products[i].querySelector(".product__name");
    let productDescription = products[i].querySelector(".product_description-type");
    let productArticleNr = products[i].querySelector(".product_description-article-number");
    let productLink = productName.querySelector("a").href;
    let productPrice = products[i].querySelector(".product__price-regular");
    let productPriceTotal = products[i].querySelector(".product__total");
    csv += productName.innerText + "; " + productDescription.innerText + "; " + productArticleNr.innerText + "; " + (productPrice ? productPrice.innerText : "") + "; " + productPriceTotal.innerText + "; " + productArticleNr.innerText + "; " + productLink + "\n";
  } catch (e) {
    console.error(e);
  }
}

console.log(csv)
```
