<template>
	<!-- eslint-disable  -->
	<nav-bar :isAdmin="$store.state.user.isAdmin" @logOut="logOutUser"></nav-bar>
	<div class="home">
		<ModalPostForm @publishPost="createPost" @cancel="cancelEdition" v-show="editMode"></ModalPostForm>
	
		<h1>
			<img src="../assets/dev_images/hello.svg" />
			Hello {{ $store.state.user.firstName }}
		</h1>

		<h2>Welcome to Groupomania's online social network.</h2>
		<h3>Here you can interacte with your co-workers at all times and share your thoughts with the community ! <br/>What's on your mind today?</h3>


		<div class="userActionsContainer">
			<!-- Recherche par filtre -->
			<input class="filterBox" type="text" placeholder="Filter posts by title" v-model="letters" @keyup="filter" />

			<button v-on:click="triggerEdition" title="Write a post">Write a post</button>

		</div>

		<!-- Affichage dynamique après création ou suppression d'un post -->
		<div v-if="submitted" class="submissionSuccess">
			<h4>You've submitted successfully!</h4>
		</div>

		<div v-show="postDeleted" class="deletePostSuccess">
			<h4>Your post have been deleted</h4>
		</div>

		<!-- Affichage des posts -->
		<div class="wallContainer">
			<div class="post" v-for="post in posts" :key="post.id">
				<Post :authorFname="post.User.firstName" :authorLname="post.User.lastName" :publicationDate="post.createdAt" :postContent="post.publicationText" :postTitle="post.title" :nbLikes="post.likes" :authorId="post.userId" :postId="post.id" :comments="post.Comments" :usersLiked="post.usersLiked" @likeApost="likePost" @commentApost="commentPost" @deletePost="postToDelete" @deleteAcomment="deleteComment" @likeAcomment="likeComment">
				</Post>
			</div>
		</div>
	</div>
</template>

<script>
import ModalPostForm from "@/components/PostForm.vue";
import NavBar from '../components/NavBar.vue';
import Post from '../components/Post.vue';
import { computed, ref } from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';


export default {
	name: "Home",
	components: { ModalPostForm, NavBar, Post },
	setup() {
		// Données et variables
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const posts = computed(() => store.state.posts);
		const editMode = ref(false);
		const submitted = ref(false);
		const postDeleted = ref(false);
		const letters = ref("");
		
		// Récupérer et afficher les posts
		async function retrievePosts() {
			await store.dispatch('fetchAllPosts');
		}
		retrievePosts();

		// Afficher le modal
		function triggerEdition() {
			editMode.value = true;
		}

		// Créer un post
		async function createPost(postData) {
			const postAdded = await store.dispatch('fetchCreatePost', postData);

			if (postAdded) {
				// fermer le modal
				editMode.value = false;

				// afficher la div verte pendant 2.5s
				submitted.value = true;

				setTimeout(()=> {
					submitted.value = false;
				}, 2500);

				retrievePosts();
			}
		}

		// Annuler l'édition
		function cancelEdition() {
			editMode.value = false;
		}

		//Suppression d'un post
		async function postToDelete(id) {
			const deletion = await store.dispatch('fetchDeletePost', id);
			
			if (deletion) {
				postDeleted.value = true;

				setTimeout(()=> {
					postDeleted.value = false;
				}, 2500);
			}
		}

		// Aimer un post
		async function likePost(data) {
			const userId = store.state.user.id;
			const toSend = { ...data, userId};
			await store.dispatch('fetchLikePost', toSend);
		}

		// Commenter un post
		async function commentPost(commentData) {
			let created = await store.dispatch('fetchCreateComment', commentData);
			if (created) {
				await store.dispatch('fetchAllPosts');
			}
		}
	
		// Supprimer un commentaire
		async function deleteComment(id) {
			await store.dispatch('fetchDeleteComment', id);
		}
		
		//Aimer un commentaire
		async function likeComment(data) {
			await store.dispatch('fetchLikeComment', data);
		}

		// Log Out
		const goToLogOutPage = () => {
			const redirectLogOut = route.query.redirect || '/logout';
			router.push(redirectLogOut);
		}

		function logOutUser() {
			store.commit('CLEAR_STORE');
			if (!store.state.userLogged) {
				goToLogOutPage();
			}
		}


		return { createPost, editMode, posts, letters, triggerEdition, cancelEdition, submitted, postDeleted, likePost, commentPost, postToDelete, deleteComment, likeComment, logOutUser };
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 75%;
	margin: 0 auto;
	z-index: -1000;
	padding: 3%;
	background-color: rgb(247, 217, 203);
}
h1 {
	text-align: center;
	margin: 0 auto 50px;

	img {
		width: 30px;
		margin-right: 10px;
	}
}

h3 {
	letter-spacing: 1px;
	// font-size: 18px;
	font-weight: normal;
	line-height: 40px;
}

.userActionsContainer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	width: 90%;
	margin: 80px auto 60px;
	// border: 1px blue solid;

	.filterBox {
		font-size: 16px;
		width: 300px;
		height: 40px;
		outline: none;
		border: none;
		border-radius: 3px;
		padding-left: 1%;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
	}

	button {
		width: 200px;
		font-size: 18px;
		padding: 12px;
		background-color: rgb(230, 57, 20);
		color: white;
		border: none;
		font-weight: bold;
		border-radius: 3px;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
		cursor: pointer;
	}
}

div.submissionSuccess, div.deletePostSuccess {
	height: 40px;
	background-color: #42b983;
	border: 1px solid #d6e9c6;
	display: flex;
	justify-content: center;
	align-items: center;

		h4 {
			margin: 0;
		}
}

.wallContainer {
	width: 70%;
	margin: 10px auto 40px;
	padding: 2% 0;
	// border: 1px solid black;
}

</style>