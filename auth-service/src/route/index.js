const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
    }
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
