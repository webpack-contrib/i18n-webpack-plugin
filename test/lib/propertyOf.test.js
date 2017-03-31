'use strict';

const propertyOf = require('../../lib/propertyOf');
const test = require('tape');

test('should return a value of `key` from `dictionary`', t => {
  const dictionary = {key: 1, 'nested.key': 2};

  t.equal(propertyOf(dictionary)('key'), 1);
  t.equal(propertyOf(dictionary)('nested.key'), 2);
  t.equal(propertyOf()('key'), void 0);
  t.end();
});

test('should return a value of a nested `key` from `dictionary`', t => {
  const dictionary = {
    scope: {
      foo: {
        bar: 'yo',
      },
    },
  };

  t.equal(propertyOf(dictionary)('bar', 'scope.foo'), 'yo');
  t.equal(propertyOf(dictionary)('bar', 'scope'), void 0);
  t.equal(propertyOf(dictionary)('bar'), void 0);
  t.end();
});
