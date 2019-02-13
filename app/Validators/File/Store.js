'use strict';

const Antl = use('Antl');

class Store {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      photo: 'required|file|file_types:image',
    };
  }

  get messages () {
    return Antl.list('validation');
  }
}

module.exports = Store;
