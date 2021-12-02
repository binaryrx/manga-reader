const accessEnv = require("./src/helpers/accessEnv");

const CRAWLER_POSTGRES_DB = accessEnv("CRAWLER_POSTGRES_DB")
const CRAWLER_POSTGRES_USER = accessEnv("CRAWLER_POSTGRES_USER")
const CRAWLER_POSTGRES_PASSWORD = accessEnv("CRAWLER_POSTGRES_PASSWORD")

module.exports = {
    root: true,
    development: {
        client: 'pg',
        connection: {
            host: "manga-crawler-service-db",
            database: CRAWLER_POSTGRES_DB,
            user: CRAWLER_POSTGRES_USER,
            password: CRAWLER_POSTGRES_PASSWORD,
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
