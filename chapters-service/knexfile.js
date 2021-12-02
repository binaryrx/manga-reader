const accessEnv = require("./src/helpers/accessEnv");

const CHAPTERS_POSTGRES_DB = accessEnv("CHAPTERS_POSTGRES_DB")
const CHAPTERS_POSTGRES_USER = accessEnv("CHAPTERS_POSTGRES_USER")
const CHAPTERS_POSTGRES_PASSWORD = accessEnv("CHAPTERS_POSTGRES_PASSWORD")

module.exports = {
    root: true,
    development: {
        client: 'pg',
        connection: {
            host: "chapters-service-db",
            database: CHAPTERS_POSTGRES_DB,
            user: CHAPTERS_POSTGRES_USER,
            password: CHAPTERS_POSTGRES_PASSWORD,
        },
        migrations: {
            directory: './src/db/migrations'
        },
        seeds: {
            directory: './src/db/seeds'
        }

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
