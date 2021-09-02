<template>
<!-- eslint-disable  -->
	<h1>Log In</h1>
	<form v-on:submit.prevent="logInUser">
		
		<label for="email"></label>
		<input type="email" v-model="email" placeholder="Enter your email" id="email" ref="firstField" required><br>
		
		<label for="password"></label>
		<input v-model="password" id="password" type="password" placeholder="Enter your password" required><br/>
		
		
		<button :disabled="!isFormValid">Log in</button>
		
	</form>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
	name: "LogInForm",
	emits: ["loginUser"],
	setup(props, context) {
		const email = ref("");
		const password = ref("");
		const firstField = ref(null);

		function logInUser() {
			const user = {
				email : email.value,
				password : password.value,
			};
			context.emit('loginUser', user);
		}

		// Focus de la souris sur le 1er champ text au chargement de la page
		onMounted( () => {
			firstField.value.focus();
		})


		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'login'
		const isFormValid = computed(() => {
			if (email.value !== "" && password.value !== "") {
				return true;
			} else {
				return false;
			}
		})

		return { email, firstField, password, logInUser, isFormValid };

	},
};
</script>

<style lang="scss" scoped>
	
	h1 {
		width: 85%;
		margin: 20px auto 30px;
		text-align: left;
		color: #182D80;
	}
	form {
		width: 85%;
		max-height: 65%;
		margin: 10px auto;
		text-align: left;
		// border: 1px solid black;

		.envelope {
			margin-right: 10px;
		}
		.eye {
			margin-left: 10px;
		}

		input {
			width: 250px;
			height: 35px;
			margin: 10px auto 20px;
			padding-left: 2%;
			outline: none;
		}
		button {
			width: 100px;
			margin: 30px auto 0;
			height: auto;
			padding: 2% 1%;
			background-color: #AB1F03;
			color: white;
			border: none;
			font-weight: bold;
			font-size: 18px;
			cursor: pointer;
		}
	}

	@media screen and (max-width: 599px) {
		h1 {
			font-size: 18px;
		}

		form {
			height: 70%;

			input {
				width: 200px;
			}
		}
	}
</style>