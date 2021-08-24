<template>
	<header>
		<div class="contentContainer">
			<div class="logoContainer">
				<img src="../assets/dev_images/icone-rognee-left.png" alt="logo de Groupomania">
			</div>
			<nav>
				<router-link to="/home" class="linkTo">Home</router-link>
				<router-link :to="{ name: 'Account', params: { id: userId } }" class="linkTo">My Account</router-link>
				<router-link to="/login" class="linkTo" @click="logOut">Log out</router-link>
			</nav>
		</div>
	</header>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';


export default {
	name: "navBar",

	setup() {
		const store = useStore();
		let userId = computed(()=> store.state.user.id);

		function logOut() {
			store.commit('CLEAR_STORE');
		}

		return { userId, logOut };
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
		// border: 1px red dashed;
	}
}

nav {
	// width: 200px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	// color: black;


	.linkTo {
		color: black;
		text-decoration: none;
		padding: 1%;
		position: relative;
		width: 100px;
		// border: 1px solid red;


		&:hover {
			color: #fc3914;
			
			&:after {
				content: "";
				background-color: #fc3914;
				width: 100%;
				height: 2px;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}
	}
	.router-link-active {
		color: #fc3914;
	}
}
</style>