'use strict';
module.exports = (sequelize, DataTypes) => {
  var BeerIngredient = sequelize.define('BeerIngredient', {
    breweryInput: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    beerType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BeerIngredient;
};