const models = require('./models'); // index.js
const { User, Genre, Movie, Rating } = models;
const faker = require('faker');
const { Op } = require("sequelize");

// Self-Invoke Function
;(async () => {
    /*const user = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'password',
        isAdmin: false,
    });

    const genresCount = faker.datatype.number({ min: 5, max: 10 });
    const genres = [];
    for (let i = 1; i <= genresCount; i++) {
        genres.push(
            await Genre.create({
                name: faker.lorem.word(),
                description: faker.lorem.sentence(),
            })
        )
    }
    
    //console.log(user);
    const movie = await Movie.create({
        title: faker.lorem.words(faker.datatype.number({ min: 1, max: 6 })),
        director: faker.name.findName(),
        description: faker.lorem.sentence(),
        year: faker.datatype.number({ min: 1870, max: new Date().getFullYear() }),
        length: faker.datatype.number({ min: 60*60, max: 60*60*3 }),
        imageUrl: faker.image.imageUrl(),
        ratingsEnabled: true //faker.datatype.boolean(),
    });

    await movie.setGenres(faker.random.arrayElements(genres));

    const rating = await Rating.create({
        rating: faker.datatype.number({ min: 1, max: 5 }),
        comment: faker.datatype.boolean() ? faker.lorem.sentence() : '',
        UserId: user.id,
        MovieId: movie.id,
    });
    //console.log(await rating.getMovie());
    //console.log(await rating.getUser());
    console.log(await movie.getRatings());

    //console.log(genres.length, await movie.countGenres());

    ^ Ebből seedert csináltunk
    */

    // Összes film lekérése
    //console.log(await Movie.findAll());
    // Filmek megszámolása
    //console.log(await Movie.count());
    // Egy adott film lekérése, ID alapján
    //console.log(await Movie.findByPk(1));
    //console.log(await Movie.findByPk(11111)); // null
    //console.log(await Movie.findOne({ where: { id: 1 } }));
    // Azon filmek lekérése, ahol az év nagyobb, mint 1950
    /*console.log(await Movie.findAll({ 
        where: { 
            year: {
                [Op.gt]: 1950, 
            } 
        } 
    }));*/

    await (await Movie.findByPk(1)).removeGenre(3);
    console.log(await (await Movie.findByPk(1)).countGenres());

})();