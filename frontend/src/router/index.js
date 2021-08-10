import { createRouter } from "vue-router";
import Home from "../views/Home.vue";
import MyAccount from "../views/MyAccount.vue";
import Auth from "../views/Auth.vue";


const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "signin",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/login",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/myaccount",
    name: "MyAccount",
    component: MyAccount,
  },
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue"),
//   },
];

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
