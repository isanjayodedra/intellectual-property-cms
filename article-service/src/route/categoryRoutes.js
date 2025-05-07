const express             = require('express');
const router              = express.Router();
const CategoryController  = require('../controllers/CategoryController');
const validate            = require('../middleware/validation');
const { categorySchema }  = require('../validator/categoryValidator');
const auth                = require('../middleware/auth')();

const ctrl = new CategoryController();

router.post('/',        auth, validate(categorySchema), ctrl.create);
router.get('/',         ctrl.listAll);
router.get('/active',   ctrl.listActive);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id',      ctrl.getById);
router.put('/:id',      auth, validate(categorySchema), ctrl.update);
router.delete('/:id',   auth, ctrl.remove);

module.exports = router;