const express = require('express');
const BaseController = require('../controllers/BaseController');
const LanguageValidator = require('../validator/LanguageValidator');

const router = express.Router();
const auth = require('../middleware/auth');

const baseController = new BaseController();
const languageValidator = new LanguageValidator();

router.post('/language-register', auth(), languageValidator.createValidator, baseController.languageRegister);
router.get('/language-list', auth(), baseController.languageList);


module.exports = router;
