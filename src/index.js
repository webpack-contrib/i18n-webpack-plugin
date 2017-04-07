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
  constructor(localization, options) {
    // Backward-compatiblility
    if (typeof options === 'string') {
      options = {
        functionName: options,
      };
    }

    if (arguments[2]) {
      options.failOnMissing = arguments[2];
    }

    this.options = options || {};
    this.localization = localization ? (typeof localization === 'function' ? localization : makeLocalizeFunction(localization, !!this.options.nested)) : null;
    this.functionName = this.options.functionName || '__';
    this.failOnMissing = !!this.options.failOnMissing;
    this.hideMessage = this.options.hideMessage || false;
  }

  apply(compiler) {
    const localization = this.localization;
    const hideMessage = this.hideMessage; // eslint-disable-line no-unused-vars
    const failOnMissing = this.failOnMissing;
    compiler.plugin('compilation', (compilation, params) => { // eslint-disable-line no-unused-vars
      compilation.dependencyFactories.set(ConstDependency, new NullFactory());
      compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
    });
    const that = this;
    compiler.plugin('compilation', (compilation, data) => {
      data.normalModuleFactory.plugin('parser', (parser, options) => { // eslint-disable-line no-unused-vars
        parser.plugin(`call ${that.functionName}`, function (expr) {
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
            let error = this.state.module[__dirname];
            if (!error) {
              error = this.state.module[__dirname] = new MissingLocalizationError(this.state.module, param, defaultValue);
              if (failOnMissing) {
                this.state.module.errors.push(error);
              } else {
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
