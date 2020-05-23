import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
//import verbs from "@/components/langs/_langs.js"

Vue.use(Vuex);


//if (process.client) {
//    var persistedState = createPersistedState({
//    key: 'psyProc',
//    //paths: ['token', 'user',
//    //        //'curLang', 'verbs'
//    //],
//});
//}

const store = () => {
    //const persistedState = window.createPpPersistedState;
    let st = {
        state: {
            screen: {},
            mobileMenuActive: false,
            mobileMenuTransition: false,
            currentEditableProcess: null,
            token: null,
            user: null,
            //curLang: 'en',
            //verbs: verbs['en'],
            isMobile: false,
            blur: false,
            testData: '',
        },
        mutations: {
            testData(state, v) {
                state.testData = v;
            },
            currentEditableProcess(state, v) {
                state.currentEditableProcess = v;
            },
            mobileMenuActive(state, v) {
                state.mobileMenuTransition = true;
                state.mobileMenuActive = v;
            },
            mobileMenuTransitionEnd(state, v){
                state.mobileMenuTransition = false;
            },
            screen(state, v) {
                state.screen = v;
            },
            isMobile(state, v) {
                state.isMobile = v;
            },

            user(state, v) {
                state.user = v;
            },
            token(state, v) {
                state.token = v;
            },
            curLang(state, v) {
                state.curLang = v;
                state.verbs = verbs[v];
            },
            blur(state, v) {
                state.blur = v;
            },
        },
        actions: {},
        getters: {
            //balance(state) {
            //    return state.walletList.reduce((s, v) => s += v.confirmed_balance * v.currency_price_usd, 0)
            //},
        },
        plugins: [],
    };

    //if(process.client) {
    //    console.log('persistedStatepersistedStatepersistedStatepersistedStatepersistedState');
    //    st.plugins.push(persistedState);
    //}

    return new Vuex.Store(st);
};

export default store;
