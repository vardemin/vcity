const { authenticate, associateCurrentUser, restrictToRoles } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [associateCurrentUser],
    update: [restrictToRoles({
      roles: ['admin', 'moderator']
    })],
    patch: [
      restrictToRoles({
        roles: ['admin', 'moderator']
      })
    ],
    remove: [
      restrictToRoles({
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
