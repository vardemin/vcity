const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const { populate, iff } = require('feathers-hooks-common');

const popSchema = {
  include: [
  {
    service: 'comments',
    nameAs: 'comments',
    parentField: '_id',
    childField: 'event'
  },
  {
    service: 'users',
    nameAs: 'user',
    parentField: 'userId',
    childField: '_id'
  },
  {
    service: 'photos',
    nameAs: 'photos',
    parentField: 'photos',
    childField: '_id'
  }
  ]
};

const around = function(hook) {
  hook.params.query = {
    loc: {
        $near: hook.params.user.location,
        $maxDistance: 1/6371
      }
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [around(hook)],
    get: [],
    create: [hooks.queryWithCurrentUser()],
    update: [
      iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id'),
        commonHooks.preventChanges('userId')]),
      hooks.restrictToRoles({
        roles: ['admin', 'moderator'],
        owner: true 
      })],
    patch: [ 
      iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id'),
        commonHooks.preventChanges('userId')]),
      hooks.restrictToRoles({
        roles: ['admin', 'moderator'],
        owner: true 
      })],
    remove: [hooks.restrictToRoles({
        roles: ['admin', 'moderator'],
        owner: true 
      })]
  },

  after: {
    all: [],
    find: [populate({schema: popSchema})],
    get: [populate({schema: popSchema})],
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
