'use strict';

const Schema = use('Schema');

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments();
      table.string('type', 80).notNullable();
      table.string('name', 80).notNullable();
      table.string('path', 255);
      table.timestamps();
    });
  }

  down () {
    this.drop('files');
  }
}

module.exports = FileSchema;
