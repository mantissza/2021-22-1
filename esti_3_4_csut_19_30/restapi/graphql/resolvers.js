const models = require("../models");
const { sequelize, User, Genre, Movie, Rating } = models;
const authMw = require("../middlewares/auth");

const auth = (fn) => {
    //console.log("auth");
    // Wrapper fv:
    return async (parent, params, context, info) => {
        //console.log(context.headers);
        // Express middleware: (request, response, next)
        await new Promise((resolve, reject) => {
            authMw(context, null, (error) => {
                if (error) {
                    reject(error); // await miatt ez error throw lesz
                }
                resolve(); // csak annyi, hogy működik, oké az auth
            });
        });
        // ha errort dob a promise, megáll a futás, egyébként pedig a contextbe
        // berakja a jwt token payloadját a context.user alá

        // Eredeti fv meghívása:
        return fn(parent, params, context, info);
    };
};

module.exports = {
    Query: {
        helloWorld: () => "Hello world",
        // (parent, params, context, info)
        helloName: (_, { name }) => `Hello ${name}!`,
        helloAuth: auth((parent, params, context) => `Hello ${context.user.name}!`),

        genres: () => Genre.findAll(),
        genre: (_, { id }) => Genre.findByPk(id),

        movies: () => Movie.findAll(),
        movie: (_, { id }) => Movie.findByPk(id),

        users: () => User.findAll(),
        user: (_, { id }) => User.findByPk(id),

        top: async (_, { limit }) => {
            return (
                await Movie.findAll({
                    attributes: {
                        include: [[sequelize.fn("AVG", sequelize.col("Ratings.rating")), "averageRating"]],
                    },
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
        /*movies: async (genre) => {
            console.log(genre);
            return await genre.getMovies();
        },*/
        movies: (genre) => genre.getMovies(),
    },
    Movie: {
        genres: (movie) => movie.getGenres(),
        ratings: (movie) => movie.getRatings(),
        averageRating: async (movie) => {
            const rating = await movie.getRatings({
                attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "averageRating"]],
                raw: true,
            });
            return rating[0].averageRating;
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
        // Létrehozás és módosítás
        rate: auth(async (_, { movieId, rating, comment }, context) => {
            const movie = await Movie.findByPk(movieId);
            if (!movie) throw new Error("Nincs ilyen film");
            if (movie.ratingsEnabled !== true) {
                throw new Error("A megadott filmhez nincsenek engedélyezve az értékelések!");
            }
            // Ha van ilyen értékelés, akkor a user korábban már értékelte ezt a filmet
            let userRating = await Rating.findOne({ where: { UserId: context.user.id, MovieId: movieId } });
            let newRating = false;
            if (userRating) {
                // A meglévő értékelést kell módosítani
                await userRating.update({ rating, comment });
            } else {
                // Új értékelést hozunk létre
                userRating = await Rating.create({ rating, comment, UserId: context.user.id, MovieId: movieId });
                newRating = true;
            }
            return {
                rating: userRating,
                isNewRating: newRating,
            };
        }),
        deleteRating: auth(async (_, { movieId }, context) => {
            const movie = await Movie.findByPk(movieId);
            if (!movie) throw new Error("Nincs ilyen film");
            if (movie.ratingsEnabled !== true) {
                throw new Error("A megadott filmhez nincsenek engedélyezve az értékelések!");
            }
            // Ha van ilyen értékelés, akkor a user korábban már értékelte ezt a filmet
            let userRating = await Rating.findOne({ where: { UserId: context.user.id, MovieId: movieId } });
            let deleted = false;
            if (userRating) {
                await userRating.destroy();
                deleted = true;
            }
            return deleted;
        }),
    },
};
