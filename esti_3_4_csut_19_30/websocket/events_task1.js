const faker = require('faker');
const Joi = require('joi');
const validate = require('./validate');

module.exports = (io) => {
    games = [
        {
            startTime: 123456789,
            tips: [
                { "client": "socketid1", "number": 12 },
                { "client": "socketid2", "number": 1 },
                { "client": "socketid3", "number": 1 },
                { "client": "socketid4", "number": 2 },
                { "client": "socketid5", "number": 12 },
            ]
        }
    ]

    io.on("connection", (socket) => {
        socket.on("tip", validate(
            // Validációk
            Joi.object({
                number: Joi.number().integer().required().messages({
                    'number.base': 'Not a number',
                }),
            }),
            // Feldolgozó fv
            ({ number }, ack) => {
                // Már tippelt a játékban?
                if (games[games.length - 1].tips.find(tip => tip.client === socket.id)) throw new Error("Already tipped");
                // Tipp eltárolása
                games[games.length - 1].tips.push({
                    client: socket.id,
                    number, // == number: number
                })
                //console.log(games);
                ack({
                    status: "ok"
                });
            })
        )
    });

    /*io.on("connection", (socket) => {
        socket.on("tip", (data, ack) => {
            try {
                const schema = Joi.object({
                    number: Joi.number().integer().required().messages({
                        'number.base': 'Not a number',
                    }),
                });
                const validationResult = schema.validate(data);
                if (validationResult.hasOwnProperty("error")) {
                    console.log(validationResult.error);
                    throw validationResult.error;
                }

                const { number } = data;
                // Hibalehetőségek
                if (!number) throw new Error("No number specified");
                if (isNaN(parseInt(number))) throw new Error("Not a number");
                if (games[games.length - 1].tips.find(tip => tip.client === socket.id)) throw new Error("Already tipped");
                // Tipp eltárolása
                games[games.length - 1].tips.push({
                    client: socket.id,
                    number, // == number: number
                })
                //console.log(games);
                ack({
                    status: "ok"
                });
            } catch (error) {
                ack({
                    status: "error",
                    message: error.message,
                });
            }
        })
    });*/

    gameOver = () => {
        // > 0	sort b before a
        // < 0	sort a before b
        // === 0	keep original order of a and b
        const sorted = games[games.length - 1].tips.sort((a, b) => a.number - b.number);
        //console.log(sorted);
        const winner = sorted.find(tip => sorted.filter((other) => tip.number === other.number).length === 1);
        for (const tip of sorted) {
            io.to(tip.client).emit("game-over", {
                won: tip.number === winner.number,
                tipped: tip.number,
                winner: winner.number
            });
        }
    }

    newGame = () => {
        // game-over
        gameOver();

        games.push({
            startTime: Date.now(),
            tips: []
        });
        // new-game-started
        io.emit("new-game-started");
        // Mennyi ideig tartson az aktuális játék
        const time = faker.datatype.number({ min: 10, max: 20 });
        setTimeout(newGame, time * 1000);

        console.log(`Játék elindítva! Új játék ${time} másodperc múlva!`);
    }
    // Első játék
    newGame();
}