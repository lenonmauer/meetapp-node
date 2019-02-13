'use strict';

const Schema = use('Schema');

class SubscriptionSchema extends Schema {
  up () {
    this.create('subscriptions', (table) => {
      table.increments();
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down () {
    this.drop('subscriptions');
  }
}

module.exports = SubscriptionSchema;
