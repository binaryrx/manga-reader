const accessEnv = require("./src/helpers/accessEnv");

const USERS_POSTGRES_DB = accessEnv("USERS_POSTGRES_DB")
const USERS_POSTGRES_USER = accessEnv("USERS_POSTGRES_USER")
const USERS_POSTGRES_PASSWORD = accessEnv("USERS_POSTGRES_PASSWORD")


module.exports = {
    root: true,
    development: {
        client: 'pg',
        connection: {
            host: "users-service-db",
            database: USERS_POSTGRES_DB,
            user: USERS_POSTGRES_USER,
            password: USERS_POSTGRES_PASSWORD,
        },

        migrations: {
            directory: './src/db/migrations'
        },
        seeds: {
            directory: './src/db/seeds'
        }

    }

};
