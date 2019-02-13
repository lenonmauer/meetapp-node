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
        .inTable('meetups');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories');
      table.timestamps();
    });
  }

  down () {
    this.drop('meetup_categories');
  }
}

module.exports = MeetupCategorySchema;
