const test = require('node:test');
const assert = require('node:assert/strict');
const _ = require('lodash');
test('reads a nested property', () => assert.equal(_.get({ user: { name: 'Ada' } }, 'user.name'), 'Ada'));
