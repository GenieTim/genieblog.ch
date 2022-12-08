---
author: Tim Bernhard
categories:
  - JavaScript
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2021/ikea-cart-to-csv
date: 2021-09-08 17:22:48
updated: 2022-12-08 21:51:26
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: ikea-cart-to-csv
social_image: false
template: post
title: "Ikea Cart to CSV"
translations:
  en: ikea-cart-to-csv
  de: ikea-warenkorb-zu-csv

---

Some time ago, I ordered online in Ikea. As some of the stuff was not to be paid by me, I wanted a list of everything I bought, preferrably immediately available in Excel.
Thanks to some JavaScript and Developer Console magic, this is thankfully easily possible. 

In case you want to do the same and are too lazy to type the code yourself, here it is for copy-pasting:

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

