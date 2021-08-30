<template>
	<body>
		<div class="leftSide">
			<h1>Bye Bye ! </h1>

			<h2>We hope you'll be back very soon .</h2>
		</div>

		<div class="logoContainer">
			<img src="../assets/dev_images/icon-above-font.svg" alt="logo de Groupomania">
		</div>

	</body>
</template>

<script>


export default {
	name: "logout",
	setup() {
		
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
		width: 55%;
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
	
	div.leftSide {
		// position: relative;
		width: 55%;
		background-color: #fce4e2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: start;
		// border-left: 1px red dashed;

		h2 {
			font-weight: normal;
		}
	}
</style>