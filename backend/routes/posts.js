// Importations
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/posts');


// Récupérer tous les posts
router.get('/', postCtrl.getAllPosts);

// Créer un nouveau post
router.post('/', auth, multer, postCtrl.createPost);

// Supprimer un post by id
router.delete('/:id', auth, postCtrl.deletePost);

// Liker un post
// ne fonctionne pas avec auth
router.put('/like', postCtrl.likeApost);

module.exports = router;
