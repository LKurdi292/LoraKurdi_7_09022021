<template>
<!-- eslint-disable  -->
	<h1>Sign In</h1>
	<form v-on:submit.prevent="createUser">
		<label for="email">Email Adress</label>
		<input type="text" v-model="email" placeholder="Entrez votre adresse email" id="email" ref="firstField">

		<label for="lastName">Last Name</label>
		<input type="text" v-model="lastName" id="lastName">

		<label for="firstName">First Name</label>
		<input type="text" v-model="firstName" id="firstName">

		<label for="password">Password</label>
		<input type="text" v-model="password" id="password">

		<label for="account">Type de compte</label>
		<select v-model="account" id="account">
			<option v-for="account in accountTypes" :value="account.value" :key="account.id" >{{ account.name }}</option>
		</select>

		<button :disabled="!isFormValid">Sign in</button>
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

		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'creer' une tâche
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

<style scoped>
	input, select, button {
	width: 40%;
	margin: 15px auto;
}
</style>