import './bootstrap';
import {createApp} from "vue";
import App from "./App.vue";
import './assets/app.css'
import router from "./router.js";
import store from "./store/store.js";

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
