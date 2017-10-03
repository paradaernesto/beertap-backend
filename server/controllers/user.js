const User = require('../models').User;

const createSampleUser = (req, res) => {
    return User
    .create({
        email: 'test@test.com',
        password: 'password',
        breweryName: 'test brewery'
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}

const signUpUser = (req, res) => {
    return User.create({
        email: req.body.email,
        password: req.body.password,
        breweryName: req.body.brewery_name
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}

module.exports = {
    createSampleUser,
    signUpUser
}
