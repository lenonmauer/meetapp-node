'use strict';

const moment = require('moment');

const Meetup = use('App/Models/Meetup');

class MeetupController {
  async index ({ request, auth }) {
    const { user } = auth;

    await user.load('categories');

    const now = moment().format('YYYY-MM-DD HH:mm');
    const userCategories = user.toJSON().categories.map(category => category.category_id);

    const enrollments = await Meetup.query()
      .innerJoin('subscriptions', 'subscriptions.meetup_id', 'meetups.id')
      .where('subscriptions.user_id', user.id)
      .where('meetups.date', '>', now)
      .orderBy('meetups.date', 'asc')
      .limit(3)
      .withCount('subscriptions')
      .fetch();

    const enrollmentsId = enrollments.toJSON().map(enrollment => enrollment.id);

    const next = await Meetup.query()
      .where('date', '>', now)
      .whereNotIn('id', enrollmentsId)
      .orderBy('date', 'asc')
      .limit(3)
      .withCount('subscriptions')
      .fetch();

    const recommended = await Meetup.query()
      .select('meetups.*')
      .innerJoin('meetup_categories', 'meetup_categories.meetup_id', 'meetups.id')
      .whereIn('meetup_categories.id', userCategories)
      .whereNotIn('meetups.id', enrollmentsId)
      .orderBy('date', 'asc')
      .groupBy('meetups.id')
      .limit(3)
      .withCount('subscriptions')
      .fetch();

    return {
      enrollments,
      next,
      recommended,
    };
  }

  async show ({ request }) {
    const meetup = await Meetup.find(request.params.id);

    return meetup;
  }

  async store ({ request, auth, response }) {
    const data = request.only(['title', 'description', 'photo_id', 'localization']);

    const now = moment().format('x');
    const dateInMilis = moment(request.input('date'), 'DD/MM/YYYY H:m').format('x');

    if (dateInMilis < now) {
      return response.status(400).send([
        {
          message: 'O campo data dever ser maior que a data de hoje.',
          field: 'date',
        },
      ]);
    }

    const date = moment(dateInMilis, 'x').format('YYYY-MM-DD HH:mm:ss');

    const meetup = await Meetup.create({ ...data, user_id: auth.user.id, date });

    const categories = request.input('categories').map(
      category_id => ({ category_id })
    );

    await meetup.categories().createMany(categories);

    await meetup.load('categories');

    return meetup;
  }
}

module.exports = MeetupController;
