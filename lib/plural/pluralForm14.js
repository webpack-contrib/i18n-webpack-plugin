'use strict';

// Families: Slavic (Macedonian)
module.exports = function pluralForm14(value) {
  const quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  const lastDigit = quantity % 10;

  if (
		lastDigit === 1
	) return 0;
  else if (
		lastDigit === 2
	) return 1;

  return 2;
};

module.exports.forms = 3;
