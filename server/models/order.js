'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderItemId',
      as: 'orderItems'
    });
  }
  return Order;
};
