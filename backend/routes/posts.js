// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const postCtrl = require('../controllers/posts');


// Récupérer tous les posts
router.get('/', postCtrl.getAllPosts);

// Créer un nouveau post
// ne fonctionne pas avec auth
router.post('/', auth, postCtrl.createPost);

// Supprimer un post by id
router.delete('/:id', auth, postCtrl.deletePost);

// Liker un post
// ne fonctionne pas avec auth
router.put('/like/:id', postCtrl.likeApost);

// Récupérer les 5 derniers posts
//router.get('/pages/:start/5', auth, postCtrl.getLastPosts);

// Faire une recherche de posts par date
//router.get('/:date', postCtrl.getByDate);

module.exports = router;
