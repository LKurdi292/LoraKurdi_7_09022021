const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commCtrl = require('../controllers/comments');

// Écrire un commentaire
router.post('/', auth, commCtrl.addComment);

// Éditer un commentaire
router.put('/:id', auth, commCtrl.modifyComment);

// Supprimer un commentaire
router.delete('/:id', auth, commCtrl.deleteComment);