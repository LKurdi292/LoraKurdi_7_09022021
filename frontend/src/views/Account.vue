<template>
	<!-- eslint-disable -->
	<navbar :isAdmin="$store.state.user.isAdmin"></navbar>
	<div class="account">

		<h1>Your Profile</h1>


		<div class="picContainer">
			<div class="roundContainer">
				<img src="" alt="">
			</div>
		</div>

		<p id="subscribed">Subscribed on {{ formattedDate }} </p>


		<p>Type of account: <strong>{{ account }}</strong></p>

		<div class="confirmProfileChangesContainer" v-show="updateDone">
			<p>Your profile has been successfully updated</p>
		</div>

		<form>
			<div class="labelInputContainer">
				<label for="firstName">First Name</label>
				<input id='firstName' type="text" ref="firstField" :value="currentUser.firstName" @change="updateFirstName" alt="Your first name" title="Your first name">
			</div>
			
			<div class="labelInputContainer">
				<label for="lastName">Last Name</label>
				<input id='lastName' type="text" :value="currentUser.lastName" @change="updateLastName" alt="Your last name" title="Your last name">
			</div>

			<div class="labelInputContainer">
				<label for="email">Email</label>
				<input id='email' type="email" :value="currentUser.email" @change="updateEmail" alt="Your email" title="Your email">
			</div>

			<div class="labelInputContainer">
				<label for="password">Actual Password</label>
				<input id='password' type="password" :disabled="!changing" :value="$store.state.user.password" @keyup.enter="checkOldPassword" alt="Your password" title="Your password">
				
				<p v-show="checkingPassword" class="orange">Type your actual password and press enter</p>
				<p class="red" v-show="wrongPassword">Wrong password, try again</p>
			</div>
			
			<div class="chngPassButtonsContainer">
				<button type="button" @click="changePassword" v-if="!changing" title="Change Password">Change Password</button>
				<button type="button" @click="cancelChanging" v-else title="Cancel changing password">Cancel</button>
			</div>

			<div class="labelInputContainer" v-show="displayNewDiv">
				<label for="newPassword" class="bold orange">New Password</label>
				<input id='newPassword' type="password" min="8" max="20" @change="testingNewPassword" v-model="newPassword" alt="Enter new password" title="Enter new password">
			
				<p class="orange" v-show="weakPassword">Your password must be 8 characters long and must contain at least 1 number, 1 capital letter and 1 special character</p>
			</div>


			<div class="labelInputContainer" v-show="confirm">
				<label for="confirm-password" class="bold orange">Confirm new password</label>
				<input id='confirm-password' type="password" maxlength="20" minlength="8" @change="isIdentical" alt="Confirme new password" title="Confirm new password">
				
				<p v-show="!identical" class="red">Doesn't match first entry</p>
			</div>



			<div class="labelInputContainer">
				<label for="bio">Description</label>
				<textarea id='bio' type="text-area" placeholder="Tell us more about yourself" rows="25" cols="25" :value="currentUser.bio" @change="updateBio" alt="Enter a description" title="Enter a description"></textarea>
			</div>

			<div class="EndFormButtonsContainer">
				<button type="submit" @click.prevent="updateProfile" alt="Submit changes" title="Submit changes">Submit changes
				</button>
				<button id="delete" @click.prevent="showAlert" alt="Delete account" title="Delete account">Delete account</button>
			</div>
		</form>

	</div>
</template>

<script>
import Navbar from "../components/NavBar.vue";
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import { useSwal } from "../useSwal";


export default {
	components: { Navbar },
	name: "Account",
	setup() {
		// Données et variables
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		let userId = computed(() => store.state.user.id);
		const subscribed = computed(()=> store.state.subscribed);
		let isAdmin = computed( () => store.state.user.isAdmin);
		let account = ref("");
		const formattedDate = moment(subscribed).format('DD/MM/YYYY');
		let currentUser = computed(() => store.state.user);
		let currentPassword = computed(() => currentUser.value.password);

		//Display account type
		if (isAdmin.value) {
			account.value = 'Admin';
		} else {
			account.value = 'Default';
		}


		// Alert for deleting account
		const Swal = useSwal();

		function showAlert() {
			Swal.fire({
				title: 'Deleting account',
				text: 'Are you sure you want to delete your account?',
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Yes, delete',
				icon: 'question',
				focusConfirm: false,
			}). then((result) => {
				if (result.isConfirmed) {
					deleteAccount();
				}
			})
		}


		const firstField = ref(null);
		const updateMessage = ref("");
		let changing = ref(false);
		let checkingPassword = ref(false);
		let wrongPassword = ref(false);
		let displayNewDiv = ref(false);
		let weakPassword = ref(false);
		let updateDone = ref(false);
		let identical = ref(true);
		let confirm = ref(false);

		let newEmail = "";
		let newPassword = ref("");
		let newFirstName = "";
		let newLastName = "";
		let newBio = "";

		// Fonctions
		function changePassword() {
			changing.value = true;
			checkingPassword.value = true;
			// le reset du password actuel ne marche pas
			currentPassword.value = "";
		}

		function cancelChanging() {
			changing.value = false;
			currentPassword.value = computed(() => store.state.user.password);
			checkingPassword.value = false;
			wrongPassword.value = false;
			confirm.value  =false;
			displayNewDiv.value = false;
			return changing;
		}

		// Vérification que le password tapé correspond à celui enregistré (fonctionne si le reset "" fonctionne)
		function checkOldPassword(e) {
			if (e.target.value !== currentPassword.value) {
				wrongPassword.value = true;
			} else {
				checkingPassword.value = false;
				displayNewDiv.value = true;
			}
		}

		function updateEmail(e) {
			newEmail = e.target.value.trim();
			// console.log("update email: ", newEmail);
		}

		function updateFirstName(e) {
			newFirstName = e.target.value.trim();
			// console.log("update firstName: ", newFirstName);
		}

		function updateLastName(e) {
			newLastName = e.target.value.trim();
			// console.log("update lastName: ", newLastName);
		}

		function updateBio(e) {
			newBio = e.target.value.trim();
			// console.log("update bio: ", newBio);
		}

		// Regex de compléxité du password
		const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		function testingNewPassword(e) {
			if (strongPassword.test(e.target.value)) {
				weakPassword.value = false;
				confirm.value = true;
			} else {
				weakPassword.value = true;
				// isFormValid.value = false;
			}
		}

		const updateData = {
			email : "",
			password : "",
			firstName : "",
			lastName : "",
			bio : ""
		}

		function updatePassword() {
			updateData.password = newPassword.value;
			// console.log("update password: ", newPassword.value);
		}

		// Vérification que les 2 div New password sont identiques
		function isIdentical(e) {
			if (e.target.value !== newPassword.value) {
				identical.value = false;
				// isFormValid.value = false;
			} else {
				// isFormValid.value = true;
				identical.value = true;
				updatePassword();
			}
		}

		// Fonction de remplissage de l'objet updateData pour la requête
		function fillInUpdateData() {
			if (newEmail.length > 0) {
				updateData.email = newEmail;
			} else {
				updateData.email = currentUser.value.email;
			}
	
			if (!newPassword.value.length > 0) {
				updateData.password = currentPassword.value;
			}
	
			if (newFirstName.length > 0) {
				updateData.firstName = newFirstName;
			} else {
				updateData.firstName = currentUser.value.firstName;
			}
	
			if (newLastName.length > 0 ) {
				updateData.lastName = newLastName;
			} else {
				updateData.lastName = currentUser.value.lastName;
			}
	
			if (newBio.length > 0) {
				updateData.bio = newBio;
			} else {
				updateData.bio = currentUser.value.bio;
			}

		}

		// const isFormValid = computed(() => {
		// 	if (updateData.email !== "" && updateData.password !== "") {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// })

		async function updateProfile() {
			// remplissage à l'envoi du formulaire
			fillInUpdateData();
			
			const id = route.params.id;
			const params = {updateData, id};
			
			// appel axios dans les actions du store
			const message = await store.dispatch('fetchUpdateAccount', params);

			// message non utilisé
			updateMessage.value = message;

			// Affichage du message de confirmation d'update puis disparition au bout de 2.5s
			updateDone.value = true;
			setTimeout(()=> {
				updateDone.value = false;
			}, 2500);
		}

		// Suppression de compte et redirection vers la page signup
		const redirectSignUp = route.query.redirect || '/signup';
		async function deleteAccount() {
			const id = route.params.id;
			const message = await store.dispatch('fetchDeleteAccount', id);
			console.log(message);
			router.push(redirectSignUp);
		}


		return { userId, currentUser, formattedDate, currentPassword, firstField, changing, changePassword, cancelChanging, updateProfile, updateDone, updateEmail, updatePassword, updateFirstName, updateLastName, updateBio, checkOldPassword, wrongPassword, displayNewDiv, identical, checkingPassword, newPassword, testingNewPassword, isIdentical, weakPassword, confirm, showAlert, account };
	}
}
</script>

<style lang="scss" scoped>
	.account {
		width: 70%;
		margin: 0 auto;
		padding: 3%;
		text-decoration: none;
		border: black 1px solid;

		h1 {
			margin: 50px 0;
			font-weight: lighter;
		}

		div.confirmProfileChangesContainer {
			width: 100%;
			margin: 20px auto;
			height: 25px;
			background-color: #dff0d8;
			border: 1px solid #d6e9c6;
			border-radius: 4px;
			display: flex;
			align-items: center;

			// @include responsive('smallDesktop') {
				// width: 90%;
			// }
			// @include responsive('phone') {
				// width: 100%;
			// }

			p {
				margin: 0;
				font-style: italic;
				color: #3c763d;
				padding-left: 10px;
			}
		}

		.picContainer {
			padding: 0 5%;
			height: 160px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px red solid;

			.roundContainer {
				width: 160px;
				height: 160px;
				border-radius: 50%;
				border: 1px blue solid;
			}
		}

		#subscribed {
			text-align: center;
			margin-bottom: 50px;
		}

	}

	form {
		width: 100%;
		margin: 50px 0 100px 0;
		
		.labelInputContainer:not(:last-child) {
			width: 500px;
			margin: 0 auto 30px;
			display: flex;
			flex-direction: column;
			
			label {
				margin-bottom: 5px;
			}
			input {
				outline: none;
				height: 40px;
				padding-left: 1%;
				font-size: 16px;
				border: none;
				box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
				// border-radius: 1%;
			}
			textarea {
				outline: none;
				padding-left: 1%;
			}
		}

		.chngPassButtonsContainer {
			width: 500px;
			height: 80px;
			margin: 15px auto;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			// border: 1px solid red;
		}

		.EndFormButtonsContainer {
			width: 100%;
			height: 110px;
			margin: 25px 0 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// border: 1px solid red;
		}
		
		button {
			height: 50px;
			width: 150px;
			border-radius: 4px;
			padding: 8px 10px;
			margin: 0 25px;
			background-color: #fc3914;
			color: white;
			border: none;
			font-weight: bold;
			font-size: 16px;
			cursor: pointer;
			:hover {
				transition: opacity(0.3) 1s ease-in-out;
			}
		}
		#delete {
			border-radius: 0;
			border: black 2px solid;
			background-color: red;
			// color: black;
		}

		.red {
			color: red;
			font-weight: bold;
		}
		
		.orange {
			color: orange;
			font-weight: bold;
		}
		.bold {
			font-weight: bold;
		}
	}
</style>