// Initializes the `institutions` service on path `/institutions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/institutions.model');
const hooks = require('./institutions.hooks');
const filters = require('./institutions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'institutions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/institutions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('institutions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
