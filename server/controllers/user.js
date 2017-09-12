const User = require('../models').User;

module.exports = {
    createSampleUser(req, res) {
        return User
        .create({
            email: 'test@test.com',
            password: 'password',
            breweryName: 'test brewery'
        })
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
    }
}
