'use strict';
const models = require('../models'); 
const { User, Genre, Movie, Rating } = models;
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Műfajok
    const genresCount = faker.datatype.number({ min: 5, max: 10 });
    const genres = [];
    for (let i = 1; i < genresCount; i++) {
      genres.push(
        await Genre.create({
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
        })
      );
    }

    // Felhasználók
    const usersCount = faker.datatype.number({ min: 15, max: 30 });
    const users = [];
    users.push(
      await User.create({
        name: 'Admin',
        email: `admin@szerveroldali.hu`,
        password: 'password',
        isAdmin: true,
      })
    );
    for (let i = 1; i < usersCount; i++) {
      users.push(
        await User.create({
          name: faker.name.findName(),
          //email: faker.internet.email(),
          email: `user${i}@szerveroldali.hu`,
          password: 'password',
          isAdmin: false,
        })
      );
    }
   
    // Filmek
    const moviesCount = faker.datatype.number({ min: 5, max: 10 });
    const movies = [];
    for (let i = 1; i < moviesCount; i++) {
      movies.push(
        await Movie.create({
          title: faker.lorem.words(faker.datatype.number({ min: 1, max: 6})),
          director: faker.name.findName(),
          description: faker.lorem.sentence(),
          year: faker.datatype.number({ min: 1870, max: new Date().getFullYear() }),
          length: faker.datatype.number({ min: 60*60, max: 60*60*4 }),
          imageUrl: faker.image.imageUrl(),
          ratingsEnabled: faker.datatype.boolean(),
        })
      );
    }

    // Relációk, értékelések
    //    - Genre-Movie összekötés (N-N / N-M)
    //    - Movie-Rating

    for (let movie of movies) {
      // 1. Műfajokat hozzá kell rendelni a filmhez
      await movie.setGenres(faker.random.arrayElements(genres));

      // 2. Értékeléseket kell rendelni a filmhez, ha az értékelések engedélyezve vannak ehhez a filmhez
      const randomUsers = faker.random.arrayElements(users);
      for (let user of randomUsers) {
        await Rating.create({
          rating: faker.datatype.number({ min: 1, max: 5}),
          comment: faker.datatype.boolean() ? faker.lorem.sentence() : '',
          UserId: user.id,
          MovieId: movie.id,
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
  }
};
