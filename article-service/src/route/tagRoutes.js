const express       = require('express');
const router        = express.Router();
const TagController = require('../controllers/TagController');
const validate      = require('../middleware/validation');
const { tagSchema } = require('../validator/tagValidator');
const auth          = require('../middleware/auth')();

const ctrl = new TagController();

router.post('/',       auth, validate(tagSchema), ctrl.create);
router.get('/',        ctrl.listAll);
router.get('/active',  ctrl.listActive);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id',     ctrl.getById);
router.put('/:id',     auth, validate(tagSchema), ctrl.update);
router.delete('/:id',  auth, ctrl.remove);

module.exports = router;