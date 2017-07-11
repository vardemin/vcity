const dauria = require('dauria');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { queryWithCurrentUser, restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');
const logger = require('winston');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      function(hook) {
        if (!hook.data.uri && hook.params.file){
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = {uri: uri};
        }
      },
    ],
    update: [
      authenticate('jwt'),
      function(hook) {
        if(hook.data.secret) {
          
        }
      },
      commonHooks.iff(hook=>!hook.data.secret, commonHooks.disallow()),

    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(hook) {
        hook.data._id = hook.result.id;
        hook.app.service('photos').create(hook.data, hook.params).then(data=>logger.info(data));
      },],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
