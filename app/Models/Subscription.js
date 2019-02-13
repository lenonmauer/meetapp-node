'use strict';

const Model = use('Model');

class Subscription extends Model {
  static boot () {
    super.boot();
    this.addHook('afterCreate', 'SubscriptionHook.sendNewSubscriptionMail');
  }

  user () {
    return this.belongsTo('App/Models/User');
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup');
  }
}

module.exports = Subscription;
