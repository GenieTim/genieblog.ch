---
author: Tim Bernhard
comments: true
date: 2014-11-25 11:00:38+00:00
layout: post
link: http://genieblog.ch/logarithmen-von-hand-ziehen/
slug: logarithmen-von-hand-ziehen
title: Logarithmen von Hand ziehen
wordpress_id: 14
categories:
  - HTML5
  - JavaScript
  - Computer
  - JavaScript
  - Logarithmus
  - Mathematics
  - Taschenrechner
draft: false
template: post
description: false
social_image: false
extends: _layouts.post
language: en
cover_image: 2014/log.png
---

How does a calculator draw the logarithm? I would like to investigate this question in this article and use HTML and JavaScript to program the first step of a corresponding logarithmic puller.

## From logb () to lg ()

First, it is worth looking at the conversion formula for the log of ten: logb (x) = loga (x) / loga (b)
Thus logb (x) = log10 (x) / log10 (b) and the only logarithm that still has to be drawn is the decadic one, also written as lg ().

What is that supposed to achieve? The logarithm of 10 is worlds easier than most other numbers.
In addition, you only have to program a way in which the logarithm should be drawn, and not a separate path for every other logarithm.

## Draw the logarithm of 10

So far so good.
This allows us to concentrate entirely on taking the logarithm of 10. Let's start with the HTML: we create a form in which the user enters the number from which they wants to have taken the 10th logarithm.
Since we do not want to use `Math.log ()` or similar, we will also do without `Math.pow ()` and jQuery.
The fact that the code no longer looks so elegant is irrelevant here - it has to serve the purpose.
It could look like this:

    
    <code class="language-markup"><form> 
    <-- An Input field for the number --> 
    <input type="text" id="zahl" size="40" placeholder="Zehnerlogarithmus von..." /> 
    <-- a Button to start the calculations (der losHandler() is started) since we write this program only for demo purposes, it is justifiable that we hide a little script in the HTML code (onclick) and disregard the strict separation of model, view and controller --> 
    <input type="button" id="los" value="Los!" onClick="losHandler(); return false;" /> 
    </form>
    <-- and an output paragraph for the result. --> 
    <p id="ergebnis"></p>

Then we write the `losHandler()`. This should be able to read and use the user input and start the true logarithm function.
This is how you can solve it:

    
    function ausweg(eingabe) {
        /* If the user types in a number smaller than 1, we are powerless with our method */
        return Math.log(eingabe) / Math.LN10;
    }
    function losHandler() {
        /* keep the base variable for possible later versions */
        var basis = 10;
        /* read the input */
        var eingabe = document.getElementById("zahl");
        /* prepare the output */
        var ergebnis = document.getElementById("ergebnis");
        ergebnis.innerHTML = "";
        eingabe = parseFloat(eingabe.value);
        /* validate the input */
        if (eingabe === null) {
            alert("No input found!");
        }
        /* for different Browsers, and to be sure... */
        else if (eingabe === "") {
            alert("No input found!");
        } else if (eingabe === undefined) {
            alert("No input found!");
        } else if (isNaN(parseInt(eingabe))) {
            alert("Please only enter numbers!");
        } else if (eingabe < 0) {
            alert("Please only enter numbers bigger than 0!");
        /* otherwise, output result */
        } else if (eingabe < 1) {
            ergebnis.innerHTML = "log<sub>" + basis + "</sub>" + eingabe + " = " + ausweg(eingabe);
        } else {
            ergebnis.innerHTML = "log<sub>" + basis + "</sub>" + eingabe + " = " + log(eingabe, basis);
        }
    }

The way out is necessary because the function we are writing will not be able to process inputs less than 1.
Now we come to the function `log()`, the heart of our artwork, which calculates the logarithm of base ten:

    
    function log(wert, basis) {
        var zahl = wert;
        var gesucht = "";
        /* eigentliche Rechnung.
Gibt den Logarithmus mit 15 Stellen aus */
        for (var i = 0; i < 15; i++) {
            var a; c = 0;
            for (a = 0; zahl >= power(basis, a); a++) {
                c++;
            }
            c = c - 1;
            zahl = zahl / (power(basis, c));
            zahl = power(zahl, basis);
            gesucht += c;
            if (i === 0) {
                gesucht += ".";
            }
        }
        return gesucht.replace("0000000000", "0");
    }

We always limit ourselves to one digit, more precisely: to the _i-_th digit.
We then count up the temporary number c in steps of one until it is greater or corresponds to the value entered the first time, the other times the entry without the first_i_ digits.
The rear digits are moved to the front with `number = power (number, base)`.

And what does `power ()` stand for? This is our replacement for `Math.pow ()`. Yes, admittedly, this choice of name is not very imaginative.
For this purpose.
The function `power ()` is not very difficult and quite self-explanatory:

    
    function power(basis, exponent) {
        /* damit Potenzgesetze eingehalten werden */
        if (exponent === 0) {
            return 1;
        }
        /* Potenzfunktion */
        else {
            var k = basis;
            for (var u = 1; u < exponent; u++) {
                k = k * basis;
            }
            return k;
        }
    }

This completes our code.
If our code is not clear, write your question in the comments.

Test the code here:
<iframe src="http://jsfiddle.net/BernhardWebstudio/vx7m21nd/16/embedded/result,js,html" allowfullscreen="allowfullscreen" width="100%" height="300" frameborder="0"></iframe>
