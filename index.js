/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ConstDependency = require("webpack/lib/dependencies/ConstDependency");
var NullFactory = require("webpack/lib/NullFactory");
var MissingLocalizationError = require("./MissingLocalizationError");

/**
 *
 * @param {object|function}	localization
 * @param {string}			functionName
 * @param {boolean}			failOnMissing
 * @constructor
 */
function I18nPlugin(localization, functionName, failOnMissing) {
	this.localization = localization? ('function' === typeof localization? localization: makeLocalizFunction(localization))
									: null;
	this.functionName = functionName || "__";
	this.failOnMissing = failOnMissing || false;
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
 * @param {object}	localization
 * @returns {Function}
 */
function makeLocalizFunction(localization) {
	return function localizFunction(key) {
		return localization[key];
	};
}