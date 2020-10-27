import Vue from 'vue';
import Hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
 
let Highlight = {};
Highlight.install = function (Vue, options) {
    Vue.directive('highlightA', {
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                Hljs.highlightBlock(item);
            }
        }
    });
    Vue.directive('highlightB', {
        componentUpdated: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                Hljs.highlightBlock(item);
            }
        }
    });
};
 
export default Highlight;