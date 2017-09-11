const User = require('../models').User;
const uuidv1 = require('uuid/v1');

module.exports = {
    createSampleUser(req, res) {
        return User
        .create({ 
            id: uuidv1(),
            email: 'test@test.com', 
            password: 'password',
            breweryName: 'test brewery'
        })
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    } 
}