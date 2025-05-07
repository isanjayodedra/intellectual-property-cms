const express                     = require('express');
const router                      = express.Router();
const ArticleCategoryController   = require('../controllers/ArticleCategoryController');
const validate                    = require('../middleware/validation');
const { articleCategorySchema }   = require('../validator/articleCategoryValidator');
const auth                        = require('../middleware/auth')();

const ctrl = new ArticleCategoryController();

router.post('/',       auth, validate(articleCategorySchema), ctrl.create);
router.get('/',        ctrl.listAll);
router.get('/article/:articleId', ctrl.listByArticle);
router.delete('/:id',  auth, ctrl.remove);

module.exports = router;