'use strict';

// Families: Icelandic
module.exports = function pluralForm15(value) {
  const quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  const lastDigit = quantity % 10;

  return lastDigit === 1 && quantity !== 11 ? 0 : 1;
};

module.exports.forms = 2;
