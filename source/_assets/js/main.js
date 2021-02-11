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
window.axios = require('axios');
window.Vue = require('vue');
import Search from './components/Search.vue';

try {
    Vue.config.productionTip = false;
} catch (e) {
    console.error(e)
}

function initializeVue() {
    new Vue({
        components: {
            Search,
        },
    }).$mount('#vue-search');
};

/**
 * Register events of InstantClick
 */

InstantClick.on('change', function () {
    try {
        ga('send', 'pageview', location.pathname + location.search);
    } catch (e) {
        // eighter adblock/tracker blocking or development site
        console.log(e);
    }
    // (re)-initialize search
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
