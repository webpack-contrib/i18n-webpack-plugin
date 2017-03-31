'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('template-literal', t => {
  const localization = {
    '{number} days': ['{number} days'],
  };

  processFile('template-literal.js', localization)
		.then(({file}) => {
  t.equal(require(file), '4 days');

  t.end();
})
		.catch(er => {
  console.error(er);
  t.end(er);
});
});
