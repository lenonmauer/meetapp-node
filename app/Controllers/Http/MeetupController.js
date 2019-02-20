'use strict';

const moment = require('moment');

const Meetup = use('App/Models/Meetup');

class MeetupController {
  async index ({ request, auth }) {
    const search = request.input('search', '');

    const { user } = auth;

    await user.load('categories');

    const now = moment().format('YYYY-MM-DD HH:mm');
    const userCategories = user.toJSON().categories.map(category => category.id);

    const subscriptions = await Meetup.query()
      .distinct()
      .select('meetups.*')
      .innerJoin('subscriptions', 'subscriptions.meetup_id', 'meetups.id')
      .where('subscriptions.user_id', user.id)
      .where('meetups.date', '>', now)
      .whereRaw(`title LIKE '%${search}%'`)
      .orderBy('meetups.date', 'asc')
      .limit(6)
      .withCount('subscriptions')
      .fetch();

    const subscriptionsId = subscriptions.toJSON().map(subscription => subscription.id);

    const next = await Meetup.query()
      .where('date', '>', now)
      .whereNotIn('id', subscriptionsId)
      .whereRaw(`title LIKE '%${search}%'`)
      .orderBy('date', 'asc')
      .limit(6)
      .withCount('subscriptions')
      .fetch();

    const recommended = await Meetup.query()
      .select('meetups.*')
      .innerJoin('meetup_categories', 'meetup_categories.meetup_id', 'meetups.id')
      .whereIn('meetup_categories.id', userCategories)
      .whereNotIn('meetups.id', subscriptionsId)
      .where('meetups.date', '>', now)
      .whereRaw(`title LIKE '%${search}%'`)
      .orderBy('date', 'asc')
      .groupBy('meetups.id')
      .limit(6)
      .withCount('subscriptions')
      .fetch();

    const mergeCount = meetups => meetups.toJSON().map(meetup => ({
      ...meetup,
      members_count: meetup.__meta__.subscriptions_count,
    }));

    return {
      subscriptions: mergeCount(subscriptions),
      next: mergeCount(next),
      recommended: mergeCount(recommended),
    };
  }

  async show ({ request, auth }) {
    const meetup = await Meetup.query()
      .where('id', request.params.id)
      .withCount('subscriptions')
      .first();

    const subscript = await meetup.subscriptions()
      .where('user_id', auth.user.id)
      .first();

    const data = meetup.toJSON();

    return {
      ...data,
      subscript: !!subscript,
      members_count: data.__meta__.subscriptions_count,
    };
  }

  async store ({ request, auth, response }) {
    const data = request.only(['title', 'description', 'photo_id', 'localization']);

    const now = moment().format('x');
    const dateInMilis = moment(request.input('date'), 'DD/MM/YYYY H:m').format('x');

    if (Number(dateInMilis) < Number(now)) {
      return response.status(400).send([
        {
          message: 'O campo data dever ser maior que a data de hoje.',
          field: 'date',
        },
      ]);
    }

    const categoryIds = request.input('categories');
    const date = moment(dateInMilis, 'x').format('YYYY-MM-DD HH:mm:ss');
    const meetup = await Meetup.create({ ...data, user_id: auth.user.id, date });

    await meetup.categories().attach(categoryIds);

    await meetup.load('categories');

    return meetup;
  }
}

module.exports = MeetupController;
