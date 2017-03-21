'use strict';

const {processFile} = require('./_setup');
const test = require('tape');

test('context-keyset', t => {
	const localization = {
		'context-keyset': {
			bar: 'translated bar',
		},
	};

	processFile('context-keyset.js', localization, {keyset: '[name]'})
		.then(({file}) => {
			t.equal(require(file), 'translated bar');

			t.end();
		})
		.catch(er => {
			console.error(er);
			t.end(er);
		});
});
