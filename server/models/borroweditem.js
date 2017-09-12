'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var BorrowedItem = sequelize.define('BorrowedItem', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: DataTypes.STRING,
    item: DataTypes.TEXT,
    returned: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references : {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  BorrowedItem.associate = (models) => {
    BorrowedItem.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return BorrowedItem;
};
