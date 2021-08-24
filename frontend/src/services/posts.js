// Utilisation d'axios
import axios from 'axios';

// single axios instance
const apiClient = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});


// Afficher les posts
function getAllPosts(token) {
	return apiClient.get('/posts',
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
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
	getAllPosts, create, update, deletePost, like
}