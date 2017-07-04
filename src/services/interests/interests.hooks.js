const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), restrictToRoles({roles: ['admin']})],
    update: [authenticate('jwt'), restrictToRoles({roles: ['admin','moderator']})],
    patch: [authenticate('jwt'), restrictToRoles({roles: ['admin','moderator']})],
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
