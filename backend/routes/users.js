// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/users');
const multer = require('../middlewares/multer-config');


// S'inscrire
router.post('/auth/signup', userCtrl.signup);

// Se connecter
router.post('/auth/login', userCtrl.login);

// Modifier son compte
router.put('/users/myaccount/:id', auth, multer, userCtrl.updateMyAccount);

// Supprimer son compte
router.delete('/users/myaccount/:id', auth, userCtrl.deleteMyAccount);



// Les routes 'admin' only
// Voir la liste des utilisateurs/membres
	// ne fonctionne pas avec auth
router.get('/users/allusers/:id', userCtrl.getAllUsers);

// Supprimer le compte d'un utilisateur
	// ne fonctionne pas avec auth
router.delete('/users/allusers/:id/:adminId', userCtrl.deleteUserAccount);

module.exports = router;