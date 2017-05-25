'use strict';

// Families: Semitic (Arabic)
module.exports = function pluralForm12(value) {
  var quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  var lastTwoDigits = quantity % 100;

  if (
		quantity === 1
	) return 0;
  else if (
		quantity === 2
	) return 1;
  else if (
		quantity === 0
	) return 5;
  else if (
		3 <= lastTwoDigits && lastTwoDigits <= 10
	) return 2;
  else if (
		0 <= lastTwoDigits && lastTwoDigits <= 2
	) return 4;

  return 3;
};

module.exports.forms = 6;
