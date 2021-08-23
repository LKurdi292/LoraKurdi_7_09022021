import { createStore } from 'vuex';
import {computed, isProxy} from 'vue';
import userService from '@/services/users.js';


let state = {
	userLogged: false,
	posts: [],
	lastPosts: [],
	user: {},
	subscribed: Date,
	token: '',
	post: {},
	comments: []
};

// methods which change the data that's in the state (synchronous codeonly)
// on dit 'to commit mutations'
const mutations = {
	LOG_USER() {
		state.userLogged = true;
	},
	UNLOG_USER() {
		state.userLogged = false;
	},
	ADD_POST(post) {
		state.posts = { post, ...state.posts };
	},
	UPDATE_LAST_POSTS(post) {
		state.lastPosts = { post, ...state.lastPosts };
	},
	ADD_COMMENT(comment) {
		state.comments = { ...state.comments, comment };
	},
	SET_USER_INFO(data) {
		console.log("commit data: ", data);
		console.log(isProxy(data));
		state.user = data;
	},
	SET_TOKEN(token) {
		state.token = token;
	},
	SET_NEW_PROFILE(newAccountInfo) {
		state.user = newAccountInfo;
	},
	CLEAR_STATE() {
		state.userLogged = false,
		state.posts = [],
		state.lastPosts = [],
		state.user = null,
		state.comments = []
	}
};

// use asynchronous code here and then commit a mutation to change data in the store
// on dit 'to dispatch actions'
const actions = {
	// Log in
	async fetchLogIn (context, data) {
		const response = await userService.logIn(data);
		let token = state.token;
		let user = state.user;
		let subscriptionDate = state.subscribed;
	
		//context.commit("SET_USER_INFO", response.data.user);
		// context.commit('SET_TOKEN', response.data.token);
		token = response.data.token;
		user = response.data.user;
		subscriptionDate = response.data.subscriptionDate;
		state.token = token;
		state.user = user;
		state.subscribed = subscriptionDate;

		console.log(state.user);
		context.commit('LOG_USER');

		return state.userLogged;
	},

	//GetAccountInfo
	// Pas besoin de cette route, puisque tout est sauvegardé dans le store

	// Update account
	async fetchUpdateAccount (context, params) {
		const data = params.updateData;
		const id = params.id;
		const response = await userService.updateAccount(data, id, state.token);

		let user = state.user;
		user = response.data.user;
		state.user = user;
		
		return response.data.message;
	},


	// Delete Account
	async fetchDeleteAccount (id) {
		const response = await userService.fetchDeleteAccount(id, state.token);

		let user = state.user;
	}

};

// get data from the state - but for example, with some filtering. 
const getters = {
	getNumberOfComments: () => {
		return computed(() => state.comments.length);
	}

};

const store = createStore({
	state,
	mutations,
	actions,
	getters
});

export default store;