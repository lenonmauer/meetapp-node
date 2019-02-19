'use strict';

const Factory = use('Factory');

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string({ length: 8 }),
  };
});

Factory.blueprint('App/Models/Category', async (faker, i, data) => {
  return {
    name: faker.name(),
  };
});
