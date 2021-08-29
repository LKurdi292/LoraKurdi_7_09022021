const db = require('../models/index');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;
const LikePost = db.Like_Post;



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
					attributes: ['firstName', 'lastName']
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
exports.likeAcomment = (req, res, next) => {
	commentId = req.params.id;

	userId = req.body.userId;
	likeValue = req.body.like;

	Comment.findByPk( commentId )
	.then( comment => {
		switch(likeValue) {
			case 1: // le user like le commentaire
				Comment.update(
					{ likes: comment.likes + 1 },
					{ where: {id : commentId} },
				)
				// ajout de [userId, commentId] dans la table de jointure Like_Comment
				.then(() => {
					comment.addUser(userId);
					User.findByPk(userId).then( user => {
						user.addComment(commentId);
					})
				})
				.then(() => res.status(201).json({ message: 'Commentaire aimé !'}))
				break;
			
			case 0:
				Comment.update(
					{ likes: comment.likes - 1},
					{ where: { id : commentId }}
				)
				// retrait de [userId, commentId] de la table de jointure Like_Comment
				.then(() => {
					comment.removeUser(userId);
					User.findByPk(userId).then(user => {
						user.removeComment(commentId);
					})
				})
				.then(() => res.status(201).json({ message: 'Like retiré'}));
				break;
		}
	})
	.then(() => res.status(201))
	.catch( error => res.status(500).send({ error, message: 'Impossible d\'aimer ce commentaire'} ));
};