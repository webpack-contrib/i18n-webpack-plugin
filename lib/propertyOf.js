'use strict';

module.exports = function propertyOf(dict = {}) {
  return function getByKey(key, keyset) {
    if (typeof keyset !== 'string') return dict[key];

    const parts = keyset.split('.');
    const length = parts.length;
    let object = dict;

    for (let i = 0; i < length; ++i) {
      const objKey = parts[i];

      if (!object.hasOwnProperty(objKey)) return;

      object = object[objKey];
    }

    return object[key];
  };
};
