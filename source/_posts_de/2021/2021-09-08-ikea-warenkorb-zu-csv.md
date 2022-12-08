---
author: Tim Bernhard
categories:
  - JavaScript
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2021/ikea-warenkorb-zu-csv
date: 2021-09-08 17:22:48
updated: 2022-12-08 21:51:26
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
var productList = document.querySelector("[class*='productList_productlist']")
var products = productList.querySelectorAll("[class*='product_product']")

var csv = "";
for (var i = 0; i < products.length; ++i) {
  try {
    let productName = products[i].querySelector("[itemprop='name']");
    let productDescription = products[i].querySelector("[itemprop='description']");
    let productArticleNr = products[i].querySelector(".cart-ingka-product-identifier__value");
    let productLink = products[i].querySelector("a").href;
    let productDescriptionList = products[i].querySelector("ul[class*='product_descriptionList']")
    let productPrice = productDescriptionList.children[productDescriptionList.children.length - 2];
    let productPriceTotal = products[i].querySelector("[class*='price_total']");
    csv += productName.innerText + "; " + productDescription.innerText + "; " + productArticleNr.innerText + "; " + (productPrice ? productPrice.innerText : "") + "; " + productPriceTotal.innerText + "; " + productArticleNr.innerText + "; " + productLink + "\n";
  } catch (e) {
    console.error(e);
  }
}

console.log(csv)
```
