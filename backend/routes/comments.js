const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commCtrl = require('../controllers/comments');


// Écrire un commentaire
router.post('/', commCtrl.addComment);

// Éditer un commentaire
router.put('/:id', auth, commCtrl.modifyComment);

//Avoir le nombre de likes d'un commentaire
//router.get('/:id', auth, commCtrl.getLikes);

// Supprimer un commentaire
router.delete('/:id', auth, commCtrl.deleteComment);

//Liker un commentaire
	// ne fonctionne pas avec auth
router.put('/like/:id', commCtrl.likeAcomment);

module.exports = router;
