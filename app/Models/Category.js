'use strict';

const Model = use('Model');

class Category extends Model {
  static get createdAtColumn () {
    return false;
  }

  static get updatedAtColumn () {
    return false;
  }
}

module.exports = Category;
