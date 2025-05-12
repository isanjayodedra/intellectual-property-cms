// src/routes/articleRoutes.js

const express           = require('express');
const router            = express.Router();
const ArticleController = require('../controllers/ArticleController');
const validate          = require('../middleware/validation');
const auth              = require('../middleware/auth')();
const { articleSchema } = require('../validator/articleValidator');

const ctrl = new ArticleController();

// Public
router.get('/',            ctrl.listPublished);
router.get('/:id',         ctrl.getById);
router.get('/slug/:slug',  ctrl.checkSlug);


// Protected
router.post('/',  auth, validate(articleSchema), ctrl.create);
router.put('/:id', auth, validate(articleSchema), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;