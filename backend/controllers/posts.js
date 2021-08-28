const db = require('../models/index');
// const { post } = require('../routes/users');
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;
const LikePost = db.Like_Post;
// const op = db.Sequelize.op;


// Récupérer tous les posts ainsi que le nom, le prénom et l'image de l'auteur, et les commentaires associés, et le nom, prénom et image de l'auteur.
exports.getAllPosts = (req, res, next) => {

	Post.findAll({ 
		order: [['createdAt', 'DESC']],
		attributes: { 
			exclude: ['updatedAt']
		},
		include: [
				// Impossible d'atteindre la table de jointure LikePost
			// { all: true, nested: true 
			// }
		{
			model: User,
			attributes: ['firstName', 'lastName', 'imageURL'],
		},
		{
			model: Comment,
			attributes: ['content', 'likes', 'userId', 'id'],
			include: [{
				model: User,
				attributes: ['firstName', 'lastName']
			}]
		}
		]
	})
	.then( posts => {
		LikePost.findAll()
		// Ajout d'un tableau à chaque post contenant l'id des users qui ont liké ce post
		.then((likes) => {
			likes.forEach(like => {
				let post = posts.findIndex(search => search.id == like.postId);
				if (post != null) {
					if(posts[post].dataValues.usersLiked === undefined){
						posts[post].dataValues.usersLiked = [like.userId];
					} else {
						posts[post].dataValues.usersLiked.push(like.userId);
					}
				}
			})
			res.status(200).send({ posts});
		})
		.catch(error => { 
			res.status(500).send({ error, message: "Impossible d\'ajouter la table des likes aux posts"});
		})
	})
	.catch( error => res.status(500).send({ error,  message: 'Impossible d\'afficher les posts' }));
};


// Renvoyer un post après une création, ajout d'un like ou d'un commentaire
const getPost = async (id) => {
	console.log('***************** getPost id: ', id);
	let post = await Post.findOne({
		where: {id: id},
		attributes: { 
			exclude: ['updatedAt']
		},
		include: [{
			model: User,
			attributes: ['firstName', 'lastName', 'imageURL']
		},
		{
			model: Comment,
			attributes: ['content', 'likes', 'userId', 'id'],
			include: [{
				model: User,
				attributes: ['firstName', 'lastName', 'imageURL']
			}]
		}
	]
	})
	return post;
};

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
			order: [['createdAt', 'DESC']],
			attributes: { 
				exclude: ['updatedAt']
			},
			include: [
			{
				model: User,
				attributes: ['firstName', 'lastName', 'imageURL']
			},
			{
				model: Comment,
				attributes: ['content', 'likes', 'userId', 'id'],
				include: [{
					model: User,
					attributes: ['firstName', 'lastName']
				}]
			}
		]
		})
		.then( posts => {res.status(200).send({ posts, message: "Le post a été supprimé avec succès!" })
		})
		.catch( error => res.status(500).send({ error,  message: 'Impossible d\'afficher les posts' }));
	})
	.catch((err) => {
		res.status(500).send({ err, message: "Un problème est survenu lors de la suppression du post" })
	});
};


// Liker ou retirer son like d'un post
exports.likeApost = (req, res, next) => {
	const postId = req.body.postId;
	const userId = req.body.userId;
	const likeValue = req.body.like;

	// LikePost.findOne({
	// 	where: {postId: postId, userId: userId}
	// })
	// .then(() => {
	// 	if (likeValue === 1) {
	// 		res.status(500).send({message: "User already liked this post but likeValue = 1, NOT ok"});
	// 		return;
	// 	}
	// })
	// .catch((error) => {
	// 	res.status(500).send({error, message: "userId and PostId not found in LikePost table. User has not liked this post."});
	// 	return
	// })

	Post.findByPk( postId )
	.then( post => {
		switch(likeValue) {

			case 1: // le user like le post

				// Ajouter le couple postId userId de la table de jointure
				LikePost.create({postId, userId})
				.then( () => {

					// Mettre à jour le post
					post.update(
						{ likes: post.likes + 1 },
						{ where: {id : postId} },
					)
					.then (() => {
						Post.findAll({
							order: [['createdAt', 'DESC']],
							attributes: { 
								exclude: ['updatedAt']
							},
							include: [
							{
								model: User,
								attributes: ['firstName', 'lastName', 'imageURL']
							},
							{
								model: Comment,
								attributes: ['content', 'likes', 'userId', 'id'],
								include: [{
									model: User,
									attributes: ['firstName', 'lastName']
								}]
							}
							]
						})
						.then( posts => { 
							// Ajout de la table des likes au renvoi des posts
							LikePost.findAll()
							.then((likes) => {
								likes.forEach(like => {
									let post = posts.findIndex(search => search.id == like.postId);
									if (post != null) {
										if(posts[post].dataValues.usersLiked ===undefined){
											posts[post].dataValues.usersLiked = [like.userId];
										} else {
											posts[post].dataValues.usersLiked.push(like.userId);
										}
									}
								})
								res.status(201).send(posts);
							})
							.catch(error => { 
								res.status(500).send({ error, message: "Impossibled'ajouter la table des likes aux posts"});
							})
						})
						.catch( error => res.status(500).send({ error,  message:"Impossible d'afficher les posts, like case 1" }));
					})
				})
				.catch(error => {
					res.status(500).send({error, message: "Impossible d'ajouter le couple userId, postId à la table de jointure LikePost"});
				})

				break;

			case 0: // le user reclique pour retirer son like

				// Supprimer le couple postId userId de la table de jointure
				LikePost.destroy({
					where: { postId: postId, userId: userId}
				})
				.then(() => {

					// Mise à jour du post
					post.update(
						{ likes: post.likes - 1},
						{ where: { id : postId }}
					)
					.then (() => {
						Post.findAll({
							order: [['createdAt', 'DESC']],
							attributes: { 
								exclude: ['updatedAt']
							},
							include: [
							{
								model: User,
								attributes: ['firstName', 'lastName', 'imageURL']
							},
							{
								model: Comment,
								attributes: ['content', 'likes', 'userId', 'id'],
								include: [{
									model: User,
									attributes: ['firstName', 'lastName']
								}]
							}
							]
						})
						.then( posts => {
							// Ajout de la table des likes au renvoi des posts
							LikePost.findAll()
							.then((likes) => {
								likes.forEach(like => {
									let post = posts.findIndex(search => search.id == like.postId);
									if (post != null) {
										if(posts[post].dataValues.usersLiked === undefined){
											posts[post].dataValues.usersLiked = [like.userId];
										} else {
											posts[post].dataValues.usersLiked.push(like.userId);
										}
									}
								})
								res.status(201).send(posts);
							})
							.catch(error => { 
								res.status(500).send({ error, message: "Impossible d'ajouter la table des likes aux posts"});
							})
						})
						.catch( error => res.status(500).send({ error,  message:"Impossible de récupérer les posts, like case 0" }));
					})
				})
				.catch(error => {
					res.status(500).send({error, message: "Impossible de supprimer le couple postId, userId de la table de jointure LikePost"});
				})
				break;
		}
	})
	.then(() => res.status(201))
	.catch( error => res.status(500).send({ error, message: "Impossible de mettre à jour le post"} ));
};

async function sendPostToDB(post) {
	try {
		let result = await Post.create(post);
		console.log('************ result of post creation: ', result);
		let newpost = await getPost(result.dataValues.id);
		return newpost;
	} catch (error) {
		console.log(error);
	}
}
