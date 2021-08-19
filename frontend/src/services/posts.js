import { toRefs, reactive } from 'vue';


//Get All Posts
function getAll() {
	const url="http://localhost:3000/api/posts";
	
	const state = reactive( {
		response: [],
		error: null, 
		fetching: true
	})

	const fetchPosts = async() => {
		try {
			const res = await fetch(url, {
				method: "GET",
				headers: {
					"Content-type": "application/json", 
					"Authorization": "BEARER" + localStorage.getItem.token
				}
			});
			const json = await res.json();
			state.response = json;

		} catch (errors) {
			state.error = errors;
		} finally {
			state.fetching = false;
		}
	}
	
	fetchPosts();

	return { ...toRefs(state)};
}


// Create a post
function create(data, userId) {
	const url="http://localhost:3000/api/posts";

	data = { ...data, userId };
	
	fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			"Authorization": "BEARER" + localStorage.getItem.token
		},
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if (res.ok) {
			return res.json();
		}
	})
	//.then(function() {
	
	//})
	.catch(function(err) {
		console.log(err);
	})
}


//Update a post 
		// ajout de l'id dans l'url pour être récupéré par req.params.id dans le back
function update(data, postId) {
	const url="http://localhost:3000/api/posts";

	fetch(url + postId, {
		method: "PUT",
		headers: {
			"Content-type": "application/json", 
			"Authorization": "BEARER" + localStorage.getItem.token
		},
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if (res.ok) {
			console.log(res.status);
			return res.json();
		}
	})
	.then(function(res) {
		return res.message;
	})
	.catch(function(err) {
		console.log(err);
	})
}

// Delete a post
function deletePost(postId) {
	const url="http://localhost:3000/api/posts";
	
	fetch(url + postId, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
			"Authorization": "BEARER" + localStorage.getItem.token
		}
	})
	.then(function(res) {
		if (res.ok) {
			console.log(res.status);
			return res.json();
		}
	})
	.then(function(res) {
		return res.message;
	})
	.catch(function(err) {
		console.log(err);
	})
}

//Like or Dislike a Post
function like(userId, like, postId) {
	const url="http://localhost:3000/api/posts/like";
	
	fetch(url + postId, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": "BEARER" + localStorage.getItem.token
		}, 
		body: {
			userId: userId,
			like: like
		}
	})
	.then(function(res) {
		if (res.ok) {
			console.log(res.status);
			return res.json();
		}
	})
	.then(function(res) {
		return res.message;
	})
	.catch(function(err) {
		console.log(err);
	})
}



export default {
	getAll, create, update, deletePost, like
}