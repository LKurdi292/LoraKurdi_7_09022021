//Importations
const db = require('../models/index');
const User = db.User;
const op = db.Sequelize.op;
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
				id: user.id,
				token: jwt.sign(
					{ id: user.id},
					process.env.TOKEN,
					{ expiresIn: '24h' }
				)
			});
		})
		.catch(error => res.status(500).send({ error }));
	})
	.catch(error => res.status(500).send({ error }));
};


// Les middlewares pour tous les users

// Voir son profil
exports.getMyAccount = (req, res, next) => {
	const connectedId = req.params.id;
	
	User.findByPk(connectedId)
	.then(data => {
		res.status(200).send(data);
	})
	.catch(error => res.status(500).send({ error, message: 'Impossible d\'afficher les informations du compte' }));
};

// Mettre à jour son profil
exports.updateMyAccount = (req, res, next) => {
	const connectedId = req.params.id;
	
	User.update(req.body, { 
		where: { id : connectedId }
	})
	.then(num => {
		if (num == 1) {
			res.send({ message: "Votre compte a été mis à jour avec succès." });
	} else {
		res.send({
			message: `Impossible de mettre à jour le compte.`
		})
	}})
	.catch(error => { res.status(500).send({ error, message: "Une erreur est survenu lors de la mise à jour du compte" })
	});
};

exports.deleteMyAccount = (req, res, next) => {
	const connectedId = req.params.id;

	User.destroy({
		where: { id: connectedId }
	})
	.then(num => {
		if (num == 1) {
			res.send({ message: "Votre compte a été supprimé avec succès!" });
		} else {
			res.send({ message: "Impossible de supprimer le compte"})
		}
	})
	.catch(error => {
		res.status(500).send({ error, message: "Un problème est survenu lors de la suppression du compte" })
	});
};

// Les middlewares pour les admin

//Afficher la liste des users
exports.getAllUsers = (req, res, next) => {
	User.findAll({ attributes: ['email', 'isAdmin'] })
	.then (data => {
		res.send(data);
	})
	.catch(error => {
		res.status(500).send({ error, message: 'Impossible d\'afficher la liste des utilisateurs' })
	});
};


exports.getUserInfo = (req, res, next) => {
	// Crypter le mail de la requete
	const key = cryptoJS.enc.Hex.parse(process.env.CryptojsKEY);
	const iv = cryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
	const encrypted = cryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();

	User.findOne({ where: { email: encrypted }, attributes: ['email', 'bio', 'imageURL', 'firstName', 'lastName', 'isAdmin', 'subscriptionDate']})
	.then(data => {
		res.status(200).send(data);
	})
	.catch(error => res.status(500).send({ error, message: 'Impossible d\'afficher les informations du compte', email }));

};

exports.deleteUserAccount = (req, res, next) => {
	// Crypter le mail de la requete
	const key = cryptoJS.enc.Hex.parse(process.env.CryptojsKEY);
	const iv = cryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
	const encrypted = cryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
	
	User.destroy({
		where: { email: encrypted }
	})
	.then(num => {
		if (num == 1) {
			res.send({ message: "Le compte a été supprimé avec succès!" });
		} else {
			res.send({ message: "Impossible de supprimer le compte"})
		}
	})
	.catch(error => {
		res.status(500).send({ error, message: "Un problème est survenu lors de la suppression du compte" })
	});
};