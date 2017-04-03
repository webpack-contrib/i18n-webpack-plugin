'use strict';

module.exports = function createInterpolateFn(pluralFormFn) {
  return interpolate;

  function interpolate(count, forms, replacements) {
    var translation = Array.isArray(forms) ? forms[pluralFormFn(count)] : forms;

    Object.keys(replacements || {}).forEach(function (param) {
      translation = translation.replace(new RegExp(param, 'g'), replacements[param]);
    });

    return translation;
  }
}
