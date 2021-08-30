<template>
	<div class="background">
			<h3>Write a post</h3>

			<form>
				<input ref="firstField" type="text" v-model="title" placeholder="Title"/><br />
			
				<textarea v-model="content">
				</textarea>
				<div class="buttonContainer">
					<button type="button" @click.prevent="publish" class="button" :disabled="!isFormValid" title="Publish post">Publish</button>
					<button type="button" class="button" @click.prevent="annuler" title="Cancel">Cancel</button>
				</div>
			</form>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import {useStore} from 'vuex';

export default {
	name: 'ModalPostForm',
	emits: ['publishPost', 'cancel'],
	setup(props, { emit }) {
		// Données et variables
		const store = useStore();
		const firstField = ref(null);

		const title = ref("");
		const content = ref("");
		// const image = ref("");

		// const fd = new FormData();
		// fd.append('image', image);
		// fd.append('title', title);
		// fd.append('text', content);

		const postData = {
			title : '',
			text: '',
			// imageURL: ''
		};

		function fillInPostData() {
			postData.title = title.value;
			postData.text = content.value;
			// postData.imageURL = image.value;
			postData.id = store.state.user.id;
			return postData;
		}
			
		// Vider le formulaire après submit
		function resetForm() {
			title.value = "";
			content.value = "";
			firstField.value.focus();
		}

		// Envoyer un post
		function publish() {
			const postData = fillInPostData();
			emit('publishPost', postData);
			resetForm();
		}

		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'Publish'
		const isFormValid = computed(() => {
			if (title.value !== "" && content.value !== "") {
				return true;
			} else {
				return false;
			}
		});

		// Annuler l'édition
		function annuler() {
			title.value = "";
			content.value = "";
			// image.value = "";
			emit('cancel');
		}

		return {title, content, publish, annuler, isFormValid, firstField };
	},
};
</script>

<style lang="scss" scoped>
	.background {
		position: absolute;
		z-index: 999;
		background-color: white;
		top: 20%;
		left: 23%;
		width: 50%;
		margin: auto;
		padding: 25px 15px 0 25px;
		transition: opacity 0.3s ease;
		border-radius: 10px;
		box-shadow: 1px 2px 12px rgba(0, 0,0, 0.6);
		
		h3 {
			margin: 0 0 20px 0;
		}
	}
	
	form {
		width: 100%;
		font-size: 18px;
		padding: 0 15px 0 0;
		// border: 1px red solid;

		input {
			outline: none;
			height: 25px;
			margin: 10px 0;
			width: 50%;
			padding: 0 0.5%;
		}

		textarea {
			width: 95%;
			height: 400px;
			outline: none;
			padding: 2%;
		}
	}
	
	.buttonContainer {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 10px;
	
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
			cursor: pointer;
		}
	}

</style>