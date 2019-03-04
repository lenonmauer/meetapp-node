'use strict';

const Raven = require('raven');

const Config = use('Config');
const BaseExceptionHandler = use('BaseExceptionHandler');
const Env = use('Env');

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages);
    }

    if (Env.get('NODE_ENV') === 'development') {
      const Youch = use('Youch');

      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  async report (error, { request }) {
    if (Env.get('NODE_ENV') === 'production') {
      Raven.config(Config.get('services.sentry.dsn'));
      Raven.captureException(error);
    }
    else {
      console.log(error);
    }
  }
}

module.exports = ExceptionHandler;
