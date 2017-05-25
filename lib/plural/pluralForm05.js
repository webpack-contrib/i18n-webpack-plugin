'use strict';

// Families: Romanic (Romanian)
module.exports = function pluralForm05(value) {
  var quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  var lastTwoDigits = quantity % 100;

  if (
		quantity === 1
	) return 0;
  else if (
		quantity === 0 ||
		lastTwoDigits >= 1 && lastTwoDigits <= 19
	) return 1;

  return 2;
};

module.exports.forms = 3;
