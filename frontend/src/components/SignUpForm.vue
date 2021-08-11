<template>
<!-- eslint-disable  -->
	<h1>Sign Up</h1>
	<form v-on:submit.prevent="createUser">
		<input type="text" v-model="email" placeholder="Enter your email" id="email" ref="firstField"><br/>

		<input type="text" v-model="lastName" id="lastName"><br/>

		<input type="text" v-model="firstName" id="firstName"><br/>

		<input type="text" v-model="password" id="password" placeholder="Choose a password"><br/>

		<label for="account">Account</label><br/>
		<select v-model="account" id="account">
			<option v-for="account in accountTypes" :value="account.value" :key="account.id" >{{ account.name }}</option>
		</select><br/>

		<button :disabled="!isFormValid">Create account</button>
	</form>
	
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
	name: "SignUpForm",
	emits: ["createuser"],
	setup(context) {
		const email = ref("");
		const lastName = ref("");
		const firstName = ref("");
		const password = ref("");
		const accountTypes = ref([
			{
				id: 1,
				name: 'Default',
				value: 'default'
			},
			{
				id: 2,
				name: 'Admin',
				value: 'admin'
			}
		]);
		const account = ref("");
		const firstField = ref(null);

		function createUser() {
			const user = {
				email : email.value,
				lastName : lastName.value,
				firstName : firstName.value,
				password : password.value,
				account : account.value
			}
			// Envoyer à la vue parent 'auth' l'évènement et le user créé
			context.emit('createuser', user);
			resetForm();
		}

		// Focus de la souris sur le 1er champ text au chargement de la page
		onMounted( () => {
			firstField.value.focus();
		})

		// Vider le formulaire après submit
		function resetForm() {
			email.value = "",
			firstName.value = "",
			lastName.value = "",
			password.value = "",
			// Focus sur le 1er input après submit
			firstField.value.focus();
		}

		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'create account'
		const isFormValid = computed(() => {
			if (email.value !== "" && firstName.value !== "" && lastName.value !== "" && password.value !== "" && account.value !== "") {
				return true;
			} else {
				return false;
			}
		})

		return { email, firstField, lastName, firstName, password, accountTypes, account, createUser, isFormValid };

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

		input, select {
			width: 250px;
			height: 35px;
			margin: 10px auto 20px;
			padding-left: 2%;
		}
		button {
			width: 100px;
			margin: 30px auto 0;
			height: auto;
			padding: 2% 1%;
			background-color: #fc3914;
			color: white;
			border: none;
			font-weight: bold;
			font-size: 18px;
			cursor: pointer;
		}
	}
</style>