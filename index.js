/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ConstDependency = require("webpack/lib/dependencies/ConstDependency");
var NullFactory = require("webpack/lib/NullFactory");
var MissingLocalizationError = require("./MissingLocalizationError");

function I18nPlugin(localization, functionName) {
	this.localization = localization || null;
	this.functionName = functionName || "__";
}
module.exports = I18nPlugin;

I18nPlugin.prototype.apply = function(compiler) {
	var localization = this.localization;
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
		var result = localization ? localization[param] : defaultValue;
		if(typeof result == "undefined") {
			var warning = this.state.module[__dirname];
			if(!warning) {
				warning = this.state.module[__dirname] = new MissingLocalizationError(this.state.module, param, defaultValue);
				this.state.module.warnings.push(warning);
			} else if(warning.requests.indexOf(param) < 0) {
				warning.add(param, defaultValue);
			}
			result = defaultValue;
		}
		var dep = new ConstDependency(JSON.stringify(result), expr.range);
		dep.loc = expr.loc;
		this.state.current.addDependency(dep);
		return true;
	});

};