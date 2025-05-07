const express                         = require('express');
const router                          = express.Router();
const ArticleTranslationController    = require('../controllers/ArticleTranslationController');
const validate                        = require('../middleware/validation');
const { articleTranslationSchema }    = require('../validator/articleTranslationValidator');
const auth                            = require('../middleware/auth')();

const ctrl = new ArticleTranslationController();

router.post('/',  auth, validate(articleTranslationSchema), ctrl.create);
router.get('/',           ctrl.list);
router.get('/:id',        ctrl.getById);
router.get('/article/:articleId', ctrl.listByArticle);
router.put('/:id',  auth, validate(articleTranslationSchema), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;