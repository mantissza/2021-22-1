const express = require("express");
require("express-async-errors");
const app = express();

// Minden alatta lévő végpontban a req-ben elérhető lesz a .asd, aminek az értéke 1 lesz
/*app.use(function (req, res, next) {
    req.asd = 1;
    next();
});*/

app.use(express.json());

app.use("/genres", require("./routers/genre"));
app.use("/movies", require("./routers/movie"));
app.use("/auth", require("./routers/auth"));

app.use((err, req, res, next) => {
    // Már el lett-e küldve valamilyen response.send()?
    if (res.headersSent) {
        return next(err);
    }
    // Általános hibakezelés, ha még nem lett válasz küldve, akkor itt küldünk
    res.status(500).send({
        name: err.name,
        message: err.message,
        stack: err.stack.split(/$\s+/gm),
    });
});

app.listen(3000, () => {
    console.log("Az Express fut");
});
