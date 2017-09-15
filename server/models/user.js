'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { //Todo encrypt password before save
      type: DataTypes.STRING,
      len: [5,20]
    },
    breweryName: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
  },
  // {
  //   beforeSave: (instance, options) => {
  //     if (instance.changed('password') {
  //       bcrypt.genSalt(10, (err, salt) => {
  //         bcrypt.hash(user.password, salt, (err, hash) => {
  //           user.password = hash;
  //         });
  //       }
  //     }
  // }
});

  User.associate = (models) => {
    User.hasMany(models.BorrowedItem, {
      foreignKey: 'userId',
      as: 'borrowedItems'
    });
    User.hasMany(models.BeerType, {
      foreignKey: 'userId',
      as: 'beerTypes'
    });
    User.hasMany(models.OrderItem, {
      foreignKey: 'userId',
      as: 'orderItems'
    })
  };

  return User;
};
