const db = require('../models/index');
const { post } = require('../routes/users');
const Post = db.Post;
const User = db.User;
const op = db.Sequelize.op;


// Récupérer tous les posts ainsi que le nom, le prénom et l'image de l'auteur
exports.getAllPosts = (req, res, next) => {
	Post.findAll({ 
		attributes: { 
			exclude: ['updatedAt']
		},
		include: [{
			model: User,
			attributes: ['firstName', 'lastName', 'imageURL']
		}]
	})
	.then( data => {res.status(200).send(data)})
	.catch( error => res.status(500).send({ error,  message: 'Impossible d\'afficher les posts' }));
};


// Afficher les 5 derniers posts
const getPost = async (id) => {
	console.log('get post ', id);
	let post = await Post.findOne({
		where: {id: id},
		attributes: { 
			exclude: ['updatedAt']
		},
		include: [{
			model: User,
			attributes: ['firstName', 'lastName', 'imageURL']
		}]
	})
	return post;
};

// exports.getByDate = (req, res, next) => {
// 	const date = req.params.date;
// }

// Créer un post
exports.createPost = (req, res, next) => {
	// Valid request
	if (!req.body.title) {
		res.status(400).send({
		  message: "Post must have a title!"
		});
		return
	}

	if (req.body.imageURL) {
		const post = {
			userId : req.body.id,
			title : req.body.title,
			publicationText : req.body.text,
			publicationDate : Date.now(),
			likes: 0,
			// imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			imageURL: req.body.imageURL
		};
		Post.create(post)
		.then(() => res.status(201).json({ message: 'Post créé !'}))
		.catch( error => res.status(500).send({ error, message: 'Impossible de créer un post'} ));
	} else {
		const post = {
			userId : req.body.id,
			title : req.body.title,
			publicationText : req.body.text,
			publicationDate : Date.now(),
			likes: 0
		};
		sendPostToDB(post).then(newPost => res.status(201).json(newPost));
	};
};


// Supprimer un post et renvoyer l'ensemble des posts
exports.deletePost = (req, res, next) => {
	const id = req.params.id;
	// Vérification du user?

	Post.destroy({
		where: { id: id }
	})
	.then(() => {
		Post.findAll({ 
			attributes: { 
				exclude: ['updatedAt']
			},
			include: [{
				model: User,
				attributes: ['firstName', 'lastName', 'imageURL']
			}]
		})
		.then( posts => {res.status(200).send({ posts, message: "Le post a été supprimé avec succès!" })
		})
		.catch( error => res.status(500).send({ error,  message: 'Impossible d\'afficher les posts' }));

		// res.send({ message: "Le post a été supprimé avec succès!" });
	})
	.catch((err) => {
		res.status(500).send({ err, message: "Un problème est survenu lors de la suppression du post" })
	});
};


// Liker ou retirer son like d'un post
exports.likeApost = (req, res, next) => {
	const postId = req.params.id;

	userId = req.body.userId;
	likeValue = req.body.like;

	Post.findByPk( postId )
	.then( post => {
		switch(likeValue) {
			case 1: // le user like le post
				Post.update(
					{ likes: post.likes + 1 },
					{ where: {id : postId} },
				)
				// ajout de [userId, postId] dans la table de jointure Like_Post
				.then(() => {
					post.addUser(userId);
					User.findByPk(userId).then( user => {
						user.addPost(postId);
					})
				})
				.then(() => res.status(201).json({ message: 'Post aimé !'}))
				break;
			
			case 0:
				Post.update(
					{ likes: post.likes - 1},
					{ where: { id : postId }}
				)
				// retrait de [userId, postId] de la table de jointure Like_Post
				.then(() => {
					post.removeUser(userId);
					User.findByPk(userId).then(user => {
						user.removePost(postId);
					})
				})
				.then(() => res.status(201).json({ message: 'Like retiré'}));
				break;
		}
	})
	.then(() => res.status(201))
	.catch( error => res.status(500).send({ error, message: 'Impossible d\'aimer ce post'} ));
};

async function sendPostToDB(post) {
	try {
		let result = await Post.create(post);
		let newpost = await getPost(result.dataValues.id);
		return newpost;
	} catch (error) {
		console.log(error);
	}
}
