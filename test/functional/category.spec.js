'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('CategoryController');
const Factory = use('Factory');

const Category = use('App/Models/Category');

trait('Test/ApiClient');

beforeEach(async () => {
  await Category.query().delete();
});

test('INDEX / should return an array of categories', async ({ client, assert }) => {
  await Factory
    .model('App/Models/Category')
    .createMany(5);

  const response = await client.get('/categories').end();

  response.assertStatus(200);

  assert.equal(response._res.body.length, 5);
});
