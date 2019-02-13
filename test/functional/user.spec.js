'use strict';

const { test, trait, before } = use('Test/Suite')('User Controller');

const User = use('App/Models/User');

trait('Test/ApiClient');

before(async () => {
  await await User.query().delete();
});

test('should create a new user', async ({ client }) => {
  const username = 'User test';
  const email = `email@test.com`;
  const password = 'secret_password';

  const data = {
    username,
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
    username,
  });
});
