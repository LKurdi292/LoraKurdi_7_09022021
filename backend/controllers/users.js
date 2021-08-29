//Importations
const db = require('../models/index');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');



// Créer un user
exports.signup = (req, res, next) => {

	// Crypter l'email
	const key = cryptoJS.enc.Hex.parse(process.env.CryptojsKEY);
	const iv = cryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
	const encrypted = cryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();

	//hasher le mdp + nbr de tour de hashage
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		// nouvel utilisateur, enregistrement dans la bdd
		const user = {
			email : encrypted,
			password : hash,
			firstName : req.body.firstName,
			lastName : req.body.lastName, 
			isAdmin : req.body.isAdmin,
			subscriptionDate : Date.now()
		};
		// Sauvegarder dans la base
		User.create(user)
		.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
		.catch(error => res.status(500).send({ message: error.message + 'Impossible de créer le compte!' }));
	})
	.catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
	// Crypter le mail de la requete
	const key = cryptoJS.enc.Hex.parse(process.env.CryptojsKEY);
	const iv = cryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
	const encrypted = cryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();

	// le chercher dans la base de donnée
	User.findOne({ where: { email: encrypted } })
	.then(user => {
		// si oui, vérifier le mdp
		bcrypt.compare(req.body.password, user.password)
		.then( valid => {
			// si comparaison fausse
			if (!valid) {
				return (res.status(401).send({ error: 'Mot de passe incorrect!'}));
			}
			// comparaison true
			res.status(200).json({
				user: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: req.body.email,
					password: req.body.password,
					bio: user.bio,
					isAdmin: user.isAdmin
				},
				subscriptionDate: user.subscriptionDate,
				token: jwt.sign(
					{ id: user.id},
					process.env.TOKEN,
					{ expiresIn: '24h' }
				), 
				message: "Vous êtes connecté!"
			});
		})
		.catch(error => {
			res.status(500).send({ message: "Password not valid", error })
		});
	})
	.catch(error => { 
		res.status(500).send(console.log(error));
	});
};


// Les middlewares pour tous les users

// Mettre à jour son profil
exports.updateMyAccount = (req, res, next) => {
	const connectedId = req.params.id;

	// Crypter le mail de la requete
	const key = cryptoJS.enc.Hex.parse(process.env.CryptojsKEY);
	const iv = cryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
	const encrypted = cryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();

	// Hasher le mdp
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		User.update({
			email: encrypted,
			password: hash,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			bio: req.body.bio} ,
			{where :{ id : connectedId }}
		)
		.then(() => {
			User.findByPk(connectedId)
			.then((user ) => {
				res.status(200).json({ 
					message: "Votre compte a été mis à jour avec succès.", 
					user: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: req.body.email,
						password: req.body.password,
						bio: user.bio,
						isAdmin: user.isAdmin
					}
				});
			})
			.catch(error => { 
				res.status(500).send({ 
					error, 
					message: "Une erreur est survenu lors de la mise à jour du compte"
				})
			})
		})
		.catch(error => { 
			res.status(500).send({ 
				error, 
				message: "Une erreur est survenu lors de la mise à jour du compte"
			})
		})
	})
	.catch(error => { 
		res.status(500).send( console.log(error));
	});
};


// Supprimer son compte
exports.deleteMyAccount = (req, res, next) => {
	const connectedId = req.params.id;

	User.destroy({
		where: { id: connectedId }
	})
	.then(() => {
		res.status(200).send({ message: "Votre compte a été supprimé avec succès!" });
	})
	.catch(error => {
		res.status(500).send({ error, message: "Un problème est survenu lors de la suppression du compte" })
	});
};

// Les middlewares pour les admin

//Afficher la liste des users
exports.getAllUsers = (req, res, next) => {
	const connectedId = req.params.id;

	User.findByPk(connectedId)
	.then((user) => {
		if (user.isAdmin) {
			User.findAll({ 
				order: [['lastName', 'ASC']],
				attributes: ['firstName', 'lastName', 'isAdmin', 'id']
			 })
			.then (data => {
				res.status(200).send(data);
			})
			.catch(error => {
				res.status(500).send({ error, message: "Impossible d'afficher la liste des utilisateurs" })
			});
		} else {
			res.status(401).send({message: "You don't have an administration account" })
		}
	})
	.catch(error => {
		res.status(401).send({ error, message: "Can't find user is database" });
	})
};

// Supprimer un utilisateur
exports.deleteUserAccount = (req, res, next) => {

	const userIdToDestroy = req.params.id;
	const adminId = req.params.adminId;

	User.findByPk(adminId)
	.then((user) => {
		if (user.isAdmin) {
			User.destroy({
				where: { id: userIdToDestroy }
			})
			.then(() => {
				User.findAll({ 
					order: [['lastName', 'ASC']],
					attributes: ['firstName', 'lastName', 'isAdmin', 'id']
				 })
				.then (data => {
					res.status(200).send(data);
				})
				.catch(error => {
					res.status(500).send({ error, message: "Unable to reach users list" });
				});
			})
			.catch(error => {
				res.status(500).send({ error, message: "Unable to delete account"});
			})
		} else {
			res.status(401).send({message: "You are not allowed to delete other users' accounts " });
		}
	})
	.catch(error => {
		res.status(401).send({ error, message: "Can't find admin user is database" });
	})
};