<template>
	<!-- eslint-disable  -->
	<NavBar :isAdmin="$store.state.user.isAdmin"/>

	<h1>List of users</h1>

	<div class="usersList">
		<!-- <div class="usersList__user" v-for="user in users" :key="user.id">
			<p>{{ userLname }}, {{ userFname }}</p>
			<p>Subscribed on {{ SubscriptionDate }}</p>
			<p>Account type: {{ accountType }}</p>
			<p>Email: {{ userEmail }}</p>
			<p>Presentation Text: <br>
				{{ userBio }}
			</p>
		</div> -->

	</div>

</template>

<script>
import {useStore} from 'vuex';
import {computed } from 'vue';
import NavBar from '../components/NavBar.vue';

export default {
  components: { NavBar },
	name: 'Users Management', 
	component: { NavBar},
	setup() {
		// Données et variables
		const store = useStore();
		const users = computed(() => store.state.allUsers);

		async function getAllUsers() {
			await store.dispatch('fetchAllUsers');
		}

		getAllUsers();

		return { users};
	}
}
</script>

<style lang="scss" scoped>
	.usersList {
		width: 80%;
		margin: 20px auto;
		border: 1px black solid;
		height: auto;

		&__user {
			min-height: 50px;
			width: 95%;
			margin: 15px auto;
			border: 1px solid rgb(230, 57, 20);
			box-shadow: 2px 2px 10px black;
		}
	}
</style>