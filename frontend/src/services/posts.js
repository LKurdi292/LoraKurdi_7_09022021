
//Get All Posts
function getAll() {
	const url="http://localhost:3000/api/posts";
	
	let allPosts = [];

	fetch(url, {
		method: "GET",
		headers: {
			"Content-type": "application/json", 
			// "authorization": "BEARER" + userToken,
		}
	})
	.then(function(res) {
		if (res.ok) {
			console.log(res.status);
			return res.json();
		}
	})
	.then(function(posts) {
		console.log("fetch", posts);
		allPosts = posts;
		return posts;
	})
	.catch(function(err) {
		console.log(err);
	})

	return allPosts;
}

// function read() {
// 	allPosts = getAll();
// 	return allPosts;
// }


// Create a post
function create(data) {
	const url="http://localhost:3000/api/posts";

	fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json", 
			// "authorization": "BEARER" + userToken,
		},
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if (res.ok) {
			console.log(res.status);
			return res.json();
		}
	})
	//.then(function() {
	
	//})
	.catch(function(err) {
		console.log(err);
	})
}


export default {
	getAll, create,
}