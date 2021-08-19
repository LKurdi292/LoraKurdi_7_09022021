import { createStore } from 'vuex';

let state = {
	userLogged: false,
	posts: [],
	lastPosts: [],
	user: {
		id: 0,
		firstName: '',
		lastName: '',
		isAdmin: 0,
		email: '',
		password: '',
		bio: '',
	},
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
		state.user = {},
		state.account = {},
		state.comments = []
	}
};

// use asynchronous code here and then commit a mutation to change datain the store
// on dit 'to dispatch actions'
const actions = {
};

// get data from the state - but for example, with some filtering. 
// const getters = {
// 	isUserLogged() {
// 		return state.userLogged;
// 	},
	
// 	getPosts() {
// 		return state.posts;
// 	},
// 	getLastPosts() {
// 		return state.lastPosts;
// 	},
// 	getUserInfo() {
// 		return state.user;
// 	},
// 	getToken() {
// 		return state.token;
// 	},
// 	getComments() {
// 		return state.comments;
// 	}
// };

const store = createStore({
	state,
	mutations,
	actions
});

export default store;