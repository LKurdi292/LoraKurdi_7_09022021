import { toRefs, reactive } from 'vue';
//import { useStore } from 'vuex';
//const store = useStore();

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


// Connexion d'un utilisateur

function log(data) {
	const url="http://localhost:3000/api/auth/login";

	const logData = reactive({
		userId : 0,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		bio: '',
		isAdmin: null,
		token : ''
	});

	//fetch(url, {
	//	method: "POST",
	//	headers: {
	//		"Content-type": "application/json",
	//	},
	//	body: JSON.stringify(data)
	//})
	//.then(function(res) {
	//	if (res.ok) {
	//		return res.json();
	//	}
	//})
	//.then(function(res) {
	//	console.log("fetch res before store", res);
	//	// store.commit('SET_USER_INFO', res.user);
	//	console.log("fetch res.user after store", res.user);
	//	return res.user;
	//})
	//.catch(function(err) {
	//	console.log(err);
	//})


	const fetchLogIn = async() => {
		try {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data)
			});
			const response = await res.json();

			logData.userId = response.id;
			logData.firstName = response.firstName;
			logData.lastName = response.lastName;
			logData.email = response.email;
			logData.password = response.password;
			logData.bio = response.bio;
			logData.isAdmin = response.isAdmin;
			logData.token = response.token;

			localStorage.setItem('token', response.token);
			console.log('fetch userInfo', logData.userId, logData.firstName, logData.lastName, logData.email, logData.password, logData.bio, logData.isAdmin);
			
			console.log('fetch token', logData.token);
		} catch (errors) {
			console.log(errors);
		}
	}
	
	fetchLogIn();

	return { ...toRefs(logData)};
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
	create, log, getAccountInfo
}