const users = require('./users/users.service.js');
const authorities = require('./authorities/authorities.service.js');
const institutions = require('./institutions/institutions.service.js');
const plans = require('./plans/plans.service.js');
const review = require('./review/review.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(authorities);
  app.configure(institutions);
  app.configure(plans);
  app.configure(review);
};
