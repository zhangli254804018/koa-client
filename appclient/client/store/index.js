import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import menu from './modules/menu'
import users from './modules/users'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    actions,
    getters,
    modules: {
        app,
        menu,
        users
    },
    state: {
        pkg
    },
    mutations: {}
})

export default store