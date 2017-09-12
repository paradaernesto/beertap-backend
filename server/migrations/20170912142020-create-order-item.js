'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      beerType: {
        type: Sequelize.STRINGE
      },
      liters: {
        type: Sequelize.FLOAT
      },
      order: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references : {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      orderId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references : {
          model: 'Orders',
          key: 'id',
          as: 'orderId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('OrderItems');
  }
};
