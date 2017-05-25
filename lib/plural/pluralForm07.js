'use strict';

// Families: Slavic (Belarusian, Bosnian, Croatian, Serbian, Russian, Ukrainian)
module.exports = function pluralForm07(value) {
  var quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  var lastDigit = quantity % 10;

  if (
		lastDigit === 1 && quantity !== 11
	) return 0;
  else if (
		lastDigit >= 2 && lastDigit <= 4 &&
		quantity !== 12 &&
		quantity !== 13 &&
		quantity !== 14
	) return 1;

  return 2;
};

module.exports.forms = 3;
