'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('SubscriptionController');
const Factory = use('Factory');
const truncateDB = require('../utils/truncate');

trait('Test/ApiClient');
trait('Auth/Client');

beforeEach(async () => {
  await truncateDB();
});

test('STORE / should subscribe user into meetup', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const meetup = await Factory
    .model('App/Models/Meetup')
    .create();

  const data = {
    meetup_id: meetup.id,
  };

  const response = await client.post('/subscriptions')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(200);
});

test('STORE / should return validation error when meetup is invalid', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const data = {
    meetup_id: 2,
  };

  const response = await client.post('/subscriptions')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(400);
});
