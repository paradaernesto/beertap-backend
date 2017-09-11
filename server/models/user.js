'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      len: [5,20] 
    },
    breweryName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.BorrowedItem, {
      foreignKey: 'userId',
      as: 'borrowedItems'
    });
  };
  return User;
};