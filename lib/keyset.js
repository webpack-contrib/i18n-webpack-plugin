'use strict';

const {basename, extname} = require('path');

exports.makeKeysetFn = makeKeysetFn;

function makeKeysetFn(keysetOpts) {
	if (!keysetOpts)
		return noop;

	if (typeof keysetOpts === 'string')
		return (keyset, request) => {
			if (keyset) return keyset;

			const ext = extname(request).replace(/^\./, '');
			const name = basename(request, '.' + ext);
			return keysetOpts.replace(/\[name\]/g, name).replace(/\[ext\]/g, ext);
		}

	return identity;
}

function identity(a) {
	return a;
}

function noop() {}
