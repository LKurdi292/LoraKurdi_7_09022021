// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/users');


// S'inscrire
router.post('/auth/signup', userCtrl.signup);

// Se connecter
router.post('/auth/login', userCtrl.login);

// Modifier son compte
router.put('/users/myaccount/:id', auth, userCtrl.updateMyAccount);

// Supprimer son compte
router.delete('/users/myaccount/:id', auth, userCtrl.deleteMyAccount);



// Les routes 'admin' only
// Voir la liste des utilisateurs/membres
router.get('/users/allusers', auth, userCtrl.getAllUsers);

// Voir les informations d'un utilisateur
//router.get('/users/all-users/:id', auth, userCtrl.getUserInfo);

// Supprimer le compte d'un utilisateur
router.delete('/users/all-users/:id', auth, userCtrl.deleteUserAccount);

module.exports = router;