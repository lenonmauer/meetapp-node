'use strict';

const Meetup = use('App/Models/Meetup');

class SearchController {
  async index ({ request }) {
    const search = request.input('search', '');

    const meetups = await Meetup.query()
      .whereRaw(`title LIKE '%${search}%'`)
      .fetch();

    return meetups;
  }
}

module.exports = SearchController;
