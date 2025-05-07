const express = require('express');
const baseRoute = require('./baseRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/base',
        route: baseRoute,
    }
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
