'use strict';

const User = use('App/Models/User');

class UserController {
  async show ({ auth }) {
    await auth.user.load('categories');

    const { username, categories } = auth.user.toJSON();

    return {
      username,
      categories: categories.map(category => category.category_id),
    };
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async update ({ request, auth }) {
    const userData = request.only(['username', 'password']);
    const user = auth.user;

    user.merge(userData);

    await user.save();

    const categoryRecords = request.input('categories').map(
      category_id => ({ category_id })
    );

    await user.categories().delete();
    await user.categories().createMany(categoryRecords);

    await user.load('categories');

    const { username, categories } = user.toJSON();

    return {
      username,
      categories: categories.map(category => category.category_id),
    };
  }
}

module.exports = UserController;
