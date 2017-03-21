'use strict';

// Families: Celtic (Irish Gaelic)
module.exports = function pluralForm11(value) {
	var quantity = parseInt(value, 10);
	if (isNaN(quantity)) return 0;

	if (
		quantity === 1
	) return 0
	else if (
		quantity === 2
	) return 1
	else if (
		3 <= quantity && quantity <= 6
	) return 2
	else if (
		7 <= quantity && quantity <= 10
	) return 3
	else
		return 4;
}

module.exports.forms = 5;
