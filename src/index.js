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
  }

  apply(compiler) {
    const { localization, failOnMissing, hideMessage } = this; // eslint-disable-line no-unused-vars
    const name = this.functionName;
    const plugin = { name: 'I18nPlugin' };

    compiler.hooks.compilation.tap(plugin, (compilation, params) => { // eslint-disable-line no-unused-vars
      compilation.dependencyFactories.set(ConstDependency, new NullFactory());
      compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
    });

    compiler.hooks.compilation.tap(plugin, (compilation, data) => {
      const parserHook = data.normalModuleFactory.hooks.parser;
      const parserHandler = (parser, options) => { // eslint-disable-line no-unused-vars
        parser.hooks.call.for(name).tap(plugin, (expr) => {
          let param;
          let defaultValue;
          switch (expr.arguments.length) {
            case 2:
              param = parser.evaluateExpression(expr.arguments[1]);
              if (!param.isString()) return false;
              param = param.string;
              defaultValue = parser.evaluateExpression(expr.arguments[0]);
              if (!defaultValue.isString()) return false;
              defaultValue = defaultValue.string;
              break;
            case 1:
              param = parser.evaluateExpression(expr.arguments[0]);
              if (!param.isString()) return false;
              defaultValue = param = param.string;
              break;
            default:
              return false;
          }
          let result = localization ? localization(param) : defaultValue;

          if (typeof result === 'undefined') {
            let error = parser.state.module[__dirname];
            if (!error) {
              error = new MissingLocalizationError(parser.state.module, param, defaultValue);
              parser.state.module[__dirname] = error;

              if (failOnMissing) {
                parser.state.module.errors.push(error);
              } else if (!hideMessage) {
                parser.state.module.warnings.push(error);
              }
            } else if (!error.requests.includes(param)) {
              error.add(param, defaultValue);
            }
            result = defaultValue;
          }

          const dep = new ConstDependency(JSON.stringify(result), expr.range);
          dep.loc = expr.loc;
          parser.state.current.addDependency(dep);
          return true;
        });
      };

      parserHook.for('javascript/auto').tap(plugin, parserHandler);
      parserHook.for('javascript/dynamic').tap(plugin, parserHandler);
      parserHook.for('javascript/esm').tap(plugin, parserHandler);
    });
  }
}

export default I18nPlugin;
