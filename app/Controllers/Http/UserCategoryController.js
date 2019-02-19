'use strict';

const User = use('App/Models/User');

class UserCategoryController {
  async update ({ request, auth }) {
    const user = auth.user;
    const categoryIds = request.input('categories');

    await user.categories().sync(categoryIds);

    await user.load('categories');

    const { name, categories } = user.toJSON();

    return {
      name,
      categories: categories.map(category => category.id),
    };
  }
}

module.exports = UserCategoryController;
