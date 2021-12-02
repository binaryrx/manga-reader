import {knex} from "#root/db/connection";


const setupRouter = async app => {

    app.get('/', async (req, res, next) => {
        let { title } = req.params;

        //knex always returns an array, & in this query only returns one manga
        const data = await knex("manga").select().whereRaw(`LOWER(title) LIKE LOWER(?)`, [`%${title}%`])

        res.json(data[0]);

    })

}

export default setupRouter;