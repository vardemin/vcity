const users = require('./users/users.service.js');
const authorities = require('./authorities/authorities.service.js');
const photos = require('./photos/photos.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(authorities);
  app.configure(photos);
};
