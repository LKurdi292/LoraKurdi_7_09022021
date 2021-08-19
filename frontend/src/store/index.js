import { createStore } from 'vuex';
import {readonly, computed} from 'vue';
// import { useRoute, useRouter} from 'vue-router';
// const route = useRoute();
// const router = useRouter();

let state = {
	userLogged: false,
	posts: [],
	lastPosts: [],
	post: null,
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
	async fetchUserForLogIn ({commit}, data) {
		const url="http://localhost:3000/api/auth/login";
	
		let isLogged = false;

		try {
			let res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data)
			});
			if (res.status === 200){
				const response = await res.json();
				console.log("fetch, response: ", response);

				const userInfo = response.user;
				commit('SET_USER_INFO', userInfo);

				commit('SET_TOKEN', response.token);
				commit('LOG_USER');

				console.log(' state userLogged', state.userLogged);
				console.log(' state token', state.token);
				console.log(' state user', state.user);

				if (state.userLogged) {
					//router.push({name: "Home"});
					isLogged = true;
				}
			} else {
				return "error while fetching";
			}
		} catch (error ) {
			return error;
		}
		return isLogged;
	}

};

// get data from the state - but for example, with some filtering. 
const getters = {
	getNumberOfComments: () => {
		return computed(() => state.comments.length);
	}

};

const store = createStore({
	state: readonly(state),
	mutations,
	actions,
	getters
});

export default store;