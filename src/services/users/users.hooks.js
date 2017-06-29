const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), commonHooks.discard('password','location')],
    get: [authenticate('jwt'), commonHooks.discard('password','location')],
    create: [ hashPassword() ],
    update: [ restrictToRoles(
      {
        roles: ['admin', 'moderator'],
        ownerField: '_id',
        owner: true 
      }), hashPassword() ],
    patch: [ restrictToRoles({
      roles: ['admin', 'moderator'],
      ownerField: '_id',
      owner: true
    }), hashPassword() ],
    remove: [ restrictToRoles({
      roles: ['admin'],
      ownerField: '_id',
      owner: false })]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
