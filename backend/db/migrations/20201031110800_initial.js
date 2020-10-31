
const tableNames = require('../../src/constants/tableNames');

/**
 * @param {import('knex')} knex
 */

function addDefaultColumns(table){
    table.timestamps(false,true);
    table.datetime('deleted_at')
}

function references(table, tableName, notNullable = true, columnName = ''){
    const definition = table
        .integer(`${columnName || tableName+'_id'}`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');
    
    if(notNullable) {
        definition.notNullable();
    }
    return definition;
}


exports.up = async (knex) => {

    await knex.schema.createTable(tableNames.genre, (table) => {
        table.increments();
        table.string('name',255);
        addDefaultColumns(table)
    });

    await knex.schema.createTable(tableNames.manga, (table) => {
        table.increments();
        table.string('title',255).notNullable();
        table.text('alt_names');
        table.text('cover_url').notNullable();
        table.text('year_of_release');
        table.string('status',255).notNullable();
        table.string('author',255);
        table.string('artist',255);
        table.string('reading_direction',255);
        table.text('description');
        references(table,tableNames.genre, true, 'genres');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.chapter, (table) => {
        table.increments();
        references(table,tableNames.manga);
        table.string('volume',255);
        table.string('chapter',255);
        table.string('title',255);
        table.text('img_urls');
        addDefaultColumns(table)
    });

    await knex.schema.createTable(tableNames.related_manga, (table) => {
        table.increments();
        references(table, tableNames.manga);
        references(table, tableNames.manga, false, 'related_manga')

    })


};

exports.down = async(knex) =>{
    await Promise.all(
        [
            tableNames.related_manga,
            tableNames.chapter,
            tableNames.manga,
            tableNames.genre
        ].map( (tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
