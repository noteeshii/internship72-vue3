import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            authUser: null
        }
    },
    mutations: {
        refresh(state, n) {
            state.authUser = n;
        },
        destroy(state) {
            state.authUser = null
            localStorage.removeItem('session');
        },
        changeRole(state, newRoleId) {
            state.authUser.role_id = newRoleId;
            localStorage.setItem('session', JSON.stringify(state.authUser));
        }
    }
})

export default store
