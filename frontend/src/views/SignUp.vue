<template>
	<body>
		<div class="logoContainer">
			<img src="../assets/dev_images/icon-above-font.svg" alt="logo de Groupomania">
		</div>

		<div class="rightSide">
			<div class="confirmSignUp" v-show="created">
				<p>Your account has been created.</p>
				<router-link to="/login">
					Log in
				</router-link>
			</div>

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
import {ref} from 'vue';

export default {
	name: "SignUp",
	components: {
		SignUpForm
	},
	setup() {
		// Données et variables
		let created = ref(false);


		function createUser(data) {
			userServices.create(data);
			created.value = true;
		}

		
		return { createUser, created };
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// border-left: 1px red dashed;
	}

	.confirmSignUp {
		height: 40px;
		background-color: #42b983;
		border: 1px solid #d6e9c6;
		display: flex;
		justify-content: center;
		align-items: center;
		font-style: italic;
		width: 70%;
		margin: 60px auto 50px;

		p {
			display: inline-block;
			font-size: 18px;
			margin: 0 15px 0;
		}

		a {
			font-style: normal;
			color: #AB1F03;

			&:hover {
				font-weight: bold;
				cursor: pointer;
				text-decoration: none;
			}
		}
	}

	.signFormContainer {
		height: 600px;
		width: 500px;
		margin: 5% auto;
		background-color: white;
		border-radius: 25px;
		padding: 2% 0;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
	}

	p.toLogIn {
		width: 85%;
		margin: 40px auto 0;
		text-align: left;

		a {
			text-decoration: underline;
			color: #AB1F03;
			font-weight: bold;
			cursor: pointer;
		}
	}
	@media screen and (max-width: 1200px) {
		body {
			background-color: #fce4e2;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
	
			.logoContainer {
				position: absolute;
				top: 3%;
				width: 110px;
			}
			.rightSide {
				width: 100%;
				position: absolute;
				top: 20%;

				.signFormContainer {
					height: 550px;
					width: 550px;
					position: relative;
					top: 0;
					left: 0;
					margin: 0;
				}
			}

			p.toLogIn {
				width: 80%;
				// margin: 20px auto 0;
			}
		}
	}

	@media screen and (max-width: 599px) {
		body {
			.rightSide {
				.signFormContainer {
					height: 550px;
					width: 300px;
				}
				p.toLogIn {
					text-align: center;
					margin: 40px auto 0;
				}
			}
		}
	}
</style>