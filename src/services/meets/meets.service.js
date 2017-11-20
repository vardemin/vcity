// Initializes the `meets` service on path `/meets`
const createService = require('feathers-mongoose');
const createModel = require('../../models/meets.model');
const hooks = require('./meets.hooks');
const filters = require('./meets.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'meets',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/meets', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('meets');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
