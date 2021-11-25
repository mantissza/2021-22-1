const express = require("express");
const router = express.Router();
const models = require("../models");
const { Genre } = models;

/*
    Create
    Read
    Update
    Delete
*/

// Lekérések: összes, egy

router.get("/", async function (req, res) {
    //throw new Error("valami");
    const genres = await Genre.findAll();
    res.send(genres);
});

router.get("/:id", async function (req, res) {
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

router.post("/", async function (req, res) {
    //console.log(req.body);
    //console.log(req.valami);
    const genre = await Genre.create(req.body);
    res.send(genre); // = res.status(200).send(genre);
});

// Módosítás

router.put("/:id", async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        // NaN - isNaN
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    const genre = await Genre.findByPk(id);
    if (genre === null) {
        return res.status(404).send({ message: "A megadott ID-vel nem létezik műfaj!" });
    }
    await genre.update(req.body);
    res.send(genre);
});

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        // NaN - isNaN
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    const genre = await Genre.findByPk(id);
    if (genre === null) {
        return res.status(404).send({ message: "A megadott ID-vel nem létezik műfaj!" });
    }
    await genre.destroy();
    res.sendStatus(200);
});

module.exports = router;
