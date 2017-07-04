const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), restrictToRoles({roles: ['admin','moderator']})],
    update: [authenticate('jwt'), restrictToRoles({roles: ['admin']})],
    patch: [authenticate('jwt'), restrictToRoles({roles: ['admin']})],
    remove: [authenticate('jwt'), restrictToRoles({roles: ['admin']})]
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
