'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('missing-key', t => {
  const localization = {};

  processFile('missing-key.js', localization, {failOnMissing: false, keyset: true})
		.then(({file}) => {
  t.deepEqual(require(file), {
    a: 'simple',
    b: '4 days',
    c: '5 nights',
  });

  t.end();
})
		.catch(er => {
  console.error(er);
  t.end(er);
});
});
