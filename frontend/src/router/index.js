import { createRouter, createWebHistory } from "vue-router";
// import store from "../store";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";


const routes = [
	{
		path: "/signup",
		name: "signup",
		component: SignUp,
		meta: { auth: false }
	},
	{
		path: "/login",
		name: "login",
		component: LogIn,
		meta: { auth: false }
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
		meta: { auth: true },
		children: [{ path: 'myaccount/:id', component: Account, meta: { auth: true} }]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});


// Naviguation guards
// router.beforeEach((to, next) => {
// 	// s'il faut être authentifié mais que l'utilisateur n'est pas connecté, le rediriger vers la page login
// 	console.log("router before, userLogged: ", store.state.userLogged);
// 	if (to.meta.auth && !store.state.userLogged) {
// 		next('/login');
// 		return
// 	} else if (to.meta.auth && store.state.userLogged ) {
// 		console.log("router, user should be logged");
// 		next();
// 	}
// });

export default router;
