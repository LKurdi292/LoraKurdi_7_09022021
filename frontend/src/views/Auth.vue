<template>
	<!-- eslint-disable  -->
	<body>
		<div class="logoContainer">
			<img src="../assets/icon-above-font.svg" alt="logo de Groupomania">
		</div>

		<!-- <div class="leftSide">
				<div class="signFormContainer">
					<SignUpForm @createuser="createUser"/>
					<p class="toLogIn">Already have an account? 
					<router-link to="/login"><a>Log in</a></router-link>
					</p>
				</div>
		</div> -->

		<div class="rightSide">
			<div class="logFormContainer">
				<LogInForm @loginuser="logUser"/>
				<p class="toSignUp">Don't have any account yet? 
				<router-link to="/signup"><a>Join us</a></router-link>
				</p>
			</div>
		</div>

		<!-- <div class="logoContainer">
			<img src="../assets/icon-above-font.svg" alt="logo de Groupomania">
		</div> -->

	</body>
</template>

<script>
// @ is an alias to /src
import LogInForm from "@/components/LogInForm.vue";
//import SignUpForm from "@/components/SignUpForm.vue";
import userServices from "@/services/users.js";


export default {
	name: "Auth",
	components: {
		LogInForm,
		//SignUpForm
	},
	setup() {
		function createUser(data) {
			userServices.create(data);
		}

		function logUser(data) {
			userServices.log(data);
		}

		return { createUser, logUser };
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