const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commCtrl = require('../controllers/comments');


// Écrire un commentaire
	// ne fonctionne pas avec auth
router.post('/', commCtrl.addComment);

// Supprimer un commentaire
router.delete('/:id', auth, commCtrl.deleteComment);

//Liker un commentaire
	// ne fonctionne pas avec auth
router.put('/like/:id', commCtrl.likeAcomment);

module.exports = router;
