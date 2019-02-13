'use strict';

const Meetup = use('App/Models/Meetup');

class SearchController {
  async index ({ request }) {
    const meetups = await Meetup.all();

    return meetups;
  }
}

module.exports = SearchController;
