'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cooking = sequelize.define('Cooking', {
    state: DataTypes.STRING,
    beer_type: DataTypes.STRING,
    liters: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cooking;
};