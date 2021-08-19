<template>
	<!-- eslint-disable -->
	<navbar></navbar>
	<div class="account">

		<h1>Your Profile</h1>
		<div class="picRoundContainer">
			<img src="" alt="">
		</div>

	</div>
</template>

<script>
import Navbar from "../components/NavBar.vue";
import userService from "../services/users";
// import { ref } from 'vue';

export default {
	components: { Navbar },
	name: "Account",
	setup() {
		// const id = ref();
		// id.value = context.root.$route.params.id;
		const { firstName, lastName, email, password, subscriptionDate, bio, 
		image, isAdmin } = userService.getAccountInfo();



		return { firstName, lastName, email, password, subscriptionDate, bio, image, isAdmin}

	}
}
</script>

<style lang="scss" scoped>
	.account {
		width: 65%;
		margin: 0 auto;
		padding: 3% 5%;
	}
</style>