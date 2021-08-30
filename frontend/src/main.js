import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Swal from "./useSwal";

// Font-Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';

import { faTrash, faHome, faSignOutAlt, faPen, faUser, faUserCircle, faLock, faEnvelope, faHeart, faComment, faEye, faThumbsUp, faChevronCircleRight, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrash, faHome, faSignOutAlt, faPen, faThumbsUp, faUser, faUserCircle, faLock, faEnvelope, faHeart, faComment, faEye, faThumbsUp, faChevronCircleRight, faUsersCog);

createApp(App).use(router).use(store).use(Swal).component('fas', FontAwesomeIcon).mount('#app');
