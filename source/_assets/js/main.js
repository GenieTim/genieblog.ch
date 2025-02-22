/**
 * Service Worker setup for offline support
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => {
        console.log("Registration succeeded. Scope is " + reg.scope);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

/**
 * Instant click for perceived performance improvement
 */
const InstantClick = require("instantclick");

/**
 * Search functionality
 */
window.axios = require("axios");
import Alpine from "alpinejs";
import Fuse from "fuse.js";

import highlight from "./highlight_search";
window.highlight_search = highlight;

window.Fuse = Fuse;
window.Alpine = Alpine;

Alpine.start();

/**
 * Register events of InstantClick
 */

InstantClick.on("change", function () {
  try {
    ga("send", "pageview", location.pathname + location.search);
  } catch (e) {
    // eighter adblock/tracker blocking or development site
    console.log(e);
  }
  // (re)-initialize search
  try {
    Alpine.start();
  } catch (e) {
    console.log(e);
  }
  // (re)-initialize mathjax
  try {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  } catch (e) {
    console.log(e);
  }
});
// finally, initialize
InstantClick.init();

/**
 * Math. Possibly better to do serverside?
 */
require("./mathjax-config");
// const MathJax = require('mathjax/es5/tex-svg')
// InstantClick.on('change', () => {
//     MathJax.typeset()
// })
