<template>
	<header>
		<div class="contentContainer">
			<div class="logoContainer">
				<img src="../assets/dev_images/icone-rognee-left.png" alt="logo de Groupomania">
			</div>

			<nav>
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

				<div class="linkTo">
					<router-link to="/logout" @click="logOutUser" title="Log out">
						<fas class="icon" icon="sign-out-alt"></fas>
						Log out
					</router-link>
				</div>

			</nav>

		</div>
	</header>
</template>

<script>

export default {
	props: {
		"isAdmin": Boolean
	},
	name: "navBar",
	emits: ['logOut'],
	setup(context) {
		
		function logOutUser() {
			context.emit('logOut');
		}
		
		return { logOutUser};

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
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;


	.linkTo {
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 15px;
		position: relative;
		// border: 1px solid red;

		a {
			text-decoration: none;
			color: black;
			margin-left: 5px;

			&:hover {
				color: #fc3914;
			}
		}
		
		&:hover {
			color: #fc3914;
		}

		.router-link-active {
			color: #fc3914;
		}

	}
}
</style>