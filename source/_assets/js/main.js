/**
 * Service Worker setup for offline support
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                console.log('Registration succeeded. Scope is ' + reg.scope);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

/**
 * Instant click for perceived performance improvement
 */
const InstantClick = require('instantclick');

/**
 * Search functionality
 */
import Search from './components/Search.vue';
window.axios = require('axios');
window.Vue = require('vue');

Vue.config.productionTip = false;

let initializeVue = function () {
    new Vue({
        components: {
            Search,
        },
    }).$mount('#vue-search');
};

initializeVue();

/**
 * Register events of InstantClick
 */

InstantClick.on('change', function () {
    try {
        ga('send', 'pageview', location.pathname + location.search);
    } catch(e) {
        // eighter adblock/tracker blocking or development site
        console.log(e);
    }
    // re-initialize search
    initializeVue();
});
// finally, initialize
InstantClick.init();

/**
 * Math. Possibly better to do serverside?
 */
require('./mathjax-config');
// const MathJax = require('mathjax/es5/tex-svg')
// InstantClick.on('change', () => {
//     MathJax.typeset()
// })
