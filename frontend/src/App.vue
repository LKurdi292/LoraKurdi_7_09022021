<template>
	<header>
		<figcaption>
			<a href="#">
				<img src="./assets/icon-above-font.png" alt="logo de Groupomania">
			</a>
		</figcaption>
		<div class="nav">
			<router-link to="/signin">Sign In</router-link> | 
			<router-link to="/login">Log In</router-link>
			<router-view />
		</div>
	</header>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/* margin-top: 60px; */
}
header {
	display: flex;
	justify-content: space-around;
	width: 70%;
	margin: 0 auto;

	img {
		width: 80px;
		height: 40px;
	}
}
.nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
