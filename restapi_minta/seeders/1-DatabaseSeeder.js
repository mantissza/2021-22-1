"use strict";

// Faker dokumentáció: http://marak.github.io/faker.js/faker.html
const faker = require("faker");
const colors = require("colors");
const models = require("../models");
const { Developer, Genre, Game, Release } = models;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Ide dolgozd ki a seeder tartalmát:
            // ...

            const genres = [];
            const genresCount = faker.datatype.number({ min: 5, max: 10 });
            for (let i = 0; i < genresCount; i++) {
                genres.push(
                    await Genre.create({
                        name: faker.unique(faker.lorem.word),
                    })
                );
            }

            const developers = [];
            const developersCount = faker.datatype.number({ min: 5, max: 10 });
            for (let i = 0; i < developersCount; i++) {
                developers.push(
                    await Developer.create({
                        name: faker.company.companyName(),
                        website: faker.internet.url(),
                        location: faker.address.country(),
                    })
                );
            }

            const gamesCount = faker.datatype.number({ min: 5, max: 10 });
            for (let i = 0; i < gamesCount; i++) {
                const writers = []; // ['a', 'b', 'c'].join(', ') = "a, b, c"
                const writersCount = faker.datatype.number({ min: 1, max: 3 });
                for (let j = 0; j < writersCount; j++) {
                    writers.push(faker.name.findName());
                }
                const game = await Game.create({
                    title: faker.lorem.words(faker.datatype.number({ min: 1, max: 6 })),
                    writers: writers.join(", "),
                    description: faker.lorem.sentence(),
                    singleplayer: faker.datatype.boolean(),
                    multiplayer: faker.datatype.boolean(),
                    engine: faker.lorem.word(),
                    DeveloperId: faker.random.arrayElement(developers).id,
                });
                // Műfajok hozzárendelése a játékhoz
                await game.setGenres(faker.random.arrayElements(genres));
                // Kiadások hozzárendelése a játékhoz
                const releasesCount = faker.datatype.number({ min: 2, max: 6 });
                for (let j = 0; j < releasesCount; j++) {
                    await game.createRelease({
                        platform: faker.random.arrayElement(["win", "ps2", "ps3", "ps4", "ps5", "xbox360", "xboxone"]),
                        date: faker.date.past(20, new Date()),
                        version: faker.system.semver(),
                        //GameId: game.id,
                    });
                }
            }

            console.log("A DatabaseSeeder lefutott".green);
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:".red);
            console.log(colors.gray(e));
        }
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak
    down: async (queryInterface, Sequelize) => {},
};
