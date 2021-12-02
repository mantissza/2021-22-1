const express = require("express");
require("express-async-errors");
const app = express();
const expressPlayground = require("graphql-playground-middleware-express").default;

/*app.use(function (req, res, next) {
    console.log("Sajat middleware");
    req.valami = 2;
    next();
});*/

app.use(express.json());

app.use("/genres", require("./routers/genre"));
app.use("/movies", require("./routers/movie"));
app.use("/auth", require("./routers/auth"));
app.use("/graphql", require("./graphql"));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({
        name: err.name,
        message: err.message,
        stack: err.stack.split(/$\s+/gm),
    });
});

app.listen(3000, () => {
    console.log("Az Express fut");
});
