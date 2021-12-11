'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.createTable('ShopWarehouse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ShopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      WarehouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('ShopWarehouse', {
      fields: ['ShopId', 'WarehouseId'],
      type: 'unique'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ShopWarehouse');
  }
};