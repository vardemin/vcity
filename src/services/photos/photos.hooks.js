const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { queryWithCurrentUser, restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');

const userSchema = {
  include:  {
      service: 'users',
      nameAs: 'user',
      parentField: 'user',
      childField: '_id'
    }
}
    
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
      queryWithCurrentUser({as: 'user' }),
      function(hook) {
        hook.app.service('images').create({uri: hook.data.uri}).then(result=>hook.data._id=result._id);
      }],
    update: [
      authenticate('jwt'), 
      restrictToRoles({
        roles: ['admin', 'moderator'],
        ownerField: '_id',
        owner: true 
      }),
      //commonHooks.iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id','user')]),
      ],
    patch: [
      authenticate('jwt'), restrictToRoles({
        roles: ['admin', 'moderator'],
        ownerField: '_id',
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
      function ifAuthenticated (hook){
          if (hook.params.user) {
            commonHooks.populate({schema: userSchema});
          }
          else {
            commonHooks.discard('user');
          }
      }],
    get: [
      function ifAuthenticated (hook){
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
