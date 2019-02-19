'use strict';

const Schema = use('Schema');

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments();
      table.string('type').notNullable();
      table.string('name').notNullable();
      table.string('path');
      table.timestamps();
    });
  }

  down () {
    this.drop('files');
  }
}

module.exports = FileSchema;
