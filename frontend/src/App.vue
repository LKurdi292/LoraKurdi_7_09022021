<template>
	<body>
		<router-view />
	</body>
</template>

<script>
// import SignUpForm from './components/SignUpForm.vue';
export default {
//   components: { SignUpForm },
}
</script>


<style lang="scss" scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	
}
body {
	margin: 0;
	padding: 0;
	background-color: #fce4e2;
	height: 100vh;
}
header {
	height: 140px;
	width: 100%;
	margin: 0;
	background-color: white;
	// border: 1px black dashed;
	
	
}
</style>
