'use strict';

const {processFile, requireUncache} = require('./_setup');
const spy = require('spy');
const test = require('tape');

const constant = a => () => a;

const localization = {
  identityCall: {
    key: 'translated key with a call of a keyset custom fn',
  },
  'keyset-option': {
    key: 'translated key with defined keyset as a filename',
  },
  'keyset-option_js': {
    key: 'translated key with defined keyset as a filename + extension'
  },
  nested: {
    dictionary: {
      key: 'translated nested dictionary key',
    },
  },
};

test('keyset=[name]', t => {
  processFile('keyset-option.js', localization, {keyset: '[name]'})
    .then(({file}) => {
      const {A, B} = requireUncache(file);

      t.equal(A, 'translated key with defined keyset as a filename');
      t.equal(B, 'translated nested dictionary key');
      t.end();
    })
    .catch(er => t.end(er));
});

test('keyset=[name]_[ext]', t => {
  processFile('keyset-option.js', localization, {keyset: '[name]_[ext]'})
    .then(({file}) => {
      const {A, B} = requireUncache(file);

      t.equal(A, 'translated key with defined keyset as a filename + extension');
      t.equal(B, 'translated nested dictionary key');
      t.end();
    })
    .catch(er => t.end(er));
});

test('keyset=fn', t => {
  const keysetFn = spy(constant('identityCall'));

  processFile('keyset-option.js', localization, {keyset: keysetFn})
    .then(({file}) => {
      const {A, B} = requireUncache(file);

      t.ok(keysetFn.calls[0].calledWith(null), 'keysetFn should be called with `null`');
      t.ok(keysetFn.calls[1].calledWith('nested.dictionary'), 'keysetFn should be called with `nested.dictionary`');

      t.equal(A, 'translated key with a call of a keyset custom fn');
      t.equal(B, 'translated key with a call of a keyset custom fn');
      t.end();
    })
    .catch(er => t.end(er));
});
