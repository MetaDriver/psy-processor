/**
 * Created by _BOB_ on 26.04.2020.
 */

// ~/plugins/localStorage.js

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    createPersistedState({
        key: 'ppVuexData',
        //paths: [...]
    })(store)
}
