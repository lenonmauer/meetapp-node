'use strict';

const Category = use('App/Models/Category');

class CategoryController {
  async index () {
    const categories = await Categdory.all();

    return categories;
  }
}

module.exports = CategoryController;
