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
import LogInForm from "@/components/LogInForm.vue";
import { useStore } from 'vuex';
import {useRoute, useRouter} from 'vue-router';


export default {
	name: "LogIn",
	components: {
		LogInForm
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();

		const goToHomePage = () => {
			const redirectHome = route.query.redirect || '/home';
			router.push(redirectHome);
		}

		async function logUser(data) {
			const isLogged = await store.dispatch('fetchLogIn', data);
			if (isLogged) {
				goToHomePage();
			}
		}
		
		
		return { logUser };
	}
};
</script>


<style lang="scss" scoped>
	body {
		width: 100%;
		margin: 0;
		padding: 0;
		height: 100vh;
		display: flex;
		align-content: center;
	}

	.logoContainer {
		width: 45%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
	img {
		width: 280px;
		height: 100%;
	}
	
	div.leftSide {
		position: relative;
		width: 55%;
		background-color: #fce4e2;
	}

	.logFormContainer {
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

			.logoContainer {
				position: absolute;
				top: 3%;
				width: 110px;
			}
			.leftSide {
				width: 100%;
				.logFormContainer {
					position: relative;
					top: 0;
					left: 0;
				}
			}
		}
	}

	@media screen and (max-width: 599px) {
		.logFormContainer {
			height: 400px;
			width: 300px;
			// margin: 5% auto;
		}
	}
</style>