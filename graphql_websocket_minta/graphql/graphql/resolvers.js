const models = require("../models");
const { sequelize, User, Shop, Warehouse, Item, Carrier } = models;
const auth = require("./auth");

module.exports = {
    Query: {
        warehouses: () => Warehouse.findAll(),
        shop: (_, { id }) => Shop.findByPk(id),
        cheapestItem: () => Item.findOne({ order: ["price"] }),
        statistics: async (_, { shopId }) => {
            const s = await Shop.findByPk(shopId);
            if (!s) throw new Error("Shop not found");
            const count = await s.countItems();
            const max = (await s.getItems({ order: [["price", "DESC"]] }))[0]?.price;
            const min = (await s.getItems({ order: [["price", "ASC"]] }))[0]?.price;
            const average = (
                await s.getItems({
                    attributes: [[sequelize.fn("AVG", sequelize.col("price")), "avgPrice"]],
                    raw: true,
                })
            )[0].avgPrice;
            const items = await s.getItems();
            let sum = 0;
            for (const item of items) {
                if (item.price % 2 !== 0) sum += item.price;
            }
            const oddSumTenPercent = sum * 0.1;
            return {
                count,
                max,
                min,
                average,
                oddSumTenPercent,
            };
        },
    },
    Mutation: {
        // Feldolgozó fv paraméterezése:
        // parent, args (params), context, info
        updateWarehouse: async (_, { data }) => {
            const wh = await Warehouse.findByPk(data.id);
            if (!wh) throw new Error("Warehouse not found");
            await wh.update(data);
            return wh;
        },
        refillShelves: async (_, { id, items }) => {
            const s = await Shop.findByPk(id);
            if (!s) throw new Error("Shop not found");
            // Jelenlegi itemek leválasztása
            //await s.setItems([]);
            // Mivel az item egyértelműen a bolthoz köthető, töröljük azokat, amik ehhez a bolthoz tartoznak
            await Item.destroy({ where: { shopId: id } });
            for (const item of items) {
                await s.createItem(item);
            }
            return s;
        },
        fireCarriers: async (_, { warehouseId }) => {
            const wh = await Warehouse.findByPk(warehouseId);
            // Carrier.numberOfCars - Carrier.carCapacity < Warehouse.capacity / 2
            const cs = await wh.getCarriers();
            let r = {
                fired: [],
                remainders: [],
            };
            for (const c of cs) {
                if (c.numberOfCars - c.carCapacity < wh.capacity / 2) {
                    r.fired.push(c);
                    await wh.removeCarrier(c);
                } else {
                    r.remainders.push(c);
                }
            }
            return r;
        },
    },
    Warehouse: {
        carriers: (warehouse) => warehouse.getCarriers(),
    },
    Shop: {
        warehousesStartingWithVowel: async (shop) => {
            const w = await shop.getWarehouses();
            const vowels = ["a", "e", "i", "o", "u"];
            return w.filter((wh) => vowels.includes(wh.name.toLowerCase()[0]));
        },
        warehouses: (shop) => shop.getWarehouses(),
        items: (shop) => shop.getItems(),
    },
    Item: {
        shop: (item) => item.getShop(),
    },
};
