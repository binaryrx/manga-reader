
const tableNames = require('../../constants/tableNames');

/**
 * @param {import('knex')} knex
 */

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at')
}


exports.up = async function (knex) {
    await knex.schema.createTable(tableNames.chapter, (table) => {
        table.string("id",24).primary().unique().notNullable();
        table.integer('manga_id').notNullable();
        table.string('manga_name', 254);
        table.string('chapter_name', 254);
        table.float("chapter_num").notNullable();
        table.specificType('img_urls', 'text ARRAY');

        addDefaultColumns(table)
    });
};

exports.down = async (knex) => {
    await Promise.all(
        [
            tableNames.chapter,
        ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
