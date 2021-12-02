const accessEnv = require("./src/helpers/accessEnv");

const MANGAS_POSTGRES_DB = accessEnv("MANGAS_POSTGRES_DB")
const MANGAS_POSTGRES_USER = accessEnv("MANGAS_POSTGRES_USER")
const MANGAS_POSTGRES_PASSWORD = accessEnv("MANGAS_POSTGRES_PASSWORD")

module.exports = {
    root: true,
    development: {
        client: 'pg',
        connection: {
            host: "mangas-service-db",
            database: MANGAS_POSTGRES_DB,
            user: MANGAS_POSTGRES_USER,
            password: MANGAS_POSTGRES_PASSWORD,
        },
        migrations: {
            directory: './src/db/migrations'
        },
        seeds: {
            directory: './src/db/seeds'
        },
        debug: false,

    }

    // staging: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // },

    // production: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // }

};
