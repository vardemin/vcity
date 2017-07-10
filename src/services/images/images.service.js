const hooks = require('./images.hooks');
const filters = require('./images.filters');

const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
var path = require('path');
var appDir = path.dirname(require.main.filename);
const blobStorage = fs(appDir + '/img');

module.exports = function () {
  const app = this;


  // Initialize our service with any options it requires
  app.use('/images',  // multer parses the file named 'uri'.
    // temporarely kept in memory
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    blobService({Model: blobStorage})
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('images');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
