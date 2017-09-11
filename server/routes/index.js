const authController = require('../controllers').auth;
const userController = require('../controllers').user;

module.exports = (apiRoutes) => {
    apiRoutes.post('/authenticate', authController.authenticate);
    apiRoutes.get('/sampleUser', userController.createSampleUser);
    // route middleware to verify a token
    apiRoutes.use((req, res, next) => {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
            return res.status(401).send({message: 'Failed to authenticate token'});
            } else {
            req.decoded = decoded;
            next();
            }
        });
        } else {
            return res.status(403).send({message: 'No token provided'});
        }
    });
}