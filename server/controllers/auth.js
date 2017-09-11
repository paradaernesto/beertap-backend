const User = require('../models').User;
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'docker';
const config = require('../config/config.json')[env];

module.exports = {
    authenticate(req, res) {
        return User
        .find({
          where : { email: req.body.email }
        })
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: 'User not found'
            });
          }
          if (user.password != req.body.password) { // TODO: improve
            res.status(401).send({
              message: 'Wrong password'
            });
          } else {
           var token = jwt.sign({email: user.email}, config.secret, { expiresIn: '1h' });
           res.json({
            token: token
          });
          }
        })
        .catch(error => {
          console.log(error)
          res.status(400).send({
            message: 'An error has ocurred',
            error: error
          });
        }) 
    }
}