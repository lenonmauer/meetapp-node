'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('MeetupController');
const Factory = use('Factory');
const truncateDB = require('../utils/truncate');

trait('Test/ApiClient');

beforeEach(async () => {
  await truncateDB();
});

test('SHOW / should return meetup data by id', async ({ client }) => {
  const user = await Factory
    .model('App/Models/Meetup')
    .create();

  const categories = await Factory
    .model('App/Models/Category')
    .createMany(4);
});
