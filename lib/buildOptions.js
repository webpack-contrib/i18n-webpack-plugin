'use strict';

const getType = require('./getType');

module.exports = function buildOptions(opts, defaultOpts) {
	const rawOpts = typeof opts === 'string' ? {functionName: opts} : opts;
	const options = Object.assign(Object.assign({}, defaultOpts), opts);

	if (typeof options.pluralRule === 'string') {
		switch (options.pluralRule) {
		case 'tr':
			options.pluralRule = 0; break;
		case 'de':
		case 'en':
			options.pluralRule = 1; break;
		case 'be':
		case 'ru':
		case 'uk':
			options.pluralRule = 7; break;
		default:
			throw new Error('`opts.pluralRule` got unsupported alias value `' + options.pluralRule + '`.');
		}
	}

	const {pluralRule} = options;

	if (!(
		pluralRule >= 0 &&
		pluralRule <= 16 &&
		pluralRule !== 3
	)) throw new Error('`opts.pluralRule` expected to have value [0; 16] exluding 3, got `' + options.pluralRule + '`.');

	return options;
}
