const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const articleCtrl = require('../controllers/article');

// console.log('dans routes article.js');
router.get('/',  articleCtrl.getAllArticle);
// console.log('dans routes article.js apres l appel à articleController');



router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);


module.exports = router;