'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Releases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      platform: {
        type: Sequelize.ENUM('win', 'ps2', 'ps3', 'ps4', 'ps5', 'xbox360', 'xboxone')
      },
      date: {
        type: Sequelize.DATE
      },
      version: {
        type: Sequelize.STRING
      },
      GameId: {
        type: Sequelize.INTEGER
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Releases');
  }
};