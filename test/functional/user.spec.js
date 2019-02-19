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
