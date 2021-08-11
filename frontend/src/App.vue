<template>
	<header>
		<div class="container">
			<a href="#">
				<img src="./assets/icon-above-font.svg" alt="logo de Groupomania">
			</a>
		</div>
		
		<router-view />
	</header>
</template>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	
}
header {
	height: 120px;
	width: 100%;
	margin: 0;
	border: 1px black dashed;
	
	.container {
		width: 65%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
		
	img {
		width: 130px;
		height: 100%;
		// border: 1px red dashed;
	}
}
// .nav {
// 	width: 130px;
// 	display: flex;
// 	justify-content: space-evenly;
// 	align-items: center;
// 	border: 1px red dashed;

// 	a {
// 		display: flex;
// 		justify-content: space-evenly;
// 		align-items: center;
// 		font-weight: bold;
// 		color: #2c3e50;
// 		text-decoration: none;
// 		// border: 1px black solid;

// 		&.router-link-exact-active {
// 			color: #42b983;
// 		}

// 		:hover {
// 			cursor: pointer;
// 			text-decoration: underline;
// 		}
// 	}
// }
</style>
