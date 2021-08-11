<template>
	<div class="home">
		<Form @createpost="createPost"/>
	</div>
</template>

<script>
// @ is an alias to /src
import postServices from "@/services/posts.js";

export default {
	name: "Home",
	
	setup() {
		function createPost(data) {
			// console.log("Home.vue | addTask()", data);
			postServices.create(data);
		}


		function displayPosts(data) {
			postServices.displayAll(data);
		}

		return { createPost, displayPosts };
	}
};
</script>
