import { addHours } from "date-fns";

import { knex, knexMangas, knexChapters } from "#root/db/connection";
import tableNames from "#root/constants/tableNames";

import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";


const USER_SESSION_EXPIRAY_HOURS = 2;

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

const setupRouter = async app => {

    app.post('/users', async (req, res, next) => {
        //todo:
        // add email validation + password validation
        if (!req.body.email || !req.body.password) {
            return next(new Error("Invalid body!"))
        }

        const userFromDB = await knex.select('email').from(tableNames.user).where("email", req.body.email);
        if (userFromDB.length !== 0) {
            return next(new Error("Email already exists"))
        }

        try {
            const newUser = await knex(tableNames.user).insert({
                id: generateUUID(),
                email: req.body.email,
                password: hashPassword(req.body.password),
                name: req.body.name || null
            }, "*")

            return res.json(newUser)

        } catch (e) {
            return next(e)
        }
    })

    app.get("/users/:user_id", async (req, res, next) => {

        try {
            const [userFromDB] = await knex.select('id', 'email', 'name').from(tableNames.user).where("id", req.params.user_id);

            if (userFromDB === undefined) return next(new Error("invalid User ID!"))

            res.json(userFromDB)

        } catch (e) {
            return next(e)
        }
    })

    app.post('/sessions', async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return next(new Error("Invalid body!"))
        }

        try {
            const [userFromDB] = await knex.select('*').from(tableNames.user).where("email", req.body.email);
            if (!userFromDB || !passwordCompareSync(req.body.password, userFromDB.password)) {
                return next(new Error("Invalid Credentials!"))
            }
            const expires_at = addHours(new Date(), USER_SESSION_EXPIRAY_HOURS);
            const sessionToken = generateUUID();

            const userSession = await knex(tableNames.userSessions).insert({
                expires_at,
                id: sessionToken,
                user_id: userFromDB.id,
                created_at: addHours(new Date(), 0)
            }, "*")

            await knex(tableNames.user).where("id", userFromDB.id).update({
                "last_login": addHours(new Date(), 0)
            })


            return res.json(userSession)
        } catch (e) {
            return next(e);
        }

    })

    app.get("/sessions/:session_id", async (req, res, next) => {
        try {
            const { session_id } = req.params
            // console.log(req.params.session_id)
            console.log(" -- user session --",session_id)

            const [userSession] = await knex.select('*').from(tableNames.userSessions).where("id", session_id);

            if (!userSession) return next(new Error("Invalid Sesssion ID"))

            res.json(userSession)

        } catch (e) {
            next(e);
        }
    })

    app.delete("/sessions/:session_id", async (req, res, next) => {

        try {

            const [deletedUser] = await knex(tableNames.userSessions).where("id", req.params.session_id).del("*");

            if (!deletedUser) return next(new Error("Invalid Sesssion ID"))

            return res.send(true);

        } catch (e) {
            next(e);
        }
    });

    app.get("/favorites/:user_id", async (req, res, next) => {
        try{
            const favoritesFromDB = await knex.select("*").from(tableNames.userFavorites).where("user_id", req.params.user_id);
            const manga_ids = favoritesFromDB.map( ({manga_id}) => manga_id);
            const mangasFromDB = await knexMangas.select("*").from("manga").whereIn("id", manga_ids);

            await mapLatestChapterToMangas(mangasFromDB)

            res.send(favoritesFromDB);

        } catch(e) {
            next(e);
        }
    });

    app.post("/favorites/:user_id/:manga_id", async (req, res, next) => {

        const { user_id, manga_id } = req.params;

        try{

            const favoriteFromDB = await knex.select('*').from(tableNames.userFavorites).whereRaw("user_id = ? and manga_id = ?", [`${user_id}`,`${manga_id}`]);

            if(favoriteFromDB.length > 0) {
                return res.json(favoriteFromDB)
            }

            const insertedUserFavorite = await knex(tableNames.userFavorites).insert({
                id: generateUUID(),
                user_id,
                manga_id,
            }, "*");

            const mangasFromDB = await knexMangas.select("*").from("manga").where("id", manga_id);
            await mapLatestChapterToMangas(mangasFromDB)

            return res.json(insertedUserFavorite);

        }catch (e){
            next(e);
        }
    });

    app.delete("/favorites/:user_id/:manga_id", async (req, res, next) => {
        const { user_id, manga_id } = req.params;

        try{
            const [deletedFavorite] = await knex(tableNames.userFavorites).whereRaw("user_id = ? and manga_id = ?", [`${user_id}`,`${manga_id}`]).del("*");

            if(!deletedFavorite) return next(new Error("Favorite not found!"))

            return res.send(true);
        }catch (e){
            next(e);
        }
    });
}

export default setupRouter;