import accessEnv from "#root/helpers/accessEnv"

const environment = accessEnv("NODE_ENV", "development");
const configuration = require('../../knexfile')[environment];
const configurationChapters = require('../../knexfileChapters')[environment];
const knex = require('knex')(configuration);
const knexChapters = require('knex')(configurationChapters);


module.exports = {
    knex,
    knexChapters
}