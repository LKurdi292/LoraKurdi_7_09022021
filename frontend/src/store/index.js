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
	allUsers: []
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
		const posts = state.posts;
		posts.forEach(post => {
			if (!post.usersLiked) {
				const index = state.posts.indexOf(post);
				post = { ...post, usersLiked};
				state.posts.splice(index, 1, post);
			}
		});
	},
	ADD_NEW_POST(state, post) {
		const usersLiked = [];
		post = { ...post, usersLiked};
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
	ADD_FALSE_IMAGE_TO_AUTHORS(state) {
		const posts = state.posts;
		posts.forEach(post => {
			if (post.User.imageURL == null) {
				const index = state.posts.indexOf(post);
				post.User.imageURL ="@/assets/user-regular.svg";
				if (post.Comments.User.imageURL == null) {
					post.Comments.User.imageURL ="@/assets/dev_images/user-regular.svg";
				}
				state.posts.splice(index, 1, post); 
			}
		});
	},
	CLEAR_STORE(state) {
		state.posts = [],
		state.user = {},
		state.subscribed = Date,
		state.token = '',
		state.allUsers = [],
		state.userLogged = false
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
	async fetchUpdateAccount (context, formData) {
	
		const response = await userService.updateAccount(formData, state.user.id, state.token);
	
		if (response.status === 200) {
			context.commit("SET_USER_INFO", response.data.user);
			return true;
		}
	},

	// Delete Account
	async fetchDeleteAccount (context, id) {
		const response = await userService.deleteAccount(id, state.token);
		if (response.status === 200) {
			context.commit('CLEAR_STORE');
			return true;
		}
	},

	// Get All Posts
	async fetchAllPosts (context) {
		const response = await postService.getAllPosts(state.token);
		if (response.status === 200) {
			context.commit('SET_POSTS', response.data.posts);
			context.commit('ADD_USERSLIKED_TO_POST');
		}
	},
	
	// Create a post
	async fetchCreatePost (context, postData) {
		const response = await postService.createPost(postData, state.token);
		if (response.status == 201) {
			context.commit('ADD_NEW_POST', response.data.newPost);
			return true;
		}
	},

	// Delete a post
	async fetchDeletePost(context, id) {
		const token = context.getters.getToken;
		const response = await postService.deletePost(id, token);
		if (response.status == 200) {
			context.commit('DELETE_POST', response.data.posts);
			context.commit('ADD_USERSLIKED_TO_POST');
			return true;
		}
	},

	// Like a post
	async fetchLikePost(context, toSend) {
		const token = context.getters.getToken;
		const response = await postService.likePost(toSend, token);
		if(response.status == 201) {
			context.commit('LIKE_POST', response.data.posts);
			context.commit('ADD_USERSLIKED_TO_POST');
		}
	},

	// Create a comment
	async fetchCreateComment(context, commentData) {
		const created = await commentService.createComment(commentData, state.token);
		return created;
	},

	// Delete a comment
	async fetchDeleteComment(context, id){
		const response = await commentService.deleteComment(id, state.token);
		if (response.status == 200 ) {
			context.commit('SET_POSTS', response.data);
			context.commit('ADD_USERSLIKED_TO_POST');
			return true;
		}
	},

	//Like a comment
	async fetchLikeComment(context, data) {
		const id = data.id;
		const body = {
			userId: data.userId,
			like: data.like
		};
		const response = await commentService.likeComment(id, body, state.token);

		if (response.status === 200) {
			context.commit('SET_POSTS', response.data);
			context.commit('ADD_USERSLIKED_TO_POST');
			return true;
		}
	},

	//Get all users for admin
	async fetchAllUsers(context, id) {
		const response = await userService.getUsers(id, state.token);
		context.commit('SET_ALL_USERS', response.data);
	},

	// Delete user account for admin
	async fetchDeleteUser(context, params) {
		const id = params.id;
		const adminId = params.adminId;
		const response = await userService.deleteUser(id, adminId, state.token);
		context.commit('SET_ALL_USERS', response.data);
		return true;
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