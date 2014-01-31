/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function MissingLocalizationError(module, name, value) {
	Error.call(this);
	Error.captureStackTrace(this, MissingLocalizationError);
	this.name = "MissingLocalizationError";
	this.requests = [
		{ name: name, value: value }
	];
	this.module = module;
	this._buildMessage();
}
module.exports = MissingLocalizationError;

MissingLocalizationError.prototype = Object.create(Error.prototype);

MissingLocalizationError.prototype._buildMessage = function() {
	this.message = this.requests.map(function(request) {
		if(request.name === request.value)
			return "Missing localization: " + request.name;
		else
			return "Missing localization: (" + request.name + ") " + request.value;
	}).join("\n");
};

MissingLocalizationError.prototype.add = function(name, value) {
	for(var i = 0; i < this.requests.length; i++)
		if(this.requests[i].name === name) return;
	this.requests.push({ name: name, value: value });
	this._buildMessage();
};


