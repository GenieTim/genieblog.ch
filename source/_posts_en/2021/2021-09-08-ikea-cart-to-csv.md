---
author: Tim Bernhard
categories:
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2021/ikea-cart-to-csv
date: 2021-09-08 17:22:48
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

