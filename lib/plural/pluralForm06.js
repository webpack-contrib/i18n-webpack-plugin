'use strict';

// Families: Baltic (Latvian, Lithuanian)
module.exports = function pluralForm06(value) {
  var quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  var lastDigit = quantity % 10;
  var lastTwoDigit = quantity % 100;

  if (
		lastDigit === 1 && quantity !== 11
	) return 0;
  else if (
		lastDigit === 0 ||
		lastTwoDigit >= 11 && lastTwoDigit <= 19
	) return 1;

  return 2;
};

module.exports.forms = 3;
