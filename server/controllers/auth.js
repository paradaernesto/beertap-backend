const User = require('../models').User;
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'docker';
const config = require('../config/config.json')[env];
const bcrypt = require('bcryptjs');

const promiseJWTVerify = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});

module.exports = {
    verify (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        promiseJWTVerify(token)
          .then(decoded => {
            req.appUser = decoded;
            User.find({ where: { email: decoded.email } })
            .then(user => { 
              req.user = user; 
              next(); 
            });          
          })
          .catch(err => res.status(401).json())
    },
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

          bcrypt.compare(req.body.password, user.password)
          .then(resBcrypt => {
            if (resBcrypt) {
              var token = jwt.sign({email: user.email}, config.secret, { expiresIn: '24h' });
              res.json({
               token: token
             });
            } else {
              res.status(401).send({
                message: 'Wrong password'
              });
            }
          })
          .catch(err => { console.log(err) });

        })
        .catch(error => {
          console.log(error)
          res.status(400).send({
            message: 'An error has ocurred',
            error: error
          });
        });
    }
}
