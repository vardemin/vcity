const { authenticate, associateCurrentUser, restrictToRoles } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [associateCurrentUser],
    update: [hooks.restrictToRoles({
      roles: ['admin', 'moderator']
    })],
    patch: [
      hooks.restrictToRoles({
        roles: ['admin', 'moderator']
      })
    ],
    remove: [
      hooks.restrictToRoles({
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
