'use strict';

// Families: Slavic (Slovenian, Sorbian)
module.exports = function pluralForm10(value) {
	var quantity = parseInt(value, 10);
	if (isNaN(quantity)) return 0;

	var lastTwoDigits = quantity % 100;

	if (
		lastTwoDigits === 1
	) return 0
	else if (
		lastTwoDigits === 2
	) return 1
	else if (
		lastTwoDigits === 3 ||
		lastTwoDigits === 4
	) return 2
	else
		return 3;
}

module.exports.forms = 4;
