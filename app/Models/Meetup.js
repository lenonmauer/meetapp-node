'use strict';

const Model = use('Model');
const Env = use('Env');

class Meetup extends Model {
  static get computed () {
    return ['photo_url'];
  }

  static get dates () {
    return super.dates.concat(['date']);
  }

  static castDates (field, value) {
    if (field === 'date') {
      return value.format('DD/MM/YYYY HH:mm');
    }

    return super.formatDates(field, value);
  }

  categories () {
    return this.belongsToMany('App/Models/Category').pivotModel('App/Models/MeetupCategory');
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
