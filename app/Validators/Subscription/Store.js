'use strict';

const Antl = use('Antl');

class Store {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      meetup_id: 'required|above:0|exists:meetups',
    };
  }

  get messages () {
    return Antl.list('validation');
  }
}

module.exports = Store;
