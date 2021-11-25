"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Ha futtatjuk, felküldjük
        await queryInterface.createTable("GenreMovie", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            GenreId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            MovieId: {
                allowNull: false,
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

        // Egy megkötést is hozzáadunk a táblához még pluszban, hogy
        // ne lehessen többször szerepeltetni benne ugyanazt a genre-movie párost
        await queryInterface.addConstraint("GenreMovie", {
            fields: ["GenreId", "MovieId"],
            type: "unique",
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Ha visszavonjuk a migrationt, akkor töröljük a táblát
        await queryInterface.dropTable("GenreMovie");
    },
};
