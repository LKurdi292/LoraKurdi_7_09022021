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
	console.log('post services data new post: ', data);
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

// Aimer un post
function likePost(toSend, token) {
	return apiClient.put('/posts/like', toSend,
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}


export default {
	getAllPosts, createPost, deletePost, likePost
}