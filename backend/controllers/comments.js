const db = require('../models/index');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;
const LikePost = db.Like_Post;
const LikeComment = db.Like_Comment;



//Écrire un commentaire
exports.addComment = (req, res, next) => {
	let created = false;
	const comment = {
		userId: req.body.userId,
		postId:	req.body.postId,
		content: req.body.content,
		likes: 0,
	};

	Comment.create(comment)
	.then(() => { 
		created = true;
		res.status(201).send(created);
	})
	.catch( error => res.status(500).send({ error, message: 'Impossible de créer un commentaire'} ));
};


//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
	commentId = req.params.id;

	Comment.destroy({
		where: { id: commentId }
	})
	.then(() => {
		Post.findAll({ 
			order: [['createdAt', 'DESC']],
			attributes: { 
				exclude: ['updatedAt']
			},
			include: [
					// Impossible d'atteindre la table de jointure ePost
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
					attributes: ['firstName', 'lastName', 'imageURL']
				}]
			}
			]
		})
		.then( posts => {
			LikePost.findAll()
			// Ajout d'un tableau à chaque post contenant l'id des rs qui ont liké ce post
			.then((likes) => {
				likes.forEach(like => {
					let post = posts.findIndex(search => search.id == like.postId);
					if (post != null) {
						if(posts[post].dataValues.usersLiked === undefined){
							posts[post].dataValues.usersLiked = [like.userId];
						} else {
							posts[post].dataValues.usersLiked.push([like.userId]);
						}
					}
				})
				res.status(200).send(posts);
			})
			.catch(error => { 
				res.status(500).send({ error, message: "Impossible jouter la table des likes aux posts"});
			})
		})
		.catch( error => res.status(500).send({ error,  message: "Impossible d'afficher les posts" }));
	})
	.catch(error => {
		res.status(500).send({error, message: "Un problème est survenu lors de la suppression du commentaire" })
	});
};

// Liker ou retirer son like d'un commentaire
exports.likeComment = (req, res, next) => {
	commentId = req.params.id;
	console.log("************* controller body: ", req.body);
	userId = req.body.userId;
	likeValue = req.body.like;

	Comment.findByPk( commentId )
	.then( comment => {
		switch(likeValue) {
			case 1: // le user like le commentaire
				comment.update(
					{ likes: comment.likes + 1 },
					{ where: {id : commentId} },
				)
				.then(() => {
					// // ajout de [userId, commentId] dans la table de jointure LikeComment
					// LikeComment.create({commentId, userId})
					// .then(()=> {
					// 	// Ajout d'un tableau à chaque commentaore contenant l'id des users qui ont liké ce commentaire
					// 	LikeComment.findAll()
					// 	.then((likes) => {
					// 		likes.forEach(like => {
					// 			let comment = comments.findIndex(search => search.id == like.commentId);
					// 			if (comment != null) {
					// 				if(comments[comment].dataValues.usersLiked === undefined){
					// 					comments[comment].dataValues.usersLiked = [like.userId];
					// 				} else {
					// 					comments[comment].dataValues.usersLiked.push(like.userId);
					// 				}
					// 			}
					// 		})
					// 	})
					// 	.then(() => {
							Post.findAll({ 
								order: [['createdAt', 'DESC']],
								attributes: { 
									exclude: ['updatedAt']
								},
								include: [
										// Impossible d'atteindre directement la table de jointure 
									// { all: true, nested: true 
									// }
								{
									model: User,
									attributes: ['firstName', 'lastName', 'imageURL'],
								},
								{
									model: Comment,
									attributes: ['content', 'likes', 'userId', 'id'],
									include: [
										{
											model: User,
											attributes: ['firstName', 'lastName', 'imageURL']
										}
									]
								}
								]
							})
							.then( posts => {
								LikePost.findAll()
								// Ajout d'un tableau à chaque commentaire contenant l'id des users qui ont liké ce commentaire
								.then((likes) => {
									likes.forEach(like => {
										let post = posts.findIndex(search => search.id == like.postId);
										if (post != null) {
											if(posts[post].dataValues.usersLiked === undefined){
												posts[post].dataValues.usersLiked = [like.userId];
											} else {
												posts[post].dataValues.usersLiked.push([like.userId]);
											}
										}
									})
									res.status(200).send(posts);
								})
								.catch(error => { 
									res.status(500).send({ error, message: "Impossible jouter la table des likes aux posts"});
								})
							})
							.catch( error => res.status(500).send({ error,  message: "Impossible d'afficher les posts" }));
						// })
						// .catch((error) => {
						// 	res.status(500).send({error, message: "Impossible d'ajouter le couple commentId userId à la table de jointure"});
						// })
					// })
				})
				.catch((error) => {
					res.status(500).send({error, message: "Impossible de mettre à jour le commentaire"});
				})
				break;
			
			case 0:
				comment.update(
					{ likes: comment.likes - 1},
					{ where: { id : commentId }}
				)
				// retrait de [userId, commentId] de la table de jointure LikeComment
				.then(() => {
					// LikeComment.destroy({
					// 	where: { commentId: commentId, userId: userId}
					// })
					// .then(() => {
					// 	// Ajout d'un tableau à chaque commentaire contenant l'id des users qui ont liké ce commentaire
					// 	LikeComment.findAll()
					// 	.then((likes) => {
					// 		likes.forEach(like => {
					// 			let comment = comments.findIndex(search => search.id == like.commentId);
					// 			if (comment != null) {
					// 				if(comments[comment].dataValues.usersLiked === undefined){
					// 					comments[comment].dataValues.usersLiked = [like.userId];
					// 				} else {
					// 					comments[comment].dataValues.usersLiked.push(like.userId);
					// 				}
					// 			}
					// 		})
					// 	})
					// 	.then(() => {
							Post.findAll({ 
								order: [['createdAt', 'DESC']],
								attributes: { 
									exclude: ['updatedAt']
								},
								include: [
										// Impossible d'atteindre la table de jointure ePost
									// { all: true, nested: true 
									// }
								{
									model: User,
									attributes: ['firstName', 'lastName', 'imageURL'],
								},
								{
									model: Comment,
									attributes: ['content', 'likes', 'userId', 'id'],
									include: [
										{
											model: User,
											attributes: ['firstName', 'lastName', 'imageURL']
										}
									]
								}
								]
							})
							.then( posts => {
								LikePost.findAll()
								// Ajout d'un tableau à chaque post contenant l'id des rs qui ont liké ce post
								.then((likes) => {
									likes.forEach(like => {
										let post = posts.findIndex(search => search.id == like.postId);
										if (post != null) {
											if(posts[post].dataValues.usersLiked === undefined){
												posts[post].dataValues.usersLiked = [like.userId];
											} else {
												posts[post].dataValues.usersLiked.push([like.userId]);
											}
										}
									})
									res.status(200).send(posts);
								})
								.catch(error => { 
									res.status(500).send({ error, message: "Impossible d'ajouter la table des likes aux posts"});
								})
							})
							.catch( error => res.status(500).send({ error,  message: "Impossible d'afficher les posts" }));
					// 	})
					// })
					// .catch((error) => {
					// 	res.status(500).send({error, message: "Impossible de retirer le couple commentId userId de la table de jointure"});
					// })
				})
				.catch((error) => {
					res.status(500).send({error, message: "Impossible de mettre à jour le commentaire"});
				})
				break;
		}
	})
	.catch( error => res.status(500).send({ error, message: "Impossible d'aimer ce commentaire"} ));
};