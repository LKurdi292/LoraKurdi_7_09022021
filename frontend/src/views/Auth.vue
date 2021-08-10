<template>
	<div >
		<SignInForm @createuser="createUser"/> 
		<!-- <LogInForm @login="logUser"/>  -->
	</div>
</template>

<script>
// @ is an alias to /src
// import LogInForm from "@/components/LogInForm.vue";
import SignInForm from "@/components/SignInForm.vue";
import userServices from "@/services/userServices.js";


export default {
	name: "Auth",
	components: {
		SignInForm,
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
