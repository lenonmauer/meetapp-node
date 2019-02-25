'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('SessionController');
const Factory = use('Factory');
const truncateDB = require('../utils/truncate');

trait('Test/ApiClient');

beforeEach(async () => {
  await truncateDB();
});

test('STORE / should return the auth token', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create({
      password: '123123',
    });

  const data = {
    email: user.email,
    password: '123123',
  };

  const response = await client.post('/login')
    .send(data)
    .end();

  response.assertStatus(200);
});
