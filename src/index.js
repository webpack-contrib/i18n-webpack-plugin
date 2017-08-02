/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
import ConstDependency from 'webpack/lib/dependencies/ConstDependency';
import NullFactory from 'webpack/lib/NullFactory';
import ParserHelpers from 'webpack/lib/ParserHelpers';
import { buildForms, isValidRuleNumber } from './pluralForms';
import { serializeExpression } from './ast';
import MissingLocalizationError from './MissingLocalizationError';
import makeLocalizeFunction from './MakeLocalizeFunction';
import generateRequireExpr from './generateRequireExpr';
import toDoubleDigit from './toDoubleDigit';

/**
 *
 * @param {object|function} localization
 * @param {object|string} Options object or obselete functionName string
 * @constructor
 */
class I18nPlugin {
  constructor(localization, options = {}, failOnMissing) {
    // Backward-compatiblility
    if (typeof options === 'string') {
      options = {
        functionName: options,
      };
    }

    if (typeof failOnMissing !== 'undefined') {
      options.failOnMissing = failOnMissing;
    }

    if (typeof options.pluralIdentName === 'undefined') {
      options.pluralIdentName = 'count';
    }

    if (typeof options.pluralRuleNumber === 'undefined') {
      options.pluralRuleNumber = 1;
    }

    if (!isValidRuleNumber(options.pluralRuleNumber)) {
      throw new Error(`Unknown pluralRule ${options.pluralRuleNumber}. See available at https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals`);
    }

    this.options = options;
    this.localization = localization ? (typeof localization === 'function' ? localization : makeLocalizeFunction(localization, !!this.options.nested)) : null;
    this.functionName = this.options.functionName || '__';
    this.failOnMissing = !!this.options.failOnMissing;
    this.hideMessage = this.options.hideMessage || false;
    this.pluralIdentName = options.pluralIdentName;
    this.pluralRuleNumber = options.pluralRuleNumber;

    this.interpolateFnPath = 'dist/interpolate';
    this.pluralRuleFnPath = `dist/pluralRules/pluralRule${toDoubleDigit(options.pluralRuleNumber)}`;
  }

  apply(compiler) {
    const { localization, failOnMissing, hideMessage } = this; // eslint-disable-line no-unused-vars
    const { functionName: name, pluralIdentName, pluralRuleNumber, interpolateFnPath, pluralRuleFnPath } = this;

    compiler.plugin('compilation', (compilation, params) => { // eslint-disable-line no-unused-vars
      compilation.dependencyFactories.set(ConstDependency, new NullFactory());
      compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
    });

    compiler.plugin('compilation', (compilation, data) => {
      data.normalModuleFactory.plugin('parser', (parser, options) => { // eslint-disable-line no-unused-vars
        // should use function here instead of arrow function due to save the Tapable's context
        parser.plugin(`call ${name}`, function i18nPlugin(expr) {
          let paramExpr;
          let defaultValue;
          switch (expr.arguments.length) {
            case 2:
              paramExpr = serializeExpression(expr.arguments[1], pluralIdentName);
              if (!paramExpr.supported) return;
              defaultValue = this.evaluateExpression(expr.arguments[0]);
              if (!defaultValue.isString()) return;
              defaultValue = defaultValue.string;
              break;
            case 1:
              paramExpr = serializeExpression(expr.arguments[0], pluralIdentName);
              if (!paramExpr.supported) return;
              defaultValue = paramExpr.string;
              break;
            default:
              return;
          }
          let result = localization ? localization(paramExpr.string) : defaultValue;

          if (typeof result === 'undefined') {
            let error = this.state.module[__dirname];
            if (!error) {
              error = new MissingLocalizationError(this.state.module, paramExpr.string, defaultValue);
              this.state.module[__dirname] = error;

              if (failOnMissing) {
                this.state.module.errors.push(error);
              } else if (!hideMessage) {
                this.state.module.warnings.push(error);
              }
            } else if (!error.requests.includes(paramExpr.string)) {
              error.add(paramExpr.string, defaultValue);
            }
            result = defaultValue;
          }

          if (paramExpr.plural || paramExpr.params) {
            const pairs = Object.keys(paramExpr.identifiers)
              .map(identifier => `${JSON.stringify(paramExpr.identifiers[identifier])}: ${identifier}`).join(', ');

            const forms = paramExpr.plural ? buildForms(result, pluralRuleNumber) : result;
            const replacement = paramExpr.plural ? `${name}(${JSON.stringify(forms)}, {${pairs}}, ${pluralIdentName})` : `${name}(${JSON.stringify(forms)}, {${pairs}})`;

            const dep = new ConstDependency(replacement, expr.range);
            dep.loc = expr.loc;
            this.state.current.addDependency(dep);

            const pluralRuleModule = generateRequireExpr(this.state.module.context, pluralRuleFnPath);
            const interpolateModule = generateRequireExpr(this.state.module.context, interpolateFnPath);
            ParserHelpers.addParsedVariableToModule(this, name, `${interpolateModule}(${pluralRuleModule})`);
          } else {
            const dep = new ConstDependency(JSON.stringify(result), expr.range);
            dep.loc = expr.loc;
            this.state.current.addDependency(dep);
          }

          return true;
        });
      });
    });
  }
}

export default I18nPlugin;
