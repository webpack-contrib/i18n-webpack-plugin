'use strict';

// Families: Slavic (Slovak, Czech)
module.exports = function pluralForm08(value) {
  const quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  if (
		quantity === 1
	) return 0;
  else if (
		2 <= quantity && quantity <= 4
	) return 1;

  return 2;
};

module.exports.forms = 3;
