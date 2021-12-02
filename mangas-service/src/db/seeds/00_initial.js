const path = require("path")

const orderedTableNames = require('../../constants/orderedTableNames');
const tableNames = require('../../constants/tableNames');
const genres = require('../../constants/genres');

const seedFiles = require('../../mangas/seed');
const seedsDirectory = './src/mangas/json';
// const seedsDirectory = path.join('../../m/', "json")

const mangaSeeds = [];
const genresSeeds = [];

console.log(seedFiles);


seedFiles.map(function (file) {
  if (file.indexOf(".json") !== -1) {
    if (file.indexOf("-genre") !== -1) {
      genresSeeds.push(require(path.resolve(seedsDirectory, file)))
    } else {
      mangaSeeds.push(require(path.resolve(seedsDirectory, file)))
    }
  }
});




exports.seed = async (knex) => {

  // Deletes ALL existing entries
  // await orderedTableNames.reduce(async (promise, tableName) => {
  //   await promise;
  //   return knex(tableName).del()
  // }, Promise.resolve());

  await knex(tableNames.genre).insert(genres, '*')


  const genresPromies = genresSeeds.map(async (genre, i) => {

    //get genre entries corresponding to genre array
    const genresFromDB = await knex(tableNames.genre).whereIn("name", genre)

    //map the genre ids
    const genresIds = genresFromDB.map((v, i) => v.id)

    //add ids to manga seed
    mangaSeeds[i].genres = genresIds;

    //insert manga with corrent genre ids
    await knex(tableNames.manga).insert(mangaSeeds[i], ('*'));

    //get db entries corresponding to the seeds titles
    const [mangaFromDB] = await Promise.all([
      knex(tableNames.manga)
        .where({ manga_name: mangaSeeds[i].manga_name })
        .first()
    ])
    console.log(mangaFromDB)


  })
  await Promise.all(genresPromies)

};
