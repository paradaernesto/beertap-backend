'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var BeerIngredient = sequelize.define('BeerIngredient', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
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

  BeerIngredient.associate = (models) => {
    BeerIngredient.belongsTo(models.BeerType, {
      foreignKey: 'beerTypeId',
      onDelete: 'CASCADE'
    });
  };

  return BeerIngredient;
};
