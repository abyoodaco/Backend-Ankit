/**
 * We define all our routes in this file. Routes are matched using `path`.
 * 1. If "path" is a string, then we simply match with url
 * 2. If "path is a object, then we assume it is a RegEx and use RegEx matching
 */

const authController = require('./controllers/AuthController');

const routes = [
    {
        method: 'POST',
        path: '/api/signin',
        handler: authController.signIn.bind(authController)
    },
    {
        method: 'POST',
        path: '/api/signup',
        handler: authController.signUp.bind(authController)
    },
];

module.exports = routes;