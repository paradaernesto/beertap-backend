const authController = require('../controllers').auth;
const userController = require('../controllers').user;
const borrowedItemController = require ('../controllers').borrowedItem;
const beerTypeController = require('../controllers').beerType;

module.exports = (apiRoutes) => {
    apiRoutes.post('/authenticate', authController.authenticate);
    apiRoutes.get('/sampleUser', userController.createSampleUser);
    apiRoutes.post('/signUp', userController.signUpUser);
    // route middleware to verify a token
    apiRoutes.use(authController.verify);
    // Borrowed Item's CRUD
    apiRoutes.post('/borrowedItems', borrowedItemController.registerBorrowedItem);
    apiRoutes.get('/borrowedItems', borrowedItemController.itemsForUser);
    apiRoutes.get('/borrowedItems/:id', borrowedItemController.itemDetail);
    apiRoutes.put('/borrowedItems/:id', borrowedItemController.updateItem);
    // BeerType's CRUD
    apiRoutes.post('/beerTypes', beerTypeController.createBeerType);
    apiRoutes.get('/beerTypes', beerTypeController.listBeerTypes);
    apiRoutes.get('/beerTypes/:id', beerTypeController.beerTypeDetail);
    apiRoutes.put('/beerTypes/:id', beerTypeController.editBeerType);
    apiRoutes.delete('/beerTypes/:id', beerTypeController.removeBeerType);
}
