import accessEnv from "#root/helpers/accessEnv"

const environment = accessEnv("NODE_ENV", "development");
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);


module.exports = knex