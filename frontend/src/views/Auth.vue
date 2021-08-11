<template>
	<div >
		<SignUpForm @createuser="createUser"/> 
		<!-- <LogInForm @login="logUser"/>  -->
	</div>
</template>

<script>
// @ is an alias to /src
// import LogInForm from "@/components/LogInForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import userServices from "@/services/users.js";


export default {
	name: "Auth",
	components: {
		SignUpForm,
		// LogInForm
	},
	setup() {
		function createUser(data) {
			// console.log("Home.vue | addTask()", data);
			userServices.create(data);
		}
		return { createUser };
	}
};
</script>


<style lang="scss" scoped>
	
</style>