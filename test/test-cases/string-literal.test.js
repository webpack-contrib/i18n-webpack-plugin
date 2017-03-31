'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('string-literal', t => {
  const localization = {
    simple: 'simple',
  };

  processFile('string-literal.js', localization)
		.then(({file}) => {
  t.equal(require(file), 'simple');

  t.end();
})
		.catch(er => {
  console.error(er);
  t.end(er);
});
});
