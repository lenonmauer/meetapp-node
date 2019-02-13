'use strict';

const Antl = use('Antl');

class Update {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      categories: 'required|array',
      'categories.*': 'number',
    };
  }

  get messages () {
    return {
      'categories.required': 'O campo Preferências é obrigatório.',
      'categories.array': 'O valor do campo Preferências está incorreto.',
      'categories.*.number': 'O valor do campo Preferências está incorreto.',
    };
  }
}

module.exports = Update;
