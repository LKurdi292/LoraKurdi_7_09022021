
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
			//console.log(res.status);
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
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

// Connexion d'un utilisateur
function logIn(data) {
	return apiClient.post('/auth/login', data);
}




// Voir son compte
function getAccountInfo(userId) {
	const url ="http://localhost:3000/api/users/myaccount/";

	// console.log("getAccountInfo", userId);

	fetch(url + userId, {
		method: "GET",
		headers: {
			"Content-type": "application/json", 
			"Authorization": "BEARER " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjI5MjQxODEzLCJleHAiOjE2MjkzMjgyMTN9.cUqaRtdhU9q9FSrziWgsY5gjOvr6Eaam4xFH2_Q0wcI",
		}
	})
	.then(function(res) {
		if (res.ok) {
			console.log(res.status);
			return res.json();
		}
	})
	.then(function(data) {
		console.log("fetch", data);
		return data;
	})
	.catch(function(err) {
		console.log(err);
	})
}

export default {
	create, logIn, getAccountInfo
}