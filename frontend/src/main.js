import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Swal from "./useSwal";


createApp(App).use(router).use(store).use(Swal).mount('#app');
