const faker = require('faker');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const validate = require('./validate');

module.exports = (io) => {
    const securities = {
        'ELTE': {
            prices: [
                { timestamp: 1610110943147, price: 1234 },
                { timestamp: 1610110969348, price: 1255 },
                { timestamp: 1610110976805, price: 1340 },
            ],
            offers: [
                { clientId: 'client1', quantity: 0.65, intent: 'sell', active: true },
                { clientId: 'client3', quantity: 2.0, intent: 'buy', active: false },
            ]
        },
    }
    io.on("connection", (socket) => {
        //console.log(socket);
        socket.on("list-securities", (_, ack) => {
            ack({
                status: "ok",
                securities: Object.keys(securities),
            });
        });

        socket.on("get-historic-data", validate(
            Joi.object({
                security: Joi.string().trim().min(1).required(),
                count: Joi.number().integer().min(0).required()
            }),
            ({ security, count }, ack) => {
                if (!Object.keys(securities).includes(security)) throw new Error('No such security in our system.');
                ack({
                    status: "ok",
                    prices: securities[security].prices.slice(0, count),
                });
            })
        );

        socket.on("join-security", validate(
            Joi.object({
                security: Joi.string().trim().min(1).required(),
            }),
            ({ security }, ack) => {
                if (!Object.keys(securities).includes(security)) throw new Error('No such security in our system.');
                if (socket.rooms.has(security)) throw new Error('You are already subscribed to this security.');
                socket.join(security);
                ack({ status: "ok" });
                //console.log(socket);
            })
        );

        socket.on("leave-security", validate(
            Joi.object({
                security: Joi.string().trim().min(1).required(),
            }),
            ({ security }, ack) => {
                if (!Object.keys(securities).includes(security)) throw new Error('No such security in our system.');
                if (!socket.rooms.has(security)) throw new Error('You do not follow this security.');
                socket.leave(security);
                ack({ status: "ok" });
                //console.log(socket);
            })
        );

        socket.on("send-offer", validate(
            Joi.object({
                security: Joi.string().trim().min(1).required(),
                quantity: Joi.number().min(0).required(),
                intent: Joi.string().trim().valid('buy', 'sell').required(),
            }),
            ({ security, quantity, intent }, ack) => {
                if (!Object.keys(securities).includes(security)) throw new Error('No such security in our system.');
                if (!socket.rooms.has(security)) throw new Error('You do not follow this security.');
                const id = uuidv4();
                securities[security].offers.push({
                    id,
                    clientId: socket.id,
                    quantity,
                    intent,
                    active: true
                });
                io.in(security).emit("offer-sent", {
                    id,
                    security,
                    quantity,
                    intent,
                });
                ack({ status: "ok" });
            })
        );

        socket.on("accept-offer", validate(
            Joi.object({
                security: Joi.string().trim().min(1).required(),
                id: Joi.string().guid({ version: ['uuidv4']}),
            }),
            ({ security, id }, ack) => {
                if (!Object.keys(securities).includes(security)) throw new Error('No such security in our system.');
                if (!socket.rooms.has(security)) throw new Error('You do not follow this security.');
                // Az offers tömb hanyadik indexe
                const offerIdx = securities[security].offers.findIndex(offer => offer.id === id);
                // Ha nem létezik az offer
                if (offerIdx === -1) throw new Error('No such offer in our system.');
                // Ezen a ponton már biztos létezik az offer
                if (securities[security].offers[offerIdx].active === false) throw new Error('Inactive offer.');
                securities[security].offers[offerIdx].active = false;
                // Üzenet küldése az eladónak és a vevőnek
                const { clientId, quantity, intent } = securities[security].offers[offerIdx];
                io.to([socket.id, clientId]).emit("offer-accepted", {
                    id,
                    security,
                    quantity,
                    intent,
                });
                ack({ status: "ok" });
            })
        );

    });

    priceChange = () => {
        const securityNames = Object.keys(securities); // tömb
        const security = faker.random.arrayElement(securityNames); // random elem egy tömbből
        const price = faker.datatype.number({ min: 500, max: 5000 });
        securities[security].prices.push({
            timestamp: Date.now(),
            price,
        });
        io.in(security).emit("price-changed", {
            security,
            price
        });
        setTimeout(priceChange, 1000);
        console.log(securities);
    }
    priceChange();
}