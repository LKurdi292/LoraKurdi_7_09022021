const db = require('../models/index');
const Post = db.Post;
const op = db.Sequelize.op;


// Récupérer tous les posts
exports.getAllPosts = (req, res, next) => {
	Post.findAll({ 
		attributes: { exclude: ['createdAt', 'updatedAt']}
	})
	.then(data => res.status(200).send(data))
	.catch( error => res.status(500).send({ error,  message: 'Impossible d\'afficher les posts' }));
};

//À continuer
// Afficher les 5 derniers posts
exports.getLastPosts = (req, res, next) => {
	const start = req.params.start;

};

// exports.getByDate = (req, res, next) => {
// 	const date = req.params.date;
// }


// Créer un post
exports.createPost = (req, res, next) => {
	//const postObject = JSON.parse(req.body.post);
	console.log("je suis là 1");
	
	// Valid request
	if (!req.body.title) {
		res.status(401).send({
		  message: "Le post doit avoir un titre!"
		});
		return
	}

	if (req.body.imageURL) {
		const post = {
			// userId depuis middleware token?
			userId : req.body.userId,
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
		console.log("je suis là 2");
		const post = {
			// userId depuis middleware token?
			userId : req.body.userId,
			title : req.body.title,
			publicationText : req.body.text,
			publicationDate : Date.now(),
			likes: 0
		};
		Post.create(post)
		.then(() => res.status(201).json({ message: 'Post créé !'}))
		.catch( error => res.status(500).send({ error, message: 'Impossible de créer un post'} ));
	};
};


// Modifier un post
exports.updatePost = (req, res, next) => {
	const id = req.params.id;

	Post.update(
		{title: req.body.title,
		publicationText: req.body.text,
		imageURL: req.body.imageURL},
		{where: {id: id } }
	)
	.then(num => {
		if (num == 1) {
			res.send({ message: "Le post a été mis à jour avec succès." });
	} else {
		res.send({
			message: `Impossible de mettre à jour le post.`
		})
	}})
	.catch(error => { res.status(500).send({ error, message: "Une erreur est survenu lors de la mise à jour du post" })
	});
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
	const id = req.params.id;
	
	// Vérification du user?

	Post.destroy({
		where: { id: id }
	})
	.then(num => {
		if (num == 1) {
			res.send({ message: "Le post a été supprimé avec succès!" });
		} else {
			res.send({ message: "Impossible de supprimer le poste"})
		}
	})
	.catch(err => {
		res.status(500).send({ message: "Un problème est survenu lors de la suppression du post" })
	});
};
