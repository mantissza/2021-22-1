"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Tábla létrehozása
        await queryInterface.createTable("GenreGame", {
            // ID mező, ugyanaz, mint bármelyik másik generált modellnél
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            GenreId: {
                type: Sequelize.INTEGER,
                // Nem vehet fel NULL értéket, mindenképpen valamilyen INTEGER-nek kell lennie
                allowNull: false,
                // Megadjuk, hogy ez egy külső kulcs, ami a "Categories" táblán belüli "id"-re hivatkozik
                // https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-createTable
                references: {
                    model: "Genres",
                    key: "id",
                },
                // Ha pedig a kategória (Category) törlődik, akkor a kapcsolótáblában lévő bejegyzésnek is törlődnie kell,
                // hiszen okafogyottá válik, hiszen egy nem létező kategóriára hivatkozik
                onDelete: "cascade",
            },
            GameId: {
                type: Sequelize.INTEGER,
                // Nem vehet fel NULL értéket, mindenképpen valamilyen INTEGER-nek kell lennie
                allowNull: false,
                // Megadjuk, hogy ez egy külső kulcs, ami a "Posts" táblán belüli "id"-re hivatkozik
                references: {
                    model: "Games",
                    key: "id",
                },
                // Ha pedig a bejegyzés (Post) törlődik, akkor a kapcsolótáblában lévő bejegyzésnek is törlődnie kell,
                // hiszen okafogyottá válik, hiszen egy nem létező kategóriára hivatkozik
                onDelete: "cascade",
            },
            // Időbélyegek
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Megkötés a kapcsolótáblára, amelyben megmondjuk, hogy egy CategoryId - PostId páros csak egyszer szerepelhet a kapcsolótáblában
        await queryInterface.addConstraint("GenreGame", {
            fields: ["GenreId", "GameId"],
            type: "unique",
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Ha visszavonásra kerül a migration, egyszerűen töröljük ki a táblát
        await queryInterface.dropTable("GenreGame");
    },
};
