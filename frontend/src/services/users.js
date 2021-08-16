

//Créer un utilisateur
function create(data) {
	const url="http://localhost:3000/api/auth/signup";
	
	// console.log("fetch", JSON.stringify(data));

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
	.then(function(res) {
		console.log(res);
		return res;
	})
	.catch(function(err) {
		console.log(err);
	})

}







const firstName = "lora";

export default {
	create, log, firstName
}