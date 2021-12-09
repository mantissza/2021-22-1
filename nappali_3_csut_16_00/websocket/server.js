const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const events = require('./events');

const httpServer = createServer();

const io = new Server(httpServer, {
    // Külféle erőforrásokból is el tudjuk érni a szervert, pl a socket io hostolt admin felületéből
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    // Lehetővé teszi, hogy olyan kliensekkel is kapcsolódjunk a szerverhez,
    // ami csak a socket.io 2-es verzióját támogatja
    allowEIO3: true,
});

instrument(io, {
    auth: false
});

events(io);

httpServer.listen(3000, () => {
    console.log("A Socket.IO szerver fut!");
});
