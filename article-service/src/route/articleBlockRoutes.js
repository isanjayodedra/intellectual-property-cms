const express               = require('express');
const router                = express.Router();
const ArticleBlockController= require('../controllers/ArticleBlockController');
const validate              = require('../middleware/validation');
const { articleBlockSchema }= require('../validator/articleBlockValidator');
const auth                  = require('../middleware/auth')();

const ctrl = new ArticleBlockController();

router.post('/',         auth, validate(articleBlockSchema), ctrl.create);
router.get('/',          ctrl.listAll);
router.get('/article/:articleId', ctrl.listByArticle);
router.get('/:id',       ctrl.getById);
router.put('/:id',       auth, validate(articleBlockSchema), ctrl.update);
router.delete('/:id',    auth, ctrl.remove);

module.exports = router;