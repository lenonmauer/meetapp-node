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
        .inTable('users')
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
    this.drop('user_categories');
  }
}

module.exports = UserCategorySchema;
