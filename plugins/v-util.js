/**
 * Created by _BOB_ on 02.05.2020.
 */

import Vue from "vue";


export default () => {
    Vue.directive('numberOnly', {
        bind(el, config) {
            // console.log("numberOnly =",config);
            el.inputHandler = function (e) {
                function search(str, char) {
                    for (let i = str.length; i--;) {
                        if (char === str[i]) return i;
                    }
                    return -1;
                }

                if (e.key === '.' && el.value.length === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                console.log(e);
                if (search('1234567890.', e.key) < 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                console.log('el._value =', el._value);
                console.log('el =', this.value);
                // if (e.key === '.' && ((+('' + el._value + '9')) % 1) > 0) {
                if (e.key === '.' && (search('' + el.value, '.') > -1)) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
            };
            el.addEventListener("keypress", el.inputHandler);
        },
        unbind(el) {
            el.removeEventListener("keypress", el.inputHandler);
        },
        update() {
            // console.log('number-only update');
        },
    });
};
