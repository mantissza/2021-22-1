const express = require("express");
const router = express.Router();

const models = require("../models");
const { Genre, Game, Release } = models;

const { ValidationError } = require("sequelize");

// localhost:4000/games/titles
router.get("/titles", async (req, res) => {
    const titles = (await Game.findAll({ attributes: ["title"] })).map((game) => game.title);
    res.send(titles);
});

router.get("/:id", async (req, res) => {
    const game = await Game.findByPk(req.params.id, {
        include: [
            { model: Genre, through: { attributes: [] } },
            { model: Release }, // itt nem kell a through, mert nincs kapcsolótábla, mivel 1-N
        ],
    });
    if (!game) return res.sendStatus(404);
    return res.send(game);
});

router.post("/", async (req, res) => {
    try {
        const game = await Game.create(req.body.game);
        const exists = [],
            created = [];
        for (const name of req.body.genres) {
            const genre = await Genre.findOne({ where: { name } }); // name: name
            if (genre) {
                await game.addGenre(genre);
                exists.push(genre);
            } else {
                created.push(await game.createGenre({ name }));
            }
        }
        return res.status(201).send({
            game,
            genres: {
                exists,
                created,
            },
        });
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.sendStatus(400);
        }
        throw e;
    }
});

router.patch("/:id/genres", async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.sendStatus(404);
    const exists = [],
        created = [];
    for (const name of req.body.genres) {
        const genre = await Genre.findOne({ where: { name } }); // name: name
        if (genre) {
            exists.push(genre);
        } else {
            created.push(await game.createGenre({ name }));
        }
    }
    await game.setGenres([...exists, ...created]);
    return res.send({
        game,
        genres: {
            exists,
            created,
        },
    });
});

router.post("/:id/releases", async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.sendStatus(404);
    /*if (!["win", "ps2", "ps3", "ps4", "ps5", "xbox360", "xboxone"].includes(req.body.platform))
        return res.sendStatus(400);
    res.send(await game.createRelease(req.body));*/
    try {
        res.send(await game.createRelease(req.body));
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.sendStatus(400);
        }
        throw e;
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);
    const game = await Game.findByPk(id);
    if (!game) return res.sendStatus(404);
    await game.destroy();
    res.send(game);
});

module.exports = router;
