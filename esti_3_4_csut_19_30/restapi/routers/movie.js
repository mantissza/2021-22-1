const express = require("express");
const router = express.Router();
const models = require("../models");
const { Rating, Genre, Movie, sequelize } = models;
const auth = require("../middlewares/auth");

// Összes film lekérése, a hozzájuk tartozó kategóriákkal együtt, átlagos értékelés szerint csökkenő sorrendbe rendezve
router.get("/", async function (req, res) {
    const movies = await Movie.findAll({
        attributes: {
            include: [[sequelize.fn("AVG", sequelize.col("Ratings.rating")), "avgRating"]],
        },
        include: [
            {
                model: Genre,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                through: { attributes: [] },
            },
            {
                model: Rating,
                attributes: [],
                //attributes: {
                //  exclude: ['createdAt', 'updatedAt']
                //},
            },
        ],
        group: ["movie.id", "Genres.id"],
        order: sequelize.literal("avgRating DESC"),
    });
    res.send(movies);
});

// POST localhost:3000/movies/:id/rate
router.post("/:id/rate", auth, async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        // NaN - isNaN
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    const movie = await Movie.findByPk(id);
    if (movie === null) {
        return res.status(404).send({ message: "A megadott ID-vel nem létezik film!" });
    }
    // A filmhez engedélyezve vannak-e az értékelések?
    if (movie.ratingsEnabled !== true) {
        return res.status(403).send({ message: "A megadott filmhez nincsenek engedélyezve az értékelések!" });
    }
    // Ha van ilyen értékelés, akkor a user korábban már értékelte ezt a filmet
    let rating = await Rating.findOne({ where: { UserId: req.user.id, MovieId: id } });
    if (rating) {
        // A meglévő értékelést kell módosítani
        await rating.update(req.body);
        return res.status(200).send({ message: "Sikeresen módosítottad a korábbi értékelésedet!", rating });
    } else {
        // Új értékelést hozunk létre
        rating = await Rating.create({ UserId: req.user.id, MovieId: id, ...req.body });
        return res.status(201).send({ message: "Sikeresen értékelted ezt a filmet!", rating });
    }
});

router.delete("/:id/rate", auth, async function (req, res) {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        // NaN - isNaN
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    const movie = await Movie.findByPk(id);
    if (movie === null) {
        return res.status(404).send({ message: "A megadott ID-vel nem létezik film!" });
    }
    // A filmhez engedélyezve vannak-e az értékelések?
    if (movie.ratingsEnabled !== true) {
        return res.status(403).send({ message: "A megadott filmhez nincsenek engedélyezve az értékelések!" });
    }
    // Ha van ilyen értékelés, akkor a user korábban már értékelte ezt a filmet
    const rating = await Rating.findOne({ where: { UserId: req.user.id, MovieId: id } });
    if (rating) {
        // Ha van értékelés, akkor törölni kell
        await rating.destroy();
        return res.status(200).send({ message: "Sikeresen törölted az értékelésedet!" });
    } else {
        return res.status(404).send({ message: "Te még nem értékelted ezt a filmet, nincs mit törölni!" });
    }
});

module.exports = router;
