const express = require("express");
const models = require("../models"); // index.js
const { Genre } = models;

const router = express.Router();

// lekérések
router.get("/", async function (req, res) {
    //throw new Error("valami");
    const genres = await Genre.findAll();
    res.send(genres);
});

router.get("/:id", async function (req, res) {
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
});

// létrehozás, módosítás, törlés

router.post("/", async function (req, res) {
    console.log(req.body);
    //console.log(req.asd);
    const genre = await Genre.create(req.body);
    res.send(genre);
});

router.put("/:id", async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám" });
    }
    const genre = await Genre.findByPk(id);
    if (genre === null) {
        return res.status(404).send({ message: "A megadott műfaj nem létezik" });
    }
    await genre.update(req.body);
    res.send(genre);
});

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám" });
    }
    const genre = await Genre.findByPk(id);
    if (genre === null) {
        return res.status(404).send({ message: "A megadott műfaj nem létezik" });
    }
    await genre.destroy();
    res.sendStatus(200);
});

// TODO: async hibakezelés, validálás, Genre CRUD után strukturálás

/*
    Create
    Read
    Update
    Delete
*/

module.exports = router;
