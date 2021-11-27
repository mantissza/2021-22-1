"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Games", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            writers: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            singleplayer: {
                type: Sequelize.BOOLEAN,
            },
            multiplayer: {
                type: Sequelize.BOOLEAN,
            },
            engine: {
                type: Sequelize.STRING,
            },
            DeveloperId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Games");
    },
};
