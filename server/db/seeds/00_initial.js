/* eslint-disable no-return-assign */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require("path")

const orderedTableNames = require('../../src/constants/orderedTableNames');
const tableNames = require('../../src/constants/tableNames');
const genres = require('../../src/constants/genres')
const mangas = require('../../src/constants/mangas')
const chapters = require('../../src/constants/chapters');

const seedTitle = "Dolkara";


const seedManga = require('../../m/dolkara.json')
const seedChapters = require('../../m/dolkara-chapters.json')
const seedGenres = require('../../m/dolkara-genre.json')

const seedsDirectory = path.join(__dirname, "../../m/")

function getSeedData() {
    fs.readdir(seedsDirectory, (err, files) => {

        const seedsMangas = []
        const seedsChapters = []
        const seedsGenres = []

        if (err) {
            console.log("Error getting directory information.");
        } else {
            files.forEach(function (file) {
                if (file.indexOf(".json") !== -1) {

                    if (file.indexOf("-genre") !== -1) {
                        const seed = require(path.resolve(seedsDirectory, file));
                        seedsGenres.push(seed);

                    } else if (file.indexOf("-chapters") !== -1) {
                        const seed = require(path.resolve(seedsDirectory, file));
                        seedsChapters.push(seed);

                    } else {
                        const seed = require(path.resolve(seedsDirectory, file));
                        seedsMangas.push(seed);
                    }

                }
            });

        }
        return {
            mangas: seedsMangas,
            chapters: seedsChapters,
            genres: seedsGenres,
        }
    })
}

const seedData = getSeedData()
// console.log(seedData)

exports.seed = async (knex) => {
    // Deletes ALL existing entries
    await orderedTableNames.reduce(async (promise, tableName) => {
        await promise;
        return knex(tableName).del()
    }, Promise.resolve());




    fs.readdir(seedsDirectory, async (err, files) => {

        const seedsMangas = []
        const seedsChapters = []
        const seedsGenres = []

        if (err) {
            console.log("Error getting directory information.");
        } else {
            files.forEach(function (file) {
                if (file.indexOf(".json") !== -1) {

                    if (file.indexOf("-genre") !== -1) {
                        const seed = require(path.resolve(seedsDirectory, file));
                        seedsGenres.push(seed);

                    } else if (file.indexOf("-chapters") !== -1) {
                        const seed = require(path.resolve(seedsDirectory, file));
                        seedsChapters.push(seed);

                    } else {
                        const seed = require(path.resolve(seedsDirectory, file));
                        seedsMangas.push(seed);
                    }

                }
            });

        }

        console.log(seedsMangas)
        console.log(seedsChapters)
        console.log(seedsGenres)

        await knex(tableNames.genre).insert(genres, '*')


        const seeds = {
            mangas: seedsMangas,
            chapters: seedsChapters,
            genres: seedsGenres,
        }

        seeds.genres.forEach(async (seed, i) => {
            const genresFromDB = await knex(tableNames.genre).whereIn("name", seed)
            const genresIds = genresFromDB.map((v, i) => v.id)


            seeds.mangas[i].genres = genresIds;

            await knex(tableNames.manga).insert(seeds.mangas[i], ('*'));

            console.log(seeds.mangas[i])
            const [mangaFromDB] = await Promise.all([
                knex(tableNames.manga)
                    .where({ title: seeds.mangas[i].title })
                    .first()
            ])

            seeds.chapters[i].forEach((chapter) => chapter.manga_id = mangaFromDB.id)

            const createdChapters = await knex(tableNames.chapter).insert(seeds.chapters[i], ('*'));
        })


    })

    const password = crypto.randomBytes(15).toString('hex');

    const user = {
        email: 'BinaryRx@gmail.com',
        name: 'Michael',
        password: await bcrypt.hash(password, 12)
    }
    // insert users
    const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

    // console.log(
    //     'User created',
    //     { password },
    //     createdUser
    // )






    // console.log(seeds.mangas)
    // console.log(seeds.chapters)
    // console.log(seeds.genres)


    // insert All genre types into db

    // console.log(seedData)

    // const seeds = await theSeeds()
    // console.log(seeds);

    // seeds.genres.forEach(async (seed, i) => {
    //     const genresFromDB = await knex(tableNames.genre).whereIn("name", seed)
    //     const genresIds = genresFromDB.map((v, i) => v.id)

    //     console.log('in')

    //     seeds.mangas[i] = genresIds;

    //     await knex(tableNames.manga).insert(seeds.mangas[i], ('*'));

    //     const [mangaFromDB] = await Promise.all([
    //         knex(tableNames.manga)
    //             .where({ title: seeds.mangas[i].title })
    //             .first()
    //     ])

    //     seeds.chapters[i].forEach((chapter) => chapter.manga_id = mangaFromDB.id)

    //     const createdChapters = await knex(tableNames.chapter).insert(seeds.chapters[i], ('*'));

    // })


    // const genreFromDb = await knex(tableNames.genre).whereIn("name", seedGenres);

    // const genreIds = genreFromDb.map((v, i) => v.id)


    // map genres ids to mangas
    // seedManga.genres = genreIds

    // const createdMangas = await knex(tableNames.manga).insert(mangas, ('*'))
    // await knex(tableNames.manga).insert(seedManga, ('*'))

    // const [mangaFromDb] = await Promise.all([
    //     knex(tableNames.manga)
    //         .where({ title: seedTitle })
    //         .first(),
    // ])

    // seedChapters.forEach((chapter) => chapter.manga_id = mangaFromDb.id)

    // const createdChapters = await knex(tableNames.chapter).insert(seedChapters, ('*'));

    // await knex(tableNames.chapter).insert(chapters, ('*'));

    // const getChaptersByMangaId = async (manga_id) => knex(tableNames.chapter).select('*').where({ manga_id })

    // console.log(await getChaptersByMangaId(onePiece.id));

    // const joinedMangaChapters = await knex.select('*').from(tableNames.manga).innerJoin(tableNames.chapter, 'manga.id', 'chapter.manga_id')

    // console.log(joinedMangaChapters)

    // console.log(
    //   'manga created',
    //   createdMangas
    //   )

    // console.log(
    //   'Mangas created',
    //   createdMangas
    // )
};
