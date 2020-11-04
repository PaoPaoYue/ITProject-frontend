import Vue from 'vue';
import hljs from 'highlight.js';
 
let Highlight = {};
// eslint-disable-next-line
Highlight.install = function (Vue, options) {
    Vue.directive('highlightA', {
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                hljs.highlightBlock(item);
            }
        }
    });
    Vue.directive('highlightB', {
        componentUpdated: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                hljs.highlightBlock(item);
            }
        }
    });
};

Vue.use(Highlight);
 
export default Highlight;
