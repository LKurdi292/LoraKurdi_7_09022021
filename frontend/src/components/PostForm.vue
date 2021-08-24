<template>
	<div class="background">
		<div class="edition">
			<h3>Write or Edit a Post</h3>

			<form @submit.prevent="publish">
				<input type="text" v-model="title" placeholder="Title"/><br />
			
				<textarea v-model="content" cols="120" rows="30"></textarea><br />
				<div class="buttonContainer">
					<button class="button" :disabled="!isFormValid">Publish</button>
					<button class="button" @click="cancel" :disabled="!isFormValid">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
	name: "ModalPostForm",
	emits: ["cancel", "publishPost"],
	setup(props, context) {
		const title = ref("");
		const content = ref("");
		const image = ref("");

		const fd = new FormData();
		fd.append('image', image);
		fd.append('title', title);
		fd.append('text', content);

		function publish(fd) {
			// let post = {
			// 	title: title.value,
			// 	text: content.value,
			// }
			// console.log('post', post);
			// Envoyer au parent: Home.vue
			context.emit('publishPost', fd);
		}

		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'creer' une tâche
		const isFormValid = computed(() => {
			if (title.value !== "" && content.value !== "") {
				return true;
			} else {
				return false;
			}
		});

		// Annuler l'édition
		function cancel() {
			title.value = "";
			content.value = "";
			image.value = "";
			context.emit("cancel");
		}

		return {title, content, publish, cancel, isFormValid };
	},
};
</script>

<style lang="scss" scoped>
	.background {
		position: absolute;
		height: 400px;
		z-index: 999;
		background-color: white;
		top: 25%;
		left: 15%;
		width: 60%;
		margin: auto;
		display: table;
		transition: opacity 0.3s ease;
		border-radius: 10px;
		box-shadow: 1px 2px 12px rgba(0, 0,0, 0.6);
	}
	
	.edition {
		padding: 20px;
		margin: auto 10px;
		height: 90%;
		border: 1px dashed violet;
		h3 {
			margin: 0 0 20px 0;
		}
	}

	form {
		width: 100%;
		font-size: 18px;
		input {
			outline: none;
			height: 25px;
			margin: 10px 0;
			width: 300px;
			padding: 0 0.5%;

		}
		textarea {
			outline: none;
			padding: 1%;
		}
		// border: 1px red solid;

		.buttonContainer {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

	}

	.button {
		width: 100px;
		background-color: rgb(230, 57, 20);
		border: none;
		font-weight: bold;
		color: white;
		margin: 6px;
		padding: 12px;
		border-radius: 5%;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
	}
</style>