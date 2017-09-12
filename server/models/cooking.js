'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Cooking = sequelize.define('Cooking', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    state: DataTypes.STRING,
    beer_type: DataTypes.STRING,
    liters: {
      type: DataTypes.INTEGER,
      min: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Cooking.associate = (models) => {
    Cooking.belongsTo(models.BeerType, {
      foreignKey: 'beerTypeId',
      onDelete: 'CASCADE'
    });
  };
  return Cooking;
};
