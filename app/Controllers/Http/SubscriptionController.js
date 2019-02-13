'use strict';

const Subscription = use('App/Models/Subscription');

class SubscriptionController {
  async store ({ request, auth }) {
    const data = {
      meetup_id: request.input('meetup_id'),
      user_id: auth.user.id,
    };

    const subscription = await Subscription.create(data);

    return subscription;
  }
}

module.exports = SubscriptionController;
