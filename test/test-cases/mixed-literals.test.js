'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('mixed-literals', t => {
  const localization = {
    simple: 'simple',
    '{bb} days': ['{bb} days'],
    '{cc} nights': ['{cc} nights'],
  };

  processFile('mixed-literals.js', localization)
    .then(({file}) => {
      t.deepEqual(require(file), {
        a: 'simple',
        b: '4 days',
        c: '5 nights',
      });

      t.end();
    })
    .catch(er => t.end(er));
});
