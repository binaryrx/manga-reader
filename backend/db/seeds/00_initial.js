const crypto = require('crypto');
const bcrypt = require('bcrypt')

const orderedTableNames = require('../../src/constants/orderedTableNames');
const tableNames = require('../../src/constants/tableNames');
const genres = require('../../src/constants/genres')
const mangas = require('../../src/constants/mangas')
const chapters = require('../../src/constants/chapters');


exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await orderedTableNames.reduce( async (promise, tableName) => {
    await promise;
    return knex(tableName).del()
  }, Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'BinaryRx@gmail.com',
    name: 'Michael',
    password: await bcrypt.hash(password,12),
  }

  //insert users
  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');
  
  console.log(
    'User created',
    {password},
    createdUser
  )

  // console.log(chapters)

  //insert genres
 await knex(tableNames.genre).insert(genres,'*')


//get genres from db
const [action,adventure,comedy,drama,fantasy] = await Promise.all([
  knex(tableNames.genre)
      .where({
          name: 'Action'
      })
      .first(),
  knex(tableNames.genre)
      .where({
          name: 'Adventure'
      })
      .first(),
  knex(tableNames.genre)
      .where({
          name: 'Fantasy'
      })
      .first(),
  knex(tableNames.genre)
      .where({
          name: 'Comedy'
      })
      .first(),
  knex(tableNames.genre)
      .where({
          name: 'Drama'
      })
      .first(),
])

//map genres to mangas
mangas.map( (manga) => manga.genres = `${action.id},${adventure.id},${fantasy.id},${comedy.id},${drama.id},`)


const createdMangas = await knex(tableNames.manga).insert(mangas,('*'))



const [onePiece,Naruto] = await Promise.all([
  knex(tableNames.manga)
    .where({title: "One Piece"})
    .first(),
  knex(tableNames.manga)
    .where({title: "Naruto"})
    .first(),
])


chapters[0].manga_id = onePiece.id;
chapters[1].manga_id = onePiece.id;
chapters[2].manga_id = Naruto.id;
chapters[3].manga_id = Naruto.id;



const createdChapters = await knex(tableNames.chapter).insert(chapters, ('*'));


const getChaptersByMangaId = async (manga_id) => {
  return await knex(tableNames.chapter).select("*").where({manga_id});
}

console.log(await getChaptersByMangaId(onePiece.id));

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
