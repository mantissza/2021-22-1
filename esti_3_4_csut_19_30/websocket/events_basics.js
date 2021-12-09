module.exports = (io) => {
    io.on("connection", (socket) => {
        // console.log("Client connected");
        // console.log(socket);
        // socket.on("esemény neve", (...args) => {
        // ...args = valamennyi argumentum, ack
        socket.on("test", (data, ack) => {
            console.log(data, ack);
            socket.emit("test-client", "uzenet a szerverrol");
            ack({
                status: "ok"
            })
        })
    })
}