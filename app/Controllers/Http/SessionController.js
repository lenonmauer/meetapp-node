'use strict';

const User = use('App/Models/User');

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all();
    let authResponse;

    try {
      authResponse = await auth.attempt(email, password);
    }
    catch (err) {
      return response.status(401).send({
        error: { message: 'Invalid credentials.' },
      });
    }

    const user = await User.findBy('email', email);
    const { first_login } = user;

    if (first_login) {
      user.first_login = false;
      await user.save();
    }

    return {
      token: authResponse.token,
      first_login,
    };
  }
}

module.exports = SessionController;
