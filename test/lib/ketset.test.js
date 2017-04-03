'use strict';

const {makeKeysetFn} = require('../../lib/keyset');
const test = require('tape');

test('falsy value -> undefined', t => {
  t.equal(makeKeysetFn()(), void 0);
  t.end();
});

test('truthy value -> should return provided keyset `foo`', t => {
  t.equal(makeKeysetFn(true)('foo'), 'foo');
  t.end();
});

test('`[name].[ext]` -> should return provided keyset `foo`', t => {
  t.equal(makeKeysetFn('[name].[ext]')('foo'), 'foo');
  t.end();
});

test('`[name]` -> should take the request\'s filename in case was omitted', t => {
  t.equal(makeKeysetFn('[name]')(null, 'lib/foo.js'), 'foo');
  t.equal(makeKeysetFn('[name]-[name]')(null, 'lib/foo.js'), 'foo-foo');
  t.end();
});

test('`[ext]` -> should take the request\'s extension in case was omitted', t => {
  t.equal(makeKeysetFn('[ext]')(null, 'lib/foo.js'), 'js');
  t.equal(makeKeysetFn('[ext]-[ext]')(null, 'lib/foo.js'), 'js-js');
  t.end();
});
