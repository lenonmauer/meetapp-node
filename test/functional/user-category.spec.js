'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('UserCategory Controller');
const Factory = use('Factory');

const User = use('App/Models/User');
const Category = use('App/Models/Category');

trait('Test/ApiClient');
trait('Auth/Client');

beforeEach(async () => {
  await User.query().delete();
  await Category.query().delete();
});

test('UPDATE / should update user profile', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const category = await Factory
    .model('App/Models/Category')
    .create();

  const category2 = await Factory
    .model('App/Models/Category')
    .create();

  const data = {
    categories: [category.id, category2.id],
  };

  const response = await client.put('/user-categories')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(200);

  response.assertJSON({
    name: user.name,
    categories: [
      category.id, category2.id,
    ],
  });
});

test('UPDATE / should return validation error when no categories was sent', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const data = {
    categories: [],
  };

  const response = await client.put('/user-categories')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(400);
});
