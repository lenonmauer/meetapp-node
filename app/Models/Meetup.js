'use strict';

const Model = use('Model');
const Env = use('Env');

class Meetup extends Model {
  static get computed () {
    return ['photo_url'];
  }

  categories () {
    return this.hasMany('App/Models/MeetupCategory');
  }

  subscriptions () {
    return this.hasMany('App/Models/Subscription');
  }

  getPhotoUrl ({ photo_id }) {
    return photo_id
      ? `${Env.get('APP_URL')}/file/${photo_id}`
      : null;
  }
}

module.exports = Meetup;
