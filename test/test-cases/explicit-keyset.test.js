'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('explicit-keyset', t => {
  const localization = {
    foo: {
      bar: 'translated bar',
    },
  };

  processFile('explicit-keyset.js', localization, {keyset: true})
		.then(({file}) => {
  t.equal(require(file), 'translated bar');

  t.end();
})
		.catch(er => {
  console.error(er);
  t.end(er);
});
});
