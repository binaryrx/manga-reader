import knex from "#root/db/connection";

const setupRouter = async app => {

    app.get('/chapters', async (req, res, next) => {
        const data = await knex.select().table('chapter');
        res.json(data)
    })

    app.get('/chapter/:id', async (req, res, next) => {
        const [data] = await knex.select().table('chapter').where('id', req.params.id);
        res.json(data)
    })

  
    app.get('/chapter/:mangaName/:chapterName', async (req, res, next) => {
        let {mangaName, chapterName } = req.params;
        mangaName = mangaName.split("-").join(" ");

        const [chapter] = await knex("chapter").select().whereRaw(`LOWER(chapter_name) LIKE LOWER(?) and LOWER(manga_name) LIKE LOWER(?)`, [`${chapterName}`,`%${mangaName}%`])

        res.json(chapter)
    })

    app.get('/chapters/:mangaName', async (req, res, next) => {
        let {mangaName} = req.params;
        mangaName = mangaName.split("-").join(" ");
        
        const chapters = await knex("chapter").select("chapter_name", "chapter_num").whereRaw(`LOWER(manga_name) LIKE LOWER(?)`, [`%${mangaName}%`])
        
        res.json(chapters)
    })

   
}

export default setupRouter;