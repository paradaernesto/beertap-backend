'use strict';
module.exports = (sequelize, DataTypes) => {
  var BreweryInput = sequelize.define('BreweryInput', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.FLOAT,
    unit: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BreweryInput;
};