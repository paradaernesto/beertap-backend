'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var BreweryInput = sequelize.define('BreweryInput', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
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
