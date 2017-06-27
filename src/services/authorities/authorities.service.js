// Initializes the `authorities` service on path `/authorities`
const createService = require('feathers-mongoose');
const createModel = require('../../models/authorities.model');
const hooks = require('./authorities.hooks');
const filters = require('./authorities.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'authorities',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/authorities', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authorities');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
