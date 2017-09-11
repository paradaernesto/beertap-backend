'use strict';
module.exports = (sequelize, DataTypes) => {
  var BeerType = sequelize.define('BeerType', {
    name: DataTypes.STRING,
    liters: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BeerType;
};