const authController = require('../controllers').auth;
const userController = require('../controllers').user;
const borrowedItemController = require ('../controllers').borrowedItem;

module.exports = (apiRoutes) => {
    apiRoutes.post('/authenticate', authController.authenticate);
    apiRoutes.get('/sampleUser', userController.createSampleUser);
    // route middleware to verify a token
    apiRoutes.use(authController.verify);
    // Borrowed Item's CRUD
    apiRoutes.post('/borrowedItems', borrowedItemController.registerBorrowedItem);
    apiRoutes.get('/borrowedItems', borrowedItemController.itemsForUser);
    apiRoutes.get('/borrowedItems/:id', borrowedItemController.itemDetail);
    apiRoutes.put('/borrowedItems/:id', borrowedItemController.updateItem);
}
