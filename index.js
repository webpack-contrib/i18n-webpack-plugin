/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ConstDependency = require("webpack/lib/dependencies/ConstDependency");
var NullFactory = require("webpack/lib/NullFactory");
var MissingLocalizationError = require("./MissingLocalizationError");

/**
 *
 * @param {object|function} localization
 * @param {object|string} Options object or obselete functionName string
 * @constructor
 */
function I18nPlugin(localization, options) {
	// Backward-compatiblility
	if (typeof options === "string") {
		options = {
			functionName: options
		};
	}

	if (arguments[2]) {
		options.failOnMissing = arguments[2];
	}

	this.options = options || {};
	this.localization = localization? ('function' === typeof localization? localization: makeLocalizeFunction(localization, !!this.options.nested))
									: null;
	this.functionName = this.options.functionName || "__";
	this.failOnMissing = !!this.options.failOnMissing;
}

module.exports = I18nPlugin;

I18nPlugin.prototype.apply = function(compiler) {
	var localization = this.localization,
		failOnMissing = this.failOnMissing;
	compiler.plugin("compilation", function(compilation, params) {
		compilation.dependencyFactories.set(ConstDependency, new NullFactory());
		compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
	});
	compiler.parser.plugin("call " + this.functionName, function(expr) {
		var param, defaultValue;
		switch(expr.arguments.length) {
		case 2:
			param = this.evaluateExpression(expr.arguments[1]);
			if(!param.isString()) return;
			param = param.string;
			defaultValue = this.evaluateExpression(expr.arguments[0]);
			if(!defaultValue.isString()) return;
			defaultValue = defaultValue.string;
			break;
		case 1:
			param = this.evaluateExpression(expr.arguments[0]);
			if(!param.isString()) return;
			defaultValue = param = param.string;
			break;
		default:
			return;
		}
		var result = localization ? localization(param) : defaultValue;
		if(typeof result == "undefined") {
			var error = this.state.module[__dirname];
			if(!error) {
				error = this.state.module[__dirname] = new MissingLocalizationError(this.state.module, param, defaultValue);
				if (failOnMissing) {
					this.state.module.errors.push(error);
				} else {
					this.state.module.warnings.push(error);
				}
			} else if(error.requests.indexOf(param) < 0) {
				error.add(param, defaultValue);
			}
			result = defaultValue;
		}
		var dep = new ConstDependency(JSON.stringify(result), expr.range);
		dep.loc = expr.loc;
		this.state.current.addDependency(dep);
		return true;
	});

};

/**
 *
 * @param {object}  localization
 * @param {string}  string key
 * @returns {*}
 */
function byString(object, stringKey) {
	stringKey = stringKey.replace(/^\./, ''); // strip a leading dot

	var keysArray = stringKey.split('.');
	for (var i = 0, length = keysArray.length; i < length; ++i) {
		var key = keysArray[i];

		if (key in object) {
			object = object[key];
		} else {
			return;
		}
	}

	return object;
}

/**
 *
 * @param {object}  localization
 * @returns {Function}
 */
function makeLocalizeFunction(localization, nested) {
	return function localizeFunction(key) {
		return nested ? byString(localization, key) : localization[key];
	};
}
