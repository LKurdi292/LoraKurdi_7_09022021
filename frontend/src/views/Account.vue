<template>
	<!-- eslint-disable -->
	<navbar :isAdmin="$store.state.user.isAdmin"></navbar>
	<div class="account">

		<h1>Your Profile</h1>


		<div class="picContainer">
			<!-- redirection du clic vers l'input file caché dans le form -->
			<div class="roundContainer" @click="$refs.newImage.click()" title="Upload a profile pic">
				<img :src=$store.state.user.imageURL>
			</div>
		</div>

		<p id="subscribed">Subscribed on {{ formattedDate }} </p>


		<p>Type of account: <strong>{{ account }}</strong></p>

		<div class="confirmProfileChangesContainer" v-show="updateDone">
			<p>Your profile has been successfully updated</p>
		</div>

		<form enctype="multipart/form-data">
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
				<input id='password' type="password" :disabled="!changing" :value="refCurrentPassword" @change="checkOldPassword" alt="Your password" title="Your password">
				
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

			<!-- Upload d'une image redirigé vers cet input file depuis l'image de profile au dessus du form -->
			<input class="hiddenInput" ref="newImage" type="file" name="picture" accept="image/*" @change="onFileSelected">

			<div class="labelInputContainer">
				<label for="bio">Tell us more about yourself</label>
				<textarea id='bio' type="text-area" rows="25" cols="25" :value="currentUser.bio" @change="updateBio" alt="Enter a description" title="Enter a description"></textarea>
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
		const subscribed = computed(() => store.state.subscribed);
		console.log("subscribed: ", subscribed.value);
		let isAdmin = computed( () => store.state.user.isAdmin);
		let account = ref("");
		const formattedDate = moment(subscribed).format('DD/MM/YYYY');
		let currentUser = computed(() => store.state.user);
		let currentPassword = computed(() => currentUser.value.password);
		let refCurrentPassword = ref(currentPassword.value);

		const firstField = ref(null);
		let changing = ref(false);
		let checkingPassword = ref(false);
		let wrongPassword = ref(false);
		let displayNewDiv = ref(false);
		let weakPassword = ref(false);
		let updateDone = ref(false);
		let identical = ref(true);
		let confirm = ref(false);

		let newEmail = "";
		let newFirstName = "";
		let newLastName = "";
		let newBio = "";
		let newPassword = ref("");
		let newImage = ref(null);

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

		// New Profile Pic
		const formData = new FormData();

		function onFileSelected(event) {
			newImage.value = event.target.files[0];
			formData.set('imageURL', newImage.value, newImage.value.name);
		}

		// Fonctions
		function changePassword() {
			changing.value = true;
			checkingPassword.value = true;
			refCurrentPassword.value = "";
		}

		function cancelChanging() {
			changing.value = false;
			refCurrentPassword.value = currentPassword.value;
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
				checkingPassword.value = true;
				// e.target.value = "";
			} else {
				wrongPassword.value = false;
				checkingPassword.value = false;
				displayNewDiv.value = true;
			}
		}

		function updateEmail(e) {
			newEmail = e.target.value.trim();
		}

		function updateFirstName(e) {
			newFirstName = e.target.value.trim();
		}

		function updateLastName(e) {
			newLastName = e.target.value.trim();
		}

		function updateBio(e) {
			newBio = e.target.value.trim();
		}

		// Regex de compléxité du password
		const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		function testingNewPassword(e) {
			if (strongPassword.test(e.target.value)) {
				weakPassword.value = false;
				confirm.value = true;
			} else {
				weakPassword.value = true;
			}
		}

		const updateData = {
			userId: userId,
			email : "",
			password : "",
			firstName : "",
			lastName : "",
			bio : ""
		}

		function updatePassword() {
			updateData.password = newPassword.value;
		}

		// Vérification que les 2 div New password sont identiques
		function isIdentical(e) {
			if (e.target.value !== newPassword.value) {
				identical.value = false;
				
			} else {
				
				identical.value = true;
				updatePassword();
			}
		}

		// Fonction de remplissage de l'objet updateData
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

		// Mise à jour du profil
		async function updateProfile() {
			fillInUpdateData();

			//S'il n'y pas de nouvelle image on ajoute l'imageURL actuelle à formData (ajout d'une nouvelle image traité plus haut)
			if (newImage.value == null) {
				formData.set('imageURL', store.state.user.imageURL);
			}

			// On ajoute le contenu de updateData à formData
			for (let e in updateData) {
				formData.set(e, updateData[e]);
			}
			
			// appel axios dans les actions du store
			updateDone.value = await store.dispatch('fetchUpdateAccount', formData);

			if (updateDone.value) {
				// reset des variables
				newImage.value = null;
				displayNewDiv.value = false;
				confirm.value = false;
				isIdentical.value = true;
				checkingPassword.value = false;
				changing.value = false;
				refCurrentPassword = ref(currentPassword.value);


				// Affichage du message de confirmation d'update puis disparition au bout 	de 2.5s
				setTimeout(()=> {
					updateDone.value = false;
				}, 2500);
			}
		}

		// Suppression de compte et redirection vers la page signup
		const redirectSignUp = route.query.redirect || '/signup';
		async function deleteAccount() {
			const id = route.params.id;
			const accountDeleted = await store.dispatch('fetchDeleteAccount', id);

			if (accountDeleted) {
				router.push(redirectSignUp);
			}
		}


		return { userId, currentUser, formattedDate, refCurrentPassword, firstField, changing, changePassword, cancelChanging, updateProfile, updateDone, updateEmail, updatePassword, updateFirstName, updateLastName, updateBio, checkOldPassword, wrongPassword, displayNewDiv, identical, checkingPassword, newPassword, testingNewPassword, isIdentical, weakPassword, confirm, showAlert, account, onFileSelected, newImage };
	}
}
</script>

<style lang="scss" scoped>
	.account {
		width: 70%;
		margin: 0 auto;
		padding: 3% 3% 8% 3%;
		text-decoration: none;

		h1 {
			margin: 0 0 50px 0;
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
			// border: 1px red solid;

			.roundContainer {
				width: 180px;
				height: 180px;
				border-radius: 50%;
				// border: 1px blue solid;

				&:hover {
					cursor: pointer;
					background-color: rgb(253, 245, 245);
					transform: opacity(0.2);
					
				}

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					object-fit: cover;
				}
			}
		}

		#subscribed {
			text-align: center;
			margin-bottom: 50px;
		}

	}

	form {
		width: 100%;
		margin: 40px 0 0 0;
		background-color: rgb(247, 217, 203);
		padding-top: 40px;
	
		.hiddenInput {
			display: none;
		}

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
				background-color: white;
				box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
			}
			textarea {
				outline: none;
				border: none;
				padding-left: 1%;
				box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
			}
		}

		.chngPassButtonsContainer {
			width: 500px;
			height: 80px;
			margin: 15px auto;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
		}

		.EndFormButtonsContainer {
			width: 50%;
			height: 210px;
			margin: 25px auto 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
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
			color: black;
			border-radius: 0;
			background-color: red;
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