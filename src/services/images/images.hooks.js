const dauria = require('dauria');
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
//const { queryWithCurrentUser, restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');
const constants = require('../../constants');
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
      commonHooks.iff(hook=>!hook.params.secret, commonHooks.disallow()),
      function(hook) {
        if(hook.params.secret) {
          if(hook.params.secret!=constants.SECRET)
            commonHooks.disallow();
        }
      }
    ],
    patch: [
      authenticate('jwt'),
      commonHooks.iff(hook=>!hook.params.secret, commonHooks.disallow()),
      function(hook) {
        if(hook.params.secret) {
          if(hook.params.secret!=constants.SECRET)
            commonHooks.disallow();
        }
      }
    ],
    remove: [
      authenticate('jwt'),
      commonHooks.iff(hook=>!hook.params.secret, commonHooks.disallow()),
      function(hook) {
        if(hook.params.secret) {
          if(hook.params.secret!=constants.SECRET)
            commonHooks.disallow();
        }
      }
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(hook) {
        //hook.data._id = hook.result.id;
        return hook.app.service('photos').create({path: hook.result.id}, hook.params).then(data=> {
          logger.info(data);
          hook.result = data;
          return hook;
        })},],
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
