'use strict';

const Factory = use('Factory');

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: data.password || faker.string({ length: 8 }),
  };
});

Factory.blueprint('App/Models/Category', async (faker, i, data) => {
  return {
    name: faker.name(),
  };
});

Factory.blueprint('App/Models/File', async (faker, i, data) => {
  return {
    type: 'image/jpg',
    name: 'file.jpg',
    path: 'file location',
  };
});

Factory.blueprint('App/Models/Meetup', async (faker, i, data) => {
  return {
    title: faker.name(),
    description: faker.string({ length: 40 }),
    date: faker.date(),
    localization: faker.name(),
  };
});
