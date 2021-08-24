<template>
	<!-- eslint-disable  -->
	<nav-bar></nav-bar>
	<div class="home">
		<ModalPostForm @publishPost="createPost" @cancel="cancelEdition" v-if="editMode"/>
	
		<h1>
			<img src="../assets/dev_images/hello.svg" />
			Hello {{ $store.state.user.firstName }}
		</h1>

		<h2>Welcome to Groupomania's workplace social network.</h2>
		<h3>Here you can interacte with your co-workers at all times and share your thoughts with the community ! <br/>What's on your mind today?</h3>


		<div class="userActionsContainer">
			<!-- Recherche par filtre -->
			<input class="filterBox" type="text" placeholder="Filter posts by title" v-model="letters" @keyup="filter" />

			<button v-on:click="triggerEdition">Write a post</button>

		</div>

		<div v-if="submitted" class="submissionSuccess">
			<h4>You've submitted successfully!</h4>
		</div>

		<!-- Affichage des posts -->
		<div class="wallContainer">
			<div class="post" v-for="post in posts" :key="post.id">
				<Post :authorFname="post.userId" :authorLname="post.userId" :publicationDate="post.createdAt" :postContent="post.publicationText" :postTitle="post.title" :nbLikes="post.likes" :authorId="post.userId"></Post>
			</div>
		</div> 


	</div>
</template>

<script>
import ModalPostForm from "@/components/PostForm.vue";
import NavBar from '../components/NavBar.vue';
import Post from '../components/Post.vue';
import { ref } from 'vue';
import {useStore} from 'vuex';

export default {
	name: "Home",
	components: { ModalPostForm, NavBar, Post },
	setup() {
		// Données et variables
		const store = useStore();

		const editMode = ref(false);
		const submitted = ref(false);
		const letters = ref("");
	
		let postToEdit = ref(null);
		const posts = ref([]);
		
		
		// Récupérer les posts
		async function retrievePosts() {
			const result = await store.dispatch('fetchAllPosts');
			console.log('home after fetch result', result);
			posts.value = result;
			console.log('home posts value', posts.value);
			return posts;
		}

		retrievePosts();




		//Suppression d'un post
		//function deletePost(id) {
		//	postService.deletePost(id);
		//	// rafraichir le contenu du tableau pour maj sans rechargement de la page
		//	posts.value = postService.getAll();
		//	filter();
		//}

		function triggerEdition() {
			editMode.value = true;
		}

		// Fonction qui récupère la tâche à éditer
		function toggle(post) {
			postToEdit.value = post;
			// Variable booleenne qui permet d'afficher le modal
			editMode.value = true;
		}

		// Annuler l'édition
		function cancelEdition() {
			editMode.value = false;
		}
		
		function createPost(data) {
			console.log(data);
			submitted.value = true;
		}

		return { createPost, toggle, editMode, posts, letters, triggerEdition, cancelEdition, submitted };
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 75%;
	margin: 0 auto;
	z-index: -1000;
	padding: 3%;
}
h1 {
	display: flex;
	align-items: center;
	margin: 0 auto 50px;

	img {
		width: 30px;
		margin-right: 10px;
	}
}

h3 {
	letter-spacing: 1px;
	line-height: 30px;
}

.userActionsContainer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	margin: 80px auto 60px;
	// border: 1px blue solid;

	.filterBox {
		width: 300px;
		height: 40px;
		// margin-right: 50px;
		outline: none;
		border: none;
		border-radius: 3px;
		padding-left: 1%;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
	}

	button {
		width: 200px;
		font-size: 16px;
		padding: 12px;
		background-color: rgb(230, 57, 20);
		// fc3914;
		color: white;
		border: none;
		font-weight: bold;
		border-radius: 3px;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
		cursor: pointer;
	}
}

div.submissionSuccess {
	width: 60%;
	height: 40px;
	background-color: #42b983;
	border: 1px solid #d6e9c6;
}

.wallContainer {
	width: 90%;
	margin: 10px auto 40px;
	padding: 2% 0;
	// border: 1px solid black;
}

</style>