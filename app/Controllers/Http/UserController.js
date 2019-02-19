'use strict';

const User = use('App/Models/User');

class UserController {
  async show ({ auth }) {
    await auth.user.load('categories');

    const { name, categories } = auth.user.toJSON();

    return {
      name,
      categories: categories.map(category => category.id),
    };
  }

  async store ({ request }) {
    const data = request.only(['name', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async update ({ request, auth }) {
    const userData = request.only(['name', 'password']);
    const categoryIds = request.input('categories');
    const user = auth.user;

    user.merge(userData);

    await user.save();

    await user.categories().sync(categoryIds);

    await user.load('categories');

    const { name, categories } = user.toJSON();

    return {
      name,
      categories: categories.map(category => category.id),
    };
  }
}

module.exports = UserController;
