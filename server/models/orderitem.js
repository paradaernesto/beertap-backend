'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var OrderItem = sequelize.define('OrderItem', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    beerType: DataTypes.STRING,
    liters: DataTypes.FLOAT,
    order: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.BeerType, {
      foreignKey: 'beerTypeId',
      onDelete: 'CASCADE'
    });
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDele: 'CASCADE'
    });
  };
  return OrderItem;
};
