'use strict';

const Schema = use('Schema');

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments();
      table.string('name', 80).notNullable();
    });
  }

  down () {
    this.drop('categories');
  }
}

module.exports = CategorySchema;
