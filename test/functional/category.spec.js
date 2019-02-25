'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('CategoryController');
const Factory = use('Factory');
const truncateDB = require('../utils/truncate');

trait('Test/ApiClient');

beforeEach(async () => {
  await truncateDB();
});

test('INDEX / should return an array of categories', async ({ client, assert }) => {
  await Factory
    .model('App/Models/Category')
    .createMany(5);

  const response = await client.get('/categories').end();

  response.assertStatus(200);

  assert.equal(response._res.body.length, 5);
});
