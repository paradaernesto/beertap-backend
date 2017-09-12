'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cookings', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      state: {
        type: Sequelize.STRING
      },
      beer_type: {
        type: Sequelize.STRING
      },
      liters: {
        type: Sequelize.INTEGER,
        min: 0,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      beerTypeId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references : {
          model: 'BeerTypes',
          key: 'id',
          as: 'beerTypeId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cookings');
  }
};
