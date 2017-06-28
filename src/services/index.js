const users = require('./users/users.service.js');
const authorities = require('./authorities/authorities.service.js');
<<<<<<< HEAD
const photos = require('./photos/photos.service.js');
=======
const institutions = require('./institutions/institutions.service.js');
const plans = require('./plans/plans.service.js');
const review = require('./review/review.service.js');
>>>>>>> d2a1bd6af323c20abfeb0b93e3ab4c1f1b63824e
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(authorities);
<<<<<<< HEAD
  app.configure(photos);
=======
  app.configure(institutions);
  app.configure(plans);
  app.configure(review);
>>>>>>> d2a1bd6af323c20abfeb0b93e3ab4c1f1b63824e
};
