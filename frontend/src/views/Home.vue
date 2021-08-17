<template>
	<!-- eslint-disable  -->
	<nav-bar></nav-bar>
	<div class="home">
		<ModalPostForm @publishPost="createPost" v-if="editMode"/>
	
		<h1>
			<img src="../assets/dev_images/hello.svg" />
			Hello {{ firstName }}
		</h1>

		<h2>Welcome to Groupomania's workplace social network.</h2><br>
		<h3>Here you can interacte with your co-workers at all times and share your thoughts with the community ! <br/>What's on your mind today?</h3>


		<div class="userActionsContainer">
			<!-- Recherche par filtre -->
			<input class="filterBox" type="text" placeholder="Filter posts by title" v-model="letters" @keyup="filter" />

			<button v-on:click="triggerEdition">Write a post</button>

		</div>

		<div v-if="submitted" class="submissionSuccess">
			<h4>You submitted successfully!</h4>
		</div>

		<!-- Affichage des posts -->
		<div class="wallContainer" v-show="filteredPosts.length > 0">
			<div class="post" v-for="post in posts.value" :key="post.id">
				<h4>{{ post.title }}</h4>
				<p>{{ post.publicationText }}</p>
				<div>
					<button class="button" @click="() => deletePost(post.id)">Supprimer</button>
					<button class="button" @click="() => toggle(post)">Modifier</button>
				</div>
			</div>
		</div> 


	</div>
</template>

<script>
// @ is an alias to /src
import postService from "@/services/posts.js";
// import getAll from "@/services/posts";
import userService from "@/services/users.js";
import ModalPostForm from "@/components/PostForm.vue";
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';

export default {
	name: "Home",
	components: { ModalPostForm, NavBar },
	setup() {
		let firstName = userService.firstName;
		
		const editMode = ref(false);
		const submitted = ref(false);
		const letters = ref("");
	
		let postToEdit = ref(null);
		let filteredPosts = ref([]);

		// Récupérer les posts
		const posts = ref([]);
		const { response } = postService.getAll();
		posts.value = response;
		

		// Affichage des posts et Filtrage sur les titres
		function filter() {
			if (letters.value.length === 0) {
				console.log("Home", response);
				filteredPosts = response;
			} else {
				filteredPosts.value = posts.value.filter( (p) => p.title.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase()));
			}
		}
		filter();

		function createPost(data) {
			console.log(data);
			postService.create(data);
			submitted.value = true;
		}

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
		//function cancelEdition() {
		//	editMode.value = false;
		//}

		return { createPost, toggle, firstName, editMode, posts, letters, triggerEdition, filteredPosts, submitted };
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 65%;
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
	width: 50%;
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
	margin: 40px auto;
	padding: 2% 0;
	border: 1px solid black;
	
	.post {
		height: 150px;
		width: 100%;
		margin: 20px auto;
		padding: 8px;
		background-color: white;
		box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
	}
}

</style>