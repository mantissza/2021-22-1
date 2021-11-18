const express = require('express')
const app = express()
const models = require('./models'); // index.js
const { User, Genre, Movie, Rating, sequelize } = models;

// Minden alatta lévő végpontban a req-ben elérhető lesz a .asd, aminek az értéke 1 lesz
/*app.use(function (req, res, next) {
    req.asd = 1;
    next();
});*/

app.use(express.json());

// lekérések
app.get('/genres', async function (req, res) {
    const genres = await Genre.findAll();
    res.send(genres);
})

app.get('/genres/:id', async function (req, res) {
    //console.log(req.params);
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.sendStatus(400); // Bad request - rossz kérés
    }
    const genre = await Genre.findByPk(id);
    if (genre === null) {
        return res.sendStatus(404); // Not found - nem található
    }
    res.send(genre);
})

// létrehozás, módosítás, törlés

app.post('/genres', async function (req, res) {
    console.log(req.body);
    //console.log(req.asd);
    const genre = await Genre.create(req.body);
    res.send(genre);
})

// TODO: async hibakezelés, validálás, Genre CRUD után strukturálás

app.listen(3000, () => {
    console.log("Az Express fut");
})
