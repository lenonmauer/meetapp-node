'use strict';

const Antl = use('Antl');

class Store {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|min:6',
    };
  }

  get messages () {
    return {
      'name.required': 'O campo Nome é obrigatório.',
      'email.required': 'O campo E-mail é obrigatório.',
      'password.required': 'O campo Senha é obrigatório.',
      'email.email': 'Informe um e-mail válido.',
      'email.unique': 'Este e-mail está um uso. Informe outro.',
      'password.min': 'A senha deve conter no mínimo {{argument}} caracteres.',
    };
  }
}

module.exports = Store;
