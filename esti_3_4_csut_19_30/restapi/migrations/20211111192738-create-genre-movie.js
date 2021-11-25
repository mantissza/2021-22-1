"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
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

        // A kapcsolótáblában egy műfaj-film páros csak egyszer szerepelhet
        await queryInterface.addConstraint("GenreMovie", {
            fields: ["GenreId", "MovieId"],
            type: "unique",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("GenreMovie");
    },
};
