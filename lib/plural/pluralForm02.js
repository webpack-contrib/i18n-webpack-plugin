'use strict';

// Families: Romanic (French, Brazilian Portuguese)
module.exports = function pluralForm02(value) {
	var quantity = parseInt(value, 10);
	if (isNaN(quantity)) return 0;

	return (quantity === 0 || quantity === 1) ? 0 : 1;
}

module.exports.forms = 2;
