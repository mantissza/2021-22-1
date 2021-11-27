const express = require("express");
const router = express.Router();

const models = require("../models");
const { Game, Genre } = models;

// localhost:4000/genres
router.get("/", async (req, res) => {
    const genres = await Genre.findAll({
        include: [{ model: Game, attributes: ["id", "title"], through: { attributes: [] } }],
    });
    res.send(genres);
});

module.exports = router;
