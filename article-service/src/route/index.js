const express = require('express');
const articleRoutes = require('./articleRoutes');
const articletranslationRoutes = require('./articleTranslationRoutes');
const blockRoutes = require('./blockRoutes');
const articleblockRoutes = require('./articleBlockRoutes');
const categoryRoutes = require('./categoryRoutes');
const articlecategoryRoutes = require('./articleCategoryRoutes');
const tagRoutes = require('./tagRoutes');
const articletagRoutes = require('./articleTagRoutes');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/articles',
        route: articleRoutes,
    },
    {
        path: '/article-translations',
        route: articletranslationRoutes,
    },
    {
        path: '/blocks',
        route: blockRoutes,
    },
    {
        path: '/article-blocks',
        route: articleblockRoutes,
    },
    {
        path: '/categories',
        route: categoryRoutes,
    },
    {
        path: '/article-categories',
        route: articlecategoryRoutes,
    },
    {
        path: '/tags',
        route: tagRoutes,
    },
    {
        path: '/article-tags',
        route: articletagRoutes,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
