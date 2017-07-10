const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { queryWithCurrentUser, restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');
const dauria = require('dauria');
const userSchema = {
  include:  {
    service: 'users',
    nameAs: 'user',
    parentField: 'user',
    childField: '_id'
  }
};
    
function ifAuthenticated (hook){
  if (hook.params.user) {
    commonHooks.populate({schema: userSchema});
  }
  else {
    commonHooks.discard('user');
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'),
      function(hook) {
        if (!hook.data.uri && hook.params.file){
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = {uri: uri};
        }
      },
      function(hook) {
        hook.app.service('images').create(hook.data, hook.params).then((hook,result)=>hook.data.path=result.id);
      },
      queryWithCurrentUser({as: 'user'})],
    update: [
      authenticate('jwt'), 
      restrictToRoles({
        roles: ['admin', 'moderator'],
        ownerField: 'user',
        owner: true 
      }),
      //commonHooks.iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id','user')]),
    ],
    patch: [
      authenticate('jwt'), restrictToRoles({
        roles: ['admin', 'moderator'],
        ownerField: 'user',
        owner: true 
      }),
      //commonHooks.iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id','user')]),
    ],
    remove: [
      commonHooks.iff(hook => !hook.params.user.roles.contains('admin'), commonHooks.disableMultiItemChange()),
      authenticate('jwt'), restrictToRoles({
        roles: ['admin', 'moderator'],
        ownerField: '_id',
        owner: true 
      })]
  },

  after: {
    all: [],
    find: [
      function (hook){
        if (hook.params.user) {
          commonHooks.populate({schema: userSchema});
        }
        else {
          commonHooks.discard('user');
        }
      }],
    get: [
      function (hook){
        if (hook.params.user) {
          commonHooks.populate({schema: userSchema});
        }
        else {
          commonHooks.discard('user');
        }
      }],
    create: [],
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
