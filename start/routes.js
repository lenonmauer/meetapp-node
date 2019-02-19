'use strict';

const Route = use('Route');

Route.post('/login', 'SessionController.store').validator('Session/Store');

Route.post('/users', 'UserController.store').validator('User/Store');

Route.get('/categories', 'CategoryController.index');

Route.get('/file/:id', 'FileController.show');

Route.group(() => {
  Route.get('/profile', 'UserController.show');
  Route.put('/users', 'UserController.update').validator('User/Update');

  Route.post('/upload', 'FileController.store').validator('File/Store');

  Route.put('/user-categories', 'UserCategoryController.update').validator('UserCategory/Update');

  Route.get('/meetups', 'MeetupController.index');
  Route.get('/meetups/:id', 'MeetupController.show');
  Route.post('/meetups', 'MeetupController.store').validator('Meetup/Store');

  Route.post('/subscriptions', 'SubscriptionController.store').validator('Subscription/Store');
}).middleware(['auth']);
