import * as types from '../mutation-types'

const state = {
    user: {
        uid: 0,
        name: 'zhangyuge',
        mobile: '',
        email: '',
        account: 0,
        logining: false,
        token: ''
    }

}

const mutations = {
    [types.RC_USER](state, user) {
        // state.user = user
        Object.assign(state.user, user)
    }
}

export default {
    state,
    mutations
}