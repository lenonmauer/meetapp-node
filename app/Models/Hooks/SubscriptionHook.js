'use strict';

const Kue = use('Kue');
const Job = use('App/Jobs/NewSubscriptionMail');

const SubscriptionHook = exports = module.exports = {};

SubscriptionHook.sendNewSubscriptionMail = async (subscriptionInstance) => {
  const meetup = await subscriptionInstance.meetup().fetch();
  const user = await subscriptionInstance.user().fetch();

  const { title, date } = meetup.toJSON();
  const { email, name } = user;

  const jobData = { title, date, email, name };
  const jobConfig = {
    attempts: 2,
  };

  Kue.dispatch(Job.key, jobData, jobConfig);
};
