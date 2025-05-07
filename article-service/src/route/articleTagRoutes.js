const express               = require('express');
const router                = express.Router();
const ArticleTagController  = require('../controllers/ArticleTagController');
const validate              = require('../middleware/validation');
const { articleTagSchema }  = require('../validator/articleTagValidator');
const auth                  = require('../middleware/auth')();

const ctrl = new ArticleTagController();

router.post('/',               auth, validate(articleTagSchema), ctrl.create);
router.get('/',                ctrl.listAll);
router.get('/article/:articleId', ctrl.listByArticle);
router.delete('/:id',          auth, ctrl.remove);

module.exports = router;