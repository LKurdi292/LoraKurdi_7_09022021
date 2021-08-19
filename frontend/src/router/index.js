import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";


const routes = [
	{
		path: "/signup",
		name: "signup",
		component: SignUp
	},
	{
		path: "/login",
		name: "login",
		component: LogIn,
	},
	{
		path: "/",
		redirect: {
			name: "login"
		}
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		children: [{ path: 'myaccount/:id', component: Account }]
	},
	// {
	// 	path: "/myaccount/:id",
	// 	name: "Account",
	// 	component: Account,
	// 	props: true
	// },
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
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
