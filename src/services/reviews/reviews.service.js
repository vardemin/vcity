// Initializes the `review` service on path `/review`
const createService = require('feathers-mongoose');
const createModel = require('../../models/reviews.model');
const hooks = require('./reviews.hooks');
const filters = require('./reviews.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'reviews',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/reviews', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('reviews');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
