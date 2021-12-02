import {knex, knexChapters} from "#root/db/connection";
import _ from "lodash";


//map genres to mangas
const mapGenresToMangas = (  mangas => {
    return Promise.all(mangas.map( async ( manga) => {
        //get genre names by using genre ids
        const genreFromDB = await knex('genre').whereIn('id', manga.genres);
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
            manga["latestChapter"] = chapter_name
            manga["latestChapterNum"] = chapter_num
        }else{
            manga["latestChapter"] = "-no chapters-"
            manga["latestChapterNum"] = 0
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
        
        const data = await knex.select().table('manga');
           
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
        const data = await knex("manga").select().whereRaw(`LOWER(manga_name) LIKE LOWER(?)`, [`%${mangaName}%`])

        await mapGenresToMangas(data)

        await mapChaptersToManga(data[0])

        await mapLatestChapterToMangas(data)

        res.json(data[0]);

    })

    //get all mangas by genre
    app.get('/genre/:genre', async( req, res, next) => {

        //genre name
        let { genre } = req.params;

        // replaceing dash - with space
        genre = genre.split("-").join(' ')

        //get genre id
        const [{id}] = await knex("genre").select("id").whereRaw(`LOWER(name) LIKE LOWER(?)`, [`%${genre}%`])

        //get all mangas that have the id
        const mangasByGenre = await knex('manga').select().whereRaw('? = any (??)', [id, 'genres'])

        await mapGenresToMangas(mangasByGenre)

        await mapLatestChapterToMangas(mangasByGenre)
        


        res.json(mangasByGenre);
    });
}

export default setupRouter;