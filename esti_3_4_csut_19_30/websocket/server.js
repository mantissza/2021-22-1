const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const events = require('./events');

const httpServer = createServer();

const io = new Server(httpServer, {
    // Más erőforrásokból is el tudjuk érni a szervert, pl. ilyen a Sockcket.IO admin felülete,
    // ami ezen a domainen fut: admin.socket.io, de a localhost-on futó szerverünkre akarunk onnan
    // kapcsolódni
    cors: {
        origin: ["*"],
        credentials: true
    },
    // Ennek az a lényege, hogy lehetővé teszi azt, hogy olyan kliensekkel is tudjunk a szerverhez
    // kapcsolódni, amelyek csak a Socket.IO 2-es verzióját támogatják (pl Firecamp)
    allowEIO3: true
});

// Inicializáljuk az admin felülethez szükséges szerveroldali logikát, és azon belül is
// kikapcsoljuk a hitelesítést
instrument(io, {
    auth: false
});

// Az events megkapja az io referenciát
events(io);

// Elindítjuk a sima kis Node.js http szervert, amin a Socket.io is fut
httpServer.listen(3000, () => {
    console.log("A Socket.IO szervere fut");
});