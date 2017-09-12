const authController = require('../controllers').auth;
const userController = require('../controllers').user;

module.exports = (apiRoutes) => {
    apiRoutes.post('/authenticate', authController.authenticate);
    apiRoutes.get('/sampleUser', userController.createSampleUser);
    // route middleware to verify a token
    apiRoutes.use(authController.verify);
}
