module.exports = (io) => {
    io.on("connection", (socket) => {
        // console.log("Client connected");
        // console.log(socket);
        // fv: paraméterek, ack - nyugtázás
        socket.on("test", (data, ack) => {
            console.log(data, ack);
            socket.emit("client-test", "szerverrol erkezett adat");
            ack({
                status: "OK"
            })
        })
    })
}