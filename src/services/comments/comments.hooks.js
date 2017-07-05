const { authenticate, queryWithCurrentUser, restrictToRoles } = require('feathers-authentication').hooks;
const { when, iff, populate, disallow } = require('feathers-hooks-common');

const populateSchema = {
  include: {
    service: 'comments',
    nameAs: 'comments',
    parentField: '_id',
    childField: 'postId'
  }
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [queryWithCurrentUser()],
    update: [
      iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id')]),
      hooks.restrictToRoles({
        roles: ['admin', 'moderator'],
        owner: true 
      })],
    patch: [
      iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id')]),
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
    find: [],
    get: [],
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
