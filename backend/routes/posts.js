// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const postCtrl = require('../controllers/posts');


// Récupérer tous les posts
router.get('/', auth, postCtrl.getAllPosts);

// Récupérer les 5 derniers posts
router.get('/pages/:start/5', auth, postCtrl.getLastPosts);

// Faire une recherche de posts par date
//router.get('/:date', postCtrl.getByDate);

// Créer un nouveau post
router.post('/', auth, postCtrl.createPost);

// Mettre à jour un post by id
router.put('/:id', auth, postCtrl.updatePost);

// Supprimer un post by id
router.delete('/:id', auth, postCtrl.deletePost);

