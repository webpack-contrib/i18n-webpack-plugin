'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('error-missing-key', t => {
	const localization = {};

	processFile('error-missing-key.js', localization, {failOnMissing: true, hideMessage: false})
		.then(() => {
			throw new Error('Should respect `failOnMissing`=`true` and throw an exception');
		})
		.catch(er => {
			if (er.name === 'MissingLocalizationError') {
				t.pass('caught MissingLocalizationError');
				t.equal(er.message, 'Missing localization: simple');
				return void t.end();
			}

			throw er;
		})
		.catch(er => t.end(er));
});
