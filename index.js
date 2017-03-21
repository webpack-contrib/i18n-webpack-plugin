'use strict';

const {addParsedVariableToModule, requireFileAsExpression} = require('webpack/lib/ParserHelpers');
const {makeKeysetFn} = require('./lib/keyset');
const {resolve} = require('path');
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const MissingLocalizationError = require('./lib/MissingLocalizationError');
const buildOptions = require('./lib/buildOptions');
const propertyOf = require('./lib/propertyOf');
const serializeNode = require('./lib/serializeNode');

const toDoubleDigit = number => '0' + String(number).substr(-2);

const DEFAULT_OPTS = {
	failOnMissing: false,
	functionName: '__',
	hideMessage: false,
	keyset: false,
	pluralRule: 0,
};

class I18nPlugin {
	constructor(localization, opts) {
		const options = buildOptions(opts, DEFAULT_OPTS);
		const localizationFn = typeof localization === 'function'
			? localization
			: propertyOf(localization);

		const keysetFn = typeof options.keyset === 'function'
			? options.keyset
			: makeKeysetFn(options.keyset);

		this.localizationFn = localizationFn;
		this.keysetFn = keysetFn;
		this.options = options;
		this.pluralRuleModulePath = resolve(__dirname, 'lib/plural/pluralForm' + toDoubleDigit(options.pluralRule));
	}

	apply(compiler) {
		const {functionName, failOnMissing, hideMessage, keyset: useKeyset} = this.options;
		const {localizationFn, keysetFn, pluralRuleModulePath} = this;

		compiler.plugin('compilation', function (compilation, data) {
			data.normalModuleFactory.plugin('parser', function (parser, opts) {
				parser.plugin('call ' + functionName, function (expr) {
					let keyExpr;
					let keysetExpr;

					switch (expr.arguments.length) {
					case 1:
						keyExpr = expr.arguments[0];
						break;
					case 2:
						keysetExpr = expr.arguments[0];
						keyExpr = expr.arguments[1];

						if (useKeyset && parser.evaluateExpression(keysetExpr).isString()) break;
						return;
					default:
						return;
					}

					const evaluatedKeyExpr = parser.evaluateExpression(keyExpr);

					if (!(
						evaluatedKeyExpr.isString() ||
						evaluatedKeyExpr.isTemplateString()
					)) return;

					const keysetParam = keysetExpr ? serializeNode(keysetExpr) : null;
					const keyset = keysetFn(keysetParam, this.state.current.request);
					const key = serializeNode(keyExpr);
					let translation = localizationFn(key, keyset);

					if (typeof translation === 'undefined') {
						if (!hideMessage) {
							let error = this.state.module[__dirname];

							if (!error) {
								error = this.state.module[__dirname] = new MissingLocalizationError(this.state.module, keyset, key);

								if (failOnMissing) this.state.module.errors.push(error)
								else this.state.module.warnings.push(error);
							} else if (!error.requests.includes(evaluatedKeyExpr)) {
								error.add(keyset, key);
							}
						}

						translation = key;
					}

					if (evaluatedKeyExpr.isString()) {
						const stringDep = new ConstDependency(JSON.stringify(translation), expr.range);
						this.state.current.addDependency(stringDep);

						return true;
					}

					const identifierNode = keyExpr.expressions[0];
					const placeholder = serializeNode(identifierNode);

					if (!Array.isArray(translation)) {
						const stringDep = new ConstDependency(buildDynamicShim(identifierNode.name, translation, placeholder), expr.range);
						this.state.current.addDependency(stringDep);

						return true;
					}

					const pluralModule = requireFileAsExpression(this.state.module.context, pluralRuleModulePath);
					addParsedVariableToModule(this, functionName, pluralModule);

					const fnDep = new ConstDependency(buildFnCall(functionName, identifierNode.name, translation, placeholder), expr.range);
					this.state.current.addDependency(fnDep);

					return true;
				});
			});
		});
	}
}

module.exports = I18nPlugin;

function buildDynamicShim(identifierName, translation, placeholder) {
	return `${JSON.stringify(translation)}.replace(${JSON.stringify(placeholder)}, ${identifierName})`;
}

function buildFnCall(fnName, identifierName, forms, placeholder) {
	return `${JSON.stringify(forms)}[${fnName}(${identifierName})].replace(${JSON.stringify(placeholder)}, ${identifierName})`;
}
