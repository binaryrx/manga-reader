import {knex, knexChapters} from "#root/db/connection";
import tableNames from "#root/constants/tableNames";
import _ from "lodash";


//map genres to mangas
const mapGenresToMangas = (  mangas => {
    return Promise.all(mangas.map( async ( manga) => {
        //get genre names by using genre ids
        const genreFromDB = await knex(tableNames.genre).whereIn('id', manga.genres);
        const names = genreFromDB.map( ({name}) => name)
        manga["genres"] = names.sort();
        return manga;
    }));
});

//get chapter name + chapter num of latest chapter
const mapLatestChapterToMangas = ( mangas => {

    return Promise.all(mangas.map( async (manga) => {
            
        const chapterData = await knexChapters('chapter').select('chapter_name', 'chapter_num').where('manga_id',manga.id).orderBy('chapter_num', 'desc').first();

        if(chapterData) {
            const {chapter_name, chapter_num} = chapterData;
            manga["latest_chapter"] = chapter_name
            manga["latest_chapter_num"] = chapter_num
        }else{
            manga["latest_chapter"] = "-no chapters-"
            manga["latest_chapter_num"] = 0
        }

        return manga
    }))
})

//map chapters to manga
const mapChaptersToManga = ( async manga => {


    const chapterData = await knexChapters('chapter').select().where('manga_id',manga.id).orderBy('chapter_num', 'asc');

    if(chapterData) {
        const {chapter_name, chapter_num} = chapterData[chapterData.length - 1];
        manga["latestChapter"] = chapter_name
        manga["latestChapterNum"] = chapter_num
    }else{
        manga["latestChapter"] = "-no chapters-"
        manga["latestChapterNum"] = 0
    }


    manga.chapters = chapterData;

    return manga;
})

const setupRouter = async app => {

    app.get('/mangas', async (req, res, next) => {
        
        // const data = await knex.select().table('manga');
        const data = await knex(tableNames.manga).select();
           
        await mapGenresToMangas(data)

        await mapLatestChapterToMangas(data)

        res.json(data)
    })

    //get manga by manga name
    app.get('/manga/:mangaName', async (req, res, next) => {


        let { mangaName } = req.params;
        
        mangaName = mangaName.split("-").join(" ");
        mangaName = mangaName[0].toUpperCase() + mangaName.substr(1, mangaName.length);


        //knex always returns an array, & in this query only returns one manga
        const data = await knex(tableNames.manga).select().whereRaw(`LOWER(manga_name) LIKE LOWER(?)`, [`%${mangaName}%`])

        await mapGenresToMangas(data)

        await mapChaptersToManga(data[0])

        await mapLatestChapterToMangas(data)

        res.json(data[0]);

    })

    //get all mangas by genre
    app.get('/genre/:genre', async( req, res, next) => {

        console.log("here?")

        //genre name
        let { genre } = req.params;

        // replaceing dash - with space
        genre = genre.split("-").join(' ')

        //get genre id
        const [{id}] = await knex(tableNames.genre).select("id").whereRaw(`LOWER(name) LIKE LOWER(?)`, [`%${genre}%`])

        //get all mangas that have the id
        const mangasByGenre = await knex(tableNames.manga).select().whereRaw('? = any (??)', [id, 'genres'])

        await mapGenresToMangas(mangasByGenre)

        await mapLatestChapterToMangas(mangasByGenre)
        


        res.json(mangasByGenre);
    });

    app.get("/mangas/:mangas_ids", async (req, res, next) => {
        const mangas_ids = req.params.mangas_ids.split(",")

        const mangasFromDB = await knex(tableNames.manga).whereIn("id", mangas_ids )
        await mapLatestChapterToMangas(mangasFromDB)
        
        res.json(mangasFromDB)
    })
}

export default setupRouter;