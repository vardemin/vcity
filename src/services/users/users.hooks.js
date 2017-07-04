const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToRoles, restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;
const populate = require('feathers-populate-hook');

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
    find: [ authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [ hashPassword() ],
    update: [ restrictToRoles(
      {
        roles: ['admin', 'moderator'],
        ownerField: '_id',
        owner: true 
      }), hashPassword() ],
    patch: [authenticate('jwt'), restrictToRoles({
      roles: ['admin', 'moderator'],
      ownerField: '_id',
      owner: true
    }), hashPassword(), function(hook) {
      hook.params.query = {
        $populate: "interests"
      };
      // if (hook.data.interests)
      //   hook.data.interests.forEach(function(element) {
      //     element = mongoose.Schema.Types.ObjectId(element.toString());
      //   }, this);
    } ],
    remove: [ authenticate('jwt'), restrictToRoles({
      roles: ['admin'],
      ownerField: '_id',
      owner: false })]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password', 'location')
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
