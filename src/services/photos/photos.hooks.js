const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { associateCurrentUser, restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');
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
    create: [
      authenticate('jwt'),
      associateCurrentUser({as: 'user'})],
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
