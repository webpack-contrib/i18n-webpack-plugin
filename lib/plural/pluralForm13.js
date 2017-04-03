'use strict';

// Families: Semitic (Maltese)
module.exports = function pluralForm13(value) {
  const quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  const lastTwoDigits = quantity % 100;

  if (
		quantity === 1
	) return 0;
  else if (
		quantity === 0 ||
		lastTwoDigits >= 1 && lastTwoDigits <= 10
	) return 1;
  else if (
		11 <= lastTwoDigits && lastTwoDigits <= 19
	) return 2;

  return 3;
};

module.exports.forms = 4;
