const users = require('./users/users.service.js');
const events = require('./events/events.service.js');
const photos = require('./photos/photos.service.js');
const institutions = require('./institutions/institutions.service.js');
const plans = require('./plans/plans.service.js');
const reviews = require('./reviews/reviews.service.js');
const meetings = require('./meetings/meetings.service.js');
const interests = require('./interests/interests.service.js');
const comments = require('./comments/comments.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(events);
  app.configure(photos);
  app.configure(institutions);
  app.configure(plans);
  app.configure(reviews);
  app.configure(meetings);
  app.configure(interests);
  app.configure(comments);
};
