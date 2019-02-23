'use strict';

const { test, trait, beforeEach } = use('Test/Suite')('FileController');
const path = require('path');
const Factory = use('Factory');

const User = use('App/Models/User');
const File = use('App/Models/File');

trait('Test/ApiClient');
trait('Auth/Client');

beforeEach(async () => {
  await User.query().delete();
  await File.query().delete();
});

test('STORE / should upload a file', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const filepath = path.resolve(__dirname, '..', 'utils', 'upload', 'image.jpg');

  const response = await client.post('/upload')
    .loginVia(user, 'jwt')
    .attach('photo', filepath)
    .end();

  response.assertStatus(200);
});

test('STORE / should return validation error when uploaded file is not a image', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const filepath = path.resolve(__dirname, '..', 'utils', 'upload', 'text.txt');

  const response = await client.post('/upload')
    .loginVia(user, 'jwt')
    .attach('photo', filepath)
    .end();

  response.assertStatus(400);
});

test('STORE / should return validation error when no file was sent', async ({ client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create();

  const response = await client.post('/upload')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);
});
