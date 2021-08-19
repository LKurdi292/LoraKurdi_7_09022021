<template>
	<body>
		<div class="leftSide">
			<div class="logFormContainer">
				<LogInForm @loginUser="logUser"/>
				<p class="toSignUp">Don't have any account yet? 
					<router-link to="/signup">Join us</router-link>
				</p>
			</div>
		</div>

		<div class="logoContainer">
			<img src="../assets/dev_images/icon-above-font.svg" alt="logo de Groupomania">
		</div>

	</body>
</template>

<script>
// @ is an alias to /src
import LogInForm from "@/components/LogInForm.vue";
import userServices from "@/services/users.js";
import {useRoute} from 'vue-router';
// import { useStore } from 'vuex';
import { ref } from 'vue';
// import {computed} from 'vue';

export default {
	name: "Auth",
	components: {
		LogInForm
	},
	setup() {
		// const store = useStore();
		const route = useRoute();
		console.log(route.params.id);

		let vueuserId = ref(null);
		let vuefirstName = ref('');
		let vuelastName = ref(''); 
		let vueemail = ref(''); 
		let vuepassword = ref(''); 
		let vuebio = ref('');
		let vueisAdmin = ref(null);
		let vuetoken = ref('');


		function logUser(data) {
			const { userId, firstName, lastName, email, password, bio, isAdmin, token } = userServices.log(data);

			vueuserId.value = userId;
			vuefirstName.value = firstName;
			vuelastName.value = lastName;
			vueemail.value = email;
			vuepassword.value = password;
			vuebio.value = bio;
			vueisAdmin.value = isAdmin;
			vuetoken.value = token;
			console.log('auth vue userInfo', vueuserId, vuefirstName, vuelastName, vueemail, vuepassword, vuebio, vueisAdmin);

			console.log('auth vue token', vuetoken);

			//return { userId, firstName, lastName, email, password, bio, isAdmin, token};
		}
		

		return { logUser };
	}
};
</script>


<style lang="scss" scoped>
	body {
		margin: 0;
		padding: 0;
		height: 100vh;
		display: flex;
		align-content: center;

	}
	.logoContainer {
		width: 35%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
	img {
		width: 280px;
		height: 100%;
		// border: 1px red dashed;
	}
	
	div.rightSide, div.leftSide {
		position: relative;
		width: 65%;
		background-color: #fce4e2;
		// border-left: 1px red dashed;
	}

	.logFormContainer, .signFormContainer {
		height: 400px;
		width: 500px;
		margin: 5% auto;
		background-color: white;
		position: absolute;
		top: 25%;
		left: 25%;
		border: white;
		border-radius: 25px;
		padding: 2% 0;
	}

	p.toLogIn, p.toSignUp {
		width: 85%;
		margin: 20px auto;
		text-align: left;

		a {
			text-decoration: underline;
			color: #fc3914;
			font-weight: bold;
			cursor: pointer;
		}
	}
</style>