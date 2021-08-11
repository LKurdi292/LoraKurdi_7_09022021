const db = require('../models/index');
const Comment = db.Comment;
const User = db.User;


//Écrire un commentaire
exports.addComment = (req, res, next) => {
	const comment = {
		userId: req.body.userId,
		postId:	req.body.postId,
		content: req.body.content,
		likes: 0,
	};

	Comment.create(comment)
	.then(() => res.status(201).json({ message: 'Commentaire posté !'}))
	.catch( error => res.status(500).send({ error, message: 'Impossible de créer un commentaire'} ));

};

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
				// maj de la table de jointure [userId, commentId]
				.then(() => {
					comment.addUser(userId);
					User.findByPk(userId).then(() => {
						user.addComment(commentId);
					})
				})
				.then(() => res.status(201).json({ message: 'Commentaire aimé !'}))
				break;
			
			case 0:
				Comment.update({likes: comment.likes - 1}, {where: {id : commentId}})
				.then(() => res.status(201).json({ message: 'Like retiré'}));
				break;
		}
	})
	.then(() => res.status(201))
	.catch( error => res.status(500).send({ error, message: 'Impossible d\'aimer ce commentaire'} ));
};