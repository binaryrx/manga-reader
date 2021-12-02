const path = require("path")
require('dotenv').config();

const orderedTableNames = require('../../constants/orderedTableNames');
const tableNames = require('../../constants/tableNames');


const knexManga = require("knex")({
  client: 'pg',
  connection: {
    host: "mangas-service-db",
    user: process.env.MANGAS_POSTGRES_USER,
    password: process.env.MANGAS_POSTGRES_PASSWORD,
    database: process.env.MANGAS_POSTGRES_DB,
  },
  debug: true
});


const seedFiles = require('../../mangas/seed');
const seedsDirectory = './src/mangas/json';

const mangaChapters = seedFiles.map(function (file) {
  if (file.indexOf(".json") !== -1) {
    return require(path.resolve(seedsDirectory, file));
  }
});


exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await orderedTableNames.reduce(async (promise, tableName) => {
    await promise;
    return knex(tableName).del()
  }, Promise.resolve());


  const mangasFromDB = await knexManga.select("*").from(tableNames.manga)
  console.log(mangasFromDB);
  const mangas = mangasFromDB.reduce((acc, current, i) => {
    acc[current.manga_name] = current.id
    return acc
  }, {})

  
  //for every manga, and for each chapter correspoinding that manga, map a manga_id to the chapter
  const crypto = require('crypto');

  await Promise.all(mangaChapters.map(async (chapters, i) => {

    const chapterPomises = chapters.map(async (chapter, j) => {
      chapter.manga_id = mangas[chapter.manga_name]
      chapter.id = crypto.randomBytes(10).toString("hex");
      console.log(chapter.id);
      //insert chapter to db
      return await knex(tableNames.chapter).insert(chapter, ('*'));
    })

    return await Promise.all(chapterPomises).then((d) => console.log(d));

  }))


};