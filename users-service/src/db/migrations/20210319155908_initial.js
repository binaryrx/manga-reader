
const tableNames = require('../../constants/tableNames');
console.log(tableNames.user)
console.log(tableNames.userSessions)
/**
 * @param {import('knex')} knex
 */

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at')
}

function references(table, tableName, notNullable = true, columnName = '') {
    const definition = table
        .uuid(`${columnName || tableName + '_id'}`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');

    if (notNullable) {
        definition.notNullable();
    }
    return definition;
}


exports.up = async (knex) => {
    await knex.schema.createTable(tableNames.user, (table) => {
        table.uuid("id").primary().notNullable();
        table.string('email', 254).notNullable().unique();
        table.string('name');
        table.string('password', 127).notNullable();
        table.datetime('last_login');
        addDefaultColumns(table);
    });
    await knex.schema.createTable(tableNames.userSessions, (table) => {
        table.uuid("id").primary().notNullable();
        references(table, tableNames.user, true, 'user_id')
        table.datetime("expires_at").notNullable()
        table.datetime('created_at')
    });
};

exports.down = async (knex) => {
    await Promise.all(
        [
            tableNames.userSessions,
            tableNames.user,
        ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};

