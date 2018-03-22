/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
import ConstDependency from 'webpack/lib/dependencies/ConstDependency';
import NullFactory from 'webpack/lib/NullFactory';
import MissingLocalizationError from './MissingLocalizationError';
import makeLocalizeFunction from './MakeLocalizeFunction';

/**
 *
 * @param {object|function} localization
 * @param {object|string} Options object or obselete functionName string
 * @constructor
 */
class I18nPlugin {
  constructor(localization, options, failOnMissing) {
    // Backward-compatiblility
    if (typeof options === 'string') {
      options = {
        functionName: options,
      };
    }

    if (typeof failOnMissing !== 'undefined') {
      options.failOnMissing = failOnMissing;
    }

    this.options = options || {};
    this.localization = localization ? (typeof localization === 'function' ? localization : makeLocalizeFunction(localization, !!this.options.nested)) : null;
    this.functionName = this.options.functionName || '__';
    this.failOnMissing = !!this.options.failOnMissing;
    this.hideMessage = this.options.hideMessage || false;
    this.missingLocalizationCallback = this.options.missingLocalizationCallback || (() => 0);
  }

  apply(compiler) {
    const { localization, failOnMissing, hideMessage, missingLocalizationCallback } = this; // eslint-disable-line no-unused-vars
    const name = this.functionName;

    compiler.plugin('compilation', (compilation, params) => { // eslint-disable-line no-unused-vars
      compilation.dependencyFactories.set(ConstDependency, new NullFactory());
      compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
    });

    compiler.plugin('compilation', (compilation, data) => {
      data.normalModuleFactory.plugin('parser', (parser, options) => { // eslint-disable-line no-unused-vars
        // should use function here instead of arrow function due to save the Tapable's context
        parser.plugin(`call ${name}`, function i18nPlugin(expr) {
          let param;
          let defaultValue;
          switch (expr.arguments.length) {
            case 2:
              param = this.evaluateExpression(expr.arguments[1]);
              if (!param.isString()) return;
              param = param.string;
              defaultValue = this.evaluateExpression(expr.arguments[0]);
              if (!defaultValue.isString()) return;
              defaultValue = defaultValue.string;
              break;
            case 1:
              param = this.evaluateExpression(expr.arguments[0]);
              if (!param.isString()) return;
              defaultValue = param = param.string;
              break;
            default:
              return;
          }
          let result = localization ? localization(param) : defaultValue;

          if (typeof result === 'undefined') {
            missingLocalizationCallback(param, this.state.module);
            let error = this.state.module[__dirname];
            if (!error) {
              error = new MissingLocalizationError(this.state.module, param, defaultValue);
              this.state.module[__dirname] = error;

              if (failOnMissing) {
                this.state.module.errors.push(error);
              } else if (!hideMessage) {
                this.state.module.warnings.push(error);
              }
            } else if (!error.requests.includes(param)) {
              error.add(param, defaultValue);
            }
            result = defaultValue;
          }

          const dep = new ConstDependency(JSON.stringify(result), expr.range);
          dep.loc = expr.loc;
          this.state.current.addDependency(dep);
          return true;
        });
      });
    });
  }
}

export default I18nPlugin;
