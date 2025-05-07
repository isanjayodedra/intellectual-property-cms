const express        = require('express');
const router         = express.Router();
const BlockController= require('../controllers/BlockController');
const validate       = require('../middleware/validation');
const { blockSchema }= require('../validator/blockValidator');
const auth           = require('../middleware/auth')();

const ctrl = new BlockController();

router.post('/',  auth, validate(blockSchema), ctrl.create);
router.get('/',          ctrl.listAll);
router.get('/active',    ctrl.listActive);
router.get('/:id',       ctrl.getById);
router.put('/:id',       auth, validate(blockSchema), ctrl.update);
router.delete('/:id',    auth, ctrl.remove);

module.exports = router;