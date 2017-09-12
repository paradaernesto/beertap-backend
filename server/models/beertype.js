'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var BeerType = sequelize.define('BeerType', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
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

  BeerType.associate = (models) => {
    BeerType.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    BeerType.hasMany(models.Cooking, {
      foreignKey: 'cookingId',
      as: 'cookings'
    });
  };

  return BeerType;
};
