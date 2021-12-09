const faker = require('faker');

module.exports = (io) => {
    games = [];

    io.on("connection", (socket) => {
        socket.on("tip", (data, ack) => {
            try {
                // Elvárás: data = { number: 3 }
                const { number } = data;
                if (!number) {
                    throw new Error("No number specified");
                }
                // Hibás: data = { number: 'asd' }
                if (isNaN(parseInt(number))) {
                    throw new Error("Not a number");
                }
                // Aktuális játék: games[games.length - 1]
                if (games[games.length - 1].tips.find((tip) => tip.client === socket.id)) {
                    throw new Error("Already tipped");
                }
                games[games.length - 1].tips.push({
                    client: socket.id,
                    number, // = number: number,
                });
                ack({
                    status: "ok"
                })
            } catch (error) {
                ack({
                    status: "error",
                    message: error.message,
                })
            }
        })
    });

    gameOver = () => {
        const sorted = games[games.length - 1].tips.sort((a, b) => a.number - b.number);
        // Nyertes szám
        const winner = sorted.find(tip => sorted.filter((anotherTip) => tip.number === anotherTip.number).length === 1);
        console.log(sorted);
        console.log(winner);
        for (const { client, number } of games[games.length - 1].tips) {
            io.to(client).emit("game-over", {
                won: number === winner.number,
                tipped: number,
                winner,
            })
        }
    }

    // Mennyi ideig tartson a játék (mp)
    newGame = () => {
        // game-over
        if (games.length > 0) gameOver();
        // Mindig a games tömb legutolsó eleme (object) az aktuális játék
        games.push({
            startTime: Date.now(),
            tips: []
        });
        // new-game-started
        io.emit("new-game-started");
        const time = faker.datatype.number({ min: 10, max: 20 });
        console.log(`Új játék lett indítva, következő játék ${time} mp múlva`);
        setTimeout(newGame, time * 1000);
    }
    // 1. játék indítása
    newGame();
}