/* globals __ */
exports.defaults = __('default value', 'missing-key1');
exports.missingKey = __('missing-key2');
exports.staticKey = __('static-key');

const environmentName = 'dev';
exports.parametrizedKey = __('env: ' + environmentName); // eslint-disable-line prefer-template

const count = 5;
exports.templateKey = __(`${count} nights`);
