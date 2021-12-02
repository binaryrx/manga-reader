
const tableNames = require('../../constants/tableNames');

/**
 * @param {import('knex')} knex
 */

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at')
}

function references(table, tableName, notNullable = true, columnName = '') {
    const definition = table
        .integer(`${columnName || tableName + '_id'}`)
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

    await knex.schema.createTable(tableNames.genre, (table) => {
        table.increments().notNullable();
        table.string('name', 254).notNullable().unique();
        addDefaultColumns(table)
    });

    await knex.schema.createTable(tableNames.manga, (table) => {
        table.increments();
        table.string('manga_name', 254).notNullable();
        table.text('alt_names');
        table.text('cover_url').notNullable();
        table.string('status', 254).notNullable();
        table.string('author', 254);
        table.string('artist', 254);
        table.text('description');
        table.specificType('genres', 'integer ARRAY');
        // table.text('genres');
        addDefaultColumns(table);
    });


};

exports.down = async (knex) => {
    await Promise.all(
        [
            // tableNames.related_manga_chapter,
            // tableNames.related_manga,
            tableNames.manga,
            tableNames.genre
        ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
