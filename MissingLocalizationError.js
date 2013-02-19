/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function MissingLocalizationError(module, request) {
	Error.call(this);
	Error.captureStackTrace(this, MissingLocalizationError);
	this.name = "MissingLocalizationError";
	this.message = "Missing localization: " + request;
	this.module = module;
}
module.exports = MissingLocalizationError;

MissingLocalizationError.prototype = Object.create(Error.prototype);
