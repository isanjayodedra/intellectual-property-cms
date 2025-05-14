// src/routes/articleRoutes.js

const express           = require('express');
const router            = express.Router();
const ArticleController = require('../controllers/ArticleController');
const validate          = require('../middleware/validation');
const auth              = require('../middleware/auth');
const articleValidator = require('../validator/articleValidator');

const articleController = new ArticleController();

// Public
router.get('/',            articleController.listPublished);
router.get('/:id',         articleController.getById);
router.get('/slug/:slug',  articleController.checkSlug);

// Protected
router.post('/',  auth(), articleValidator.articleCreateValidator, articleController.create);
router.put('/:id', auth(), articleValidator.articleUpdateValidator, articleController.update);
router.delete('/:id', auth(), articleController.remove);

module.exports = router;