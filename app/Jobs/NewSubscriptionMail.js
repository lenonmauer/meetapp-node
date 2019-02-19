'use strict';

const Mail = use('Mail');

class NewSubscriptionMail {
  static get concurrency () {
    return 1;
  }

  static get key () {
    return 'NewSubscriptionMail-job';
  }

  async handle ({ title, email, name, date }) {
    await Mail.send(
      ['emails.new_subscription'],
      {
        name,
        title,
        date,
      },
      message => {
        message
          .to(email)
          .from('meetapp@meetapp.com', 'Meetapp')
          .subject('Inscrição no meetup');
      }
    );
  }
}

module.exports = NewSubscriptionMail;
