'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const encryptPasswordIfChanged = (user, options) => {
  if (user.changed('password')) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
}

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
    breweryName: DataTypes.STRING,

});

  User.beforeSave(encryptPasswordIfChanged);

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
