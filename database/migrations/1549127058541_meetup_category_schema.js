'use strict';

const Schema = use('Schema');

class MeetupCategorySchema extends Schema {
  up () {
    this.create('meetup_categories', (table) => {
      table.increments();
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down () {
    this.drop('meetup_categories');
  }
}

module.exports = MeetupCategorySchema;
