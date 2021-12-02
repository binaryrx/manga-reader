import { addHours } from "date-fns";

import knex from "#root/db/connection";
import tableNames from "#root/constants/tableNames";

import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";


const USER_SESSION_EXPIRAY_HOURS = 2;

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

            return res.json(userSession)
        } catch (e) {
            return next(e);
        }
    })


    app.get("/sessions/:session_id", async (req, res, next) => {
        try {
            // console.log(req.params.session_id)

            const [userSession] = await knex.select('*').from(tableNames.userSessions).where("id", req.params.session_id);

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

            return res.end();

        } catch (e) {
            next(e);
        }
    })
}

export default setupRouter;