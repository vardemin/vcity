const assert = require('assert');
const app = require('../../src/app');

describe('\'authorities\' service', () => {
  it('registered the service', () => {
    const service = app.service('authorities');

    assert.ok(service, 'Registered the service');
  });
});
