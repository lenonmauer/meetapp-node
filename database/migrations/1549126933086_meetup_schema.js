'use strict';

const Schema = use('Schema');

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', (table) => {
      table.increments();
      table.string('title', 80).notNullable();
      table.string('description', 80).notNullable();
      table.datetime('date').notNullable();
      table
        .integer('photo_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('localization', 80).notNullable();
      table.timestamps();
    });
  }

  down () {
    this.drop('meetups');
  }
}

module.exports = MeetupSchema;
