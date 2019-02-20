'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('User Controller');
const Factory = use('Factory');

const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');

beforeEach(async () => {
  await User.query().delete();
});

test('STORE / should create a new user', async ({ client }) => {
  const name = 'User test';
  const email = `email@test.com`;
  const password = 'secret_password';

  const data = {
    name,
    email,
    password,
    password_confirmation: password,
  };

  const response = await client.post('/users')
    .header('accept', 'application/json')
    .send(data)
    .end();

  response.assertStatus(200);

  response.assertJSONSubset({
    email,
    name,
  });
});

test('STORE / should not create a new user with a duplicated email', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const data = {
    name: 'User test',
    email: user.email,
    password: 'secret_password',
    password_confirmation: 'secret_password',
  };

  const response = await client.post('/users')
    .header('accept', 'application/json')
    .send(data)
    .end();

  response.assertStatus(400);

  response.assertJSONSubset([{
    message: 'Este e-mail está um uso. Informe outro.',
  }]);
});

test('STORE / should return validation errors', async ({ client }) => {
  const data = {};

  const response = await client.post('/users')
    .header('accept', 'application/json')
    .send(data)
    .end();

  response.assertStatus(400);
});

test('SHOW / should return user profile', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const category = await Factory
    .model('App/Models/Category')
    .create();

  user.categories().attach([category.id]);

  const response = await client.get('/profile')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  response.assertJSON({
    name: user.name,
    categories: [
      category.id,
    ],
  });
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

  user.categories().attach([category.id]);

  const data = {
    name: 'name test',
    categories: [category2.id],
    password: '123456',
    password_confirmation: '123456',
  };

  const response = await client.put('/users')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(200);

  response.assertJSON({
    name: data.name,
    categories: [
      category2.id,
    ],
  });
});

test('UPDATE / should return validation error', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const data = {};

  const response = await client.put('/users')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(400);
});
