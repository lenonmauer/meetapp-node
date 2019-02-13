'use strict';

const Model = use('Model');

class MeetupCategory extends Model {
  category () {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = MeetupCategory;
