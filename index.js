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
		if(expr.arguments.length != 1) return;
		var param = this.evaluateExpression(expr.arguments[0]);
		if(!param.isString()) return;
		param = param.string;
		var result = localization ? localization[param] : param;
		if(typeof result == "undefined") {
			this.state.module.errors.push(new MissingLocalizationError(this.state.module, param));
			result = param;
		}
		var dep = new ConstDependency(JSON.stringify(result), expr.range);
		dep.loc = expr.loc;
		this.state.current.addDependency(dep);
		return true;
	});

};