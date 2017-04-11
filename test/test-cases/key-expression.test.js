'use strict';

const {processFile, requireUncache} = require('./_setup');
const test = require('tape');

const localization = {
  'there are {count} apples in a {basket}': [
    '{count} яблоко в {basket}',
    '{count} яблока в {basket}',
    '{count} яблок в {basket}',
  ],
  'a concatination sample with {param1} and {param2}': 'пример конкатенации {param1} и {param2}',
  'a template sample with {param1} and {param2}': 'пример шаблона с {param1} и {param2}',
  'static key': 'статичный ключ',
};

test('key-expression', t => {
  processFile('key-expression.js', localization, {pluralRule: 'ru'})
    .then(({file}) => {
      const sample = requireUncache(file);

      t.equal(sample.dynamicBinaryKey, '1 яблоко в корзине');
      t.equal(sample.dynamicTemplateKey, '1 яблоко в корзине');
      t.equal(sample.parametrizedTemplateKey, 'пример шаблона с p1 и p2');
      t.equal(sample.staticKey, 'статичный ключ');

      t.equal(sample.dynamicKeyFn(0), '0 яблок в корзине');
      t.equal(sample.dynamicKeyFn(2), '2 яблока в корзине');

      t.end();
    })
    .catch(er => t.end(er));
});
