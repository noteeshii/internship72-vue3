<template>
    <xHeader/>
    <router-view/>

    <x-footer/>
</template>

<script>
import xHeader from './Components/x-header.vue'
import XFooter from "./Components/x-footer.vue";
import {currentUserSession} from "./api";

export default {
    name: "App",
    components: {
        XFooter,
        xHeader
    },
    methods: {
        async checkSession() {
            await currentUserSession(session => {
                this.sessionHandler(session);
            });
        },
        sessionHandler(session) {
            if (session === 0) {
                this.$store.commit('destroy');
                localStorage.removeItem('session');
            } else {
                this.$store.commit('refresh', session)
                localStorage.setItem('session', JSON.stringify(session))
            }
        }
    },
    created() {
        this.checkSession();
    },
    beforeUnmount() {
        this.$store.commit('destroy')
        localStorage.removeItem('session');
    }
}
</script>

