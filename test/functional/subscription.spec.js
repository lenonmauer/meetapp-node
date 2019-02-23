'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('SubscriptionController');
const Factory = use('Factory');

const User = use('App/Models/User');
const Meetup = use('App/Models/Meetup');
const File = use('App/Models/File');

trait('Test/ApiClient');
trait('Auth/Client');

beforeEach(async () => {
  await Meetup.query().delete();
  await User.query().delete();
  await File.query().delete();
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
