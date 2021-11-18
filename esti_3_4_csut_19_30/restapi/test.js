// ilyenkor, ha csak a mappát adjuk meg, akkor az index.js-t fogja behúzni
const models = require('./models'); 
const { User, Genre, Movie, Rating, sequelize } = models;
const faker = require('faker');
const { Op } = require("sequelize");

// Self-invoke function
;(async () => {
  /*const genresCount = faker.datatype.number({ min: 5, max: 10 });
  const genres = [];
  for (let i = 1; i < genresCount; i++) {
    genres.push(
      await Genre.create({
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
      })
    );
  }

  const user = await User.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: 'password',
    isAdmin: false,
  });
  //console.log(user);
  const movie = await Movie.create({
    title: faker.lorem.words(faker.datatype.number({ min: 1, max: 6})),
    director: faker.name.findName(),
    description: faker.lorem.sentence(),
    year: faker.datatype.number({ min: 1870, max: new Date().getFullYear() }),
    length: faker.datatype.number({ min: 60*60, max: 60*60*4 }),
    imageUrl: faker.image.imageUrl(),
    ratingsEnabled: true,
  });
  await Rating.create({
    rating: faker.datatype.number({ min: 1, max: 5}),
    comment: faker.datatype.boolean() ? faker.lorem.sentence() : '',
    UserId: user.id,
    MovieId: movie.id,
  });
  console.log(await movie.getRatings());
  
  await movie.setGenres(genres);
  console.log(await movie.countGenres());*/

  // Összes film lekérése
  //console.log(await Movie.findAll());
  // Filmek megszámolása
  //console.log(await Movie.count());
  // Egy adott film lekérése
  //console.log(await Movie.findByPk(1)); // primary key
  //console.log(await Movie.findByPk(11111)); // null
  // Adott mezők lekérése csak
  /*console.log(
    (await Movie.findAll({
      attributes: ['id', 'title']
    })).map(movie => movie.toJSON())
  );*/
  // Bizonyos mezők kizárása
  /*console.log(
    (await Movie.findAll({
      //attributes: ['id', 'title']
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })).map(movie => movie.toJSON())
  );*/
  // Mező lekérése más néven
  /*console.log(await Movie.findAll({
    attributes: ['id', ['title', 'cim']]
  }));*/
  // Olyan filmek, amik 1950 után készültek
  /*console.log(await Movie.findAll({
    where: {
      year: {
        [Op.gt]: 1950,
      }
    }
  }));*/
  // Egy valamilyen rekord megkeresése valamilyen feltétel alapján
  /*console.log(await Movie.findOne({
    where: {
      id: 2,
    }
  }));*/

  /*console.log(
    (await (await Movie.findByPk(1)).getGenres({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      joinTableAttributes: []
    })).map(genre => genre.toJSON())
  );*/

  /*console.log(
    JSON.stringify((await Movie.findAll({
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'avgRating']
        ],
      },
      include: [
        {
          model: Genre,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          through: { attributes: [] }
        },
        {
          model: Rating,
          attributes: [],
          //attributes: {
          //  exclude: ['createdAt', 'updatedAt']
          //},
        }
      ],
      group: ['movie.id', 'Genres.id'],
      order: sequelize.literal('avgRating DESC'),
    })).slice(0,3), null, 4)
  );*/

  //console.log((await User.findByPk(1)).comparePassword('password'));

})();