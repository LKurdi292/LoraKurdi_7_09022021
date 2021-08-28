const db = require('../models/index');
const Comment = db.Comment;
const User = db.User;


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


// Renvoyer un commentaire après une création ou ajout d'un like
//const getComment = async (id) => {
//	let comment = await Comment.findByPk(id, {
//		attributes: { 
//			exclude: ['updatedAt']
//		},
//		include: [{
//			model: User,
//			attributes: ['firstName', 'lastName', 'imageURL']
//		}]
//	})
//	return comment;
//};

// async function sendCommentToFront(comment) {
// 	try {
// 		let result = await Comment.create(post);
// 		let newComment = await getComment(result.dataValues.id);
// 		return newComment;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// Récupérer des commentaires
// exports.getComments = (req, res, next) => {
// 	Comment.findAll({
// 		order: [['postId', 'DESC']],
// 		attributes: { 
// 			exclude: ['updatedAt']
// 		}, 
// 		include: [{
// 			model: User,
// 			attributes: ['firstName', 'lastName', 'imageURL']
// 		}]
// 	})
// 	.then( data => {res.status(200).send(data)})
// 	.catch( error => res.status(500).send({ error,  message: 'Impossible d\'afficher les commentaires' }));
// };








// Editer un commentaire
exports.modifyComment = (req, res, next) => {
	commentId = req.params.id;

	Comment.update(
		{content: req.body.content},
		{where: {id: commentId } }
	)
	.then(num => {
		if (num == 1) {
			res.send({ message: "Le commentaire a été mis à jour avec succès." });
	} else {
		res.send({
			message: `Impossible de mettre à jour le commentaire.`
		})
	}})
	.catch(error => { res.status(500).send({ error, message: "Une erreur est survenu lors de la mise à jour du commentaire" })
	});
};

// Avoir le nombre de likes d'un commentaire
//exports.getLikes = (req, res, next) => {}





//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
	commentId = req.params.id;

	Comment.destroy({
		where: { id: commentId }
	})
	.then(num => {
		if (num == 1) {
			res.send({ message: "Le commentaire a été supprimé avec succès!" });
		} else {
			res.send({ message: "Impossible de supprimer le commentaire"})
		}
	})
	.catch(err => {
		res.status(500).send({ message: "Un problème est survenu lors de la suppression du commentaire" })
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