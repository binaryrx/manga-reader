
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
        table.increments().notNullable();
        table.string('name',254).notNullable().unique();
        addDefaultColumns(table)
    });

    await knex.schema.createTable(tableNames.manga, (table) => {
        table.increments();
        table.string('title',254).notNullable();
        table.text('alt_names');
        table.text('cover_url').notNullable();
        table.string('year_of_release',254);
        table.string('status',254).notNullable();
        table.string('author',254);
        table.string('artist',254);
        table.string('reading_direction',254);
        table.text('description');
        
        // references(table,tableNames.genre, true, 'genres');
        table.text('genres');
        addDefaultColumns(table);
    });
    
    await knex.schema.createTable(tableNames.chapter, (table) => {
        table.increments();
        references(table,tableNames.manga);
        table.string('volume',254);
        table.string('chapter',254);
        table.string('title',254);
        table.text('img_urls');
        addDefaultColumns(table)
    });

    // await knex.schema.createTable(tableNames.related_manga, (table) => {
    //     table.increments();
    //     references(table, tableNames.manga);
    //     references(table, tableNames.manga, false, 'related_manga')
    // });

    // await knex.schema.createTable(tableNames.related_manga_chapter, (table) => {
    //     table.increments();
    //     references(table,tableNames.manga);
    //     references(table,tableNames.chapter);
    // });

    await knex.schema.createTable(tableNames.user, (table) => {
        table.increments().notNullable();
        table.string('email',254).notNullable().unique();
        table.string('name').notNullable();
        table.string('password',127).notNullable();
        table.datetime('last_login');
        references(table,tableNames.manga, false, 'favorite_mangas')
        references(table,tableNames.manga, false, 'completed_mangas')
        references(table,tableNames.manga, false, 'reading_mangas')
        addDefaultColumns(table);
    });

};

exports.down = async(knex) =>{
    await Promise.all(
        [
            tableNames.user,
            // tableNames.related_manga_chapter,
            // tableNames.related_manga,
            tableNames.chapter,
            tableNames.manga,
            tableNames.genre
        ].map( (tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
