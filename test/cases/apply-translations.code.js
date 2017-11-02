/* globals __ */
// Define the variable to be used in the template string during translation:
const variableForTemplateString = 'some value'; // eslint-disable-line no-unused-vars
exports.defaults = __('default value', 'missing-key1');
exports.missingKey = __('missing-key2');
exports.staticKey = __('static-key');
exports.templateString = __('template-string');
