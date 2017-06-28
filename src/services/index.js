const users = require('./users/users.service.js');
const authorities = require('./authorities/authorities.service.js');
const event = require('./event/event.service.js');
const photos = require('./photos/photos.service.js');
const institutions = require('./institutions/institutions.service.js');
const plans = require('./plans/plans.service.js');
const review = require('./review/review.service.js');
const meetings = require('./meetings/meetings.service.js');
<<<<<<< HEAD
const interests = require('./interests/interests.service.js');
=======
const comments = require('./comments/comments.service.js');
>>>>>>> fa76c744ac0360c99bfab6b14ce8092c67954da7
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(authorities);
  app.configure(event);
  app.configure(photos);
  app.configure(institutions);
  app.configure(plans);
  app.configure(review);
  app.configure(meetings);
<<<<<<< HEAD
  app.configure(interests);
=======
  app.configure(comments);
>>>>>>> fa76c744ac0360c99bfab6b14ce8092c67954da7
};
