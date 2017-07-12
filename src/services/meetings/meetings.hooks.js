const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');
const commonHooks = require('feathers-hooks-common');

const preventChanges = [
  commonHooks.disableMultiItemChange(),
  commonHooks.preventChanges('_id','priority')
];


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook){
        hook.params.query = {
          location: {
            $near: hook.params.user.location,
            $maxDistance: 30/6371
          }};
      }
    ],
    get: [],
    create: [
      function(hook){
        var institution = hook.app.service('institutions').get(hook.data.institution, hook.params);
        if(institution.owner!=hook.params.user.id) {
          if(!institution.responsible.contains(hook.params.user.id))
            if(!hook.params.user.roles.contains('admin') || !hook.params.user.roles.contains('moderator'))
              commonHooks.disallow();
        }
        hook.data.priority = institution.plan.priority;
      }
    ],
    update: [
      function(hook){
        if(hook.data.owner!=hook.params.user.id) {
          if(!hook.data.responsible.contains(hook.params.user.id)) {
            if(!hook.params.user.roles.contains('admin') || !hook.params.user.roles.contains('moderator'))
              commonHooks.disallow();
          }
          else preventChanges();
        }
        else preventChanges();
      }
    ],
    patch: [
      function(hook){
        if(hook.data.owner!=hook.params.user.id) {
          if(!hook.data.responsible.contains(hook.params.user.id)) {
            if(!hook.params.user.roles.contains('admin') || !hook.params.user.roles.contains('moderator'))
              commonHooks.disallow();
          }
          else preventChanges();
        }
        else preventChanges();
      }
    ],
    remove: [
      function(hook){
        if(hook.data.owner!=hook.params.user.id) {
          if(!hook.data.responsible.contains(hook.params.user.id)) {
            if(!hook.params.user.roles.contains('admin') || !hook.params.user.roles.contains('moderator'))
              commonHooks.disallow();
          }
          else preventChanges();
        }
        else preventChanges();
      }
    ]
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
