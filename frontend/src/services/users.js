
//Créer un utilisateur
function create(data) {
	const url="http://localhost:3000/api/auth/signup";
	
	fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json", 
		},
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if (res.ok) {
			return res.json();
		}
	})
	.catch(function(err) {
		console.log(err);
	})
}


// Utilisation d'axios
import axios from 'axios';

// single axios instance for the entire app
const apiClient = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});

// Connexion d'un utilisateur
function logIn(data) {
	return apiClient.post('/auth/login', data);
}


// Modifier son compte
function updateAccount(data, id, token) {
	return apiClient.put('users/myaccount/'+ id, data, 
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}


// Supprimer son compte
function deleteAccount(id, token) {
	return apiClient.delete('users/myaccount/' + id,
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}


// Voir la liste des utilisateurs (route admin)
function getUsers(id, token) {
	console.log('user services: ', id, token);
	return apiClient.get('users/allusers', id,
		{ headers: {
			"Authorization": "BEARER " + token
		}}
	);
}



// Supprimer un utlisateur (route admin)



export default {
	create, logIn, updateAccount, deleteAccount, getUsers
}