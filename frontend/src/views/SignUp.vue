<template>
	<body>
		<div class="logoContainer">
			<img src="../assets/dev_images/icon-above-font.svg" alt="logo de Groupomania">
		</div>

		<div class="rightSide">
			<!-- <div class="confirmSignUp">
				Your account have been created. 
				<router-link to="/login">
					Log in
				</router-link>
			</div> -->

			<div class="signFormContainer">
				<SignUpForm @createAccount="createUser"/>
				<p class="toLogIn">Already have an account? 
					<router-link to="/login">Log in</router-link>
				</p>
			</div>
		</div>
	</body>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import userServices from "@/services/users.js";
// import { useStore } from 'vuex';

export default {
	name: "SignUp",
	components: {
		SignUpForm
	},
	setup() {

		function createUser(data) {
			userServices.create(data);
		}

		
		return { createUser };
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
	
	div.rightSide {
		position: relative;
		width: 65%;
		background-color: #fce4e2;
		// border-left: 1px red dashed;
	}

	.signFormContainer {
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

	p.toLogIn {
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