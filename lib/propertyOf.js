'use strict';

module.exports = function propertyOf(dict = {}) {
	return function getByKey(key, keyset) {
		if (typeof keyset !== 'string') return dict[key];
		if (typeof dict[keyset] === 'object') return dict[keyset][key];
	}
}
