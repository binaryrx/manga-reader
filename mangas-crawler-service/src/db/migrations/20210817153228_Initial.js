
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

    await knex.schema.createTable(tableNames.genre, (table) => {
        table.increments().notNullable();
        table.string('name', 254).notNullable().unique();
        addDefaultColumns(table)
    });

    await knex.schema.createTable(tableNames.manga, (table) => {
        table.uuid("id").primary().notNullable();
        table.string('title', 254).notNullable();
        table.string('slug', 254).notNullable();
        table.text('alt_names');
        table.text('cover_url').notNullable();
        table.string('status', 254).notNullable();
        table.string('author', 254);
        table.string('artist', 254);
        table.text('description');
        table.specificType('genres', 'integer ARRAY');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.chapter, (table) => {
        table.uuid("id").primary().notNullable();
        references(table, tableNames.manga, true, 'manga_id')
        table.string('chapter_name', 254);
        table.float("chapter_num").notNullable();
        table.specificType('img_urls', 'text ARRAY');
        table.string('download', 254).notNullable();

        addDefaultColumns(table)
    });


};

exports.down = async (knex) => {
    await Promise.all(
        [
            tableNames.chapter,
            tableNames.manga,
            tableNames.genre
        ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
