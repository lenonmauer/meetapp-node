'use strict';

const Schema = use('Schema');

class UserCategorySchema extends Schema {
  up () {
    this.create('user_categories', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories');
      table.timestamps();
    });
  }

  down () {
    this.drop('user_categories');
  }
}

module.exports = UserCategorySchema;
