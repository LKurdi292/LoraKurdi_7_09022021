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

// Créer un post
function createPost(data, token) {
	return apiClient.post('/posts', data, 
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}

// Supprimer un post
function deletePost(id, token) {
	return apiClient.delete('/posts/' + id,
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
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
	getAllPosts, createPost, deletePost, like
}