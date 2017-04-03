'use strict';

const {processFile, requireUncache} = require('./_setup');
const test = require('tape');

const localization = {};

test('should throw exception if `failOnMissing=true`', t => {
  processFile('missing-localization.js', localization, {failOnMissing: true, hideMessage: false})
    .then(() => {
      throw new Error('Should respect `failOnMissing`=`true` and throw an exception');
    })
    .catch(er => {
      if (er.name === 'MissingLocalizationError') {
        t.pass('caught MissingLocalizationError');
        t.equal(er.message, 'Missing localization: {count} nights');

        return void t.end();
      }

      throw er;
    })
    .catch(er => t.end(er));
});

test('should use serialized keys as values', t => {
  processFile('missing-localization.js', localization, {hideMessage: true})
    .then(({file}) => {
      const sample = requireUncache(file);

      t.equal(sample.dynamicTemplateKey, '3 nights');
      t.equal(sample.parametrizedTemplateKey, 'p param');
      t.equal(sample.staticKey, 'static');

      t.end();
    })
    .catch(er => t.end(er));
});
