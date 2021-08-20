import { createStore } from 'vuex';
import {computed, isProxy} from 'vue';
import userService from '@/services/users.js';


let state = {
	userLogged: false,
	posts: [],
	lastPosts: [],
	user: null,
	// {
		// 	id: 0,
		// 	firstName: '',
		// 	lastName: '',
		// 	isAdmin: 0,
		// 	email: '',
		// 	password: '',
		// 	bio: '',
		// },
	token: '',
	post: null,
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
	
	async fetchLogIn (context, data) {
		
		const response = await userService.logIn(data);
		let token = state.token;
		let user = state.user;

		console.log("sate token before: ", token);
		console.log("state user before: ", user);
		//console.log(isProxy(response.data.user));
	
		//context.commit("SET_USER_INFO", response.data.user);
		// context.commit('SET_TOKEN', response.data.token);
		token = response.data.token;
		user = response.data.user;
		state.token = token;
		state.user = user;
		console.log("state.token after: ", state.token);
		console.log("state.user after: ", state.user);
		context.commit('LOG_USER');

		return state.userLogged;
	}
};

// get data from the state - but for example, with some filtering. 
const getters = {
	getNumberOfComments: () => {
		return computed(() => state.comments.length);
	}

};

const store = createStore({
	state: state,
	mutations,
	actions,
	getters
});

export default store;