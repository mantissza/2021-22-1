const express = require("express");
const app = express();
const models = require("./models");
const { User, Genre, Movie, Rating, sequelize } = models;

/*app.use(function (req, res, next) {
    console.log("Sajat middleware");
    req.valami = 2;
    next();
});*/

app.use(express.json());

// Lekérések: összes, egy

app.get("/genres", async function (req, res) {
    const genres = await Genre.findAll();
    res.send(genres);
});

app.get("/genres/:id", async function (req, res) {
    //console.log(req.params);
    //const id = req.params.id;
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        // NaN - isNaN
        return res.sendStatus(400); // Bad request
    }
    const genre = await Genre.findByPk(id);
    if (genre === null) {
        return res.sendStatus(404); // HTTP Status Code, Not found
    }
    res.send(genre);
});

// Módosítások: hozzáadás, módosítás, törlés (összes/egy)

app.post("/genres", async function (req, res) {
    console.log(req.body);
    //console.log(req.valami);
    const genre = await Genre.create(req.body);
    res.send(genre);
});

// TODO: befejezni, hibakezelés, validálás, kód strukturálása

app.listen(3000, () => {
    console.log("Az Express fut");
});
