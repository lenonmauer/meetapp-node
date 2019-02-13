'use strict';

const Model = use('Model');

class UserCategory extends Model {
  category () {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = UserCategory;
