'use strict';

// Families: Germanic (Danish, Dutch, English, Faroese, Frisian, German, Norwegian, Swedish), Finno-Ugric (Estonian, Finnish, Hungarian), Language isolate (Basque), Latin/Greek (Greek), Semitic (Hebrew), Romanic (Italian, Portuguese, Spanish, Catalan), Vietnamese
module.exports = function pluralForm01(value) {
	var quantity = parseInt(value, 10);
	if (isNaN(quantity)) return 0;

	return quantity === 1 ? 0 : 1;
}

module.exports.forms = 2;
