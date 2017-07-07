const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');
const { populate, iff } = require('feathers-hooks-common');
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [restrictToRoles({roles: ['admin','moderator']})],
    update: [
      iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id'),
        commonHooks.preventChanges('owner'), commonHooks.preventChanges('responsible'), commonHooks.preventChanges('plan')]),
      restrictToRoles({
        roles: ['admin','moderator'],
        ownerField: 'responsible',
        owner: true
      })],
    patch: [
      iff(hook => !hook.params.user.roles.contains('admin'), [commonHooks.disableMultiItemChange(), commonHooks.preventChanges('_id'),
        commonHooks.preventChanges('owner'), commonHooks.preventChanges('responsible'), commonHooks.preventChanges('plan')]),
      restrictToRoles({
        roles: ['admin','moderator'],
        ownerField: 'owner',
        owner: true
      })],
    remove: [restrictToRoles({
      roles: ['admin','moderator'],
      ownerField: 'owner',
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
