const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const { populate, iff } = require('feathers-hooks-common');

const institutionSchema = {
  include: {
    service: 'institutions',
    nameAs: 'institution',
    parentField: 'institution',
    childField: '_id'
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [hooks.queryWithCurrentUser()],
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
    find: [
      function(hook) {
        hook.params.query = {
          $populate: ["userId","photo","comments"]
      };}],
    get: [
      function(hook) {
        hook.params.query = {
          $populate: ["userId","photo","comments"]
      };}],
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
