import { createStore } from 'vuex';
import {computed} from 'vue';
import userService from '@/services/users.js';
import postService from '@/services/posts.js';
import commentService from '@/services/comments.js';


let state = {
	userLogged: false,
	posts: [],
	user: {},
	subscribed: Date,
	token: '',
	lastPosts: [],
	allUsers: [],
};

// methods which change the data that's in the state (synchronous codeonly)
// on dit 'to commit mutations'
const mutations = {
	LOG_USER(state) {
		state.userLogged = true;
	},
	SET_USER_INFO(state, data) {
		state.user = data;
	},
	SET_TOKEN(state, token) {
		state.token = token;
	},
	SET_SUBSCRIPTION_DATE(state, date){
		state.subscribed = date;
	},
	SET_POSTS(state, posts) {
		state.posts = posts;
	},
	ADD_USERSLIKED_TO_POST(state){
		const usersLiked = [];
		state.posts.forEach(post => {
			if (!post.usersLiked) {
				const index = state.posts.indexOf(post);
				post = { ...post, usersLiked};
				state.posts.splice(index, 1, post);
			}
		});
	},
	ADD_NEW_POST(state, post) {
		state.posts = { post, ...state.posts };
	},
	DELETE_POST(state, posts) {
		state.posts = posts;
	},
	LIKE_POST(state, posts) {
		state.posts = posts;
	},
	LIKE_COMMENT(state, posts) {
		state.posts = posts;
	},
	SET_ALL_USERS(state, allUsers) {
		state.allUsers = allUsers;
	},
	CLEAR_STORE(state) {
		state.userLogged = false,
		state.posts = [],
		state.lastPosts = [],
		state.user = null,
		state.comments = [],
		state.token = '',
		state.post = {},
		state.subscribed = Date
	}
};

// use asynchronous code here and then commit a mutation to change data in the store
// on dit 'to dispatch actions'
const actions = {
	// Log in
	async fetchLogIn (context, data) {
		const response = await userService.logIn(data);
		context.commit('SET_USER_INFO', response.data.user);
		context.commit('SET_TOKEN', response.data.token);
		context.commit('SET_SUBSCRIPTION_DATE', response.data.subscriptionDate);
		context.commit('LOG_USER');
		return state.userLogged;
	},

	// Update account
	async fetchUpdateAccount (context, params) {
		const data = params.updateData;
		const id = params.id;
		const response = await userService.updateAccount(data, id, state.token);

		context.commit("SET_USER_INFO", response.data.user);
		return response.data.message;
	},

	// Delete Account
	async fetchDeleteAccount (context, id) {
		const response = await userService.deleteAccount(id, state.token);
		context.commit('CLEAR_STORE');
		return response.data.message;
	},

	// Get All Posts
	async fetchAllPosts (context) {
		const response = await postService.getAllPosts(state.token);
		console.log('fetch allposts: ', response.data.posts);

		context.commit('SET_POSTS', response.data.posts);
		context.commit('ADD_USERSLIKED_TO_POST');
	},
	
	// Create a post
	async fetchCreatePost (context, postData) {
		const response = await postService.createPost(postData, state.token);
		context.commit('ADD_NEW_POST', response.data);
		context.commit('ADD_USERSLIKED_TO_POST');
	}, 

	// Delete a post
	async fetchDeletePost(context, id) {
		const token = context.getters.getToken;
		const response = await postService.deletePost(id, token);
		context.commit('DELETE_POST', response.data.posts);
		context.commit('ADD_USERSLIKED_TO_POST');
	},

	// Like a post
	async fetchLikePost(context, toSend) {
		const token = context.getters.getToken;
		const response = await postService.likePost(toSend, token);
		context.commit('LIKE_POST', response.data);
		context.commit('ADD_USERSLIKED_TO_POST');
	},

	// Create a comment
	async fetchCreateComment(context, commentData) {
		const created = await commentService.createComment(commentData, state.token);
		return created;
	},

	// Delete a comment

	//Like a comment

	//Get all users for admin
	async fetchAllUsers() {
		console.log('before fetch all users: ', state.user.id, state.token);
		const response = await userService.getUsers(state.user.id, state.token);
		console.log('fetch all users: ', response);
	}

};

// get data from the state - but for example, with some filtering. 
const getters = {
	getNumberOfComments: () => {
		return computed(() => state.comments.length);
	},
	getToken: (state) => {
		return state.token;
	}, 
	getUserId: (state) => {
		return state.user.id;
	}

};

const store = createStore({
	state,
	mutations,
	actions,
	getters
});

export default store;