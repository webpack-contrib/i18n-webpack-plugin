'use strict';

const {makeKeysetFn} = require('./lib/keyset');
const {relative, resolve} = require('path');
const ParserHelpers = require('webpack/lib/ParserHelpers');
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const MissingLocalizationError = require('./lib/MissingLocalizationError');
const NullFactory = require('webpack/lib/NullFactory');
const buildOptions = require('./lib/buildOptions');
const propertyOf = require('./lib/propertyOf');
const serializeNode = require('./lib/serializeNode');

const resolveTo = (...args) => resolve(__dirname, ...args);
const toDoubleDigit = number => '0' + String(number).substr(-2);

const DEFAULT_OPTS = {
  failOnMissing: false,
  functionName: '__',
  hideMessage: false,
  keyset: false,
  pluralIdentName: 'count',
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
    this.pluralRuleModulePath = 'lib/plural/pluralForm' + toDoubleDigit(options.pluralRule);
  }

  apply(compiler) {
    const {functionName, failOnMissing, hideMessage, keyset: useKeyset, pluralIdentName} = this.options;
    const {localizationFn, keysetFn, pluralRuleModulePath} = this;
    const i18nPlugin = this;

    compiler.plugin('compilation', (compilation, params) => {
      compilation.dependencyFactories.set(ConstDependency, new NullFactory());
      compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
    });

    compiler.plugin('compilation', (compilation, data) => {
      data.normalModuleFactory.plugin('parser', (parser, opts) => {
        parser.plugin('call ' + functionName, function(expr) {
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

                if (failOnMissing) this.state.module.errors.push(error);
                else this.state.module.warnings.push(error);
              } else if (!error.requests.includes(evaluatedKeyExpr)) {
                error.add(keyset, key);
              }
            }

            translation = key;
          }

          if (evaluatedKeyExpr.isString()) {
            const stringDep = i18nPlugin._buildStringLiteralKeyDependency(translation, expr.range);
            this.state.current.addDependency(stringDep);

            return true;
          }

          const isPluralKey = keyExpr.expressions.some(expr =>
            expr.type === 'Identifier' && expr.name === pluralIdentName);

          const fnDep = isPluralKey && Array.isArray(translation) // small fallback for the missing dynamic key translation
            ? i18nPlugin._buildDynamicKeyDependency(translation, keyExpr, expr.range)
            : i18nPlugin._buildParametrizedKeyDependency(translation, keyExpr, expr.range);

          this.state.current.addDependency(fnDep);

          const pluralRuleModule = i18nPlugin._generateRequireExpr(this.state.module.context, pluralRuleModulePath);
          const interpolateModule = i18nPlugin._generateRequireExpr(this.state.module.context, 'lib/interpolate');

          ParserHelpers.addParsedVariableToModule(this, functionName, `${interpolateModule}(${pluralRuleModule})`);

          return true;
        });
      });
    });
  }

  _buildDynamicKeyDependency(forms, keyExpr, range) {
    const {functionName, pluralIdentName} = this.options;
    const replacements = this._serializeExpr(keyExpr);
    const expr = `${functionName}(${pluralIdentName}, ${JSON.stringify(forms)}, ${replacements})`;

    return new ConstDependency(expr, range);
  }

  _buildParametrizedKeyDependency(translation, keyExpr, range) {
    const {functionName} = this.options;
    const replacements = this._serializeExpr(keyExpr);
    const expr = `${functionName}(null, ${JSON.stringify(translation)}, ${replacements})`;

    return new ConstDependency(expr, range);
  }

  _buildStringLiteralKeyDependency(translation, range) {
    const expr = JSON.stringify(translation);

    return new ConstDependency(expr, range);
  }

  _generateRequireExpr(context, pathToModule) {
    let moduleJsPath = relative(context, resolveTo(pathToModule));

    if (!/^[A-Z]:/i.test(moduleJsPath)) {
      moduleJsPath = './' + moduleJsPath.replace(/\\/g, '/');
    }

    return `require(${JSON.stringify(moduleJsPath)})`;
  }

  _serializeExpr(expr) {
    const pairs = expr.expressions.map(identifier =>
      JSON.stringify(serializeNode(identifier)) + ': ' + identifier.name);

    return '{' + pairs + '}';
  }
}

module.exports = I18nPlugin;
