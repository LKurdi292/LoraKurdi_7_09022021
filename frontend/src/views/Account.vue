<template>
	<div class="account">
	<navbar></navbar>

	<h1>Your Profile</h1>


	</div>
</template>

<script>
import Navbar from "../components/NavBar.vue";
import userService from "../services/users";

export default {
	components: { Navbar },
	name: "Account",
	setup() {
		const userInfo = userService.getAccountInfo();
		const firstName = userInfo.firstName;
		const lastName = userInfo.lastName;
		const email = userInfo.email;
		const password = userInfo.password;
		const subscriptionDate = userInfo.subscriptionDate;
		const bio = userInfo.bio;
		const image = userInfo.imageURL;
		const isAdmin = userInfo.isAdmin;


		return { firstName, lastName, email, password, subscriptionDate, bio, image, isAdmin}

	}
}
</script>

<style lang="scss" scoped>
	
</style>