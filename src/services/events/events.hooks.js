const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');

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
    update: [hooks.restrictToRoles({
        roles: ['admin', 'moderator'],
        owner: true 
      })],
    patch: [ hooks.restrictToRoles({
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
          $populate: "institution"
      };}],
    get: [
      function(hook) {
        hook.params.query = {
          $populate: "institution"
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
