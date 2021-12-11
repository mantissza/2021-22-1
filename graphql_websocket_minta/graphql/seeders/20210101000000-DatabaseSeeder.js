"use strict";

const faker = require("faker");
const models = require("../models");
const { User, Shop, Warehouse, Item, Carrier } = models;
const colors = require("colors");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Felhasználók
            /*const usersCount = faker.datatype.number({ min: 1, max: 3 });
            const users = [];
            users.push(
                await User.create({
                    name: "Admin",
                    email: "admin@szerveroldali.hu",
                    password: "password",
                    isAdmin: true,
                })
            );
            for (let i = 1; i <= usersCount; i++) {
                users.push(
                    await User.create({
                        name: faker.name.findName(),
                        email: `user${i}@szerveroldali.hu`,
                        password: "password",
                    })
                );
            }*/

            // Egyéb...
            const shops = [];
            const items = [];
            const warehouses = [];
            const carriers = [];

            for (let i = 0; i < 5; i++) {
                shops.push(
                    await Shop.create({
                        name: faker.company.companyName(),
                        city: faker.address.city(),
                    })
                );
            }

            for (let i = 0; i < 10; i++) {
                items.push(
                    await Item.create({
                        name: faker.company.companyName(),
                        price: faker.datatype.number(),
                    })
                );
            }

            for (let i = 0; i < 8; i++) {
                warehouses.push(
                    await Warehouse.create({
                        name: faker.company.companyName(),
                        city: faker.address.city(),
                        capacity: faker.datatype.number(),
                    })
                );

                carriers.push(
                    await Carrier.create({
                        name: faker.company.companyName(),
                        numberOfCars: faker.datatype.number(),
                        carCapacity: faker.datatype.number(),
                    })
                );
            }

            // shop - warehouse
            await Promise.all(
                shops.map((shop) => shop.addWarehouse(faker.random.arrayElement(warehouses, faker.datatype.number({ min: 1, max: 8 }))))
            );

            // shop - item
            await Promise.all(items.map((item) => item.setShop(faker.random.arrayElement(shops, faker.datatype.number({ min: 1, max: 5 })))));

            // carrier - warehouse
            await Promise.all(
                carriers.map((carrier) =>
                    carrier.setWarehouse(faker.random.arrayElement(warehouses, faker.datatype.number({ min: 1, max: 8 })))
                )
            );

            console.log("A DatabaseSeeder lefutott".green);
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:".red);
            console.log(colors.gray(e));
        }

        console.log("A DatabaseSeeder lefutott");
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
