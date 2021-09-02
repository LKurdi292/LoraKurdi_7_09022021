<template>
	<header>
		<div class="contentContainer">
			<div class="logoContainer">
				<img src="../assets/dev_images/icone-rognee-left.png" alt="logo de Groupomania">
			</div>

			<nav :class="{responsive: isBars}">
				<div class="linkTo">
					<router-link to="/home" title="Go to home page">
						<fas class="icon" icon="home"></fas>
						Home
					</router-link>
				</div>

				<div class="linkTo">
					<router-link :to="{ name: 'Account', params: { id: $store.state.user.id } }" title="Go to your account page">
						<fas class="icon" icon="user"></fas>
						My Account
					</router-link>
				</div>

				<div class="linkTo" v-show="isAdmin">
					<router-link to="/allusers"  title="Manage users">
						<fas class="icon" icon="users-cog"></fas>
						Users Management
					</router-link>
				</div>

				<div class="linkTo" >
					<router-link to="/logout" @click="logOutUser" title="Log out">
						<fas class="icon" icon="sign-out-alt"></fas>
						Log out
					</router-link>
				</div>
				
				<a class="iconNav" @click.prevent="addResponsiveClass">
					<fas icon="bars"></fas>
				</a>
			</nav>

		</div>
	</header>
</template>

<script>
import {ref} from 'vue';

export default {
	props: {
		"isAdmin": Boolean
	},
	name: "navBar",
	emits: ['logOut'],
	setup(context) {
		
		const isBars = ref(false);

		function logOutUser() {
			context.emit('logOut');
		}

		function addResponsiveClass() {
			if (isBars.value == false) {
				isBars.value = true;
			} else {
				isBars.value = false;
			}
		}
		
		return { logOutUser, addResponsiveClass, isBars};

	}
}
</script>

<style lang="scss" scoped>

header {
	display: flex;
	align-items: center;
	height: 80px;
	z-index: 5000;
	box-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
	background-color: white;
	// border: 1px blue solid;

	.contentContainer {
		width: 85%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

.logoContainer {
	display: flex;
	justify-content: center;
	align-self: center;
	img {
		width: 320px;
	}
}

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	.iconNav {
		display: none;
	}

	.linkTo {
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 15px;
		position: relative;

		a {
			text-decoration: none;
			color: black;
			margin-left: 5px;

			&:hover {
				color: #AB1F03;
			}
		}
		
		&:hover {
			color: #AB1F03;
		}

		.router-link-active {
			color: #AB1F03;
		}
	}
}

@media screen and (max-width: 1200px) {
	.logoContainer img {
		width: 220px;
	}
}

@media screen and (max-width: 599px) {
	header {
		height: 50px;
		.contentContainer {
			width: 100%;
			margin: 0;
			height: 100%;
		}

		.logoContainer img {
			width: 130px;
		}

	}
	nav {
		position: relative;
		text-align: center;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		transition: all 0.4s ease-in-out;
		
		.linkTo {
			display: none;
		}

		.iconNav {
			width: 50px;
			z-index: 1;
			display: block;
			right: 0.5rem;
			cursor: pointer;
			color: #373737;
			font-size: 2rem!important;
		}
	}

	nav.responsive {
		// height: 400px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		top: 0;
		// bottom: 0;

		.linkTo {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			background: #F0EAd6;
			margin: 0;
			position: relative;
			top: 5rem;
			// font-size: 3rem;
		}

	}

}
</style>