'use strict';

// Families: Slavic (Macedonian)
module.exports = function pluralForm14(value) {
	var quantity = parseInt(value, 10);
	if (isNaN(quantity)) return 0;

	var lastDigit = quantity % 10;

	if (
		lastDigit === 1
	) return 0
	else if (
		lastDigit === 2
	) return 1
	else
		return 2;
}

module.exports.forms = 3;
