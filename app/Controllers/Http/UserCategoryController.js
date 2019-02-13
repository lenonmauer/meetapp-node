'use strict';

const User = use('App/Models/User');

class UserCategoryController {
  async update ({ request, auth }) {
    const user = auth.user;

    const categoriesRecords = request.input('categories').map(
      category_id => ({ category_id })
    );

    await user.categories().delete();
    await user.categories().createMany(categoriesRecords);

    await user.load('categories');

    const { username, categories } = user.toJSON();

    return {
      username,
      categories: categories.map(category => category.category_id),
    };
  }
}

module.exports = UserCategoryController;
