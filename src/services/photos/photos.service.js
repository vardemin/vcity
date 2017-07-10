// Initializes the `photos` service on path `/photos`
const createService = require('feathers-mongoose');
const createModel = require('../../models/photos.model');
const hooks = require('./photos.hooks');
const filters = require('./photos.filters');

const multer = require('multer');
const multipartMiddleware = multer();


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'photos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/photos', // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('photos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
