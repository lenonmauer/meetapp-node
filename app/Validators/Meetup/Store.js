'use strict';

const Antl = use('Antl');

class Store {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      title: 'required',
      description: 'required',
      photo_id: 'required|above:0|exists:files',
      localization: 'required',
      date: 'required|datetime-br',
      categories: 'required|array',
      'categories.*': 'number',
    };
  }

  get messages () {
    return {
      'title.required': 'O campo Título é obrigatório.',
      'description.required': 'O campo Descrição é obrigatório.',
      'photo_id.required': 'O campo Imagem é obrigatório.',
      'photo_id.exists': 'O valor do campo Imagem é inválido.',
      'date.required': 'O campo Data e Hora é obrigatório.',
      'date.datetime-br': 'O valor campo Data e Hora é inválido.',
      'localization.required': 'O campo Localização é obrigatório.',
      'categories.required': 'O campo Temas do meetup é obrigatório.',
      'categories.array': 'O valor do campo Temas do meetup está incorreto.',
      'categories.*.number': 'O valor do campo Temas do meetup está incorreto.',
    };
  }
}

module.exports = Store;
