import accessEnv from "#root/helpers/accessEnv"
const environment = accessEnv("NODE_ENV", "development");
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

knex.raw('select 1+1 as result').catch(err => {
    console.log(err);
    process.exit(1);
});

module.exports = knex