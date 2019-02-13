'use strict';

const Antl = use('Antl');

class Store {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:6',
    };
  }

  get messages () {
    return {
      'email.required': 'O campo E-mail é obrigatório.',
      'email.email': 'Informe um e-mail válido.',
      'password.required': 'O campo Senha é obrigatório.',
      'password.min': 'A senha deve conter no mínimo {{argument}} caracteres.',
    };
  }
}

module.exports = Store;
