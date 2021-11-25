const express = require("express");
const models = require("../models"); // index.js
const { Genre, Movie, Rating, sequelize } = models;
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", async function (req, res) {
    const movies = await Movie.findAll({
        // Plusz mezők a meglévők mellé
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Ratings.rating")), "avgRating"],
                // ÓÓ:PP:MP
                [sequelize.fn("TIME", sequelize.col("length"), "unixepoch"), "lengthFormatted"],
            ],
        },
        // Kapcsolódó modellek
        include: [
            {
                model: Genre,
                as: "Genres",
                //attributes: ['id', 'name', 'description'], // csak ezeket szeretném
                attributes: { exclude: ["createdAt", "updatedAt"] }, // csak ezeket nem szeretném
                through: { attributes: [] },
            },
            {
                model: Rating,
                attributes: [],
            },
        ],
        group: ["movie.id", "Genres.id"],
        order: sequelize.literal("avgRating DESC"),
    });

    return res.send(movies);
});

router.post("/:id/rate", auth, async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám" });
    }
    const movie = await Movie.findByPk(id);
    if (movie === null) {
        return res.status(404).send({ message: "A megadott film nem létezik" });
    }
    // A felhasználó értékelte-e már a filmet?
    let rating = await Rating.findOne({ where: { MovieId: id, UserId: req.user.id } });
    // Ha ezekkel a feltételekkel találtunk értékelést (nem null), akkor a felhasználó már értékelte az adott filmet
    if (rating !== null) {
        await rating.update(req.body);
        return res.send({ message: "Módosítottad az előző értékelésedet ehhez a filmhez", rating });
    } else {
        rating = await Rating.create({ ...req.body, MovieId: id, UserId: req.user.id });
        return res.status(201).send({ message: "Új értékelést hoztál létre ehhez a filmhez", rating });
    }
});

router.delete("/:id/rate", auth, async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám" });
    }
    const movie = await Movie.findByPk(id);
    if (movie === null) {
        return res.status(404).send({ message: "A megadott film nem létezik" });
    }
    // A felhasználó értékelte-e már a filmet?
    let rating = await Rating.findOne({ where: { MovieId: id, UserId: req.user.id } });
    // Ha ezekkel a feltételekkel találtunk értékelést (nem null), akkor a felhasználó már értékelte az adott filmet
    if (rating !== null) {
        await rating.destroy();
        return res.send({ message: "Sikeresen törölted az értékelésedet erről a filmről" });
    } else {
        return res.status(404).send({ message: "Még nem is értékelted ezt a filmet!" });
    }
});

module.exports = router;
