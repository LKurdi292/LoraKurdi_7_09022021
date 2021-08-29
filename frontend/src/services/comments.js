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


// Créer un commentaire
function createComment(data, token) {
	return apiClient.post('/comments', data, 
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}

//Supprimer un commentaire
function deleteComment(id, token) {
	return apiClient.delete('/comments/' + id, 
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}



export default { 
	createComment, deleteComment
};