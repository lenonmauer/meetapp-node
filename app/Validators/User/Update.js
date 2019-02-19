'use strict';

class Update {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      name: 'required',
      password: 'required|min:6|confirmed',
      categories: 'required|array',
      'categories.*': 'number',
    };
  }

  get messages () {
    return {
      'name.required': 'O campo Nome é obrigatório.',
      'password.required': 'O campo Senha é obrigatório.',
      'password.min': 'A senha deve conter no mínimo {{argument}} caracteres.',
      'password.confirmed': 'A confirmação da senha está incorreta.',
      'categories.required': 'O campo Preferências é obrigatório.',
      'categories.array': 'O valor do campo Preferências está incorreto.',
      'categories.*.number': 'O valor do campo Preferências está incorreto.',
    };
  }
}

module.exports = Update;
