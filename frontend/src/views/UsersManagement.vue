<template>
	<!-- eslint-disable  -->
	<nav-bar :isAdmin="$store.state.user.isAdmin"></nav-bar>

	<h1>List of users</h1>
	
	<div class="confirmDeleteUser" v-show="userDeleted">
		<p>User has successfully been deleted from database</p>
	</div>

	<div class="usersList">
		<div class="usersList__user" v-for="user in users" :key="user.id" @click.prevent="showAlert(user.id)">
			<p>{{ user.lastName }}, {{ user.firstName }}</p>
			<p>Is Admin: <strong>{{ user.isAdmin }}</strong></p>
		</div>
	</div>

</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import { useSwal } from "../useSwal";



export default {
	components: { NavBar },
	name: "usersManagement", 
	setup() {
		// Données et variables
		const store = useStore();
		const users = computed(() => store.state.allUsers);
		let userDeleted = ref(false);

		async function getAllUsers() {
			const id = store.state.user.id;
			await store.dispatch('fetchAllUsers', id);
		}
		getAllUsers();

		// Alert for deleting account
		const Swal = useSwal();

		function showAlert(id) {
			Swal.fire({
				title: 'Deleting User',
				text: "Are you sure you want to delete this user's account?",
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Yes, delete',
				icon: 'question',
				focusConfirm: false,
			}). then((result) => {
				if (result.isConfirmed) {
					deleteUser(id);
				}
			})
		}

		async function deleteUser(id) {
			const adminId = store.state.user.id;
			const params = {
				id: id,
				adminId: adminId
			};
			const response = await store.dispatch('fetchDeleteUser', params);

			if (response) {
				userDeleted.value = true;
				setTimeout(()=> {
				userDeleted.value = false;
			}, 2500);
			}

		}

		return { users, showAlert, userDeleted };
	}
}
</script>

<style lang="scss" scoped>
	h1 {
		width: 80%;
		margin: 40px auto;
	}

	.confirmDeleteUser {
		width: 80%;
		height: 40px;
		margin: 40px auto;
		padding-left: 10px;
		height: 25px;
		background-color: #dff0d8;
		border: 1px solid #d6e9c6;
		border-radius: 4px;
		display: flex;
		align-items: center;
		font-style: italic;
		color: #437430;
	}

	.usersList {
		width: 80%;
		margin: 20px auto 50px;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		// border: 1px black solid;

		:hover {
			opacity: 0.6;
			cursor: pointer;
			box-shadow: none;
		}

		&__user {
			min-height: 60px;
			width: 150px;
			margin: 20px auto;
			border: 1px solid rgb(230, 57, 20);
			box-shadow: 2px 2px 10px black;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		
		p {
			margin: 5px;
		}
	}
</style>