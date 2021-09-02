<template>
	<div class="background">
			<h3>Write a post</h3>

			<form>
				<div class="formGroup">
					<label for="title"></label>
					<input ref="firstField" type="text" v-model="title" id="title" placeholder="Title"/>
				</div>
			
				<div class="formGroup">
					<label for="content"></label>
					<textarea v-model="content" id="content">
				</textarea>
				</div>

				<div class="formGroup">
					<label class="labelFile">Add an image to your post</label><br>
					<input ref="postImage" type="file" name="postImage" id="imageInput" accept="image/*" @change="onFileSelected">
				</div>

				<div class="buttonContainer">
					<button type="button" @click.prevent="publish" class="button" :disabled="!isFormValid" title="Publish post">Publish</button>
					<button type="button" class="button" @click.prevent="annuler" title="Cancel edition">Cancel</button>
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
		const postImage = ref("");

		// Construire le Form Data
		const postFD = new FormData();

		function onFileSelected(event) {
			postImage.value = event.target.files[0];
			postFD.set('imageURL', postImage.value, postImage.value.name);
		}
		
		const postData = {
			title : '',
			text: ''
		};

		function fillInPostData() {
			postData.title = title.value;
			postData.text = content.value;
			postData.id = store.state.user.id;
			return postData;
		}
			
		// Vider le formulaire après submit
		function resetForm() {
			title.value = "";
			content.value = "";
			postImage.value = "";
			firstField.value.focus();
		}

		// Envoyer un post
		function publish() {
			const postData = fillInPostData();

			// On ajoute le contenu de postData à postFD
			for (let e in postData) {
				postFD.set(e, postData[e]);
			}
			emit('publishPost', postFD);
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

		return {title, content, publish, annuler, isFormValid, firstField, postImage, onFileSelected };
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
		padding: 0 15px 0 0;
		font-size: 14px;
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
			margin: 20px auto;
			height: 400px;
			outline: none;
			padding: 2%;
		}

		label.labelFile {
			font-size: 15px;
			margin: 20px 0;
		}
		
		#imageInput {
			width: 90%;
			margin: 25px auto;
		}
	}
	
	.buttonContainer {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 10px;
	
		.button {
			width: 100px;
			background-color: #AB1F03;
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


	@media screen and (max-width: 599px) {
		.background {
			width: 90%;
			margin: auto;
			padding: 10px;
			border-radius: 0;
			left: 0;

			h3 {
				width: 90%;
				margin: 10px auto;
			}
			top: 10%;
		}
		form {
			width: 90%;
			margin: auto;
			padding: 0;
		}

		.buttonContainer {
			width: 80%;
			margin: 10px auto;
			justify-content: space-between;
		}
	}
</style>