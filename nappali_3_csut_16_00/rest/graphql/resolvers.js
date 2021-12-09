const models = require("../models");
const { sequelize, User, Genre, Movie, Rating } = models;
const authMw = require("../middlewares/auth");

// Visszaad egy async wrapper fv-t, ami megkap minden lehetséges paramétert.
// Ez az async fv meghívja az eredeti fn-t, amit az auth-nak adtunk át,
// de előtte behívja az express-es auth middleware-t egy custom next fv-el.
// Az express-jwt middleware sikeres hitelesítés esetén berakja a requestbe
// (context) a usert (context.user), majd üres next-et hív: next(), míg
// hiba esetén átadja a hibát a next-nek: next(error), ez alapján resolve-áljuk,
// vagy reject-eljük a promise-ot.
const auth = (fn) => {
    //console.log("auth wrapper");
    // wrapper fv:
    return async (parent, params, context, info) => {
        // context az az express request
        //console.log(context.headers);

        // await-tel ha a promise rejected, akkor hibát dob (error throw)
        await new Promise((resolve, reject) => {
            authMw(context, null, (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
        //console.log("ok");
        return fn(parent, params, context, info);
    };
};

module.exports = {
    Query: {
        helloWorld: () => "Helló világ!",
        // Prototípus: (parent, params, context, info)
        helloName: (_, { name }) => `Helló ${name}!`,
        // Hitelesített resolver: auth(resolver fv) wrapper
        helloAuth: auth((_, params, context) => `Helló ${context.user.name}`),

        users: () => User.findAll(),
        user: (_, { id }) => User.findByPk(id),

        genres: () => Genre.findAll(),
        genre: (_, { id }) => Genre.findByPk(id),

        movies: () => Movie.findAll(),
        movie: (_, { id }) => Movie.findByPk(id),

        top: async (_, { limit }) => {
            return (
                await Movie.findAll({
                    attributes: {
                        include: [[sequelize.fn("AVG", sequelize.col("Ratings.rating")), "averageRating"]],
                    },
                    // Kapcsolódó modellek
                    include: [
                        {
                            model: Rating,
                            attributes: [],
                        },
                    ],
                    group: ["movie.id"],
                    order: sequelize.literal("averageRating DESC"),
                })
            ).slice(0, limit);
        },
    },
    Genre: {
        movies: (genre) => genre.getMovies(),
    },
    Movie: {
        genres: (movie) => movie.getGenres(),
        ratings: (movie) => movie.getRatings(),
        averageRating: async (movie) => {
            const result = await movie.getRatings({
                attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "averageRating"]],
                raw: true,
            });
            //console.log(result);
            return result[0].averageRating;
        },
    },
    Rating: {
        user: (rating) => rating.getUser(),
        movie: (rating) => rating.getMovie(),
    },
    User: {
        ratings: (user) => user.getRatings(),
    },
    Mutation: {
        rate: auth(async (_, { movieId, rating, comment }, context) => {
            const movie = await Movie.findByPk(movieId);
            if (movie === null) throw new Error("A megadott film nem létezik");
            if (!movie.ratingsEnabled) throw new Error("A megadott filmhez nincsenek engedélyezve az értékelések!");
            // A felhasználó értékelte-e már a filmet?
            let ratingDb = await Rating.findOne({
                where: {
                    MovieId: movieId,
                    UserId: context.user.id,
                },
            });
            // Ha ezekkel a feltételekkel találtunk értékelést (nem null), akkor a felhasználó már értékelte az adott filmet
            if (ratingDb !== null) {
                await ratingDb.update({
                    rating,
                    comment,
                });
                return {
                    newRating: false,
                    rating: ratingDb,
                };
            } else {
                ratingDb = await Rating.create({
                    rating,
                    comment,
                    MovieId: movieId,
                    UserId: context.user.id,
                });
                return {
                    newRating: true,
                    rating: ratingDb,
                };
            }
        }),
        deleteRating: auth(async (_, { movieId }, context) => {
            const movie = await Movie.findByPk(movieId);
            if (movie === null) throw new Error("A megadott film nem létezik");
            if (!movie.ratingsEnabled) throw new Error("A megadott filmhez nincsenek engedélyezve az értékelések!");
            // A felhasználó értékelte-e már a filmet?
            let ratingDb = await Rating.findOne({
                where: {
                    MovieId: movieId,
                    UserId: context.user.id,
                },
            });
            // Ha ezekkel a feltételekkel találtunk értékelést (nem null), akkor a felhasználó már értékelte az adott filmet
            if (!ratingDb) return false;
            await ratingDb.destroy();
            return true;
        }),
    },
};
